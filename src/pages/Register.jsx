import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SUBJECTS, findInstructor, formatSchedule } from '../data/catalog.js'
import { COURSES, YEAR_LEVELS, validateStudent } from '../utils/validate.js'

const initialValues = {
  fullName: '',
  studentId: '',
  email: '',
  course: '',
  yearLevel: '',
  subjects: [],
}

function Register({ students, onAddStudent }) {
  const navigate = useNavigate()
  const [values, setValues] = useState(initialValues)
  const [touched, setTouched] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const errors = validateStudent(values, students)
  const showError = (field) => (touched[field] || submitted) && errors[field]

  function handleChange(e) {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  function toggleSubject(code) {
    setTouched((prev) => ({ ...prev, subjects: true }))
    setValues((prev) => ({
      ...prev,
      subjects: prev.subjects.includes(code)
        ? prev.subjects.filter((c) => c !== code)
        : [...prev.subjects, code],
    }))
  }

  function toggleAllSubjects() {
    setTouched((prev) => ({ ...prev, subjects: true }))
    setValues((prev) => ({
      ...prev,
      subjects: prev.subjects.length === SUBJECTS.length ? [] : SUBJECTS.map((s) => s.code),
    }))
  }

  function handleBlur(e) {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
    if (Object.keys(errors).length > 0) return

    onAddStudent({
      id: values.studentId.trim(),
      fullName: values.fullName.trim(),
      studentId: values.studentId.trim(),
      email: values.email.trim(),
      course: values.course,
      yearLevel: values.yearLevel,
      subjects: values.subjects,
      registeredAt: new Date().toISOString(),
    })
    navigate('/students')
  }

  function handleReset() {
    setValues(initialValues)
    setTouched({})
    setSubmitted(false)
  }

  const totalUnits = SUBJECTS.filter((s) => values.subjects.includes(s.code)).reduce(
    (sum, s) => sum + s.units,
    0,
  )

  const fieldClass = (field) => (showError(field) ? 'input invalid' : 'input')

  return (
    <section className="card form-card">
      <div className="page-header">
        <h1>Student Registration</h1>
        <p className="muted">All fields are required.</p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            className={fieldClass('fullName')}
            placeholder="Juan Dela Cruz"
            value={values.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={Boolean(showError('fullName'))}
            aria-describedby="fullName-error"
          />
          {showError('fullName') && <p id="fullName-error" className="error">{errors.fullName}</p>}
        </div>

        <div className="field-row">
          <div className="field">
            <label htmlFor="studentId">Student ID</label>
            <input
              id="studentId"
              name="studentId"
              type="text"
              className={fieldClass('studentId')}
              placeholder="2024-0001"
              maxLength={9}
              value={values.studentId}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(showError('studentId'))}
              aria-describedby="studentId-error"
            />
            {showError('studentId') && <p id="studentId-error" className="error">{errors.studentId}</p>}
          </div>

          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className={fieldClass('email')}
              placeholder="juan@school.edu"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(showError('email'))}
              aria-describedby="email-error"
            />
            {showError('email') && <p id="email-error" className="error">{errors.email}</p>}
          </div>
        </div>

        <div className="field">
          <label htmlFor="course">Course</label>
          <select
            id="course"
            name="course"
            className={fieldClass('course')}
            value={values.course}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={Boolean(showError('course'))}
            aria-describedby="course-error"
          >
            <option value="">-- Select a course --</option>
            {COURSES.map((course) => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>
          {showError('course') && <p id="course-error" className="error">{errors.course}</p>}
        </div>

        <fieldset className="field">
          <legend>Year Level</legend>
          <div className={showError('yearLevel') ? 'radio-group invalid' : 'radio-group'}>
            {YEAR_LEVELS.map((level) => (
              <label key={level} className={values.yearLevel === level ? 'radio checked' : 'radio'}>
                <input
                  type="radio"
                  name="yearLevel"
                  value={level}
                  checked={values.yearLevel === level}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {level}
              </label>
            ))}
          </div>
          {showError('yearLevel') && <p className="error">{errors.yearLevel}</p>}
        </fieldset>

        <fieldset className="field">
          <legend className="legend-row">
            <span>Subjects</span>
            <button type="button" className="link-button" onClick={toggleAllSubjects}>
              {values.subjects.length === SUBJECTS.length ? 'Clear all' : 'Select all'}
            </button>
          </legend>
          <div className={showError('subjects') ? 'subject-options invalid' : 'subject-options'}>
            {SUBJECTS.map((subject) => {
              const checked = values.subjects.includes(subject.code)
              return (
                <label key={subject.code} className={checked ? 'subject-option checked' : 'subject-option'}>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleSubject(subject.code)}
                  />
                  <span className="subject-option-text">
                    <strong>{subject.title}</strong>
                    <span className="muted small">
                      {subject.code} &middot; {findInstructor(subject.instructorId).name}
                      <br />
                      {formatSchedule(subject)}
                    </span>
                  </span>
                </label>
              )
            })}
          </div>
          <p className="muted small">
            {values.subjects.length} selected &middot;{' '}
            {totalUnits} units
          </p>
          {showError('subjects') && <p className="error">{errors.subjects}</p>}
        </fieldset>

        <div className="actions">
          <button type="submit" className="btn btn-primary">Register Student</button>
          <button type="button" className="btn btn-secondary" onClick={handleReset}>Clear</button>
        </div>
      </form>
    </section>
  )
}

export default Register
