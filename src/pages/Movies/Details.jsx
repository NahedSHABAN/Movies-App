import { useEffect, useState, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../axiosConfig/instance";
import { Button, Col, Container, Image, Row, Modal, Spinner } from "react-bootstrap";
import CircularProgress from "@mui/joy/CircularProgress";
import { IconButton } from "@mui/joy";
import Favorite from "@mui/icons-material/Favorite";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

export default function Details() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [credits, setCredits] = useState(null);
    const [trailerUrl, setTrailerUrl] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showTrailer, setShowTrailer] = useState(false);

    // Fetch movie data
    const fetchMovieData = useCallback(async () => {
        try {
            const [movieRes, creditsRes, videosRes] = await Promise.all([
                axiosInstance.get(`/movie/${id}`),
                axiosInstance.get(`/movie/${id}/credits`),
                axiosInstance.get(`/movie/${id}/videos`),
            ]);

            setMovie(movieRes.data);
            setCredits(creditsRes.data);

            const trailer = videosRes.data.results.find(video => video.type === "Trailer" && video.site === "YouTube");
            setTrailerUrl(trailer ? `https://www.youtube.com/embed/${trailer.key}` : "");
        } catch (err) {
            console.error(err);
            setError("Failed to fetch movie details.");
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchMovieData();
    }, [fetchMovieData]);

    // Extract credits safely
    const director = useMemo(() => credits?.crew?.find(member => member.job === "Director")?.name || "N/A", [credits]);
    const screenplayWriter = useMemo(() => credits?.crew?.find(member => member.job === "Screenplay")?.name || "N/A", [credits]);
    const storyWriter = useMemo(() => credits?.crew?.find(member => member.job === "Writer")?.name || "N/A", [credits]);

    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <Spinner animation="border" variant="light" />
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <p className="text-danger fw-bold">{error}</p>
            </Container>
        );
    }

    // Movie runtime formatting
    const playTime = movie?.runtime || 0;
    const hours = Math.floor(playTime / 60);
    const minutes = playTime % 60;
    const formattedTime = `${hours}h ${minutes}m`;

    return (
        <Container fluid className="position-relative text-light"
            style={{
                minHeight: "100vh",
                backgroundImage: `url(https://images.unsplash.com/photo-1554034483-04fda0d3507b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50" style={{ zIndex: 0 }}></div>

            <Container style={{ zIndex: 1, position: "relative" }}>
                <Row className="align-items-center">
                    {/* Movie Poster */}
                    <Col xs={12} md={6} lg={5} className="d-flex justify-content-center mb-4 mb-md-0 mt-5">
                        <Image
                            src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
                            fluid
                            style={{
                                objectFit: "cover",
                                maxHeight: "500px",
                                maxWidth: "80%",
                                borderRadius: "10px",
                                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
                            }}
                        />
                    </Col>

                    {/* Movie Details */}
                    <Col xs={12} md={6} lg={7} className="text-center text-md-start mt-5">
                        <h1 className="fw-bold d-flex align-items-center justify-content-center justify-content-md-start">
                            {movie?.title || "Untitled Movie"}
                            <span className="d-inline ms-2 mb-0 text-light-50">
                                ({movie?.release_date ? new Date(movie.release_date).getFullYear() : "N/A"})
                            </span>
                        </h1>

                        {/* Movie Info */}
                        <ul className="d-flex flex-wrap justify-content-center justify-content-md-start ps-0 mb-3" style={{ listStyle: "none" }}>
                            <li className="me-3">{movie?.release_date || "Release Date: N/A"}</li>
                            <li className="me-3">{movie?.genres?.map(genre => genre.name).join(", ") || "Genres: N/A"}</li>
                            <li>Duration: {formattedTime || "N/A"}</li>
                        </ul>

                        {/* Rating & Buttons */}
                        {/* User Score & Action Buttons on the Same Row */}
                        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-start gap-3 my-2">

                            {/* Circular Progress - User Score */}
                            <div className="d-flex align-items-center">
                                <CircularProgress
                                    className="me-2 fw-bold"
                                    size="lg"
                                    determinate
                                    value={(movie.vote_average / 10) * 100}
                                    thickness={6}
                                    sx={{
                                        "--CircularProgress-trackColor": "rgba(255, 255, 255, 0.2)",
                                        "--CircularProgress-progressColor": "#4caf50",
                                    }}
                                >
                                    {Math.round((movie.vote_average / 10) * 100)}%
                                </CircularProgress>
                                <p className="fw-bold ms-2">User Score</p>
                            </div>

                            {/* Action Buttons */}
                            
                        </div>
                        <div className="d-flex align-items-center gap-2 ms-2">
                                <IconButton
                                    className="my-2"
                                    variant="solid"
                                    size="lg"
                                    sx={{
                                        borderRadius: "50%",
                                        width: 40,
                                        height: 40,
                                        backgroundColor: "black",
                                        color: "white",
                                    }}
                                >
                                    <Favorite className="fs-5" />
                                </IconButton>

                                <Button
                                    className="bg-transparent border-0 fw-bold text-light d-flex align-items-center "
                                    onClick={() => setShowTrailer(true)}
                                >
                                    <PlayArrowIcon /> Play Trailer
                                </Button>
                            </div>

                        {/* Overview */}
                        <Col>
                            <h4 className="my-3 fw-bold">Overview</h4>
                            <p>{movie?.overview || "No overview available."}</p>
                        </Col>

                        {/* Crew Details */}
                        <Row className="d-flex align-items-start text-center text-md-start">
                            <Col xs={12} md={4}>
                                <p><strong>Screenplay: </strong>{screenplayWriter}</p>
                            </Col>
                            <Col xs={12} md={4}>
                                <p><strong>Story: </strong>{storyWriter}</p>
                            </Col>
                            <Col xs={12} md={4}>
                                <p><strong>Director: </strong>{director}</p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
            <Modal show={showTrailer} onHide={() => setShowTrailer(false)} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>{movie.title} Trailer</Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex justify-content-center align-items-center">
                    {trailerUrl ? (
                        <iframe
                            width="100%"
                            height="400"
                            src={trailerUrl}
                            title="Trailer"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    ) : (
                        <p>No trailer available.</p>
                    )}
                </Modal.Body>
            </Modal>
        </Container>
    );
}
