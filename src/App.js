import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';


// Import the pages
import SignIn from "./components/sign-in"
import SignUp from "./components/sign-up"
import Landing from "./components/landing"
import CreateEnrollment from "./components/create-enrollment"
import CourseTable from "./components/courseTable"
import StudentTable from "./components/studentTable"
import CreateCourse from "./components/create-course"


function App() {
  return (
      <>
        <div className="App">
          <Router>
            <Routes>
              <Route exact path="/" element={<Landing/>} />
              <Route exact path="sign-in" element={<SignIn/>} />
              <Route exact path="sign-up" element={<SignUp/>} />
              <Route exact path="create-enrollment" element={<CreateEnrollment/>} />
              <Route exact path="courses" element={<CourseTable/>} />
              <Route exact path="students" element={<StudentTable/>} />
              <Route exact path="create-course" element={<CreateCourse/>} />
            </Routes>
          </Router>
        </div>
      </>
  );
}
export default App;
