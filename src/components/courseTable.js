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
import NavbarComponent from "./navbar";
import {MdDelete} from "react-icons/md";

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
            const response = await axios.get(base_url + "courseRoute/get-all-courses");
            console.log(response.data.data);
            setEnrollments(response.data.data);
        } catch (error) {
            console.log(error)
        }
    }

    const deleteCourse = () =>{
        const headers = {
            id: id,
        };
        axios.delete(base_url + "courseRoute/delete-course", { headers })
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
            <>
            <NavbarComponent/>

            <Stack gap={1} className="col-md-9 mx-auto " style={{marginTop: "100px"}}>
                <Row>
                    <Col>
                        <h4> Courses </h4>
                    </Col>
                    <Col>
                        <Link to="/create-course">
                            <Button variant="outline-primary" style={{width : "30%",marginLeft : "400px"}}>Create Course</Button>
                        </Link>
                    </Col>
                </Row>

                <br/>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Code</th>
                        <th>Name</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {/* Use map to iterate through students array */}
                    {enrollments.map((course, index) => (
                        <tr key={index}>
                            <td>{course._id}</td>
                            <td>{course.code}</td>
                            <td>{course.name}</td>
                            <td>
                                <Button variant="danger" onClick={() => handleShow(course._id)}>
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
                        <Button variant="danger" onClick={deleteCourse}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Stack>
            </>
        );
    }
}


export default CourseEnrollmentTable;
