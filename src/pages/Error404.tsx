import { Link } from "react-router-dom";

export const ErrorPage = () => {
    return (
		<div className="error">
			<p className="error_404">404</p>
			<p className="error_text">Oups! La page que vous demandez n'existe pas.</p>
			<Link to="/" className="error_link">
				Retourner sur la page d’accueil
			</Link>
		</div>
	);
}

export default ErrorPage;