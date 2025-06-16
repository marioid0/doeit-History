/**
 * @jest-environment jsdom
 */
require('@testing-library/jest-dom');

let currentPage;
let fetchCommits;

beforeEach(() => {
  document.body.innerHTML = `
    <div id="commits-container"></div>
    <button id="prev-button">Prev</button>
    <button id="next-button">Next</button>
    <button id="theme-toggle" aria-label="Alternar tema">
      <i id="theme-icon" data-lucide="moon" class="text-orange"></i>
    </button>
  `;

  currentPage = 1;
  fetchCommits = jest.fn();

  document.getElementById('prev-button').addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      fetchCommits();
    }
  });

  document.getElementById('next-button').addEventListener('click', () => {
    currentPage++;
    fetchCommits();
  });

  global.lucide = { createIcons: jest.fn() };
});

// 👇 Mock da função de tema
function setTheme(mode) {
  const htmlElement = document.documentElement;
  const themeIcon = document.getElementById('theme-icon');

  if (mode === 'dark') {
    htmlElement.classList.add('dark');
    themeIcon.setAttribute('data-lucide', 'sun');
    themeIcon.classList.remove('text-orange');
    themeIcon.classList.add('text-green');
  } else {
    htmlElement.classList.remove('dark');
    themeIcon.setAttribute('data-lucide', 'moon');
    themeIcon.classList.remove('text-green');
    themeIcon.classList.add('text-orange');
  }
}

// ✅ Teste do botão de tema
test('botão "theme-toggle" alterna a classe "dark" no html e altera ícone e cores', () => {
  const html = document.documentElement;
  const toggleButton = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');

  toggleButton.addEventListener('click', () => {
    const isDark = html.classList.contains('dark');
    setTheme(isDark ? 'light' : 'dark');
  });

  // Estado inicial
  expect(html.classList.contains('dark')).toBe(false);
  expect(themeIcon).toHaveAttribute('data-lucide', 'moon');
  expect(themeIcon).toHaveClass('text-orange');
  expect(themeIcon).not.toHaveClass('text-green');

  // Primeiro clique
  toggleButton.click();
  expect(html.classList.contains('dark')).toBe(true);
  expect(themeIcon).toHaveAttribute('data-lucide', 'sun');
  expect(themeIcon).toHaveClass('text-green');
  expect(themeIcon).not.toHaveClass('text-orange');

  // Segundo clique
  toggleButton.click();
  expect(html.classList.contains('dark')).toBe(false);
  expect(themeIcon).toHaveAttribute('data-lucide', 'moon');
  expect(themeIcon).toHaveClass('text-orange');
  expect(themeIcon).not.toHaveClass('text-green');
});

// ✅ Testes de paginação mantidos
test('botão "prev-button" não chama fetchCommits se currentPage é 1', () => {
  const prevButton = document.getElementById('prev-button');
  prevButton.click();
  expect(fetchCommits).not.toHaveBeenCalled();
});

test('botão "prev-button" decrementa currentPage e chama fetchCommits se currentPage > 1', () => {
  currentPage = 2;
  const prevButton = document.getElementById('prev-button');
  prevButton.click();
  expect(currentPage).toBe(1);
  expect(fetchCommits).toHaveBeenCalledTimes(1);
});

test('botão "next-button" incrementa currentPage e chama fetchCommits', () => {
  const nextButton = document.getElementById('next-button');
  nextButton.click();
  expect(currentPage).toBe(2);
  expect(fetchCommits).toHaveBeenCalledTimes(1);
});
