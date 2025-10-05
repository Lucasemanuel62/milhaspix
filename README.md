# MilhasPix — Teste técnico Front-end Júnior

Aplicação React + Vite (TypeScript e Tailwind CSS) que simula o fluxo de criação e listagem de ofertas de milhas aéreas.

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

Configuração da API (ambiente de produção):

- Em dev usamos o proxy do Vite para `/api` (ver `vite.config.ts`).
- Em produção, defina a variável `VITE_API_BASE_URL` para apontar à API real.

Exemplo `.env.production`:
```
VITE_API_BASE_URL=https://api.milhaspix.com
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

- Caso encontre problemas para rodar, verifique a versão do Node e limpe a pasta `node_modules`:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```
