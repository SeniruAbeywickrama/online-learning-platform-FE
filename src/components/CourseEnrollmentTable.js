import Table from 'react-bootstrap/Table';
import Stack from "react-bootstrap/Stack";
import {useEffect} from "react";
import axios from "axios";
import base_url from "../config";
import {useState} from "react";
import Button from "react-bootstrap/Button";
import {Modal, Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import {Link} from "react-router-dom";
import { MdDelete } from "react-icons/md";

function CourseEnrollmentTable() {

    const [enrollments, setEnrollments] = useState(false);
    const [show, setShow] = useState(false);
    const [id, setId] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setId(id)
        setShow(true);
    }

    async function getEnrollmentData() {
        try {
            const response = await axios.get(base_url + "enrollmentRoute/get-all-enrollments");
            console.log(response.data.data);
            setEnrollments(response.data.data);
        } catch (error) {
            console.log(error)
        }
    }

    const deleteEnrollment = () =>{
        const headers = {
            id: id,
        };
        axios.delete(base_url + "enrollmentRoute/delete-enrollment", { headers })
            .then(() => console.log("Delete successfully"))
            .catch(error => {
                console.error('There was an error!', error);
            });
        setShow(false)
        window.location.reload();
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
                            <td>
                                <Button variant="danger" onClick={() => handleShow(student.id)}>
                                    <MdDelete className="text-xl"/>
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
                <Modal show={show} onHide={handleClose} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete this?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="danger" onClick={deleteEnrollment}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Stack>
        );
    }
}


export default CourseEnrollmentTable;
