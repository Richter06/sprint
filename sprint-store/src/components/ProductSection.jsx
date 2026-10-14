import searchIcon from '../assets/SVGlojas/search.svg';
import './ProductSection.css';
import ProductCard from './ProductCard.jsx';

export default function ProductSection({ products, categories, activeCategory, onCategory, query, onQuery, favorites, onFavorite, onQuickView }) {
  return (
    <section className="section products" id="colecao">
      <div className="section-heading">
        <div>
          <span className="eyebrow">ESCOLHAS SPRINT</span>
          <h2 className="section-title">Menos, mas <em>melhor.</em></h2>
        </div>
        <p>Peças pensadas para entrar na sua rotina<br />e ficar por muito tempo.</p>
      </div>

      <div className="product-toolbar">
        <div className="product-categories" aria-label="Filtrar por categoria">
          {categories.map(c => (
            <button key={c} className={activeCategory === c ? 'active' : ''} onClick={() => onCategory(c)} aria-pressed={activeCategory === c}>
              {c}
            </button>
          ))}
        </div>

        <div className="product-search">
          <img src={searchIcon} alt="" aria-hidden="true" />
          <label className="visually-hidden" htmlFor="product-search-input">Buscar tênis</label>
          <input
            id="product-search-input"
            type="search"
            value={query}
            onChange={event => onQuery(event.target.value)}
            placeholder="Buscar tênis..."
            autoComplete="off"
          />
          {query && (
            <button className="product-search-clear" type="button" onClick={() => onQuery('')} aria-label="Limpar busca">
              ×
            </button>
          )}
        </div>

        <span className="product-count" aria-live="polite">{products.length} MODELOS</span>
      </div>

      {products.length ? (
        <div className="product-grid">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} isFavorite={favorites.includes(p.id)} onFavorite={onFavorite} onQuickView={onQuickView} />
          ))}
        </div>
      ) : (
        <div className="empty-state">Nenhum modelo encontrado. Tente outra busca.</div>
      )}
    </section>
  );
}
