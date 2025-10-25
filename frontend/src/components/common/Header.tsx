import './Header.css';

interface HeaderProps {
  onLoginClick?: () => void;
}

export const Header = ({ onLoginClick }: HeaderProps) => {
  return (
    <header className="app-header">
      <div className="header-content">
        <h1 className="header-title">
          <span className="header-icon"></span>
          Práctica 2 AyD2 Microservicios
        </h1>
        <button className="btn-login" onClick={onLoginClick}>
          👤 Iniciar sesión
        </button>
      </div>
    </header>
  );
};