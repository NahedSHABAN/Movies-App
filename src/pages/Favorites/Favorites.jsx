import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { removeFavorite } from "../../store/slices/favoriteSlice"; // Import actions

export default function Favorites() {
    const favoriteMovies = useSelector((state) => state.favorites.favorite);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <Container className="mt-4">
            <h2 className="mb-4 text-center text-light">Your Favorite Movies</h2>

            {favoriteMovies.length === 0 ? (
                <p className="text-center text-light">No favorites added yet.</p>
            ) : (
                <Row className="g-4">
                    {favoriteMovies.map((movie) => (
                        <Col key={movie.id} lg={3} md={6}>
                            <Card className="shadow-lg h-100 d-flex flex-column bg-dark text-light border-light position-relative">
                                <Card.Img
                                    variant="top"
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                                />
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title>{movie.title}</Card.Title>
                                    <Card.Text
                                        style={{
                                            minHeight: "4.5rem",
                                            overflow: "hidden"
                                        }}
                                    >
                                        {movie.overview.length > 100
                                            ? movie.overview.substring(0, 100) + "..."
                                            : movie.overview}
                                    </Card.Text>
                                    
                                    {/* Remove from Favorites Button */}
                                    <Button
                                        variant="danger"
                                        className="mt-2"
                                        onClick={() => dispatch(removeFavorite(movie.id))}
                                    >
                                        <FaTrash className="me-2" /> Remove
                                    </Button>

                                    {/* Watch Now Button */}
                                    <Button
                                        variant="outline-light"
                                        className="mt-2"
                                        onClick={() => navigate(`/movies/${movie.id}`)}
                                    >
                                        Watch Now
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
}
