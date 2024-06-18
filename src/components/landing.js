import {Link} from "react-router-dom";
import SignIn from "./sign-in";
import NavbarComponent from "../components/navbar";
import CourseEnrollmentTable from "./CourseEnrollmentTable";
import {useEffect, useState} from "react";
import Cookies from 'js-cookie';
import {jwtDecode} from "jwt-decode";
import NavbarStudentComponent from "./navbar-student";
import StudentCourseEnrollmentTable from "./studentEnrollmentTable";

function Landing() {

    const [userType, setUserType] = useState(null);
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);


    useEffect(() => {
        const token = Cookies.get('tokene');
        setToken(token)
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const user = decodedToken.user;
                setUser(user)
                setUserType(user.role); // Assuming user object has a type property
            } catch (error) {
                console.error('Invalid token', error);
            }
        }
    }, []);

    if(token === null || token === undefined){
        return (
          <SignIn/>
        );
    }


    if(userType === 0){
        return (

            <>
                <NavbarComponent/>
                <CourseEnrollmentTable/>
            </>
        );
    }else {
        console.log("Hii")

        return (
            <>
                <NavbarStudentComponent user={user} />
                <StudentCourseEnrollmentTable user={user}/>
            </>
        );
    }


}

export default Landing;
