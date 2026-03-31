# Como Substituir os Assets — Barbeza Barbearia

## Estrutura de Pastas

```
public/assets/
├── images/       ← Fotos (JPG ou PNG, max 2MB por foto)
├── videos/       ← Vídeo do ambiente
├── logo/         ← Logo em variações
└── renders/      ← Renders do anteprojeto arquitetônico
```

---

## Fotos da Galeria

Coloque suas fotos na pasta `public/assets/images/` com estes nomes:

| Arquivo              | Uso                          |
|----------------------|------------------------------|
| `hero-bg.jpg`        | Foto de fundo do Hero (home) |
| `video-thumb.jpg`    | Miniatura do vídeo           |
| `gallery-01.jpg`     | Galeria — foto 1             |
| `gallery-02.jpg`     | Galeria — foto 2             |
| `gallery-03.jpg`     | Galeria — foto 3             |
| `gallery-04.jpg`     | Galeria — foto 4             |
| `gallery-05.jpg`     | Galeria — foto 5             |
| `gallery-06.jpg`     | Galeria — foto 6             |
| `team-01.jpg`        | Foto do barbeiro/equipe      |

**Dica:** Fotos no formato quadrado (1:1) ficam melhores na galeria.

---

## Vídeo do Ambiente

Coloque o vídeo em `public/assets/videos/ambiente.mp4`

**Especificações recomendadas:**
- Formato: MP4 (H.264)
- Resolução: 1280x720 ou 1920x1080
- Tamanho máximo: 15MB
- Duração: 30s a 2min

---

## Renders do Anteprojeto

Coloque as imagens dos renders em `public/assets/renders/` com estes nomes:

| Arquivo        | Local no site       |
|----------------|---------------------|
| `render-01.jpg`| Área de Corte       |
| `render-02.jpg`| Recepção            |
| `render-03.jpg`| Sala VIP            |

---

## Logo

Coloque em `public/assets/logo/`:
- `logo.png` — Logo principal (fundo transparente)
- `logo-white.png` — Variação branca

---

## Telefone / WhatsApp

Abra o arquivo `src/data/content.ts` e atualize:

```ts
phone: '(31) 9 XXXX-XXXX',
whatsapp: '5531900000000',  // sem espaços ou caracteres especiais
```

---

## Após Subir os Arquivos

1. Marque os itens no **Painel Admin** → Dashboard → Checklist de Setup
2. Faça commit no GitHub
3. O Vercel fará o deploy automático em ~30 segundos

---

## Painel Admin

Acesse: `https://seusite.vercel.app/admin`

Senha padrão: `barbeza2025`

**IMPORTANTE:** Mude a senha configurando a variável `VITE_ADMIN_PASSWORD` no Vercel Dashboard.
