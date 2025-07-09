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
async function loadBlogPostFromURL() {
    // get slug
    const slug = new URLSearchParams(location.search).get('slug');

    if (!slug) {
        document.getElementById("post-content").textContent = "No post selected.";
        return;
    }

    try {
        // pull metadata JSON written by the uploader
        const metaUrl = `/pages/blog/posts/${slug}.json`;
        const meta = await (await fetch(metaUrl, {cache:'no-cache'})).json();
        
        // pull markdown body
        const mdUrl = `/pages/blog/posts/${slug}.md`;
        let mdText = await (await fetch(mdUrl, {cache:'no-cache'})).text();

        mdText = mdText.replace(/^#.*(\r?\n)+/, '');

        if (meta.description) {
            const lines = mdText.trimStart().split('\n');
            if (lines.length && lines[0].trim() === meta.description.trim()) {
                lines.shift();
                mdText = lines.join('\n');
            }
        }

        // render markdown   (marked.js is already loaded in view.html)
        const html = marked.parse(mdText);

        // fill DOM
        document.getElementById('post-title').textContent = meta.title;        
        document.getElementById('post-desc' ).textContent = meta.description || '';
        document.getElementById('post-meta').textContent = timeAgo(meta.date) + ' by ' + meta.author;

        // cover image if present
        if (meta.cover) {
            const img = document.getElementById('cover-image');
            img.src          = `/images/blog_images/${meta.cover}`;
            img.style.display = 'block';
        }

        // tags
        // document.getElementById('post-tags').innerHTML =
        //     (meta.tags || []).map(t => `<span>#${t}</span>`).join(' ');

        // body
        document.getElementById('post-content').innerHTML = html;

    }
    catch (err){
        console.error(err);
        document.getElementById('post-content').textContent = 'Failed to load the post.';
    }

    /* pretty “time‑ago” helper (same as on index) */
    function timeAgo (iso){
        const d   = new Date(iso);
        const diff= Date.now() - d.getTime();
        const day = 864e5, month = day*30, year = day*365;
        if (diff <  day)         return 'today';
        if (diff < day*2) return 'A day ago'
        if (diff <  day*7)       return Math.floor(diff/day)+' days ago';
        if (diff <  month*2)     return Math.floor(diff/day/7)+' wks ago';
        if (diff <  year)        return Math.floor(diff/month)+' mo ago';
        return Math.floor(diff/year)+' yr ago';
    }

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
