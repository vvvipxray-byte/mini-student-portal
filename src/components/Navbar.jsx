import { NavLink, Link } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/register', label: 'Register' },
  { to: '/students', label: 'Students' },
  { to: '/subjects', label: 'Subjects' },
  { to: '/instructors', label: 'Instructors' },
  { to: '/schedule', label: 'Schedule' },
]

function Navbar({ studentCount }) {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand">
          <span className="brand-mark">SP</span>
          <span>Mini Student Portal</span>
        </Link>
        <nav className="nav-links">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              {link.label}
              {link.to === '/students' && <span className="badge">{studentCount}</span>}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
