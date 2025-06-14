/**
 * @jest-environment jsdom
 */
require('@testing-library/jest-dom');

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve(
        Array(10).fill({
          sha: '1234567890abcdef',
          commit: { author: { date: new Date().toISOString(), name: 'Author' }, message: 'commit message' },
          author: { login: 'authorlogin', avatar_url: 'avatarurl' },
        }),
      ),
  }),
);

let currentPage;
let fetchCommits;

beforeEach(() => {
  document.body.innerHTML = `
    <div id="commits-container"></div>
    <button id="prev-button">Prev</button>
    <button id="next-button">Next</button>
  `;

  // Reseta página e implementa fetchCommits mock para teste
  currentPage = 1;
  fetchCommits = jest.fn();

  // Mocka os event listeners iguais ao seu script
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
});

test('botão "prev-button" não chama fetchCommits se currentPage é 1', () => {
  currentPage = 1;
  const prevButton = document.getElementById('prev-button');
  prevButton.click();
  expect(currentPage).toBe(1);
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
  currentPage = 1;
  const nextButton = document.getElementById('next-button');
  nextButton.click();
  expect(currentPage).toBe(2);
  expect(fetchCommits).toHaveBeenCalledTimes(1);
});
