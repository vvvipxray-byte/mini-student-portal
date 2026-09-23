export const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']

export const DAY_NAMES = {
  Mon: 'Monday',
  Tue: 'Tuesday',
  Wed: 'Wednesday',
  Thu: 'Thursday',
  Fri: 'Friday',
}

export const INSTRUCTORS = [
  { id: 'jaypee-julve', name: 'Jaypee Julve' },
  { id: 'sharon-bucalon', name: 'Sharon Bucalon' },
  { id: 'zhyra-rosil', name: 'Zhyra Rosil' },
  { id: 'clyde-tiu', name: 'Clyde Tiu' },
  { id: 'randy-arrubio', name: 'Randy Arrubio' },
  { id: 'mark-banguis', name: 'Mark Banguis' },
]

// Times use 24-hour "HH:MM" so they can be sorted and placed on the timetable.
export const SUBJECTS = [
  {
    code: 'SIA102',
    title: 'Systems Integration and Architecture 2',
    note: 'Elective 4',
    units: 3,
    instructorId: 'jaypee-julve',
    days: ['Mon', 'Thu'],
    start: '08:30',
    end: '10:00',
    description:
      'Designing and connecting enterprise systems using APIs, middleware, and service-oriented architecture.',
  },
  {
    code: 'CAP101',
    title: 'Capstone Project',
    units: 3,
    instructorId: 'sharon-bucalon',
    days: ['Mon', 'Thu'],
    start: '10:30',
    end: '12:00',
    description:
      'Planning, developing, and defending an IT solution that addresses a real-world problem.',
  },
  {
    code: 'IAS102',
    title: 'Information Assurance and Security 2',
    units: 3,
    instructorId: 'zhyra-rosil',
    days: ['Mon', 'Thu'],
    start: '13:00',
    end: '14:30',
    description:
      'Security policies, risk management, cryptography, and incident response for information systems.',
  },
  {
    code: 'WST101',
    title: 'Web Systems and Technologies',
    units: 3,
    instructorId: 'clyde-tiu',
    days: ['Mon', 'Thu'],
    start: '14:30',
    end: '15:30',
    description:
      'Building modern web applications with HTML, CSS, JavaScript, front-end frameworks, and back-end services.',
  },
  {
    code: 'SAM101',
    title: 'System Administration and Maintenance',
    units: 3,
    instructorId: 'randy-arrubio',
    days: ['Wed'],
    start: '07:00',
    end: '12:00',
    description:
      'Installing, configuring, and maintaining operating systems, servers, and network services.',
  },
  {
    code: 'ANI102',
    title: 'Animation 2D/3D',
    units: 3,
    instructorId: 'mark-banguis',
    days: ['Tue', 'Fri'],
    start: '07:00',
    end: '08:30',
    description:
      'Principles of animation and hands-on production of 2D and 3D animated content.',
  },
]

export function findInstructor(id) {
  return INSTRUCTORS.find((instructor) => instructor.id === id)
}

export function findSubject(code) {
  return SUBJECTS.find((subject) => subject.code.toLowerCase() === code.toLowerCase())
}

export function subjectsByInstructor(instructorId) {
  return SUBJECTS.filter((subject) => subject.instructorId === instructorId)
}

export function toMinutes(time) {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

export function formatTime(time) {
  const [hours, minutes] = time.split(':').map(Number)
  const suffix = hours >= 12 ? 'PM' : 'AM'
  return `${hours % 12 || 12}:${String(minutes).padStart(2, '0')} ${suffix}`
}

export function formatDays(days) {
  return days.join(' & ')
}

export function formatTimeRange(subject) {
  return `${formatTime(subject.start)} - ${formatTime(subject.end)}`
}

export function formatSchedule(subject) {
  return `${formatDays(subject.days)} · ${formatTimeRange(subject)}`
}

// Total class hours per week for a list of subjects.
export function weeklyHours(subjects) {
  const minutes = subjects.reduce(
    (sum, s) => sum + (toMinutes(s.end) - toMinutes(s.start)) * s.days.length,
    0,
  )
  return minutes / 60
}
