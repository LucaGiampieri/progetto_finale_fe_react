import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="text-center">
        <h1 className="display-1 fw-bold text-danger">404</h1>

        <h2 className="mb-3">Pagina non trovata</h2>

        <p className="text-muted mb-4">
          La pagina che stai cercando non esiste.
        </p>

        <Link to="/" className="btn btn-dark px-4 py-2">
          Torna alla Home
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
