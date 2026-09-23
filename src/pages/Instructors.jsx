import { Link } from 'react-router-dom'
import { INSTRUCTORS, subjectsByInstructor, weeklyHours } from '../data/catalog.js'
import { getInitials } from '../utils/format.js'

function Instructors() {
  return (
    <section className="card">
      <div className="page-header">
        <h1>Instructors</h1>
        <p className="muted">{INSTRUCTORS.length} faculty members this semester</p>
      </div>

      <div className="grid">
        {INSTRUCTORS.map((instructor) => {
          const handled = subjectsByInstructor(instructor.id)

          return (
            <Link key={instructor.id} to={`/instructors/${instructor.id}`} className="tile tile-row">
              <span className="avatar">{getInitials(instructor.name)}</span>
              <div className="student-info">
                <h2 className="tile-title">{instructor.name}</h2>
                {handled.map((s) => (
                  <p key={s.code} className="muted small">{s.title}</p>
                ))}
                <div className="tag-list">
                  {handled.map((s) => (
                    <span key={s.code} className="tag">{s.code}</span>
                  ))}
                  <span className="tag">{weeklyHours(handled)} hrs/week</span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export default Instructors
