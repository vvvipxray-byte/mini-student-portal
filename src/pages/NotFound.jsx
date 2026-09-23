import { Link, useLocation } from 'react-router-dom'

function NotFound() {
  const { pathname } = useLocation()

  return (
    <section className="card empty not-found">
      <p className="code">404</p>
      <h1>Page not found</h1>
      <p className="muted">
        The page <code>{pathname}</code> does not exist.
      </p>
      <Link to="/" className="btn btn-primary">Go to Home</Link>
    </section>
  )
}

export default NotFound
