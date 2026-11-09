import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useArticles } from '../context/ArticlesContext';

function Navigation() {
  const location = useLocation();
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const { getUserSavedArticles } = useArticles();

  const savedCount = getUserSavedArticles().length;

  return (
    <nav>
      <div className="nav-container">
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <h1 className="nav-brand">NewsReader</h1>
          <div className="nav-links">
            <Link
              to="/"
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              Home
            </Link>
            <Link
              to="/search"
              className={`nav-link ${location.pathname === '/search' ? 'active' : ''}`}
            >
              Search
            </Link>
            <Link
              to="/saved"
              className={`nav-link ${location.pathname === '/saved' ? 'active' : ''}`}
            >
              Saved Articles ({savedCount})
            </Link>
            {isAdmin() && (
              <Link
                to="/admin"
                className={`nav-link ${location.pathname === '/admin' ? 'active' : ''}`}
              >
                Admin
              </Link>
            )}
          </div>
        </div>

        <div className="nav-user">
          {isAuthenticated() ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span>{user.username}</span>
              <button onClick={logout} className="btn btn-secondary" style={{ padding: '6px 12px' }}>
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="nav-link">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;