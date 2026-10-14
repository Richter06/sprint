import heartIcon from '../assets/SVGlojas/heart.svg';
import cartIcon from '../assets/SVGlojas/shopping-cart.svg';
import './Header.css';

export default function Header({ cartCount, favoriteCount, onCart, onFavorites }) {
  return (
    <header className="site-header">
      <a className="brand-mark" href="#top" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
        SPRINT<span>®</span>
      </a>
      <nav aria-label="Navegação">
        <a href="#colecao">Tênis</a>
        <a href="#categorias">Categorias</a>
        <a href="#manifesto">Nossa ideia</a>
      </nav>
      <div className="header-actions">
        <button
          type="button"
          onClick={onFavorites}
          aria-label={'Abrir favoritos, ' + favoriteCount + (favoriteCount === 1 ? ' item salvo' : ' itens salvos')}
        >
          <img src={heartIcon} alt="" aria-hidden="true" />
          <small>{favoriteCount}</small>
        </button>
        <button type="button" onClick={onCart} aria-label="Abrir sacola">
          <img src={cartIcon} alt="" aria-hidden="true" />
          <small>{cartCount}</small>
        </button>
      </div>
    </header>
  );
}
