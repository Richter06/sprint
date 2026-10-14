import { useEffect, useRef } from 'react';
import heartIcon from '../assets/SVGlojas/heart.svg';
import arrowIcon from '../assets/SVGlojas/square-arrow-out-up-right.svg';
import './FavoritesDrawer.css';
import { money } from '../data/products.js';

export default function FavoritesDrawer({ open, favorites, onClose, onRemove, onQuickView, onExplore }) {
  const drawerRef = useRef(null);
  const closeButtonRef = useRef(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return undefined;

    const previousFocus = document.activeElement;
    closeButtonRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCloseRef.current();
        return;
      }

      if (event.key !== 'Tab') return;

      const focusable = drawerRef.current?.querySelectorAll(
        'button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (previousFocus?.isConnected && !document.querySelector('.modal-backdrop')) {
        previousFocus.focus();
      }
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="favorites-backdrop"
      onMouseDown={event => {
        if (event.target === event.currentTarget) onClose();
      }}
      role="presentation"
    >
      <aside
        ref={drawerRef}
        className="favorites-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="favorites-title"
      >
        <header>
          <div>
            <span className="eyebrow">SUA SELEÇÃO</span>
            <h2 id="favorites-title">
              Favoritos <small>({favorites.length})</small>
            </h2>
          </div>
          <button ref={closeButtonRef} type="button" onClick={onClose} aria-label="Fechar favoritos">×</button>
        </header>

        {!favorites.length ? (
          <div className="favorites-empty">
            <span className="favorites-empty-icon">
              <img src={heartIcon} alt="" aria-hidden="true" />
            </span>
            <h3>Um espaço para os seus favoritos.</h3>
            <p>Toque no coração dos tênis que chamarem sua atenção e guarde-os aqui.</p>
            <button className="button" type="button" onClick={onExplore}>
              Explorar tênis <span aria-hidden="true">↗</span>
            </button>
          </div>
        ) : (
          <>
            <div className="favorites-items">
              {favorites.map(product => (
                <article key={product.id}>
                  <button
                    className="favorites-product-image"
                    type="button"
                    onClick={() => onQuickView(product)}
                    aria-label={'Ver detalhes de ' + product.name}
                  >
                    <img src={product.image} alt={'Tênis ' + product.name} />
                  </button>
                  <div className="favorites-product-info">
                    <span className="eyebrow">{product.category}</span>
                    <h3>{product.name}</h3>
                    <p>{product.color}</p>
                    <b>{money(product.price)}</b>
                    <button
                      className="favorites-choose"
                      type="button"
                      onClick={() => onQuickView(product)}
                    >
                      Escolher tamanho <span aria-hidden="true">↗</span>
                    </button>
                  </div>
                  <button
                    className="favorites-remove"
                    type="button"
                    onClick={() => onRemove(product.id)}
                    aria-label={'Remover ' + product.name + ' dos favoritos'}
                    title="Remover dos favoritos"
                  >
                    ×
                  </button>
                </article>
              ))}
            </div>
            <footer className="favorites-footer">
              <p>{favorites.length} {favorites.length === 1 ? 'modelo salvo' : 'modelos salvos'} para você revisitar quando quiser.</p>
              <button className="button" type="button" onClick={onExplore}>
                Continuar explorando <img src={arrowIcon} alt="" aria-hidden="true" />
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
