import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function NavBar() {
    const favoriteCounter = useSelector((state)=>state.favorites.favorite.length)
    return (
        <Navbar expand="lg" className="bg-dark text-light shadow-lg" fixed="top">
            <Container>
                <Navbar.Brand href="#home" className="fs-4 fw-bold text-light">
                    Movies Land
                </Navbar.Brand>
                <Navbar.Toggle
                    aria-controls="basic-navbar-nav"
                    className="border-0 text-light"
                    style={{ backgroundColor: "white" }}
                />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-danger m-3 text-decoration-none"
                                    : "text-light m-3 text-decoration-none"
                            }
                        >
                            Movies
                        </NavLink>
                        <NavLink
                            to="/favorites"
                            className={({ isActive }) =>
                                isActive ? "text-danger m-3 text-decoration-none d-flex align-items-center"
                                    : "text-light m-3 text-decoration-none d-flex align-items-center"
                            }
                        >
                            Favorites
                            <span className="position-relative ms-2">
                                {/* Heart Icon */}
                                <FaHeart className="fs-4 text-light" />

                                {/* Small Number Inside Heart */}
                                <span
                                    className="position-absolute text-danger fw-bold"
                                    style={{
                                        fontSize: "0.65rem",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%, -50%)",
                                        backgroundColor: "transparent",
                                    }}
                                >
                                  {(favoriteCounter === 0)?'':favoriteCounter }
                                </span>
                            </span>
                        </NavLink>

                    </Nav>
                    <Nav>
                        <NavLink
                            to="/login"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-danger m-3 text-decoration-none"
                                    : "text-light m-3 text-decoration-none"
                            }
                        >
                            Login
                        </NavLink>
                        <NavLink
                            to="/register"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-danger m-3 text-decoration-none"
                                    : "text-light m-3 text-decoration-none"
                            }
                        >
                            Register
                        </NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
