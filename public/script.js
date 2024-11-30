const apiUrl = "http://localhost:3000"; // URL do seu backend

const form = document.getElementById("eventForm");
const eventsTable = document.getElementById("eventsTable").querySelector("tbody");
const toggleThemeButton = document.getElementById("toggleTheme");

// Configurar data mínima no campo de data
document.addEventListener("DOMContentLoaded", () => {
  const dataInput = document.getElementById("data");
  const now = new Date();
  const localDatetime = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16);
  dataInput.setAttribute("min", localDatetime); // Define a data mínima
});

// Alternar tema com ícones de sol e lua
toggleThemeButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const isDarkMode = document.body.classList.contains("dark-mode");
  toggleThemeButton.textContent = isDarkMode ? "Modo escuro 🌙" : "Modo Claro 🌞";
  localStorage.setItem("darkMode", isDarkMode ? "enabled" : "disabled");
});

// Carregar tema do localStorage
document.addEventListener("DOMContentLoaded", () => {
  const darkMode = localStorage.getItem("darkMode");
  if (darkMode === "enabled") {
    document.body.classList.add("dark-mode");
    toggleThemeButton.textContent = "Modo Claro 🌞";
  }
  loadEvents();
});

// Adicionar ou atualizar evento
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const dataInput = document.getElementById("data");
  const selectedDate = new Date(dataInput.value);
  const now = new Date();

  // Validação de data
  if (selectedDate < now) {
    alert("A data do evento deve ser hoje ou no futuro!");
    return;
  }

  const valorInput = document.getElementById("valor");
  const valor = parseFloat(valorInput.value);

  // Validação de valor
  if (valor < 0) {
    alert("O valor do evento não pode ser negativo!");
    return;
  }

  const id = document.getElementById("eventId").value;
  const titulo = document.getElementById("titulo").value;
  const descricao = document.getElementById("descricao").value;
  const data = dataInput.value;
  const local = document.getElementById("local").value;

  const payload = { titulo, descricao, data, local, valor };

  try {
    if (id) {
      await fetch(`${apiUrl}/eventos`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...payload }),
      });
    } else {
      await fetch(`${apiUrl}/eventos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }
    form.reset();
    loadEvents();
  } catch (error) {
    console.error("Erro ao salvar evento:", error);
  }
});

// Carregar eventos
async function loadEvents() {
  eventsTable.innerHTML = "";
  try {
    const response = await fetch(`${apiUrl}/eventos`);
    const events = await response.json();

    events.forEach((event) => {
      const row = eventsTable.insertRow();
      row.innerHTML = `
        <td>${event.titulo}</td>
        <td>${event.descricao || "N/A"}</td>
        <td>${new Date(event.data).toLocaleString()}</td>
        <td>${event.local}</td>
        <td>R$ ${event.valor.toFixed(2)}</td>
        <td>
          <button onclick="editEvent('${event._id}')">Editar</button>
          <button onclick="deleteEvent('${event._id}')">Excluir</button>
        </td>
      `;
    });
  } catch (error) {
    console.error("Erro ao carregar eventos:", error);
  }
}

// Editar evento
function editEvent(id) {
  fetch(`${apiUrl}/eventos`)
    .then((res) => res.json())
    .then((events) => {
      const event = events.find((e) => e._id === id);
      if (event) {
        document.getElementById("eventId").value = event._id;
        document.getElementById("titulo").value = event.titulo;
        document.getElementById("descricao").value = event.descricao;
        document.getElementById("data").value = new Date(event.data).toISOString().slice(0, 16);
        document.getElementById("local").value = event.local;
        document.getElementById("valor").value = event.valor;
      }
    });
}

// Excluir evento
async function deleteEvent(id) {
  try {
    await fetch(`${apiUrl}/eventos`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    loadEvents();
  } catch (error) {
    console.error("Erro ao excluir evento:", error);
  }
}
