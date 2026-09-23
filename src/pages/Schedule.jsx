import { Link } from 'react-router-dom'
import Timetable from '../components/Timetable.jsx'
import {
  DAYS,
  DAY_NAMES,
  SUBJECTS,
  findInstructor,
  formatTimeRange,
  toMinutes,
  weeklyHours,
} from '../data/catalog.js'

function Schedule() {
  const byDay = DAYS.map((day) => ({
    day,
    classes: SUBJECTS.filter((s) => s.days.includes(day)).sort(
      (a, b) => toMinutes(a.start) - toMinutes(b.start),
    ),
  }))

  return (
    <section className="card">
      <div className="page-header">
        <h1>Class Schedule</h1>
        <p className="muted">
          {SUBJECTS.length} subjects &middot; {weeklyHours(SUBJECTS)} hours of class per week
        </p>
      </div>

      <Timetable subjects={SUBJECTS} />

      <h2 className="section-title">By Day</h2>
      <div className="day-list">
        {byDay.map(({ day, classes }) => (
          <div key={day} className="day-group">
            <h3 className="day-heading">{DAY_NAMES[day]}</h3>
            {classes.length === 0 ? (
              <p className="muted small">No classes</p>
            ) : (
              <ul className="student-list">
                {classes.map((subject) => (
                  <li key={subject.code} className="student-item">
                    <span className={`time-chip color-${SUBJECTS.indexOf(subject)}`}>
                      {formatTimeRange(subject)}
                    </span>
                    <div className="student-info">
                      <Link to={`/subjects/${subject.code}`} className="student-name">
                        {subject.title}
                      </Link>
                      <span className="muted small">
                        {subject.code} &middot;{' '}
                        <Link to={`/instructors/${subject.instructorId}`}>
                          {findInstructor(subject.instructorId).name}
                        </Link>
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default Schedule
