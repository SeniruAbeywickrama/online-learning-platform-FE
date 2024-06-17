import {Link} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import Col from 'react-bootstrap/Col';
import {useState} from "react";
import axios from "axios";
import base_url from "../config";

function SignUp() {
    const [validated, setValidated] = useState(false);
    const [name, setName] = useState(false);
    const [email, setEmail] = useState(false);
    const [password, setPassword] = useState(false);


    const valueName = (e) => setName(e.target.value);
    const valueEmail = (e) => setEmail(e.target.value);
    const valuePassword = (e) => setPassword(e.target.value);

    async function signUp() {
        try {
            const { data } = await axios.post(base_url + "userRoutes/create-user", {
                name : name,
                email : email,
                password : password
            });
            if(data.code === 201){
                alert(data.message)
            }else if(data.code === 200){
                alert("Created successfully")
                window.open(`/sign-in`);
            }else {
                alert("Login error")
            }
            console.log(data);
        } catch (error) {
            console.error('Error saving product:', error);
        }
    }

    return (

        <div style={{backgroundColor : "#c7ecee", padding : "15px", borderRadius : "10px"}}>
            <Stack gap={2} className="col-md-5 mx-auto " style={{marginTop : "100px"}}>
                <Form validated={validated}>
                    <h2 style={{textAlign : "center"}}>Students Login </h2>
                    <br/>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" required onChange={valueName}/>
                        <Form.Control.Feedback type="invalid">
                            Please enter a name.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" required  onChange={valueEmail}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" required onChange={valuePassword}/>
                    </Form.Group>
                    <br/>
                    <Stack gap={2} className="col-md-5 mx-auto ">
                        <Button variant="secondary" onClick={signUp}>Add Student</Button>
                        <Link to="/sign-in">
                            <Button variant="outline-secondary" style={{width : "100%"}}>Sign In</Button>
                        </Link>
                    </Stack>
                </Form>
            </Stack>
        </div>

    );
}

export default SignUp;
