import { Octokit } from "@octokit/core";

// netlify/functions/github-upload.mjs
export async function handler(event, context) {
  try {
    const { path, content, message, isBinary } = JSON.parse(event.body);

    if (!path || !content || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing required fields." }),
      };
    }

    const GITHUB_PAT = process.env.GITHUB_PAT;
    const REPO_OWNER = "byte-journey";
    const REPO_NAME = "byte-journey.github.io";

    const octokit = new Octokit({ auth: GITHUB_PAT });

    const encodedContent = isBinary ? content : Buffer.from(content).toString("base64");

    // ✅ Properly encode the path for GitHub API
    const encodedPath = encodeURIComponent(path).replace(/%2F/g, "/");

    // Check if file already exists to get its `sha`
    let sha = null;
    try {
      const { data } = await octokit.request(
        "GET /repos/{owner}/{repo}/contents/{path}",
        {
          owner: REPO_OWNER,
          repo: REPO_NAME,
          path: encodedPath,
        }
      );
      sha = data.sha;
    } catch (e) {
      // File doesn't exist – that's okay
    }

    // Upload or update file
    const res = await octokit.request(
      "PUT /repos/{owner}/{repo}/contents/{path}",
      {
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path: encodedPath,
        message,
        content: encodedContent,
        encoding: "base64",
        ...(sha ? { sha } : {}),
      }
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };

  } catch (err) {
    console.error("Upload error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Upload failed", details: err.message }),
    };
  }
}

