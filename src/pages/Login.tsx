import React from 'react';
import { Link } from 'react-router-dom'; 

/**
 * Composant de la page de connexion
 * @returns {React.ReactElement}
 */
function Login(): React.ReactElement {
    const allUsers = [
        { id: 12, firstName: 'Karl' },
        { id: 18, firstName: 'Cecilia' }
    ];

    return (
        <div className="login">
            <h3 className="login-text">Connecte toi à ton dashboard</h3>      
            <ul>
                {allUsers.map(user => (
                    <li key={user.id}>
                        <Link to={`/user/${user.id}`}>
                            {user.firstName}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Login;