import { Link } from 'react-router-dom'
import {
  DAYS,
  DAY_NAMES,
  SUBJECTS,
  findInstructor,
  formatTime,
  formatTimeRange,
  toMinutes,
} from '../data/catalog.js'

const SLOT_MINUTES = 30

// Weekly grid (Mon-Fri) with one block per class meeting.
function Timetable({ subjects }) {
  if (subjects.length === 0) {
    return <p className="muted">No classes scheduled.</p>
  }

  const earliest = Math.min(...subjects.map((s) => toMinutes(s.start)))
  const latest = Math.max(...subjects.map((s) => toMinutes(s.end)))
  const dayStart = Math.floor(earliest / 60) * 60
  const dayEnd = Math.ceil(latest / 60) * 60
  const slotCount = (dayEnd - dayStart) / SLOT_MINUTES
  const rowOf = (minutes) => (minutes - dayStart) / SLOT_MINUTES + 2

  const hours = []
  for (let m = dayStart; m < dayEnd; m += 60) hours.push(m)

  const today = DAYS[new Date().getDay() - 1]

  return (
    <div className="timetable-wrap">
      <div
        className="timetable"
        style={{ gridTemplateRows: `auto repeat(${slotCount}, var(--slot-height))` }}
      >
        <div className="tt-corner" />
        {DAYS.map((day, i) => (
          <div
            key={day}
            className={day === today ? 'tt-day today' : 'tt-day'}
            style={{ gridColumn: i + 2 }}
          >
            <span className="tt-day-short">{day}</span>
            <span className="tt-day-long">{DAY_NAMES[day]}</span>
            {day === today && <span className="tt-today-label">Today</span>}
          </div>
        ))}

        {hours.map((minutes) => (
          <div key={minutes} className="tt-time" style={{ gridRow: `${rowOf(minutes)} / span 2` }}>
            {formatTime(`${Math.floor(minutes / 60)}:00`)}
          </div>
        ))}

        {DAYS.map((day, i) =>
          hours.map((minutes) => (
            <div
              key={`${day}-${minutes}`}
              className={day === today ? 'tt-cell today' : 'tt-cell'}
              style={{ gridColumn: i + 2, gridRow: `${rowOf(minutes)} / span 2` }}
            />
          )),
        )}

        {subjects.flatMap((subject) =>
          subject.days.map((day) => (
            <Link
              key={`${subject.code}-${day}`}
              to={`/subjects/${subject.code}`}
              className={`tt-block color-${SUBJECTS.indexOf(subject)}${
                toMinutes(subject.end) - toMinutes(subject.start) <= 60 ? ' compact' : ''
              }`}
              style={{
                gridColumn: DAYS.indexOf(day) + 2,
                gridRow: `${rowOf(toMinutes(subject.start))} / ${rowOf(toMinutes(subject.end))}`,
              }}
              title={`${subject.title} (${formatTimeRange(subject)})`}
            >
              <span className="tt-code">{subject.code}</span>
              <span className="tt-title">{subject.title}</span>
              <span className="tt-meta">{formatTimeRange(subject)}</span>
              <span className="tt-meta">{findInstructor(subject.instructorId).name}</span>
            </Link>
          )),
        )}
      </div>
    </div>
  )
}

export default Timetable
