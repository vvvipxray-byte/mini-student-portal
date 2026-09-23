import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Register from './pages/Register.jsx'
import StudentList from './pages/StudentList.jsx'
import StudentDetails from './pages/StudentDetails.jsx'
import Subjects from './pages/Subjects.jsx'
import SubjectDetails from './pages/SubjectDetails.jsx'
import Instructors from './pages/Instructors.jsx'
import InstructorDetails from './pages/InstructorDetails.jsx'
import Schedule from './pages/Schedule.jsx'
import NotFound from './pages/NotFound.jsx'

function App() {
  // Lifted state: the single source of truth for all registered students.
  const [students, setStudents] = useState([])

  function addStudent(student) {
    setStudents((prev) => [...prev, student])
  }

  return (
    <div className="app">
      <Navbar studentCount={students.length} />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home studentCount={students.length} />} />
          <Route
            path="/register"
            element={<Register students={students} onAddStudent={addStudent} />}
          />
          <Route path="/students" element={<StudentList students={students} />} />
          <Route path="/students/:id" element={<StudentDetails students={students} />} />
          <Route path="/subjects" element={<Subjects students={students} />} />
          <Route path="/subjects/:code" element={<SubjectDetails students={students} />} />
          <Route path="/instructors" element={<Instructors />} />
          <Route path="/instructors/:id" element={<InstructorDetails students={students} />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="footer">Mini Student Portal &middot; Hands-On Activity 3</footer>
    </div>
  )
}

export default App
