# DoeIT Project

## Descrição

O DoeIT é um sistema inovador de doações que utiliza validação por QR Code para garantir transparência e segurança no processo de doação. Este projeto foi desenvolvido pelos alunos da EEEP Maria Célia Pinheiro Falcão utilizando a tecnologia Laravel.

## Estrutura do Projeto

- `index.html`: Contém a estrutura HTML principal da aplicação, incluindo seções para exibir informações sobre o projeto, equipe, FAQ e commits. Também inclui scripts para manipulação de conteúdo dinâmico e interações do usuário.
- `src/scripts/main.js`: Contém o código JavaScript que interage com a API do GitHub para buscar os últimos commits de um repositório. Inclui funcionalidade para exibir os commits e implementar paginação caso haja mais de 10 commits.

## Instalação

1. Clone o repositório:
   ```
   git clone https://github.com/GuilhermmeDev/doe.it.git
   ```
2. Navegue até o diretório do projeto:
   ```
   cd doe.it
   ```
3. Abra o arquivo `index.html` em um navegador para visualizar a aplicação.

## Testes com Jest

Este projeto utiliza o [Jest](https://jestjs.io/) para testes automatizados.

### Instalação das dependências de teste

Se ainda não instalou as dependências, execute:

```
npm install
```

### Como rodar os testes

Para executar todos os testes, utilize o comando:

```
npm run test
```

Os arquivos de teste devem ser criados com o sufixo `.test.js` ou `.spec.js` dentro da pasta do projeto.

## Uso

- A página inicial apresenta informações sobre o projeto e permite que os usuários visualizem os últimos commits.
- A seção de FAQ responde a perguntas comuns sobre o sistema DoeIT.
- A funcionalidade de commits exibe os últimos 10 commits do repositório, com a opção de navegar por mais commits se disponíveis.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests no repositório do GitHub.
