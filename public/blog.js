const postId = document.getElementById('post-id').textContent;
const blog_delete = document.getElementById('blog-delete-btn');

blog_delete.addEventListener('click', async (e) => {
    e.preventDefault;

    try {
        const res = fetch(`/posts/${postId}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
            .then(data => window.location.href = data.redirect)
    }
    catch (error) {
        console.log(error)
    }

});






