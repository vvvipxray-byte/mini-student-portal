import { Link, useParams } from 'react-router-dom'
import Timetable from '../components/Timetable.jsx'
import {
  DAYS,
  DAY_NAMES,
  findInstructor,
  formatSchedule,
  subjectsByInstructor,
  weeklyHours,
} from '../data/catalog.js'
import { getInitials } from '../utils/format.js'

function InstructorDetails({ students }) {
  const { id } = useParams()
  const instructor = findInstructor(id)

  if (!instructor) {
    return (
      <section className="card empty">
        <h1>Instructor not found</h1>
        <p className="muted">No instructor with ID &ldquo;{id}&rdquo; exists.</p>
        <Link to="/instructors" className="btn btn-secondary">&larr; Back to Instructors</Link>
      </section>
    )
  }

  const handled = subjectsByInstructor(instructor.id)
  const teachingDays = DAYS.filter((day) => handled.some((s) => s.days.includes(day)))

  const details = [
    ['Subjects Handled', handled.length],
    ['Teaching Days', teachingDays.map((d) => DAY_NAMES[d]).join(', ')],
    ['Hours per Week', weeklyHours(handled)],
  ]

  return (
    <section className="card details-card">
      <Link to="/instructors" className="back-link">&larr; Back to Instructors</Link>

      <div className="profile">
        <span className="avatar avatar-lg">{getInitials(instructor.name)}</span>
        <div>
          <h1>{instructor.name}</h1>
          <p className="muted">Instructor</p>
        </div>
      </div>

      <dl className="details">
        {details.map(([label, value]) => (
          <div key={label} className="detail-row">
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>

      <h2 className="section-title">Subjects Handled</h2>
      <ul className="student-list">
        {handled.map((subject) => {
          const enrolled = students.filter((s) => s.subjects.includes(subject.code)).length
          return (
            <li key={subject.code} className="student-item">
              <span className="tag tag-primary">{subject.code}</span>
              <div className="student-info">
                <Link to={`/subjects/${subject.code}`} className="student-name">
                  {subject.title}
                </Link>
                <span className="muted small">{formatSchedule(subject)}</span>
              </div>
              <span className="tag">{enrolled} enrolled</span>
            </li>
          )
        })}
      </ul>

      <h2 className="section-title">Weekly Schedule</h2>
      <Timetable subjects={handled} />
    </section>
  )
}

export default InstructorDetails
