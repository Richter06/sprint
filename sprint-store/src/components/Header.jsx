import heartIcon from '../assets/SVGlojas/heart.svg';
import cartIcon from '../assets/SVGlojas/shopping-cart.svg';
import './Header.css';

export default function Header({ cartCount, favoriteCount, onCart }) {
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
        <a href="#colecao" aria-label={favoriteCount + ' favoritos'}>
          <img src={heartIcon} alt="" aria-hidden="true" />
          <small>{favoriteCount}</small>
        </a>
        <button onClick={onCart} aria-label="Abrir sacola">
          <img src={cartIcon} alt="" aria-hidden="true" />
          <small>{cartCount}</small>
        </button>
      </div>
    </header>
  );
}
