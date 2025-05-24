const fs = require("fs");
const path = require("path");

// Função para criar pasta se não existir
function createDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`📁 Pasta criada: ${dirPath}`);
  }
}

// Função para criar arquivo com conteúdo
function createFile(filePath, content) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
    console.log(`📄 Arquivo criado: ${filePath}`);
  }
}

createDir("public/assets/images");
createDir("public/assets/fonts");
createDir("public/assets/js");
createDir("src/styles");
createDir("src/components");
createDir("src/js");

// Arquivo index.html
createFile("public/index.html", `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Meu Site com Tailwind</title>
  <link href="./assets/styles.css" rel="stylesheet" />
</head>
<body class="bg-gray-100 text-gray-800">
  <h1 class="text-3xl font-bold text-center mt-10">Olá, Tailwind!</h1>
</body>
</html>
`);

// tailwind.config.js
createFile("tailwind.config.js", `module.exports = {
  content: ["./public/**/*.html"],
  theme: {
    extend: {},
  },
  plugins: [],
}
`);

// postcss.config.js
createFile("postcss.config.js", `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
`);

// package.json básico
createFile("package.json", `{
  "name": "meu-projeto-tailwind",
  "version": "1.0.0",
  "scripts": {
    "dev": "tailwindcss -i ./src/styles/tailwind.css -o ./public/assets/styles.css --watch",
    "build": "tailwindcss -i ./src/styles/tailwind.css -o ./public/assets/styles.css --minify"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0"
  }
}
`);

// src/styles/tailwind.css
createFile("src/styles/tailwind.css", `@tailwind base;
@tailwind components;
@tailwind utilities;

/* Adicione aqui seus estilos personalizados */
`);

// Script finalizado
console.log("✅ Estrutura criada com sucesso!");
