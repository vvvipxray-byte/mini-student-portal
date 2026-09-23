import { Link } from 'react-router-dom'
import { getInitials } from '../utils/format.js'

function StudentList({ students }) {
  return (
    <section className="card">
      <div className="page-header with-action">
        <div>
          <h1>Students</h1>
          <p className="muted">
            {students.length} registered student{students.length === 1 ? '' : 's'}
          </p>
        </div>
        <Link to="/register" className="btn btn-primary">+ Add Student</Link>
      </div>

      {students.length === 0 ? (
        <div className="empty">
          <p>No students registered yet.</p>
          <Link to="/register" className="btn btn-secondary">Register the first student</Link>
        </div>
      ) : (
        <ul className="student-list">
          {students.map((student) => (
            <li key={student.id} className="student-item">
              <span className="avatar">{getInitials(student.fullName)}</span>
              <div className="student-info">
                <Link to={`/students/${student.id}`} className="student-name">
                  {student.fullName}
                </Link>
                <span className="muted small">
                  {student.studentId} &middot; {student.course}
                </span>
              </div>
              <span className="tag">{student.yearLevel}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default StudentList
