export const COURSES = [
  'BS Information Technology',
  'BS Computer Science',
  'BS Information Systems',
  'BS Entertainment and Multimedia Computing',
  'BS Computer Engineering',
]

export const YEAR_LEVELS = ['1st Year', '2nd Year', '3rd Year', '4th Year']

const STUDENT_ID_PATTERN = /^\d{4}-\d{4}$/
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// Returns an object of { fieldName: errorMessage } for every invalid field.
export function validateStudent(values, existingStudents = []) {
  const errors = {}
  const fullName = values.fullName.trim()
  const studentId = values.studentId.trim()
  const email = values.email.trim()

  if (!fullName) {
    errors.fullName = 'Full name is required.'
  } else if (fullName.length < 2) {
    errors.fullName = 'Full name must be at least 2 characters.'
  }

  if (!studentId) {
    errors.studentId = 'Student ID is required.'
  } else if (!STUDENT_ID_PATTERN.test(studentId)) {
    errors.studentId = 'Student ID must follow the format ####-#### (e.g. 2024-0001).'
  } else if (existingStudents.some((s) => s.studentId === studentId)) {
    errors.studentId = 'This Student ID is already registered.'
  }

  if (!email) {
    errors.email = 'Email is required.'
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'Please enter a valid email address (e.g. juan@school.edu).'
  }

  if (!values.course) {
    errors.course = 'Please select a course.'
  }

  if (!values.yearLevel) {
    errors.yearLevel = 'Please select a year level.'
  }

  if (values.subjects.length === 0) {
    errors.subjects = 'Please select at least one subject.'
  }

  return errors
}
