const article = document.getElementById("article");

const title_article = document.getElementById('title_article');
const title_error = document.getElementById("title_error");

const subhead = document.getElementById('subhead');
const subhead_error = document.getElementById("subhead_error");

const content = document.getElementById('content');
const content_error = document.getElementById("content_error");

const file = document.getElementById('file');
const file_error = document.getElementById("file_error");

title_article.addEventListener('change', async (e) => {
    e.preventDefault;

    if(title_article.value.length < 1 ) {
        title_error.style.display = "block"; 
    } else {
        title_error.style.display = "none";
    }

    isBlockFormArticle();
});

subhead.addEventListener('change', async (e) => {
    e.preventDefault;

    if(subhead.value.length < 1 ) {
        subhead_error.style.display = "block"; 
    } else {
        subhead_error.style.display = "none";
    }

    isBlockFormArticle();
});

content.addEventListener('change', async (e) => {
    e.preventDefault;

    if(content.value.length < 1 ) {
        content_error.style.display = "block"; 
    } else {
        content_error.style.display = "none";
    }

    isBlockFormArticle();
});

file.addEventListener('change', async (e) => {
    e.preventDefault;

    if(file.value.length < 1 ) {
        file_error.style.display = "block"; 
    } else {
        file_error.style.display = "none";
    }

    isBlockFormArticle();
});


function isBlockFormArticle() {
    if (title_error.style.display == "none" && subhead_error.style.display == "none" && content_error.style.display == "none" && file_error.style.display == "none") {
        article.disabled = false;
    } else {
        article.disabled = true;
    }
}
