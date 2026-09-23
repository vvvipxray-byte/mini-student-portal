import { Link } from 'react-router-dom'
import { SUBJECTS, findInstructor, formatDays, formatTimeRange } from '../data/catalog.js'

function Subjects({ students }) {
  return (
    <section className="card">
      <div className="page-header with-action">
        <div>
          <h1>Subjects</h1>
          <p className="muted">{SUBJECTS.length} subjects offered this semester</p>
        </div>
        <Link to="/schedule" className="btn btn-secondary">View Weekly Schedule</Link>
      </div>

      <div className="grid">
        {SUBJECTS.map((subject, i) => {
          const instructor = findInstructor(subject.instructorId)
          const enrolled = students.filter((s) => s.subjects.includes(subject.code)).length

          return (
            <Link key={subject.code} to={`/subjects/${subject.code}`} className={`tile accent color-${i}`}>
              <div className="tile-top">
                <span className="tag tag-primary">{subject.code}</span>
                {subject.note && <span className="tag">{subject.note}</span>}
              </div>
              <h2 className="tile-title">{subject.title}</h2>
              <p className="muted small">{instructor.name}</p>
              <div className="tile-meta">
                <span>
                  {formatDays(subject.days)}
                  <br />
                  {formatTimeRange(subject)}
                </span>
                <span>{enrolled} enrolled</span>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export default Subjects
