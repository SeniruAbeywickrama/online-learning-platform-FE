import Table from 'react-bootstrap/Table';
import Stack from "react-bootstrap/Stack";
import {useEffect} from "react";
import axios from "axios";
import base_url from "../config";
import {useState} from "react";
import Button from "react-bootstrap/Button";
import {Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import {Link} from "react-router-dom";

function CourseEnrollmentTable() {

    const [enrollments, setEnrollments] = useState(false);

    const students = [
        { id: 1, student: 'Mark', course: 'Otto', action: '@mdo' },
        { id: 2, student: 'Jacob', course: 'Thornton', action: '@fat' },
        { id: 3, student: 'Larry the Bird', course: '', action: '@twitter', colSpan: 2 }
    ];

    async function getEnrollmentData() {
        try {
            const response = await axios.get(base_url + "enrollmentRoute/get-all-enrollments");
            console.log(response.data.data);
            setEnrollments(response.data.data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getEnrollmentData().then(r =>
            console.log("get all products success"))
    },[])

    if(enrollments) {
        return (

            <Stack gap={1} className="col-md-9 mx-auto " style={{marginTop: "100px"}}>
                <Row>
                    <Col>
                        <h4> Course Enrollments </h4>
                    </Col>
                    <Col>
                        <Link to="/create-enrollment">
                            <Button variant="outline-primary" style={{width : "30%",marginLeft : "400px"}}>Create Enrollment</Button>
                        </Link>
                    </Col>
                </Row>

                <br/>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Student</th>
                        <th>Course</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* Use map to iterate through students array */}
                    {enrollments.map((student, index) => (
                        <tr key={index}>
                            <td>{student.id}</td>
                            <td>{student.course}</td>
                            <td>{student.user}</td>
                            <td colSpan={student.colSpan || 1}>{student.action}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Stack>
        );
    }
}


export default CourseEnrollmentTable;
