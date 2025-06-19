const fetch = require('node-fetch');

exports.handler = async (event) => {
    const { path, content, message, isBinary } = JSON.parse(event.body);
    const token = process.env.GITHUB_PAT;
    const [owner, repo] = process.env.REPO.split('/');
    const branch = process.env.BRANCH || 'main';
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

    const getRes = await fetch(`${apiUrl}?ref=${branch}`, {
        headers: { Authorization: `token ${token}`, Accept: 'application/vnd.github.v3+json' },
    });
    const existing = getRes.ok ? await getRes.json() : null;
    const sha = existing ? existing.sha : undefined;

    const body = {
        message,
        content,
        branch,
        ...(sha && { sha }),
    };

    const res = await fetch(apiUrl, {
        method: 'PUT',
        headers: { Authorization: `token ${token}`, Accept: 'application/vnd.github.v3+json' },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        const err = await res.json();
        return { statusCode: res.status, body: JSON.stringify({ error: err }) };
    }
    return { statusCode: 200, body: JSON.stringify({ success: true }) };
};