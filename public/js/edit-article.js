document
  .querySelector("#edit-article-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = document.querySelector("#title").value.trim();
    const content = document.querySelector("#content").value.trim();
    const id = window.location.pathname.split("/")[2];

    if (title && content) {
      const response = await fetch(`/edit-article/${id}`, {
        method: "PUT",
        body: JSON.stringify({ title, content }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        document.location.replace(`/article/${id}`);
      } else {
        alert("Failed to update the article");
      }
    }
  });
