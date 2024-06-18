import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from "react-bootstrap/Button";
import Cookies from 'js-cookie';
import {useNavigate } from "react-router-dom";


function NavbarStudentComponent(props) {
    const navigate= useNavigate();

    function logout() {
        Cookies.remove('tokene');
        navigate('/sign-in');
        window.location.reload();
    }

    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="/">E Learning Platform</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/">My Profile</Nav.Link>
                </Nav>
                <h6 style={{color : "aqua", marginLeft : "30%", marginTop: "5px"}}>Hello {props.user.name}  &#128512;</h6>
                <Button variant="outline-danger" style={{marginLeft : "50px", width : '100px'}} onClick={logout}>Log Out</Button>

            </Container>
        </Navbar>
    );
}

export default NavbarStudentComponent;
