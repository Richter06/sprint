import { useEffect, useMemo, useState } from 'react'
import { categories, colorways, products } from './data/products.js'
import './App.css'

const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
const sizes = [36, 37, 38, 39, 40, 41, 42, 43, 44]
const iconPaths = {
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
  heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />,
  bag: <><path d="M5 8h14l1 13H4L5 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></>,
  arrow: <><path d="M4 12h15" /><path d="m13 5 7 7-7 7" /></>,
  close: <><path d="m18 6-12 12" /><path d="m6 6 12 12" /></>,
  plus: <><path d="M12 5v14" /><path d="M5 12h14" /></>,
  minus: <path d="M5 12h14" />,
  menu: <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  truck: <><path d="M3 6h11v12H3z" /><path d="M14 10h4l3 3v5h-7z" /><circle cx="7.5" cy="18" r="1.5" /><circle cx="17.5" cy="18" r="1.5" /></>,
  spark: <><path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-2-5.8L4 11l6-2.2L12 3Z" /><path d="m19 15 1 2.5 2 1-2 1-1 2.5-1-2.5-2-1 2-1 1-2.5Z" /></>,
  instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></>,
}

function Icon({ name, size = 20 }) {
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{iconPaths[name] || iconPaths.spark}</svg>
}

function Header({ cartCount, favoriteCount, onCart, onSearch, searchOpen, query, setQuery, onFavorites, onHome }) {
  const [menuOpen, setMenuOpen] = useState(false)
  function goTo(id) { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }
  return <>
    <div className="announcement"><span>PRIMEIRA COMPRA?</span><span>Use <strong>PRIMEIRAPASSADA</strong> e ganhe 10% de desconto</span><a href="#colecao">Descubra <Icon name="arrow" size={14} /></a></div>
    <header className="site-header">
      <button className="icon-button mobile-menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen}><Icon name={menuOpen ? 'close' : 'menu'} size={22} /></button>
      <button className="wordmark" type="button" onClick={onHome} aria-label="SPRINT — início">SPRINT<span>®</span></button>
      <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Navegação principal">
        <button type="button" onClick={() => goTo('colecao')}>Tênis</button><button type="button" onClick={() => goTo('categorias')}>Categorias</button><button type="button" onClick={() => goTo('manifesto')}>Nossa ideia</button><button type="button" onClick={() => goTo('newsletter')}>Novidades</button>
      </nav>
      <div className="header-actions">
        <button className="icon-button" type="button" aria-label="Buscar produtos" aria-expanded={searchOpen} onClick={onSearch}><Icon name="search" /></button>
        <button className="icon-button favorites-trigger" type="button" aria-label={'Ver favoritos: ' + favoriteCount} onClick={onFavorites}><Icon name="heart" /><span className="action-count">{favoriteCount}</span></button>
        <button className="icon-button cart-trigger" type="button" aria-label={'Abrir sacola: ' + cartCount + ' itens'} onClick={onCart}><Icon name="bag" /><span className="action-count">{cartCount}</span></button>
      </div>
    </header>
    {searchOpen && <div className="search-panel"><Icon name="search" size={21} /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Busque por modelo, categoria..." aria-label="Buscar produtos" />{query && <button type="button" className="search-clear" onClick={() => setQuery('')}>Limpar</button>}<button className="icon-button" type="button" aria-label="Fechar busca" onClick={onSearch}><Icon name="close" /></button></div>}
  </>
}

function ProductCard({ product, isFavorite, onFavorite, onQuickView }) {
  return <article className="product-card">
    <div className="product-card__media">
      <button className={'favorite-button ' + (isFavorite ? 'is-active' : '')} type="button" aria-label={(isFavorite ? 'Remover ' : 'Adicionar ') + product.name + ' dos favoritos'} aria-pressed={isFavorite} onClick={() => onFavorite(product.id)}><Icon name="heart" size={19} /></button>
      {product.tag && <span className="product-tag">{product.tag}</span>}
      <button className="product-image-button" type="button" onClick={() => onQuickView(product)} aria-label={'Ver detalhes de ' + product.name}><img src={product.image} alt={'Tênis ' + product.name} loading="lazy" /></button>
      <button className="quick-add" type="button" onClick={() => onQuickView(product)} aria-label={'Escolher tamanho para ' + product.name}><span>Escolher tamanho</span><Icon name="plus" size={17} /></button>
    </div>
    <div className="product-card__info"><div className="product-card__title-row"><div><p className="product-category">{product.category}</p><button type="button" className="product-name" onClick={() => onQuickView(product)}>{product.name}</button></div><span className="product-price">{money.format(product.price)}</span></div>
      <div className="product-card__bottom"><span className="product-color-label">{product.color}</span><div className="mini-swatches" aria-label={product.colors.length + ' opções de cor'}>{product.colors.slice(0, 4).map((color, index) => <span key={color + index} style={{ backgroundColor: color }} />)}</div></div>
    </div>
  </article>
}

function Hero({ selectedColor, setSelectedColor, onShop }) {
  const activeColor = colorways.find((color) => color.id === selectedColor) || colorways[0]
  return <section className={'hero hero--' + activeColor.id} id="lancamento">
    <div className="hero-copy"><div className="hero-kicker"><span className="hero-kicker-dot" /> NOVO CAPÍTULO · 001</div>
      <h1>Seu ritmo.<br /><em>Seu caminho.</em></h1>
      <p className="hero-description">Conheça o Velocity 001. Design que respira, conforto que acompanha e espaço para você ir do seu jeito.</p>
      <div className="hero-price-row"><strong>{money.format(599.9)}</strong><span>ou 6x de {money.format(99.98)}</span></div>
      <button className="button button--dark" type="button" onClick={onShop}>Conheça o lançamento <Icon name="arrow" size={18} /></button>
      <div className="hero-color-picker"><div className="hero-color-label"><span>ESCOLHA SUA COR</span><strong>{activeColor.name}</strong></div>
        <div className="color-swatches" role="group" aria-label="Cores conceituais do Velocity 001">{colorways.map((color) => <button key={color.id} type="button" className={'color-swatch ' + (selectedColor === color.id ? 'is-active' : '')} style={{ '--swatch-color': color.hex }} aria-label={'Selecionar cor ' + color.name} aria-pressed={selectedColor === color.id} onClick={() => setSelectedColor(color.id)} />)}</div>
      </div>
    </div>
    <div className="hero-visual"><div className="hero-visual-top"><span>VELOCITY 001</span><span>DESIGN Nº 001 — 2026</span></div><div className="hero-orbit hero-orbit--one" /><div className="hero-orbit hero-orbit--two" />
      <div className="hero-image-stage"><div className="hero-image-shadow" /><img key={activeColor.id} className="hero-sneaker-image" style={{ filter: activeColor.filter }} src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1400&q=90" alt="Fotografia conceitual de um tênis de perfil" fetchPriority="high" /></div>
      <div className="hero-visual-bottom"><span>01 / 04</span><span>DESENHADO PARA O DIA A DIA <span className="hero-bottom-mark">↗</span></span></div><div className="hero-vertical-note">FEITO PARA SE MOVER</div>
    </div>
    <div className="hero-side-note">NOVA COLEÇÃO <span>—</span> 2026</div><a className="hero-scroll" href="#colecao"><span>ROLE PARA EXPLORAR</span><span className="scroll-line" /></a>
  </section>
}

function QuickView({ product, onClose, onAdd }) {
  const [size, setSize] = useState(40)
  const [color, setColor] = useState(product?.colors?.[0] || '#d8d4cb')
  useEffect(() => {
    if (!product) return undefined
    function onKeyDown(event) { if (event.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [product, onClose])
  if (!product) return null
  const colorName = colorways.find((item) => item.hex === color)?.name || product.color
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
    <section className="quick-view" role="dialog" aria-modal="true" aria-labelledby="quick-view-title">
      <button className="modal-close icon-button" type="button" onClick={onClose} aria-label="Fechar detalhes"><Icon name="close" /></button>
      <div className="quick-view-image"><img src={product.image} alt={'Tênis ' + product.name} /></div>
      <div className="quick-view-content"><p className="product-category">{product.category} / SPRINT ORIGINALS</p><h2 id="quick-view-title">{product.name}</h2><strong className="quick-view-price">{money.format(product.price)}</strong><p className="quick-view-description">{product.description}</p>
        <div className="quick-view-option"><div className="option-heading"><span>Cor</span><span>{colorName}</span></div><div className="color-swatches color-swatches--modal">{product.colors.map((item) => <button key={item} type="button" className={'color-swatch ' + (color === item ? 'is-active' : '')} style={{ '--swatch-color': item }} aria-label={'Selecionar cor ' + item} aria-pressed={color === item} onClick={() => setColor(item)} />)}</div></div>
        <div className="quick-view-option"><div className="option-heading"><span>Numeração</span><button type="button" className="text-link" onClick={() => window.alert('Guia de tamanhos demonstrativo: escolha sua numeração habitual.')}>Guia de tamanhos</button></div><div className="size-grid">{sizes.map((item) => <button type="button" key={item} className={'size-option ' + (size === item ? 'is-active' : '')} aria-pressed={size === item} onClick={() => setSize(item)}>{item}</button>)}</div></div>
        <button className="button button--dark button--full" type="button" onClick={() => { onAdd(product, size, color, colorName); onClose() }}>Adicionar à sacola <Icon name="arrow" size={18} /></button><p className="demo-note">Demonstração de loja — sem cobrança real.</p>
      </div>
    </section>
  </div>
}

function CartDrawer({ open, cart, onClose, onQuantity, onRemove, onCheckout }) {
  useEffect(() => {
    if (!open) return undefined
    function onKeyDown(event) { if (event.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])
  if (!open) return null
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const count = cart.reduce((sum, item) => sum + item.quantity, 0)
  return <div className="drawer-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
    <aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
      <div className="drawer-header"><div><span className="eyebrow">SUA SELEÇÃO</span><h2 id="cart-title">Sacola <span>({count})</span></h2></div><button className="icon-button" type="button" onClick={onClose} aria-label="Fechar sacola"><Icon name="close" /></button></div>
      {cart.length === 0 ? <div className="cart-empty"><div className="cart-empty-icon"><Icon name="bag" size={28} /></div><h3>Por enquanto, vazia.</h3><p>Seu próximo par pode estar logo ali.</p><button className="button button--dark" type="button" onClick={onClose}>Explorar tênis <Icon name="arrow" size={18} /></button></div> :
        <><div className="cart-items">{cart.map((item) => <article className="cart-item" key={item.key}><img src={item.image} alt={item.name} /><div className="cart-item-info"><span className="product-category">{item.category}</span><h3>{item.name}</h3><p>Cor: {item.colorLabel} · Tam. {item.size}</p><strong>{money.format(item.price)}</strong><div className="quantity-control"><button type="button" aria-label={'Diminuir quantidade de ' + item.name} onClick={() => onQuantity(item.key, -1)}><Icon name="minus" size={14} /></button><span>{item.quantity}</span><button type="button" aria-label={'Aumentar quantidade de ' + item.name} onClick={() => onQuantity(item.key, 1)}><Icon name="plus" size={14} /></button></div></div><button type="button" className="remove-item" onClick={() => onRemove(item.key)} aria-label={'Remover ' + item.name}><Icon name="close" size={16} /></button></article>)}</div>
          <div className="cart-summary"><div><span>Subtotal</span><strong>{money.format(total)}</strong></div><p><Icon name="truck" size={17} /> Frete calculado na próxima etapa.</p><button className="button button--dark button--full" type="button" onClick={onCheckout}>Continuar <Icon name="arrow" size={18} /></button><span className="demo-note">Checkout desativado nesta demonstração.</span></div></>}
    </aside>
  </div>
}

function Footer({ onHome }) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  function submit(event) { event.preventDefault(); if (email.trim()) { setSubmitted(true); setEmail('') } }
  return <>
    <section className="newsletter" id="newsletter"><div className="newsletter-copy"><span className="eyebrow"><Icon name="spark" size={15} /> ACOMPANHE O RITMO</span><h2>Novidades que<br /><em>valem o passo.</em></h2><p>Lançamentos, histórias e escolhas que fazem sentido. Sem barulho, só o que importa.</p></div>
      <form className="newsletter-form" onSubmit={submit}><label htmlFor="newsletter-email">Seu melhor e-mail</label><div className="newsletter-input-wrap"><input id="newsletter-email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="voce@email.com" /><button type="submit" aria-label="Inscrever e-mail"><Icon name="arrow" size={20} /></button></div><p className="newsletter-note">{submitted ? 'Tudo certo — inscrição de demonstração registrada.' : 'Ao se inscrever, você concorda em receber novidades da SPRINT.'}</p></form>
    </section>
    <footer className="site-footer"><div className="footer-top"><div className="footer-brand"><button className="wordmark wordmark--footer" type="button" onClick={onHome}>SPRINT<span>®</span></button><p>Encontre seu ritmo.<br />O resto vem com o caminho.</p></div>
      <div className="footer-links"><div><span>EXPLORAR</span><a href="#colecao">Todos os tênis</a><a href="#categorias">Categorias</a><a href="#lancamento">Lançamento</a></div><div><span>PRECISA DE AJUDA?</span><a href="#newsletter">Entrega e devolução</a><a href="#colecao">Guia de tamanhos</a><a href="mailto:oi@sprint.example">Fale com a gente</a></div><div><span>ACOMPANHE</span><a href="#newsletter"><Icon name="instagram" size={16} /> Instagram</a><a href="#newsletter">Novidades por e-mail</a></div></div>
    </div><div className="footer-bottom"><span>© 2026 SPRINT. Projeto demonstrativo.</span><span>Feito para seguir em movimento.</span><button type="button" onClick={onHome}>Voltar ao topo ↑</button></div></footer>
  </>
}

function App() {
  const [selectedColor, setSelectedColor] = useState('stone')
  const [query, setQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [category, setCategory] = useState('Todos')
  const [sort, setSort] = useState('featured')
  const [cart, setCart] = useState(() => { try { return JSON.parse(localStorage.getItem('sprint-cart') || '[]') } catch { return [] } })
  const [cartOpen, setCartOpen] = useState(false)
  const [favorites, setFavorites] = useState([])
  const [favoritesOnly, setFavoritesOnly] = useState(false)
  const [quickView, setQuickView] = useState(null)
  const [toast, setToast] = useState({ message: '', visible: false })

  useEffect(() => { localStorage.setItem('sprint-cart', JSON.stringify(cart)) }, [cart])
  useEffect(() => {
    if (!toast.visible) return undefined
    const timeout = window.setTimeout(() => setToast((current) => ({ ...current, visible: false })), 2600)
    return () => window.clearTimeout(timeout)
  }, [toast])

  const visibleProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesCategory = category === 'Todos' || product.category === category
      const normalizedQuery = query.trim().toLocaleLowerCase('pt-BR')
      const matchesQuery = !normalizedQuery || (product.name + ' ' + product.category + ' ' + product.description).toLocaleLowerCase('pt-BR').includes(normalizedQuery)
      return matchesCategory && matchesQuery && (!favoritesOnly || favorites.includes(product.id))
    })
    if (sort === 'price-asc') result = [...result].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') result = [...result].sort((a, b) => b.price - a.price)
    if (sort === 'name') result = [...result].sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'))
    return result
  }, [category, query, sort, favorites, favoritesOnly])

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  function showToast(message) { setToast({ message, visible: true }) }
  function addToCart(product, size = 40, color = product.colors?.[0], colorLabel = product.color) {
    const key = product.id + '-' + size + '-' + color
    setCart((current) => {
      const found = current.find((item) => item.key === key)
      if (found) return current.map((item) => item.key === key ? { ...item, quantity: item.quantity + 1 } : item)
      return [...current, { ...product, key, size, color, colorLabel, quantity: 1 }]
    })
    showToast(product.name + ' adicionado à sacola')
  }
  function toggleFavorite(id) {
    const wasFavorite = favorites.includes(id)
    setFavorites((current) => wasFavorite ? current.filter((item) => item !== id) : [...current, id])
    const product = products.find((item) => item.id === id)
    showToast((product?.name || 'Produto') + (wasFavorite ? ' removido dos favoritos' : ' salvo nos favoritos'))
  }
  function changeQuantity(key, delta) {
    setCart((current) => current.map((item) => item.key === key ? { ...item, quantity: item.quantity + delta } : item).filter((item) => item.quantity > 0))
  }
  function goHome() { setCategory('Todos'); setQuery(''); setFavoritesOnly(false); setSearchOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  function goToCollection(nextCategory = 'Todos') { setCategory(nextCategory); setFavoritesOnly(false); document.getElementById('colecao')?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }

  return <div className="app-shell"><a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <Header cartCount={cartCount} favoriteCount={favorites.length} onCart={() => setCartOpen(true)} onSearch={() => setSearchOpen((open) => !open)} searchOpen={searchOpen} query={query} setQuery={setQuery} onFavorites={() => { setFavoritesOnly((current) => !current); setCategory('Todos'); document.getElementById('colecao')?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }} onHome={goHome} />
    <main id="conteudo">
      <Hero selectedColor={selectedColor} setSelectedColor={setSelectedColor} onShop={() => goToCollection('Lifestyle')} />
      <section className="trust-strip" aria-label="Benefícios da loja"><div><Icon name="truck" size={21} /><span>Frete grátis acima de R$ 399</span></div><span className="trust-divider" /><div><Icon name="check" size={21} /><span>Troca fácil em até 30 dias</span></div><span className="trust-divider" /><div><Icon name="spark" size={21} /><span>Seleção feita com intenção</span></div></section>
      <section className="collection-section section-wrap" id="colecao"><div className="section-heading"><div><span className="eyebrow">ESCOLHIDOS PARA VOCÊ</span><h2>O próximo par<br className="mobile-break" /> <em>começa aqui.</em></h2></div><p>Peças para acompanhar seu ritmo — sem complicar o caminho.</p></div>
        <div className="collection-toolbar"><div className="category-tabs" role="group" aria-label="Filtrar por categoria">{['Todos', 'Running', 'Lifestyle', 'Casual', 'Outdoor', 'Clássicos'].map((item) => <button type="button" key={item} className={category === item && !favoritesOnly ? 'is-active' : ''} onClick={() => { setCategory(item); setFavoritesOnly(false) }}>{item}</button>)}{favoritesOnly && <button type="button" className="is-active" onClick={() => setFavoritesOnly(false)}>♥ Favoritos <Icon name="close" size={13} /></button>}</div>
          <label className="sort-control"><span>Ordenar</span><select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Ordenar produtos"><option value="featured">Em destaque</option><option value="price-asc">Menor preço</option><option value="price-desc">Maior preço</option><option value="name">Nome A–Z</option></select><Icon name="arrow" size={13} /></label>
        </div>
        {(query || favoritesOnly) && <div className="results-summary">{visibleProducts.length} {visibleProducts.length === 1 ? 'resultado' : 'resultados'} {query && <>para <strong>“{query}”</strong></>}{favoritesOnly && ' nos seus favoritos'} <button type="button" onClick={() => { setQuery(''); setFavoritesOnly(false); setSearchOpen(false) }}>Limpar filtros</button></div>}
        {visibleProducts.length ? <div className="product-grid">{visibleProducts.map((product) => <ProductCard key={product.id} product={product} isFavorite={favorites.includes(product.id)} onFavorite={toggleFavorite} onQuickView={setQuickView} />)}</div> :
          <div className="empty-results"><span><Icon name="search" size={25} /></span><h3>Nenhum par por aqui.</h3><p>Tente outra busca ou escolha uma categoria diferente.</p><button className="button button--outline" type="button" onClick={() => { setQuery(''); setFavoritesOnly(false); setCategory('Todos') }}>Ver todos os tênis</button></div>}
        <div className="collection-footer"><span>01 — {String(visibleProducts.length).padStart(2, '0')} / SELEÇÃO SPRINT</span><button className="text-link text-link--large" type="button" onClick={() => { setCategory('Todos'); setFavoritesOnly(false); setQuery('') }}>Ver seleção completa <Icon name="arrow" size={18} /></button></div>
      </section>
      <section className="manifesto-section" id="manifesto"><div className="manifesto-image"><img src="https://images.unsplash.com/photo-1528701800489-20be3c7ea6a5?auto=format&fit=crop&w=1500&q=85" loading="lazy" alt="Tênis em cenário urbano com luz natural" /><span className="manifesto-stamp">SPRINT<br />ORIGINALS</span></div>
        <div className="manifesto-copy"><span className="eyebrow">MENOS RUÍDO. MAIS CAMINHO.</span><h2>Não é sobre<br />chegar primeiro.<br /><em>É sobre ir do seu jeito.</em></h2><p>A gente acredita no que acompanha a vida real. No design que dura além da tendência, no conforto que você percebe e nos detalhes que não precisam gritar para serem notados.</p><button type="button" className="text-link text-link--large" onClick={() => goToCollection('Todos')}>Conheça nossa seleção <Icon name="arrow" size={18} /></button><span className="manifesto-index">IDEIA Nº 001 / SPRINT</span></div>
      </section>
      <section className="categories-section section-wrap" id="categorias"><div className="section-heading section-heading--compact"><div><span className="eyebrow">ENCONTRE SEU CAMINHO</span><h2>Feito para <em>cada ritmo.</em></h2></div><p>Um ponto de partida para cada tipo de dia.</p></div>
        <div className="category-grid">{categories.map((item) => <button className="category-card" type="button" key={item.name} onClick={() => goToCollection(item.name)}><img src={item.image} alt="" loading="lazy" /><span className="category-number">{item.number} / 04</span><span className="category-card-content"><span><strong>{item.name}</strong><small>{item.description}</small></span><span className="category-arrow"><Icon name="arrow" size={19} /></span></span></button>)}</div>
      </section>
      <section className="closing-banner"><div className="closing-lines" aria-hidden="true" /><span className="eyebrow">SEU PRÓXIMO CAPÍTULO COMEÇA AQUI</span><h2>Vai no seu <em>ritmo.</em></h2><button type="button" className="button button--light" onClick={() => goToCollection('Todos')}>Encontrar meu próximo par <Icon name="arrow" size={18} /></button><span className="closing-index">SPRINT® — 2026</span></section>
    </main>
    <Footer onHome={goHome} />
    <CartDrawer open={cartOpen} cart={cart} onClose={() => setCartOpen(false)} onQuantity={changeQuantity} onRemove={(key) => setCart((current) => current.filter((item) => item.key !== key))} onCheckout={() => { setCartOpen(false); showToast('Checkout demonstrativo — nenhuma compra foi realizada') }} />
    <QuickView key={quickView?.id} product={quickView} onClose={() => setQuickView(null)} onAdd={addToCart} />
    <div className={'toast ' + (toast.visible ? 'is-visible' : '')} role="status" aria-live="polite"><span className="toast-check"><Icon name="check" size={16} /></span>{toast.message}</div>
    <div className="demo-ribbon"><span /> PROJETO DEMONSTRATIVO</div>
  </div>
}

function Footer({ onHome }) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  function submit(event) { event.preventDefault(); if (email.trim()) { setSubmitted(true); setEmail('') } }
  return <>
    <section className="newsletter" id="newsletter"><div className="newsletter-copy"><span className="eyebrow"><Icon name="spark" size={15} /> ACOMPANHE O RITMO</span><h2>Novidades que<br /><em>valem o passo.</em></h2><p>Lançamentos, histórias e escolhas que fazem sentido. Sem barulho, só o que importa.</p></div>
      <form className="newsletter-form" onSubmit={submit}><label htmlFor="newsletter-email">Seu melhor e-mail</label><div className="newsletter-input-wrap"><input id="newsletter-email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="voce@email.com" /><button type="submit" aria-label="Inscrever e-mail"><Icon name="arrow" size={20} /></button></div><p className="newsletter-note">{submitted ? 'Tudo certo — inscrição de demonstração registrada.' : 'Ao se inscrever, você concorda em receber novidades da SPRINT.'}</p></form>
    </section>
    <footer className="site-footer"><div className="footer-top"><div className="footer-brand"><button className="wordmark wordmark--footer" type="button" onClick={onHome}>SPRINT<span>®</span></button><p>Encontre seu ritmo.<br />O resto vem com o caminho.</p></div><div className="footer-links"><div><span>EXPLORAR</span><a href="#colecao">Todos os tênis</a><a href="#categorias">Categorias</a><a href="#lancamento">Lançamento</a></div><div><span>PRECISA DE AJUDA?</span><a href="#newsletter">Entrega e devolução</a><a href="#colecao">Guia de tamanhos</a><a href="mailto:oi@sprint.example">Fale com a gente</a></div><div><span>ACOMPANHE</span><a href="#newsletter"><Icon name="instagram" size={16} /> Instagram</a><a href="#newsletter">Novidades por e-mail</a></div></div></div><div className="footer-bottom"><span>© 2026 SPRINT. Projeto demonstrativo.</span><span>Feito para seguir em movimento.</span><button type="button" onClick={onHome}>Voltar ao topo ↑</button></div></footer>
  </>
}

export default App
