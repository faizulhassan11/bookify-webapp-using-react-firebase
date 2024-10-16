import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { useFirebase } from "../context/firebase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (firebase.isLoggedIn) {
      navigate("/home");
    }
  }, [firebase, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous error
    try {
      const userCredential = await firebase.signinWithEmailAndPassword(
        email,
        password
      );
      console.log(userCredential);
      navigate("/home");
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
      <h1>Login</h1>
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
        </FormControl>

        <FormControl fullWidth margin="normal" variant="outlined">
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword((prev) => !prev)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            required
          />
        </FormControl>

        {error && <div style={{ color: "red" }}>{error}</div>}

        <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
          Login
        </Button>

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={firebase.signinWithGoogle}
        >
          Signin with Google
        </Button>

        <hr style={{ width: "100%", margin: "20px 0" }} />
        <a
          href="/register"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          Register
        </a>
      </form>
    </Box>
  );
};

export default Login;
