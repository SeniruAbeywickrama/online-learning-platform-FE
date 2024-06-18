import Table from 'react-bootstrap/Table';
import Stack from "react-bootstrap/Stack";
import {useEffect,useState} from "react";
import axios from "axios";
import base_url from "../config";
import {Modal, Row} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import {Link} from "react-router-dom";
import NavbarComponent from "./navbar";
import Button from "react-bootstrap/Button";
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

    const deleteStudent = () =>{
        const headers = {
            id: id,
        };
        axios.delete(base_url + "userRoutes/delete-user", { headers })
            .then(() => console.log("Delete successfully"))
            .catch(error => {
                console.error('There was an error!', error);
            });
        setShow(false)
        window.location.reload();
    }

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
                                <td>
                                    <Button variant="danger" onClick={() => handleShow(student._id)}>
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
                            <Button variant="danger" onClick={deleteStudent}>
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
