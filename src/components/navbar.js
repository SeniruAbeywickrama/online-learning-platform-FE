import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavbarComponent() {
    return (
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/">E Learning Platform</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/courses">Course Management</Nav.Link>
                        <Nav.Link href="/students">Student Management</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
    );
}

export default NavbarComponent;
