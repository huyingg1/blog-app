document
  .querySelector("#new-article-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = document.querySelector("#title").value.trim();
    const content = document.querySelector("#content").value.trim();

    if (title && content) {
      const response = await fetch("/new-article", {
        method: "POST",
        body: JSON.stringify({ title, content }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        document.location.replace("/");
      } else {
        alert("Failed to create a new article");
      }
    }
  });
