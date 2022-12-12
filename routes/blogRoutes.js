const express = require("express");
const Blog = require("../model/blogSchema");
const User = require("../model/userSchema");
const { requireAuth } = require("../middlewares/auth");
const multer = require("multer");
const path = require("path");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "./upload",
  filename: function (req, file, cb) {
    console.log(
      "File Name is saved as",
      new Date().toISOString().replace(/:/g, "-") + file.originalname
    );
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 11 },
  fileFilter: function (req, file, cb) {
    if (
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/png" ||
      file.mimetype == "image/gif"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Type not supported"));
    }
  },
});

const handleError = (err) => {
  let errors = {msg: 'Post not submitted failed at server check info!---->', title: "", body: "" };

  if (err.message.includes("Blog validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

router.get("/create", requireAuth, (req, res) => {
  res.render("create");
});

router.post("/create", upload.single("file"), async (req, res) => {
  const image = req.file.path;
  const { title, subhead, author, author_pic,author_id,  content } = req.body;
  try {
    const blog = await Blog.create({ picture: image, title, subhead, author, author_pic, author_id, content });
    blog
      ? res.status(200).redirect("/")
      : res.status(400).send("error creating post!");
  } catch (err) {
    const errors = handleError(err);
    res.status(400).send(JSON.stringify(errors));
  }
});

router.get("/posts/:id", requireAuth, async (req, res) => {
  let id = req.params.id;
  try {
    const post = await Blog.findById(id);
    res.render("post", { post });
  } catch (err) {
    console.log(err);
  }
});

router.delete("/posts/:id", async (req, res) => {
  let id = req.params.id;

  try {
    const blog = await Blog.findByIdAndDelete(id);
    res.status(200).json({ redirect: "/" });
  } catch (err) {
    res.status(400);
  }
});

router.get("/posts/:id/edit", async (req, res) => {
  let id = req.params.id;
  const post = await Blog.findById(id);
  res.render("edit_post", { post });
});

router.post("/posts/:id/edit", upload.single("file"), async (req, res) => {
  const id = req.params.id;
  const { title, subhead, author, author_pic, author_id, content } = req.body;
  const image = req.file ? req.file.path : null;

  try {
    const blog = image 
    ? await Blog.findByIdAndUpdate(id,{$set:{picture: image, title: title, subhead:subhead, content: content, author: author, author_pic: author_pic}},  { useFindAndModify: false })
    : await Blog.findByIdAndUpdate(id,{$set:{title: title, subhead:subhead, content: content, author: author, author_pic: author_pic}},  { useFindAndModify: false });
    blog
    ? res.status(200).redirect("/")
    : res.status(400).send("error creating post!");
  } catch (error) {
    res.json({
      state: false,
      message: "Edit failed",
    });
  }
});

router.post("/user/:id/edit", upload.single("file"), async (req, res) => {
  const id = req.params.id;
  const {email, firstname, lastname, password } = req.body
  const image = req.file ? req.file.path : null;
  console.log(req.body);
  
  if (password == '' ) {
    id = null;
  }

  try {
    const user = image 
    ? await User.findByIdAndUpdate(id,{$set:{profile_img: image, email : email, firstname: firstname, lastname: lastname, password: password}},  { useFindAndModify: false })
    : await User.findByIdAndUpdate(id,{$set:{email : email, firstname: firstname, lastname: lastname, password: password}},  { useFindAndModify: false });
    user
    ? res.status(200).redirect("/")
    : res.status(400).send("error update user!");
  } catch (error) {
    const refinedError = handleError(err)
    console.log(refinedError)
    res.status(400).json({refinedError})
  }
});

module.exports = router;
