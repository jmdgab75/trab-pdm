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


const noteForm = document.getElementById('note-form');
const noteList = document.getElementById('note-list');

noteForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const noteText = document.getElementById('note').value;
    if (!noteText) return;

    const noteDate = new Date().toLocaleString();
    const noteElement = document.createElement('li');
    noteElement.classList.add('note');
    noteElement.innerHTML = `
        <span>${noteText}</span>
        <span>${noteDate}</span>
        <div class="note-actions">
            <button class="delete-button">Excluir</button>
        </div>
    `;

    noteList.appendChild(noteElement);

    // Limpa o campo de entrada
    document.getElementById('note').value = '';

    // Adiciona um evento de clique ao botão de exclusão
    const deleteButton = noteElement.querySelector('.delete-button');
    deleteButton.addEventListener('click', function () {
        noteList.removeChild(noteElement);
    });
});