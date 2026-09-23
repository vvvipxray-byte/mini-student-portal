import { Link, useParams } from 'react-router-dom'
import Timetable from '../components/Timetable.jsx'
import { SUBJECTS, findInstructor, formatSchedule, weeklyHours } from '../data/catalog.js'
import { getInitials } from '../utils/format.js'

function StudentDetails({ students }) {
  const { id } = useParams()
  const student = students.find((s) => s.id === id)

  if (!student) {
    return (
      <section className="card empty">
        <h1>Student not found</h1>
        <p className="muted">No student with ID &ldquo;{id}&rdquo; exists in the list.</p>
        <Link to="/students" className="btn btn-secondary">&larr; Back to Students</Link>
      </section>
    )
  }

  const enrolled = SUBJECTS.filter((s) => student.subjects.includes(s.code))
  const totalUnits = enrolled.reduce((sum, s) => sum + s.units, 0)

  const details = [
    ['Full Name', student.fullName],
    ['Student ID', student.studentId],
    ['Email', student.email],
    ['Course', student.course],
    ['Year Level', student.yearLevel],
    ['Registered', new Date(student.registeredAt).toLocaleString()],
  ]

  return (
    <section className="card details-card">
      <Link to="/students" className="back-link">&larr; Back to Students</Link>

      <div className="profile">
        <span className="avatar avatar-lg">{getInitials(student.fullName)}</span>
        <div>
          <h1>{student.fullName}</h1>
          <p className="muted">{student.course} &middot; {student.yearLevel}</p>
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

      <h2 className="section-title">Enrolled Subjects ({enrolled.length} &middot; {totalUnits} units &middot; {weeklyHours(enrolled)} hrs/week)</h2>
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Subject</th>
              <th>Instructor</th>
              <th>Schedule</th>
              <th>Units</th>
            </tr>
          </thead>
          <tbody>
            {enrolled.map((subject) => {
              const instructor = findInstructor(subject.instructorId)
              return (
                <tr key={subject.code}>
                  <td><span className="tag tag-primary">{subject.code}</span></td>
                  <td><Link to={`/subjects/${subject.code}`}>{subject.title}</Link></td>
                  <td><Link to={`/instructors/${instructor.id}`}>{instructor.name}</Link></td>
                  <td>{formatSchedule(subject)}</td>
                  <td>{subject.units}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <h2 className="section-title">Weekly Schedule</h2>
      <Timetable subjects={enrolled} />
    </section>
  )
}

export default StudentDetails
