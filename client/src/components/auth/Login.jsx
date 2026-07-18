import { useState } from "react";
import {
    Box,
    Button,
    Paper,
    TextField,
    Typography
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import useApi from "../../hooks/useApi";
import { API_URLS } from "../../services/api.urls";

const Login = () => {

    const navigate = useNavigate();

    const loginService = useApi(API_URLS.login);

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleLogin = async () => {

        const response = await loginService.call(user);

        if (response?.token) {

            localStorage.setItem("token", response.token);

            localStorage.setItem(
                "user",
                JSON.stringify(response.user)
            );

            navigate("/emails/inbox");
        }
        else {
            alert("Invalid Credentials");
        }

    };

    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#f5f7fb"
            }}
        >
            <Paper
                elevation={5}
                sx={{
                    width: 420,
                    p: 5,
                    borderRadius: 4
                }}
            >

                <Typography
                    variant="h4"
                    fontWeight="bold"
                    color="#2563EB"
                    align="center"
                >
                    MailHub AI
                </Typography>

                <Typography
                    align="center"
                    sx={{ mt: 1, mb: 4 }}
                >
                    Login to your account
                </Typography>

                <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    margin="normal"
                    onChange={handleChange}
                />

                <TextField
                    fullWidth
                    type="password"
                    label="Password"
                    name="password"
                    margin="normal"
                    onChange={handleChange}
                />

                <Button
                    fullWidth
                    variant="contained"
                    sx={{
                        mt: 3,
                        py: 1.5,
                        borderRadius: 3
                    }}
                    onClick={handleLogin}
                >
                    Login
                </Button>

            </Paper>
        </Box>
    );
};

export default Login;