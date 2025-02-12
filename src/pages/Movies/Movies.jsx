import { useEffect, useState } from "react";
import axiosInstance from "./../../axiosConfig/instance";
import { Button, Card, Col, Container, Form, InputGroup, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaRegHeart, FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../../store/slices/favoriteSlice"; // Import actions

export default function Movies() {
    const [movies, setMovies] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Get favorites from Redux
    const favoriteMovies = useSelector((state) => state.favorites.favorite);

    useEffect(() => {
        fetchMovies(currentPage);
    }, [currentPage]);

    const fetchMovies = (page) => {
        setLoading(true);
        axiosInstance.get("movie/popular", { params: { page } })
            .then((res) => {
                setMovies(res.data.results);
                setSearchResults(res.data.results);
                setTotalPages(res.data.total_pages);
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    };

    const handleSearch = (event) => setSearchInput(event.target.value);

    const handleSearchClick = () => {
        const filteredMovies = movies.filter(movie =>
            movie.title.toLowerCase().includes(searchInput.toLowerCase())
        );
        setSearchResults(filteredMovies);
    };

    const handlePrevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
    const handleNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

    // Redux toggle favorite function
    const toggleFavorite = (movie) => {
        const isFavorite = favoriteMovies.some(m => m.id === movie.id);
        if (isFavorite) {
            dispatch(removeFavorite(movie.id));
        } else {
            dispatch(addFavorite(movie));
        }
    };

    return (
        <Container className="mt-4">
            <h2 className="mb-4 text-center text-light">Popular Movies</h2>

            {/* Search Bar */}
            <div className="d-flex justify-content-center mb-4">
                <InputGroup className="w-50">
                    <Form.Control
                        type="text"
                        placeholder="Search movies..."
                        value={searchInput}
                        onChange={handleSearch}
                    />
                    <Button variant="outline-light" className="bg-white text-dark" onClick={handleSearchClick}>
                        <FaSearch />
                    </Button>
                </InputGroup>
            </div>

            {loading ? (
                <div className="d-flex justify-content-center my-5">
                    <Spinner animation="border" variant="light" size="lg" />
                </div>
            ) : (
                <Row className="g-4" md={6}>
                    {searchResults.map((movie) => (
                        <Col key={movie.id} lg={3} md={6}>
                            <Card className="shadow-lg h-100 d-flex flex-column bg-dark text-light border-light position-relative">
                                {/* Favorite Button */}
                                <button
                                    className="position-absolute top-0 end-0 m-2 bg-transparent border-0"
                                    style={{ zIndex: 1 }}
                                    onClick={() => toggleFavorite(movie)}
                                >
                                    {favoriteMovies.some(m => m.id === movie.id) ? (
                                        <FaHeart className="fs-2 text-danger" />
                                    ) : (
                                        <FaRegHeart className="fs-2 text-light" />
                                    )}
                                </button>

                                <Card.Img
                                    variant="top"
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                                />
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title
                                        style={{
                                            display: "-webkit-box",
                                            WebkitBoxOrient: "vertical",
                                            WebkitLineClamp: 2,
                                            overflow: "hidden"
                                        }}
                                    >
                                        {movie.title}
                                    </Card.Title>
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
                                    <Button
                                        variant="outline-light"
                                        className="mt-auto"
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

            {/* Pagination Controls */}
            <div className="d-flex justify-content-center mt-4">
                <Button variant="light" className="me-2" onClick={handlePrevPage} disabled={currentPage === 1}>
                    Previous
                </Button>
                <span className="text-light mx-2 align-self-center">
                    Page {currentPage} of {totalPages}
                </span>
                <Button variant="light" className="ms-2" onClick={handleNextPage} disabled={currentPage === totalPages}>
                    Next
                </Button>
            </div>
        </Container>
    );
}
