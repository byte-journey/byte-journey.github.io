const searchInput = document.getElementById('searchInput');
const postsContainer = document.getElementById('postsContainer');
const tagContainer = document.getElementById('tagContainer');

let posts = [];
let activeTag = null;

fetch('./posts.json')
    .then(res => res.json())
    .then(data => {
        posts = data;
        renderTags();
        renderPosts(posts);
    });

function renderPosts(filteredPosts) {
    postsContainer.innerHTML = '';
    filteredPosts.forEach(post => {
        const postCard = document.createElement('div');
        postCard.className = 'post-card';

        postCard.innerHTML = `
            <div class="post-info">
            <h2><a href="./posts/${post.filename}" target="_blank">${post.title}</a></h2>
            <div class="meta">by ${post.author} | ${post.date}</div>
            <p>${post.description}</p>
            <div class="tags">
              ${post.tags.map(tag => `<span>${tag}</span>`).join('')}
            </div>
            </div>
            <img class="cover-image" src="../../images/blog_images/${post.cover}" alt="Cover image">
        `;

        postsContainer.appendChild(postCard);
    });
}

function renderTags() {
    const tagSet = new Set();
    posts.forEach(p => p.tags.forEach(t => tagSet.add(t)));

    tagContainer.innerHTML = '';
    tagSet.forEach(tag => {
        const btn = document.createElement('button');
        btn.textContent = tag;
        btn.onclick = () => {
           activeTag = tag === activeTag ? null : tag;
           document.querySelectorAll('.tags button').forEach(b => b.classList.remove('active'));
           if (activeTag) btn.classList.add('active');
           filterPosts();
        };
        tagContainer.appendChild(btn);
    });
}

function filterPosts() {
    const keyword = searchInput.value.toLowerCase();
    let filtered = posts.filter(p =>
        p.title.toLowerCase().includes(keyword) ||
        p.description.toLowerCase().includes(keyword) ||
        p.tags.some(tag => tag.toLowerCase().includes(keyword))
    );
    if (activeTag) {
        filtered = filtered.filter(p => p.tags.includes(activeTag));
    }
    renderPosts(filtered);
}

searchInput.addEventListener('input', filterPosts);

// =======  VIEW POST PAGE SCRIPT =======
// js/blog.js
function loadBlogPostFromURL() {const urlParams = new URLSearchParams(window.location.search);
    const postFile = urlParams.get("post");

    if (!postFile) {
        document.getElementById("post-content").innerHTML = "<p>No post selected.</p>";
        return;
    }

    fetch(`posts/${postFile}`)
        .then((res) => {
        if (!res.ok) throw new Error("Post not found");
        return res.text();
        })
        .then((markdown) => {
        renderPost(markdown);
        })
        .catch((err) => {
        document.getElementById("post-content").innerHTML = `<p>Error: ${err.message}</p>`;
        });
}

function renderPost(markdown) {
    const lines = markdown.split("\n");

    // Extract metadata
    const title = lines.find(line => line.startsWith("## Title:"))?.replace("## Title:", "").trim();
    const author = lines.find(line => line.startsWith("## Author:"))?.replace("## Author:", "").trim();
    const date = lines.find(line => line.startsWith("## Date:"))?.replace("## Date:", "").trim();
    const tagsLine = lines.find(line => line.startsWith("## Tags:"))?.replace("## Tags:", "").trim();
    const coverImage = lines.find(line => line.startsWith("## Cover:"))?.replace("## Cover:", "").trim();

    const contentStart = lines.findIndex(line => line.trim() === "---");
    const content = lines.slice(contentStart + 1).join("\n");

    document.getElementById("post-title").textContent = title || "Untitled";
    document.getElementById("post-meta").textContent = `By ${author || "Unknown"} • ${date || "Unknown date"}`;

    if (coverImage) {
        const cover = document.getElementById("cover-image");
        cover.src = `../../images/blog_images/${coverImage}`;
        cover.style.display = "block";
    }

    // Render tags
    const tagContainer = document.getElementById("post-tags");
    if (tagsLine) {
        tagsLine.split(",").forEach(tag => {
        const span = document.createElement("span");
        span.className = "tag";
        span.textContent = tag.trim();
        tagContainer.appendChild(span);
        });
    }

    // Markdown rendering (simple)
    document.getElementById("post-content").innerHTML = marked.parse(content);
}
