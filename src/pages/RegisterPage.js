// ** React Imports
import { useState } from "react";

import { useNavigate } from "react-router-dom";

// ** MUI Components
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";

// ** Icons Imports

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { baseURL } from "../constants/baseURL";
import axios from "axios";
import SvgLogo from "../components/svgLogo";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";


const RegisterPage = () => {
  // ** States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // ** Hook
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleClickShowPassword = () => {
    setShowPassword(true);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
    const infoBox = withReactContent(Swal)

  const register = () => {
    var data = JSON.stringify({
      password: password,
      name: username,
      email: email,
    });

    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${baseURL}/user/singUp`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        if (response.data.status === "success") {
          localStorage.setItem("user", response.data.result);
          navigate("/");
        } else {
            infoBox.fire({
                title: 'Warning',
                html: `${response.data.data}`,
                icon: 'error'
            })
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
      <Box className="content-center">
        <div className="Rectangle">

          <Box sx={{mb: 6}}>

            <div>
              <SvgLogo></SvgLogo>
            </div>
            <div className="Welcome-back Text-Style-5">
              Welcome!
            </div>
            <div className="Log-in-to-continue Text-Style-4">
                Sign up to start using Simpledo today.
            </div>
          </Box>
          <form
              noValidate
              autoComplete="off"
              onSubmit={(e) => e.preventDefault()}
          >
            <TextField
                autoFocus
                fullWidth
                id="name"
                variant="standard"
                label="Full Name"
                sx={{marginBottom: 4}}
                onChange={handleUsernameChange}
            />
              <TextField
                fullWidth
                id="email"
                variant="standard"
                label="Email"
                sx={{marginBottom: 4}}
                onChange={handleEmailChange}
            />
            <FormControl fullWidth>
              <TextField
                  label="Password"
                  value={password}
                  variant="standard"
                  id="auth-login-password"
                  onChange={handlePasswordChange}
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                          edge="end"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          aria-label="toggle password visibility"
                      >
                        {showPassword ? (
                            <VisibilityIcon/>
                        ) : (
                            <VisibilityOffIcon/>
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
              />
            </FormControl>

            <span className="Dont-have-an-accoun Text-Style-6" onClick={() => navigate("/")}>
                        Do have an account? Sign in.
                    </span>

            <Box
                sx={{
                  mb: 4,
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
            />

            <Button
                fullWidth
                size="large"
                variant="contained"
                sx={{marginBottom: 7}}
                onClick={register}
            >
              Sign Up
            </Button>
            <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
            >

            </Box>
          </form>
        </div>
      </Box>
  );
};

export default RegisterPage;
