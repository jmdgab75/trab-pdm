//registrando a service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      let reg;
      reg = await navigator.serviceWorker.register('/sw.js', { type: "module" });

      console.log('Service worker registrada! 😎', reg);
    } catch (err) {
      console.log('😥 Service worker registro falhou: ', err);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const noteForm = document.getElementById("note-form");
  const titleInput = document.getElementById("title");
  const descriptionInput = document.getElementById("description");
  const noteList = document.getElementById("note-list");

  noteForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const title = titleInput.value;
      const description = descriptionInput.value;

      if (title.trim() === "" || description.trim() === "") {
          alert("Por favor, preencha todos os campos.");
          return;
      }

      const li = document.createElement("li");
      li.innerHTML = `
          <strong>${title}:</strong> ${description}
          <button class="delete-btn">Excluir</button>
      `;

      noteList.appendChild(li);

      titleInput.value = "";
      descriptionInput.value = "";

      li.querySelector(".delete-btn").addEventListener("click", () => {
          noteList.removeChild(li);
      });
  });
});


