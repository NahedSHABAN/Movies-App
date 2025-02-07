import { useEffect, useState } from "react";
import axiosInstance from "./../../axiosConfig/instance";
import { Button, Card, Col, Container, Form, InputGroup, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

export default function Movies() {
    const [movies, setMovies] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchMovies(currentPage);
    }, [currentPage]);

    const fetchMovies = (page) => {
        setLoading(true);
        axiosInstance.get("movie/popular", {
            params: { page }
        })
        .then((res) => {
            setMovies(res.data.results);
            setSearchResults(res.data.results);
            setTotalPages(res.data.total_pages);
        })
        .catch((err) => console.log(err))
        .finally(()=>{
            setLoading(false);
        })
    };

    const handleSearch = (event) => {
        setSearchInput(event.target.value);
    };

    const handleSearchClick = () => {
        const filteredMovies = movies.filter(movie =>
            movie.title.toLowerCase().includes(searchInput.toLowerCase())
        );
        setSearchResults(filteredMovies);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
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
            {loading?(
                <div className="d-flex justify-content-center my-5">
                <Spinner animation="border" variant="light" size="lg" />
            </div>
            ):
            (
                <Row className="g-4" md={6}>
                {searchResults.map((movie) => (
                    <Col key={movie.id} lg={3} md={6}>
                        <Card className="shadow-lg h-100 d-flex flex-column bg-dark text-light border-light">
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
                                <Button variant="outline-light" className="mt-auto" onClick={() => {
                                    navigate(`/movies/${movie.id}`);
                                }}>Watch Now</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            )
        }
            {/* Pagination Controls */}
            <div className="d-flex justify-content-center mt-4">
                <Button variant="light" className="me-2" onClick={handlePrevPage} disabled={currentPage === 1}>
                    Previous
                </Button>
                <span className="text-light mx-2 align-self-center">Page {currentPage} of {totalPages}</span>
                <Button variant="light" className="ms-2" onClick={handleNextPage} disabled={currentPage === totalPages}>
                    Next 
                </Button>
            </div>

        </Container>
    );
}
