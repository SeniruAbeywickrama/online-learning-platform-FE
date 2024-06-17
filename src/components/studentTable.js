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
import NavbarComponent from "./navbar";

function CourseEnrollmentTable() {

    const [enrollments, setEnrollments] = useState(false);

    async function getEnrollmentData() {
        try {
            const response = await axios.get(base_url + "userRoutes/get-all-users");
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
            <>
                <NavbarComponent/>

                <Stack gap={1} className="col-md-9 mx-auto " style={{marginTop: "100px"}}>
                    <Row>
                        <Col>
                            <h4> Students </h4>
                        </Col>
                    </Row>

                    <br/>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {/* Use map to iterate through students array */}
                        {enrollments.map((student, index) => (
                            <tr key={index}>
                                <td>{student._id}</td>
                                <td>{student.name}</td>
                                <td>{student.email}</td>
                                <td colSpan={student.colSpan || 1}>{student.action}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Stack>
            </>
        );
    }
}


export default CourseEnrollmentTable;
