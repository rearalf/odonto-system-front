import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-display font-bold text-text-primary">404</h1>
      <p className="mt-4 text-body-lg text-text-muted">Página no encontrada</p>
      <Link
        to="/"
        className="mt-6 px-4 py-2.5 text-label-lg font-medium text-text-inverse bg-primary rounded-lg hover:bg-primary-hover"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
