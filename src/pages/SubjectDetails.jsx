import { Link, useParams } from 'react-router-dom'
import {
  DAY_NAMES,
  findInstructor,
  findSubject,
  formatTimeRange,
  weeklyHours,
} from '../data/catalog.js'
import { getInitials } from '../utils/format.js'

function SubjectDetails({ students }) {
  const { code } = useParams()
  const subject = findSubject(code)

  if (!subject) {
    return (
      <section className="card empty">
        <h1>Subject not found</h1>
        <p className="muted">No subject with code &ldquo;{code}&rdquo; exists.</p>
        <Link to="/subjects" className="btn btn-secondary">&larr; Back to Subjects</Link>
      </section>
    )
  }

  const instructor = findInstructor(subject.instructorId)
  const enrolled = students.filter((s) => s.subjects.includes(subject.code))

  const details = [
    ['Subject Code', subject.code],
    ['Units', subject.units],
    ['Days', subject.days.map((d) => DAY_NAMES[d]).join(' & ')],
    ['Time', formatTimeRange(subject)],
    ['Hours per Week', weeklyHours([subject])],
    ['Instructor', <Link key="i" to={`/instructors/${instructor.id}`}>{instructor.name}</Link>],
  ]

  return (
    <section className="card details-card">
      <Link to="/subjects" className="back-link">&larr; Back to Subjects</Link>

      <div className="page-header">
        <div className="tile-top">
          <span className="tag tag-primary">{subject.code}</span>
          {subject.note && <span className="tag">{subject.note}</span>}
        </div>
        <h1 className="mt-sm">{subject.title}</h1>
        <p className="muted">{subject.description}</p>
      </div>

      <dl className="details">
        {details.map(([label, value]) => (
          <div key={label} className="detail-row">
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>

      <h2 className="section-title">Enrolled Students ({enrolled.length})</h2>
      {enrolled.length === 0 ? (
        <p className="muted">No students enrolled in this subject yet.</p>
      ) : (
        <ul className="student-list">
          {enrolled.map((student) => (
            <li key={student.id} className="student-item">
              <span className="avatar">{getInitials(student.fullName)}</span>
              <div className="student-info">
                <Link to={`/students/${student.id}`} className="student-name">
                  {student.fullName}
                </Link>
                <span className="muted small">{student.studentId}</span>
              </div>
              <span className="tag">{student.yearLevel}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default SubjectDetails
