import {Link,useNavigate} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import base_url from "../config";
import {useEffect,useState} from "react";

function CreateEnrollment() {
    const [validated, setValidated] = useState(false);

    const [allUsers, setAllUsers] = useState("");
    const [allCourses, setAllCourses] = useState("");
    const [user, setUsers] = useState("");
    const [course, setCourses] = useState("");
    const navigate= useNavigate();

    const valueUser = (e) => setUsers(e.target.value);
    const valueCourse = (e) => setCourses(e.target.value);


    const getAllUsers = async() =>{
        try {
            const response = await axios.get(base_url + "userRoutes/get-all-users");
            console.log(response.data.data);
            setAllUsers(response.data.data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllUsers()
        getAllCourses()
    },[])

    const getAllCourses = async() =>{
        try {
            const response = await axios.get(base_url + "courseRoute/get-all-courses");
            console.log(response.data.data);
            setAllCourses(response.data.data);
        } catch (error) {
            console.log(error)
        }
    }

    async function addEnrollment() {
        try{
            const {data} = await axios.post(base_url + "enrollmentRoute/create-enrollment", {
                userId: user,
                courseId: course
            });

            if (data.code === 200) {
                alert(data.message)
                navigate('/');
                window.location.reload();
            } else {
                alert("Login error")
            }
        } catch (error) {
            console.error('Error saving product:', error);
        }
    }

    if(allUsers && allCourses) {
        return (

            <div style={{backgroundColor: "#c7ecee", padding: "15px", borderRadius: "10px"}}>
                <Stack gap={2} className="col-md-5 mx-auto " style={{marginTop: "100px"}}>
                    <Form validated={validated}>
                        <h2 style={{textAlign: "center"}}>Create Enrollment </h2>
                        <br/>
                        <Form.Group controlId="formGridState">
                            <Form.Label>Select User</Form.Label>
                            <Form.Select defaultValue="Choose..." required onChange={valueUser}>
                                <option>Choose...</option>
                                {allUsers.map((user) => (
                                    <option key={user._id} value={user._id}>
                                        {user.name} {/* Display user's name */}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <br/>
                        <Form.Group controlId="formGridState">
                            <Form.Label>Select Courses</Form.Label>
                            <Form.Select defaultValue="Choose..." required onChange={valueCourse}>
                                <option>Choose...</option>
                                {allCourses.map((course) => (
                                    <option key={course._id} value={course._id}>
                                        {course.name} {/* Display user's name */}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <br/>
                        <Stack gap={2} className="col-md-5 mx-auto ">
                            <Button variant="secondary" onClick={addEnrollment}>Add Enrollment</Button>
                            <Link to="/">
                                <Button variant="outline-primary" style={{width: "100%"}}>Home</Button>
                            </Link>
                        </Stack>
                    </Form>
                </Stack>
            </div>

        );
    }
}

export default CreateEnrollment;
