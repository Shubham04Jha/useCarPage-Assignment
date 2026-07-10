import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="not-found-container">
      <div className="not-found-card">
        <h1 className="not-found-code">404</h1>
        <h2 className="not-found-title">Page Not Found</h2>
        <p className="not-found-description">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link to="/" className="not-found-btn">
          Go back to Home
        </Link>
      </div>
    </div>
  );
}
