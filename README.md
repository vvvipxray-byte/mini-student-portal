# Mini Student Portal

Hands-On Activity 3: a React single-page app that combines controlled forms, validation, lifted state, lists, and routing.

## Features

- **Routing** (`react-router-dom`): `/` Home, `/register`, `/students`, `/students/:id`, and `*` (404)
- **Navigation bar** built with `NavLink`, with a highlighted active link
- **Controlled registration form**: Full Name, Student ID, Email, Course (select), Year Level (radio buttons)
- **Validation**:
  - every field is required
  - Student ID must match `####-####` and must not already be registered
  - Email must be a valid address
  - an error message appears under each invalid field
- **Lifted state**: the `students` array lives in `App`. A valid submit adds the student and calls `navigate("/students")`
- **Student list** rendered with keys. Each name is a `<Link>` to `/students/:id`, which shows that student's details
- **Subjects** (`/subjects`, `/subjects/:code`): 6 subjects, each with its instructor, days, time, and enrolled students
- **Instructors** (`/instructors`, `/instructors/:id`): 6 instructors and the subjects each one handles
- **Schedule** (`/schedule`): a color-coded weekly timetable plus a day-by-day list, with today highlighted. The Home page shows today's classes, and each student and instructor page shows their own weekly timetable
- **Enrollment**: students choose their subjects on the registration form (at least one is required); their details page lists the subjects and total units

## Getting started

```bash
npm install
npm run dev
```

Then open the URL that Vite prints (usually http://localhost:5173).

## Project structure

```
src/
├── main.jsx               # wraps <App /> in <BrowserRouter>
├── App.jsx                # lifted students state + route definitions
├── data/
│   └── catalog.js         # subjects, instructors, schedule, and time helpers
├── components/
│   ├── Navbar.jsx         # NavLink navigation with active styling
│   └── Timetable.jsx      # reusable weekly timetable grid
├── pages/
│   ├── Home.jsx
│   ├── Register.jsx       # controlled form + validation + navigate()
│   ├── StudentList.jsx    # keyed list with <Link>s
│   ├── StudentDetails.jsx # reads :id with useParams(), shows enrolled subjects
│   ├── Subjects.jsx
│   ├── SubjectDetails.jsx
│   ├── Instructors.jsx
│   ├── InstructorDetails.jsx
│   ├── Schedule.jsx
│   └── NotFound.jsx       # 404 page
├── utils/
│   ├── validate.js        # validation rules, course and year-level options
│   └── format.js          # getInitials helper
└── index.css              # styles
```
