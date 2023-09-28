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
  const noteList = document.getElementById("note-list");

  noteForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const title = document.getElementById("title").value;
      const categoria = document.getElementById("categoria").value;
      const description = document.getElementById("note").value;
      const date = document.getElementById("date").value;

      // Crie um novo elemento de lista
      const listItem = document.createElement("li");
      listItem.innerHTML = `
          <strong>${title}</strong> (${categoria}) - ${description} (${date})
          <button class="delete-button">Excluir</button>
      `;

      // Adicione um ouvinte de evento de clique ao botão Excluir
      const deleteButton = listItem.querySelector(".delete-button");
      deleteButton.addEventListener("click", () => {
          listItem.remove();
      });

      // Adicione o novo item à lista
      noteList.appendChild(listItem);

      // Limpe o formulário
      noteForm.reset();
  });
});


































  
 
