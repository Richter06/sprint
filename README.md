# SPRINT Storefront

**Ficha técnica e documentação do projeto**

A **SPRINT** é uma loja virtual demonstrativa de tênis, construída como projeto de portfólio para apresentar uma experiência de e-commerce com identidade visual editorial, catálogo interativo e uma vitrine 3D personalizável. O projeto faz parte do portfólio da **Rouxinol**.

> **Importante:** esta é uma demonstração de front-end. Não existe backend de comércio eletrônico, processamento de pagamentos, gestão real de estoque, envio de pedidos ou integração funcional de newsletter. Os produtos, preços, benefícios e textos são conteúdo ilustrativo.

---

## Índice

- [Visão geral](#visão-geral)
- [Ficha técnica](#ficha-técnica)
- [Funcionalidades](#funcionalidades)
- [Experiência visual e interface](#experiência-visual-e-interface)
- [Tecnologias e dependências](#tecnologias-e-dependências)
- [Estrutura do repositório](#estrutura-do-repositório)
- [Como executar localmente](#como-executar-localmente)
- [Catálogo e dados](#catálogo-e-dados)
- [Estado e armazenamento local](#estado-e-armazenamento-local)
- [Acessibilidade e responsividade](#acessibilidade-e-responsividade)
- [SEO e compartilhamento](#seo-e-compartilhamento)
- [Limitações conhecidas](#limitações-conhecidas)
- [Checklist antes de publicar](#checklist-antes-de-publicar)

## Visão geral

A proposta da SPRINT é simular uma marca independente de calçados com foco em **design essencial, navegação clara e interação cuidadosa**. A interface usa uma direção de arte minimalista/editorial, com tons neutros, tipografia expressiva, imagens amplas, pequenos detalhes de movimento e componentes próprios para as principais etapas de descoberta de um produto.

A página reúne apresentação da marca, destaque de lançamento, benefícios, coleção filtrável, categorias, manifesto, inscrição demonstrativa para novidades e rodapé. A experiência de compra simulada inclui visualização rápida do tênis, escolha de cor e numeração, sacola lateral e lista de favoritos.

## Ficha técnica

| Item | Descrição |
| --- | --- |
| Projeto | SPRINT Storefront |
| Tipo | E-commerce demonstrativo / projeto de portfólio |
| Marca fictícia | SPRINT |
| Portfólio relacionado | Rouxinol |
| Idioma da interface | Português do Brasil (`pt-BR`) |
| Framework de interface | React |
| Linguagem | JavaScript com JSX e módulos ES |
| Ferramenta de desenvolvimento e build | Vite |
| Gráficos 3D | Three.js, React Three Fiber e Drei |
| Estilização | CSS próprio por componente e estilos globais |
| Persistência no navegador | `localStorage` |
| Catálogo atual | 6 produtos fictícios |
| Backend / banco de dados | Não implementados |
| Pagamentos / checkout | Não implementados |
| Testes automatizados | Não há suíte de testes configurada no projeto |

## Funcionalidades

### 1. Vitrine e navegação

- Cabeçalho com navegação por âncoras para coleção, categorias e manifesto.
- Faixa superior com mensagem promocional ilustrativa.
- Hero com apresentação da coleção e destaque do produto Velocity 001.
- Seções de benefícios, catálogo, categorias, história da marca e newsletter demonstrativa.
- Rodapé com links internos e atalhos de navegação.
- Ações para voltar ao topo e navegar até a coleção.

### 2. Vitrine 3D interativa

O hero carrega um modelo de tênis em formato GLB usando **React Three Fiber**, **Three.js** e componentes do **Drei**.

- Cena renderizada em um elemento `Canvas`, com câmera, iluminação, ambiente de estúdio e sombras de contato.
- Controles de órbita permitem girar o modelo; zoom e deslocamento estão desativados.
- Seletor de quatro cores: Stone, Graphite, Sage e Terra.
- Recolorização por shader das regiões amarelas do modelo, preservando variações de luminosidade para manter a percepção de volume.
- Pré-carregamento do arquivo 3D e estado de carregamento enquanto a cena é preparada.

O modelo está em `sprint-store/src/assets/glb/sneakers_adidas_yellow__black.glb`. Antes de distribuir ou publicar comercialmente o projeto, confirme a licença e as permissões de uso desse arquivo e de todos os demais recursos visuais.

### 3. Catálogo, busca e filtros

- Grade de cards de produto com imagem, nome, categoria, preço, cor e etiquetas promocionais.
- Filtros por categoria: Todos, Lifestyle, Casual e Clássicos.
- Campo de busca que considera nome, categoria, cor e descrição.
- Contador de modelos que acompanha os resultados filtrados.
- Mensagem de estado vazio quando nenhum item corresponde à busca.
- Botão de coração para adicionar ou remover um produto dos favoritos.
- Acesso à visualização rápida a partir da imagem, nome ou ação de escolha de tamanho.

### 4. Visualização rápida do produto

A janela de visualização rápida permite:

- Conferir imagem, categoria, nome, descrição e preço.
- Selecionar uma das cores disponíveis no produto.
- Escolher uma numeração brasileira entre 35 e 44.
- Adicionar o produto selecionado à sacola.
- Fechar a janela pelo botão de fechar ou clicando fora do conteúdo.

As cores disponíveis no seletor do produto são opções visuais do protótipo. Não representam variações ligadas a estoque real.

### 5. Sacola de compras

A sacola abre em um painel lateral e oferece:

- Lista dos itens adicionados, com imagem, nome, tamanho, quantidade e preço.
- Ações para aumentar ou diminuir a quantidade.
- Remoção de um item.
- Cálculo do subtotal e da quantidade total de unidades.
- Estado vazio com atalho para voltar à coleção.
- Persistência local da sacola entre visitas no mesmo navegador, via `localStorage`.

Produtos iguais em **modelo, numeração e cor selecionada** são agrupados na mesma linha, com a quantidade incrementada.

O botão de continuar é apenas demonstrativo: informa que o checkout não está ativo. Nenhuma cobrança ou pedido real é realizado.

### 6. Favoritos

- Acesso por ícone de coração no cabeçalho, com contador.
- Painel lateral próprio, com imagem, categoria, nome, cor e preço dos modelos salvos.
- Remoção de produtos da lista.
- Atalho para abrir a visualização rápida e escolher uma variação antes de adicionar à sacola.
- Estado vazio com convite para explorar a coleção.
- Persistência dos IDs válidos dos produtos em `localStorage`.

A lista de favoritos é armazenada por navegador, não em uma conta de usuário. Ela não é sincronizada entre dispositivos.

### 7. Newsletter demonstrativa

O formulário valida o formato do e-mail no navegador e exibe uma confirmação visual após o envio. **Não envia o endereço a um servidor, não cadastra contatos e não dispara mensagens.**

### 8. Feedback e movimento

- Notificações temporárias para ações como adicionar à sacola e alterar favoritos.
- Animações de entrada acionadas conforme as seções entram na área visível.
- Transições sutis em botões, links e elementos da interface.
- Respeito à preferência do sistema por movimento reduzido em partes relevantes da experiência.

## Experiência visual e interface

A direção visual busca um aspecto de catálogo editorial contemporâneo:

- **Paleta:** fundo claro e quente, texto escuro, cinzas suaves e terracota como cor de destaque.
- **Tipografia:** combinação de fontes sem serifa para interface e uma serifada nos títulos de seção.
- **Composição:** espaçamento generoso, títulos expressivos, imagens de produto em destaque e hierarquia visual clara.
- **Interação:** estados de hover e foco, botões com respostas visuais e painéis dedicados para sacola e favoritos.
- **Layout:** adaptação para telas menores, com ajustes de espaçamento e organização dos elementos.

As imagens dos produtos e de algumas seções são carregadas de URLs do Unsplash. Elas são referências visuais para o protótipo, não fotografias de um catálogo comercial verificado.

## Tecnologias e dependências

As versões exatas e os intervalos de versão ficam definidos em `sprint-store/package.json` e `sprint-store/package-lock.json`.

### Dependências de execução

| Tecnologia | Uso |
| --- | --- |
| React | Componentes e estado da interface |
| React DOM | Montagem da aplicação no navegador |
| Three.js | Cena 3D, materiais, cores, câmera e geometria |
| @react-three/fiber | Integração declarativa do Three.js com React |
| @react-three/drei | Utilitários 3D, carregamento GLTF, controles, ambiente, sombras e HTML na cena |

### Ferramentas de desenvolvimento

| Ferramenta | Uso |
| --- | --- |
| Vite | Servidor local, desenvolvimento e build de produção |
| @vitejs/plugin-react | Suporte do Vite para React |
| ESLint | Análise estática e verificação de padrões de código |
| eslint-plugin-react-hooks | Regras relacionadas aos Hooks do React |
| eslint-plugin-react-refresh | Regras úteis para o fluxo de atualização em desenvolvimento |

Não há biblioteca de componentes visuais ou framework CSS dedicado: os estilos são escritos em arquivos CSS do próprio projeto.

## Estrutura do repositório

O README está na raiz do repositório. A aplicação e seus arquivos de configuração ficam dentro de `sprint-store/`.

```text
.
├── README.md
└── sprint-store/
    ├── public/
    │   ├── favicon.svg
    │   └── icons.svg
    ├── src/
    │   ├── assets/
    │   │   ├── glb/
    │   │   │   └── sneakers_adidas_yellow__black.glb
    │   │   ├── SVGlojas/
    │   │   └── hero.png
    │   ├── components/
    │   │   ├── BrandStory.jsx / BrandStory.css
    │   │   ├── Benefits.jsx / Benefits.css
    │   │   ├── CartDrawer.jsx / CartDrawer.css
    │   │   ├── CategorySection.jsx / CategorySection.css
    │   │   ├── FavoritesDrawer.jsx / FavoritesDrawer.css
    │   │   ├── Footer.jsx / Footer.css
    │   │   ├── Header.jsx / Header.css
    │   │   ├── Hero.jsx / Hero.css
    │   │   ├── Newsletter.jsx / Newsletter.css
    │   │   ├── ProductCard.jsx / ProductCard.css
    │   │   ├── ProductSection.jsx / ProductSection.css
    │   │   ├── QuickViewModal.jsx / QuickViewModal.css
    │   │   └── Toast.jsx / Toast.css
    │   ├── data/
    │   │   └── products.js
    │   ├── App.jsx
    │   ├── App.css
    │   ├── index.css
    │   └── main.jsx
    ├── .gitignore
    ├── eslint.config.js
    ├── index.html
    ├── package.json
    ├── package-lock.json
    └── vite.config.js
```

### Responsabilidade dos principais arquivos

- **`src/main.jsx`**: ponto de entrada; cria a raiz React e renderiza a aplicação em modo estrito.
- **`src/App.jsx`**: compõe as seções, centraliza o estado do catálogo, filtros, sacola, favoritos, modal e notificações.
- **`src/App.css`**: tokens visuais, estilos globais da aplicação, tipografia, botões e sistema de animações.
- **`src/index.css`**: regras CSS básicas de normalização.
- **`src/data/products.js`**: catálogo estático, categorias e função de formatação de preço em reais.
- **`src/components/Hero.jsx`**: destaque inicial e experiência 3D com seleção de cor.
- **`src/components/ProductSection.jsx`**: controles de categoria e busca, contador e grade de produtos.
- **`src/components/ProductCard.jsx`**: apresentação individual do produto e ações de favorito/visualização rápida.
- **`src/components/QuickViewModal.jsx`**: escolha de cor e numeração e ação de adicionar à sacola.
- **`src/components/CartDrawer.jsx`**: painel da sacola, quantidades, subtotal e estado vazio.
- **`src/components/FavoritesDrawer.jsx`**: painel de favoritos, remoção, foco do teclado e navegação para visualização rápida.
- **`src/components/Header.jsx`**: marca, navegação e contadores da sacola e dos favoritos.
- **`src/components/Benefits.jsx`**, **`CategorySection.jsx`**, **`BrandStory.jsx`**, **`Newsletter.jsx`** e **`Footer.jsx`**: seções de conteúdo da página.
- **`src/components/Toast.jsx`**: feedback temporário de ações.
- **`index.html`**: idioma do documento, metadados, título, fontes e ponto de montagem.
- **`vite.config.js`**: plugin React, reconhecimento de arquivos GLB/GLTF e configuração do servidor local.
- **`eslint.config.js`**: regras de lint para JavaScript, JSX, Hooks e React Refresh.

Os componentes de interface possuem folhas de estilo próprias, enquanto os tokens e padrões globais ficam em `App.css` e as regras básicas em `index.css`.

## Como executar localmente

### Pré-requisitos

- Node.js em uma versão compatível com a versão do Vite declarada no projeto.
- npm, incluído na instalação do Node.js.
- Git, caso queira clonar o repositório.

### Instalação

No terminal, na raiz do repositório:

```bash
cd sprint-store
npm install
npm run dev
```

O Vite exibirá o endereço local no terminal. Abra esse endereço no navegador para visualizar a aplicação.

### Scripts disponíveis

Execute os comandos a partir da pasta `sprint-store/`:

| Comando | Finalidade |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera a versão otimizada em `dist/` |
| `npm run preview` | Serve localmente o build produzido para conferência |
| `npm run lint` | Executa o ESLint nos arquivos do projeto |

O build pode ser gerado com `npm run build` e a pasta `dist/` é a saída de produção do Vite. A geração do build, por si só, não configura hospedagem, domínio ou serviços de backend.

## Catálogo e dados

O catálogo é definido estaticamente em `src/data/products.js`. Cada produto contém:

- `id`: identificador usado pelo estado de favoritos e pelas operações da interface.
- `name`: nome de exibição.
- `category`: categoria usada nos filtros.
- `color`: descrição textual da cor exibida no card e nos favoritos.
- `price`: preço numérico em reais.
- `tag`: etiqueta opcional, como lançamento ou mais vendido.
- `image`: URL da imagem do produto.
- `colors`: opções de cor representadas por valores hexadecimais.
- `description`: texto apresentado na visualização rápida e utilizado na busca.

A função `money()` usa `Intl.NumberFormat` com localidade `pt-BR` e moeda `BRL`. Para incluir ou editar produtos no protótipo, altere esse catálogo e mantenha os IDs únicos.

## Estado e armazenamento local

A aplicação usa o estado do React para coordenar filtros, busca, produto ativo, abertura de painéis, notificações, sacola e favoritos.

| Chave de armazenamento | Conteúdo |
| --- | --- |
| `sprint-cart` | Itens da sacola, incluindo variação selecionada e quantidade |
| `sprint-favorites` | IDs dos produtos favoritados |

Os dados são locais ao navegador e não representam uma conta, banco de dados ou sincronização remota. Limpar os dados do site pode apagar essas informações. Os favoritos tratam dados inválidos ou indisponibilidade de armazenamento com uma alternativa em memória; a sacola depende do armazenamento local para persistir alterações.

## Acessibilidade e responsividade

Entre os recursos presentes no código:

- Documento declarado em português do Brasil e estrutura semântica com cabeçalho, navegação, conteúdo principal, seções e rodapé.
- Rótulos acessíveis em campos de formulário e nomes descritivos para botões de ícone.
- Estados de seleção comunicados com atributos como `aria-pressed`.
- Indicadores visíveis de foco para navegação por teclado.
- Diálogos de sacola, favoritos e visualização rápida com nomes acessíveis.
- No painel de favoritos, suporte à tecla Escape, contenção do foco por Tab e Shift+Tab, foco inicial no botão de fechar e tentativa de restaurar o foco ao encerrar.
- Imagens de conteúdo com textos alternativos e imagens decorativas ocultadas de tecnologias assistivas quando apropriado.
- Layouts ajustados para telas menores e respeito à preferência de movimento reduzido em animações relevantes.

Esses recursos ajudam a experiência, mas não equivalem a uma auditoria completa de acessibilidade. Recomenda-se testar com teclado, leitor de tela, diferentes navegadores e dispositivos reais.

## SEO e compartilhamento

O documento HTML inclui:

- `lang="pt-BR"`, viewport e cor de tema.
- Título e descrição da página.
- Diretiva para indexação.
- Metadados Open Graph e Twitter/X para prévias de compartilhamento.
- Conexões antecipadas e carregamento de fontes do Google Fonts.

**Antes de publicar:** os endereços de imagem social ainda contêm o domínio de exemplo `SEU-DOMINIO.com`, e a URL Open Graph está definida como caminho relativo. Substitua esses valores pelo domínio definitivo e por uma imagem de compartilhamento real. Revise também títulos, descrições, indexação e URLs canônicas conforme o ambiente de publicação.

## Limitações conhecidas

Este repositório representa a interface e os comportamentos de demonstração, não uma loja pronta para receber pedidos reais.

- Não existe API, backend, banco de dados ou autenticação.
- O catálogo, os preços, as categorias e as variações são definidos no front-end.
- Não há validação de estoque, cálculo real de frete, gestão de pedidos ou integração de pagamento.
- O checkout é desativado e não processa cobranças.
- A inscrição na newsletter só apresenta uma confirmação local; não transmite nem armazena e-mails em um serviço.
- Links de redes sociais e alguns links de ajuda são atalhos demonstrativos, não necessariamente páginas comerciais ativas.
- As imagens de produto vêm de URLs externas do Unsplash e dependem da disponibilidade desse serviço.
- As opções de cor do hero alteram o material do modelo 3D, mas não estão conectadas às variações do catálogo ou ao estoque.
- Não há suíte de testes automatizados configurada.
- A licença e as permissões de redistribuição dos recursos visuais, especialmente do modelo GLB, devem ser confirmadas antes de uso comercial.

## Checklist antes de publicar

- [ ] Confirmar as licenças e permissões de todos os modelos 3D, imagens, ícones e fontes.
- [ ] Substituir conteúdo fictício por catálogo, preços, descrições e fotografias autorizados.
- [ ] Corrigir os metadados Open Graph/Twitter com domínio e imagem reais.
- [ ] Configurar backend e persistência segura caso seja necessário receber pedidos ou guardar dados de clientes.
- [ ] Integrar um provedor de pagamento e implementar validações no servidor antes de habilitar o checkout.
- [ ] Ligar newsletter e formulários a um serviço real, com consentimento e política de privacidade adequados.
- [ ] Validar todos os links e informações de entrega, devolução e contato.
- [ ] Testar responsividade, acessibilidade, desempenho do modelo 3D e comportamento em dispositivos de menor capacidade.
- [ ] Executar `npm run lint` e `npm run build` antes da publicação.
- [ ] Configurar hospedagem, domínio, HTTPS e monitoramento conforme o destino.

---

**Status:** protótipo de front-end funcional para demonstração de interface e interação. A experiência de catálogo, visualização rápida, sacola local e favoritos está implementada; as operações comerciais reais ainda precisam de infraestrutura própria.
