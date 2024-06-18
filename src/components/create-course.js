import {Link} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import base_url from "../config";
import {useEffect,useState} from "react";

function CreateCourse() {
    const [validated, setValidated] = useState(false);


    const [code, setCode] = useState("");
    const [name, setName] = useState("");


    const valueCode = (e) => setCode(e.target.value);
    const valueName = (e) => setName(e.target.value);



    async function addCourse() {
        try{
            const {data} = await axios.post(base_url + "courseRoute/create-course", {
                code: code,
                name: name
            });

            if (data.code === 200) {
                alert(data.message)
                window.open(`/courses`);
            } else {
                alert("Login error")
            }
        } catch (error) {
            console.error('Error saving product:', error);
        }
    }

        return (
            <div style={{backgroundColor : "#c7ecee", padding : "15px", borderRadius : "10px"}}>
                <Stack gap={2} className="col-md-5 mx-auto " style={{marginTop : "100px"}}>
                    <Form validated={validated}>
                        <h2 style={{textAlign : "center"}}>Create New Course </h2>
                        <br/>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Code</Form.Label>
                            <Form.Control type="text" placeholder="Enter course code" required onChange={valueCode}/>
                            <Form.Control.Feedback type="invalid">
                                Please enter a code.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter course name" required  onChange={valueName}/>
                        </Form.Group>
                        <Stack gap={2} className="col-md-5 mx-auto ">
                            <Button variant="secondary" onClick={addCourse}>Add Course</Button>
                            <Link to="/">
                                <Button variant="outline-primary" style={{width : "100%"}}>Home</Button>
                            </Link>
                        </Stack>
                    </Form>
                </Stack>
            </div>

        );
}

export default CreateCourse;
