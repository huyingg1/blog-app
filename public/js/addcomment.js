const commentFormHandler = async (event) => {
  event.preventDefault();

  const content = document.querySelector("#comment-content").value.trim();
  const article_id = window.location.toString().split("/")[4];

  if (content) {
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ content, article_id }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert("Failed to add comment");
    }
  }
};

document
  .querySelector("#comment-form")
  .addEventListener("submit", commentFormHandler);
