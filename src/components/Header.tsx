import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';

/**
 * barre de navigation supérieure
 * @returns {React.Element} 
 */
const Header = () => {
    return (  
      <header className="header">
        <img src={logo} alt="Logo SportSee" />
       <nav>
        <Link to="/" aria-label="Accéder à la page d'accueil">Accueil</Link>
        <Link to="#" aria-label="Accéder à la page profil">Profil</Link>
        <Link to="#" aria-label="Accéder à la page réglage">Réglage</Link>
        <Link to="#" aria-label="Accéder à la page communauté">Communauté</Link>
       </nav>
      </header>
    );
  };
  
  export default Header;