import {
  Box,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
} from "@mui/material";
import { useFirebase } from "../context/firebase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();

  useEffect(() => {
    if (firebase.isLoggedIn) {
      navigate("/home");
    }
  }, [firebase, navigate]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous error
    try {
      const result = await firebase.signupUserWithEmailAndPassword(
        email,
        password
      );
      console.log("Successfully registered:", result);
      setEmail("");
      setPassword("");
      navigate("/home"); // Redirect to home page after successful registration
    } catch (error) {
      setError(error.message);
      console.error(error.message);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <h1>Register</h1>
      <form
        onSubmit={handleSubmit}
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <FormControl fullWidth margin="normal" variant="outlined">
          <InputLabel htmlFor="email">Email address</InputLabel>
          <OutlinedInput
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email address"
            required
          />
          <FormHelperText>
            We will never share your email with anyone else.
          </FormHelperText>
        </FormControl>

        <FormControl fullWidth margin="normal" variant="outlined">
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            required
          />
        </FormControl>

        {error && <div style={{ color: "red" }}>{error}</div>}

        <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
          Create Account
        </Button>

        <hr style={{ width: "100%", margin: "20px 0" }} />
        <a href="/login" style={{ textDecoration: "none", color: "inherit" }}>
          Login
        </a>
      </form>
    </Box>
  );
};

export default Register;
