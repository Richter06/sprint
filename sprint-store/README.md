# SPRINT Storefront
Loja demonstrativa de tênis criada com React + Vite para o portfólio Rouxinol.

## Executar
```bash
npm install
npm run dev
npm run build
npm run lint
```

## Organização
- `src/App.jsx`: composição da aplicação e estado compartilhado.
- `src/components/`: componentes independentes; cada componente possui um CSS próprio.
- `src/data/products.js`: catálogo e formatação monetária.
- `src/App.css` e `src/index.css`: estilos globais.

## Incluído
Página inicial editorial responsiva, catálogo filtrável, busca, favoritos de sessão, visualização rápida, seleção de numeração/cor, sacola persistida em localStorage, newsletter demonstrativa e estados vazios. Checkout não processa pagamentos. Fotografias e cores são provisórias; o viewer 3D GLB com materiais recoloríveis continua como etapa posterior. Antes de publicar comercialmente, substituir imagens por assets com licença verificada.
