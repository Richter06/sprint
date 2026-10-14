import { useEffect, useMemo, useState } from 'react';
import './App.css';
import { products, categories } from './data/products.js';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import ProductSection from './components/ProductSection.jsx';
import Benefits from './components/Benefits.jsx';
import CategorySection from './components/CategorySection.jsx';
import BrandStory from './components/BrandStory.jsx';
import Newsletter from './components/Newsletter.jsx';
import Footer from './components/Footer.jsx';
import QuickViewModal from './components/QuickViewModal.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import FavoritesDrawer from './components/FavoritesDrawer.jsx';
import Toast from './components/Toast.jsx';

export default function App() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    const targets = document.querySelectorAll('.benefits article, .products .section-heading, .product-toolbar, .category-tile, .story-art, .story-copy, .newsletter > div, .newsletter > form');
    if (!targets.length) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' });
    targets.forEach((target, index) => {
      target.classList.add('motion-reveal');
      target.style.setProperty('--reveal-delay', `${(index % 3) * 80}ms`);
      observer.observe(target);
    });
    return () => observer.disconnect();
  }, []);

  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('sprint-cart') || '[]'); }
    catch { return []; }
  });
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('sprint-favorites') || '[]');
      return Array.isArray(saved) ? saved.filter(id => products.some(product => product.id === id)) : [];
    } catch {
      return [];
    }
  });
  const [active, setActive] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Todos');
  const [toast, setToast] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('sprint-favorites', JSON.stringify(favorites));
    } catch {
      // Favoritos continuam funcionando durante a sessão se o armazenamento estiver indisponível.
    }
  }, [favorites]);

  const filtered = useMemo(() => products.filter(p =>
    (category === 'Todos' || p.category === category) &&
    (!query.trim() || [p.name, p.category, p.color, p.description].join(' ').toLowerCase().includes(query.toLowerCase().trim()))
  ), [category, query]);

  function notify(s) {
    setToast(s);
    window.setTimeout(() => setToast(''), 2400);
  }

  function persist(next) {
    setCart(next);
    localStorage.setItem('sprint-cart', JSON.stringify(next));
  }

  function add(p, size, color) {
    const key = p.id + '-' + size + '-' + color;
    persist(cart.some(i => i.key === key)
      ? cart.map(i => i.key === key ? { ...i, quantity: i.quantity + 1 } : i)
      : [...cart, { ...p, key, size, selectedColor: color, quantity: 1 }]);
    setActive(null);
    notify('Adicionado à sacola');
  }

  function quantity(key, d) {
    persist(cart.map(i => i.key === key ? { ...i, quantity: i.quantity + d } : i).filter(i => i.quantity > 0));
  }

  function remove(key) {
    persist(cart.filter(i => i.key !== key));
  }

  function favorite(id) {
    const isSaved = favorites.includes(id);
    setFavorites(current => current.includes(id)
      ? current.filter(savedId => savedId !== id)
      : [...current, id]);
    notify(isSaved ? 'Removido dos favoritos' : 'Salvo nos favoritos');
  }

  function openCart() {
    setFavoritesOpen(false);
    setCartOpen(true);
  }

  function openFavorites() {
    setCartOpen(false);
    setFavoritesOpen(true);
  }

  function explore() {
    document.getElementById('colecao')?.scrollIntoView({ behavior: 'smooth' });
  }

  function exploreFromFavorites() {
    setFavoritesOpen(false);
    explore();
  }

  function openFavoriteProduct(product) {
    setFavoritesOpen(false);
    setActive(product);
  }

  const count = cart.reduce((s, i) => s + i.quantity, 0);
  const favoriteProducts = products.filter(product => favorites.includes(product.id));

  return (
    <div className="app-shell">
      <div className="announcement">FRETE GRÁTIS A PARTIR DE R$ 399 <span>✳</span> DESIGN PARA SEGUIR EM MOVIMENTO</div>
      <Header
        cartCount={count}
        favoriteCount={favorites.length}
        onCart={openCart}
        onFavorites={openFavorites}
      />
      <main>
        <Hero onExplore={explore} />
        <Benefits />
        <ProductSection
          products={filtered}
          categories={categories}
          activeCategory={category}
          onCategory={setCategory}
          query={query}
          onQuery={setQuery}
          favorites={favorites}
          onFavorite={favorite}
          onQuickView={setActive}
        />
        <CategorySection onSelect={v => { setCategory(v); explore(); }} />
        <BrandStory onExplore={explore} />
        <Newsletter onSubmit={() => notify('Inscrição demonstrativa concluída!')} />
      </main>
      <Footer onHome={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
      {active && <QuickViewModal key={active.id} product={active} onClose={() => setActive(null)} onAdd={add} />}
      <CartDrawer open={cartOpen} cart={cart} onClose={() => setCartOpen(false)} onQuantity={quantity} onRemove={remove} />
      <FavoritesDrawer
        open={favoritesOpen}
        favorites={favoriteProducts}
        onClose={() => setFavoritesOpen(false)}
        onRemove={favorite}
        onQuickView={openFavoriteProduct}
        onExplore={exploreFromFavorites}
      />
      <Toast message={toast} />
    </div>
  );
}
