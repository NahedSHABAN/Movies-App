import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../axiosConfig/instance";
import { Button, Col, Container, Image, Row, Modal } from "react-bootstrap";
import CircularProgress from '@mui/joy/CircularProgress';
import { IconButton } from "@mui/joy";
import Favorite from "@mui/icons-material/Favorite";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

export default function Details() {
    const { id } = useParams();
    const [movie, setMovie] = useState({});
    const [credits, setCredits] = useState();
    const [showTrailer, setShowTrailer] = useState(false);  
    const [trailerUrl, setTrailerUrl] = useState("");  

    // Safe access to runtime and genre
    const playTime = movie?.runtime || 0;
    const hours = Math.floor(playTime / 60);
    const minutes = playTime % 60;
    const formattedTime = `${hours}h ${minutes}m`;

    // Fetch movie details and credits
    useEffect(() => {
        // Fetch movie details
        axiosInstance.get(`/movie/${id}`).then((response) => {
            setMovie(response.data);
        }).catch((error) => {
            console.log(error);
        });

        // Fetch credits
        axiosInstance.get(`/movie/${id}/credits`).then((response) => {
            setCredits(response.data);
        }).catch((error) => {
            console.log(error);
        });

        // Fetch videos (trailer)
        axiosInstance.get(`/movie/${id}/videos`).then((response) => {
            const trailer = response.data.results.find(
                (video) => video.type === "Trailer" && video.site === "YouTube"
            );
            if (trailer) {
                setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
            }
        }).catch((error) => {
            console.log(error);
        });
    }, [id]);

    // Safe access to director, screenplayWriter, storyWriter
    const director = credits?.crew?.find((member) => member.job === "Director")?.name || "N/A";
    const screenplayWriter = credits?.crew?.find((member) => member.job === "Screenplay")?.name || "N/A";
    const storyWriter = credits?.crew?.find((member) => member.job === "Writer")?.name || "N/A";

    return (
        <Container fluid
            className="d-flex justify-content-center align-items-center position-relative"
            style={{
                height: "100vh",
                backgroundImage: `url(https://images.unsplash.com/photo-1554034483-04fda0d3507b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>

            <Container style={{ zIndex: 2 }}>
                <Row>
                    <Col xs={12} md={6} lg={5} className="d-flex justify-content-center align-items-center">
                        <Image
                            src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
                            style={{
                                objectFit: "cover",
                                maxHeight: "600px",
                                width: "60%",
                                borderRadius: "10px",
                                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
                            }}
                        />
                    </Col>
                    <Col xs={12} md={12} lg={7} className="text-start">
                        <h1 className="text-light fw-bold d-flex align-items-center">
                            {movie?.title || "Untitled Movie"}
                            <p className="d-inline ms-2 mb-0 text-dark-50">
                                ({movie?.release_date ? new Date(movie.release_date).getFullYear() : "N/A"})
                            </p>
                        </h1>

                        <ul className="d-flex ps-0 mb-3" style={{ listStyle: "none" }}>
                            <li className="me-4">{movie?.release_date || "Release Date: N/A"}</li>
                            <li className="me-4">{movie?.genres?.map((genre) => genre.name).join(", ") || "Genres: N/A"}</li>
                            <li>Play time: {formattedTime || "N/A"}</li>
                        </ul>

                        <div className="d-flex align-items-center my-2">
                            <CircularProgress
                                className="me-3 fw-bold"
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
                            <p className="text-light fw-bold ms-1">User Score</p>
                        </div>

                        <Row className="m-0">
                            <IconButton
                                className="my-2 mx-2"
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
                            <Button className="bg-transparent border-0 w-25 fw-bold text-dark" onClick={() => setShowTrailer(true)}>
                                <PlayArrowIcon /> Play Trailer
                            </Button>
                        </Row>
                        <Col>
                            <h4 className="my-3 fw-bold">Overview</h4>
                            <p className="text-light">{movie?.overview || "No overview available."}</p>
                        </Col>

                        <Row className="d-flex align-items-start">
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

            <Modal show={showTrailer} onHide={() => setShowTrailer(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{movie.title} Trailer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {trailerUrl ? (
                        <iframe
                            width="100%"
                            height="400"
                            src={trailerUrl}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    ) : (
                        <p>Loading trailer...</p>
                    )}
                </Modal.Body>
            </Modal>
        </Container>
    );
}
