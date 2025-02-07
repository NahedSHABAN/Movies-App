import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
    return (
        <Navbar expand="lg" className="bg-dark text-light shadow-lg">
            <Container>
                <Navbar.Brand href="#home" className='fs-4 fw-bold text-light'>Movies Land</Navbar.Brand>
                <Navbar.Toggle 
                    aria-controls="basic-navbar-nav" 
                    className="border-0 text-light" 
                    style={{ backgroundColor: 'white' }} 
                />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink
                            to="/"
                            className={({ isActive }) => isActive ? "text-danger m-3 text-decoration-none" : "text-light m-3 text-decoration-none"}
                        >
                            Movies
                        </NavLink>
                        <NavLink
                            to="/favorites"
                            className={({ isActive }) => isActive ? "text-danger m-3 text-decoration-none" : "text-light m-3 text-decoration-none"}
                        >
                            Favorites
                        </NavLink>
                    </Nav>
                    <Nav>
                        <NavLink
                            to="/login"
                            className={({ isActive }) => isActive ? "text-danger m-3 text-decoration-none" : "text-light m-3 text-decoration-none"}
                        >
                            Login
                        </NavLink>
                        <NavLink
                            to="/register"
                            className={({ isActive }) => isActive ? "text-danger m-3 text-decoration-none" : "text-light m-3 text-decoration-none"}
                        >
                            Register
                        </NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
