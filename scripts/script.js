// Este código estaria em seu arquivo JS principal, por exemplo, main.js
document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('theme-toggle');
    const html = document.documentElement;
    const themeIcon = document.getElementById("theme-icon");

    // Função para definir o tema (você já tem essa)
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
        if (typeof lucide !== 'undefined' && lucide.createIcons) {
            lucide.createIcons();
        }
    }

    // Lógica para alternar o tema ao clicar no botão
    toggleButton.addEventListener('click', () => {
        const isDark = html.classList.contains('dark');
        setTheme(isDark ? 'light' : 'dark');
    });

    // Opcional: Definir tema inicial com base na preferência do usuário ou localStorage
    // const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    // setTheme(prefersDark ? 'dark' : 'light');
});
