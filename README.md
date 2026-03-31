# Barbeza Barbearia — Landing Page

Landing page premium + painel organizacional para a **Barbeza Barbearia** em Ipatinga-MG.

## Stack

- React 18 + TypeScript
- Vite 5
- Tailwind CSS 3
- Framer Motion 11

## Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Criar arquivo de ambiente
# Copie env.example para .env e defina a senha do admin

# Rodar em dev
npm run dev

# Build de produção
npm run build
```

## Deploy no Vercel

1. Faça push para `github.com/performancedigital/Barbeza-Barbearia`
2. Conecte o repo no Vercel
3. Configure a variável de ambiente `VITE_ADMIN_PASSWORD`
4. Deploy automático a cada push

## Painel Admin

Acesse `/admin` com a senha configurada em `VITE_ADMIN_PASSWORD`.

## Assets

Veja `public/assets/COMO_SUBSTITUIR.md` para instruções de upload de fotos e vídeos.
