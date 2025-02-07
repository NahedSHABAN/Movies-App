import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useState } from 'react';
import { Container, Form, Col, Button, InputGroup } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff } from "lucide-react";
export default function Login() {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: "onChange" });

    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <Container
                fluid
                className="d-flex justify-content-center align-items-center vh-100 bg-dark pb-5"
            >
                <Form className="w-50 p-4 rounded shadow bg-dark text-light" style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0 , 0.1)" }}
                    onSubmit={handleSubmit()}

                >
                    <h3 className="text-center mb-4 fw-bold">Login</h3>

                    <Form.Group as={Col} md="12" controlId="validationCustom02" className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter Your Email"
                            required
                            className="bg-secondary text-light"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                    message: "Invalid Email",
                                },
                            })}
                        />
                        {errors.email && (<small className='text-danger'>{errors.email.message}</small>)}
                    </Form.Group>


                    <Form.Group as={Col} md="12" controlId="validationCustom04" className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <InputGroup className=" text-light">
                            <InputGroup className="bg-secondary text-light">
                                <Form.Control
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter Your Password"
                                    required
                                    className="bg-secondary text-light"
                                    {...register("password", {
                                        required: "Password is required",
                                        pattern: {
                                            value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                                            message:
                                                "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
                                        },
                                    })}
                                />
                                <Button
                                    variant="outline-secondary text-light border-light"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff /> : <Eye />}
                                </Button>
                            </InputGroup>

                            {errors.password && (
                                <small className="text-danger">{errors.password.message}</small>
                            )}
                        </InputGroup>
                    </Form.Group>


                    <div className="d-flex justify-content-center">
                        <Button type="submit" variant="outline-light" className="w-25 mt-3">
                            Login
                        </Button>
                    </div>
                </Form>
            </Container>
        </>
    );
}
