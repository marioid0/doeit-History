lucide.createIcons();

// Typing effect
const text = "Doações com QR Code";
const target = document.getElementById("typing-text");
let i = 0;
function type() {
  if (i < text.length) {
    target.textContent += text.charAt(i);
    i++;
    setTimeout(type, 100);
  }
}

let currentPage = 1;
const commitsPerPage = 10;

async function fetchCommits() {
  const res = await fetch(
    `https://api.github.com/repos/GuilhermmeDev/doe.it/commits?per_page=${commitsPerPage}&page=${currentPage}`
  );
  const data = await res.json();
  const container = document.getElementById("commits-container");
  container.innerHTML = "";

  data.forEach((commit) => {
    const date = new Date(commit.commit.author.date).toLocaleString("pt-BR");
    const avatar = commit.author?.avatar_url;
    const authorName = commit.author?.login || commit.commit.author.name;
    const message = commit.commit.message;
    const sha = commit.sha.substring(0, 7);

    const div = document.createElement("div");
    div.className =
      "p-4 bg-gray-100 rounded-lg border-l-4 border-orange-500 flex space-x-4 items-start dark:bg-gray-800";

    div.innerHTML = `
      <img src="${
        avatar || "https://via.placeholder.com/40"
      }" alt="avatar" class="w-10 h-10 rounded-full object-cover mt-1" />
      <div>
        <p class="font-medium mb-1">${message}</p>
        <p class="text-gray-500">Autor: ${authorName}</p>
        <p class="text-gray-500">Data: ${date}</p>
        <p class="text-gray-400 font-mono">SHA: ${sha}</p>
      </div>
    `;

    container.appendChild(div);
  });

  updatePagination(data.length);
}

function updatePagination(dataLength) {
  document.getElementById("prev-button").disabled = currentPage === 1;
  // Desabilita o botão "Próximo" se vier menos commits que o limite por página
  document.getElementById("next-button").disabled = dataLength < commitsPerPage;
}

document.getElementById("prev-button").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    fetchCommits();
  }
});

document.getElementById("next-button").addEventListener("click", () => {
  currentPage++;
  fetchCommits();
});

// Alternância de tema claro/escuro
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const html = document.documentElement;

function setTheme(mode) {
  if (mode === "dark") {
    html.classList.add("dark");
    themeIcon.setAttribute("data-lucide", "sun");
    themeIcon.classList.remove("text-[#FF5800]");
    themeIcon.classList.add("text-[#2AB036]");
  } else {
    html.classList.remove("dark");
    themeIcon.setAttribute("data-lucide", "moon");
    themeIcon.classList.remove("text-[#2AB036]");
    themeIcon.classList.add("text-[#FF5800]");
  }
  lucide.createIcons();
  localStorage.setItem("theme", mode);
}

themeToggle?.addEventListener("click", () => {
  const isDark = html.classList.contains("dark");
  setTheme(isDark ? "light" : "dark");
});

// Inicialização do tema ao carregar
window.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("theme");
  setTheme(saved === "dark" ? "dark" : "light");
});

window.onload = () => {
  type();
  fetchCommits();
};
