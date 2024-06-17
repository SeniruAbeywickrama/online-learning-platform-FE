import {Link} from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import {useState} from "react";
import base_url from "../config";
import axios from "axios";


function SignIn() {
    const [validated, setValidated] = useState(false);
    const [email, setEmail] = useState(false);
    const [password, setPassword] = useState(false);

    async function signIn(){
        try {
            const { data } = await axios.post(base_url + "userRoutes/login", {
                email : email,
                password : password
            });

            if(data.code === 401){
                alert(data.error)
            }else if(data.code === 402){
                alert(data.error)
            }else if(data.code === 200){
                console.log("ok");
                alert("Login successfully")
                window.open(`/`);
            }else {
                alert("Login error")
            }
            console.log(data);
        } catch (error) {
            console.error('Error saving product:', error);
        }
    }

    const valueEmail = (e) => setEmail(e.target.value);
    const valuePassword = (e) => setPassword(e.target.value);


    return (
        <>
            <div style={{backgroundColor : "#c7ecee", padding : "15px", borderRadius : "10px"}}>
                <Stack gap={2} className="col-md-5 mx-auto " style={{marginTop : "100px"}}>
                    <Form validated={validated}>
                        <h2 style={{textAlign : "center"}}>Students Login </h2>
                        <br/>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" required onChange={valueEmail}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" required onChange={valuePassword}/>
                        </Form.Group>
                        <br/>
                        <Stack gap={2} className="col-md-5 mx-auto ">
                            <Button variant="secondary" onClick={signIn}>Sign in</Button>
                            <Link to="/sign-up">
                                <Button variant="outline-secondary" style={{width : "100%"}}>Sign Up</Button>
                            </Link>
                        </Stack>
                    </Form>

                </Stack>
            </div>
        </>
    );
}

export default SignIn;
