import { Link } from 'react-router-dom'
import {
  DAYS,
  DAY_NAMES,
  INSTRUCTORS,
  SUBJECTS,
  findInstructor,
  formatTimeRange,
  toMinutes,
} from '../data/catalog.js'

function Home({ studentCount }) {
  const today = DAYS[new Date().getDay() - 1]
  const todaysClasses = SUBJECTS.filter((s) => s.days.includes(today)).sort(
    (a, b) => toMinutes(a.start) - toMinutes(b.start),
  )

  return (
    <section className="home">
      <div className="hero card">
        <p className="eyebrow">Welcome</p>
        <h1>Mini Student Portal</h1>
        <p className="lead">
          Register students, enroll them in subjects, and browse students, subjects, and
          instructors, all in one single-page application.
        </p>
        <div className="actions">
          <Link to="/register" className="btn btn-primary">Register a Student</Link>
          <Link to="/students" className="btn btn-secondary">View Students</Link>
        </div>
      </div>

      <div className="stats">
        <div className="stat card">
          <span className="stat-value">{studentCount}</span>
          <span className="stat-label">Registered students</span>
        </div>
        <div className="stat card">
          <span className="stat-value">{SUBJECTS.length}</span>
          <span className="stat-label">Subjects offered</span>
        </div>
        <div className="stat card">
          <span className="stat-value">{INSTRUCTORS.length}</span>
          <span className="stat-label">Instructors</span>
        </div>
      </div>

      <div className="card today-card">
        <div className="page-header with-action">
          <div>
            <h2 className="card-title">Today&apos;s Classes</h2>
            <p className="muted">{today ? DAY_NAMES[today] : 'Weekend'}</p>
          </div>
          <Link to="/schedule" className="btn btn-secondary">Full Schedule</Link>
        </div>
        {todaysClasses.length === 0 ? (
          <p className="muted">No classes today.</p>
        ) : (
          <ul className="student-list">
            {todaysClasses.map((subject) => (
              <li key={subject.code} className="student-item">
                <span className={`time-chip color-${SUBJECTS.indexOf(subject)}`}>
                  {formatTimeRange(subject)}
                </span>
                <div className="student-info">
                  <Link to={`/subjects/${subject.code}`} className="student-name">
                    {subject.title}
                  </Link>
                  <span className="muted small">{findInstructor(subject.instructorId).name}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

export default Home
