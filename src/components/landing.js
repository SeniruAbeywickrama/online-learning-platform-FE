import {Link} from "react-router-dom";
import SignIn from "./sign-in";
import NavbarComponent from "../components/navbar";
import CourseEnrollmentTable from "./CourseEnrollmentTable";
import {useState} from "react";

function Landing() {

    const [userType, setUserType] = useState(0);

    if(userType === 0){
        return (

            <>
                <NavbarComponent/>
                <CourseEnrollmentTable/>
            </>
        );
    }else {
        return (
            <>
                <NavbarComponent/>
                <CourseEnrollmentTable/>
            </>
        );
    }


}

export default Landing;
