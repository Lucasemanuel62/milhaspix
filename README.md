# MilhasPix — Teste técnico Front-end Júnior

Aplicação React + Vite (TypeScript e Tailwind CSS) que simula o fluxo de criação e listagem de ofertas de milhas aéreas.

## Código no GitHub

O código fonte completo deve ser publicado em um repositório público no GitHub. Inclua este README na raiz do projeto.

### Como rodar o projeto localmente

Pré‑requisitos:

- Node.js 18+ (recomendado LTS)
- npm 9+ (ou pnpm/yarn, se preferir)

Passos:

1. Instale as dependências
   ```bash
   npm install
   ```
2. Rode o servidor de desenvolvimento
   ```bash
   npm run dev
   ```
3. Abra no navegador a URL exibida no terminal (geralmente `http://localhost:5173`).

Build de produção:
```bash
npm run build
npm run preview
```

### Como criar e publicar o repositório no GitHub

1. Inicialize o repositório local (caso ainda não exista)
   ```bash
   git init
   git add .
   git commit -m "chore: inicializa projeto MilhasPix"
   ```
2. Crie um repositório no GitHub (via interface) com o nome `milhaspix` (ou outro de sua preferência).
3. Conecte o repositório remoto e envie o código
   ```bash
   git branch -M main
   git remote add origin https://github.com/<seu-usuario>/<seu-repo>.git
   git push -u origin main
   ```

### Stack

- React 18 + Vite
- TypeScript
- Tailwind CSS
- React Router

### Scripts úteis

- `npm run dev` — ambiente de desenvolvimento com HMR
- `npm run build` — build de produção
- `npm run preview` — serve o build localmente

### Observações

- Este projeto foi desenvolvido como teste técnico para a vaga de Front‑end Júnior.
- Caso encontre problemas para rodar, verifique a versão do Node e limpe a pasta `node_modules`:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```
