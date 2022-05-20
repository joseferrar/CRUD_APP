import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import Box from "@mui/material/Box";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import FormHelperText from "@mui/material/FormHelperText";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import TextField from "@mui/material/TextField";
import { theme } from "../theme/default";
import { LOGIN_USER } from "../graphql/Queries";
import { toast } from "react-toastify";

function Login() {
  const [getlogin, { loading, data, error }] = useMutation(LOGIN_USER);
  const navigate = useNavigate();
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().email().required("Email is required"),
      password: yup
        .string()
        .required("Password is required")
        .min(6, "6 characters required"),
    }),
    onSubmit: async (data1, danger) => {
      console.log(data);

      getlogin({ variables: data1 })
        .then((res) => {
          localStorage.setItem("token", JSON.stringify(res.data.loginUser.id));
          const token = localStorage.getItem("token");
          if (token) {
            navigate("/");
            navigate("/profile");
            toast.success(`Welcome ${res.data.loginUser.username}`);
          }
        })
        .catch((error) => {
          toast.error(error.message);
        });
    },
  });

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };
  console.log(data);
  return (
    <Box
      sx={{
        overflow: "hidden",
        width: "100%",
        backgroundSize: "cover",
      }}
    >
      <Paper
        elevation={4}
        style={{
          borderRadius: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: 400,
          margin: "100px auto",
          padding: 20,
          height: "auto",
        }}
      >
        {" "}
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form style={{ marginTop: theme.spacing(3), width: "100%" }}>
          <TextField
            variant="outlined"
            required
            fullWidth
            type="email"
            name="email"
            id="email"
            label="Email"
            autoComplete="email"
            value={formik?.values?.email}
            onChange={formik.handleChange}
            helperText={formik.touched.email ? formik.errors.email : null}
            error={formik.touched.email ? formik.errors.email : null}
          />
          <FormControl required fullWidth sx={{ mt: 3 }} variant="outlined">
            <InputLabel
              required
              error={formik.touched.password ? formik.errors.password : null}
            >
              Password
            </InputLabel>

            <OutlinedInput
              id="outlined-adornment-password"
              name="password"
              type={secureTextEntry ? "password" : "text"}
              value={formik?.values?.password}
              onChange={formik.handleChange}
              error={formik.touched.password ? formik.errors.password : null}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={toggleSecureEntry}
                    edge="end"
                  >
                    {secureTextEntry ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
            <FormHelperText error>
              {formik.touched.password ? formik.errors.password : null}
            </FormHelperText>
          </FormControl>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            size="large"
            style={{ marginTop: theme.spacing(4) }}
            onClick={formik.handleSubmit}
          >
            Login
          </Button>
        </form>
        <Grid
          item
          container
          style={{ marginTop: theme.spacing(6), marginLeft: theme.spacing(15) }}
        >
          <Typography>Don&apos;t have an account? </Typography>
          <Link
            to="/register"
            variant="body2"
            style={{
              textDecoration: "none",
              marginLeft: theme.spacing(0.5),
              color: theme.palette.common.aceOrange,
            }}
          >
            {"Sign Up"}
          </Link>
        </Grid>
      </Paper>
    </Box>
  );
}

export default Login;
