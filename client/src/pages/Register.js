import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { toast } from 'react-toastify';
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
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import { theme } from "../theme/default";
import { CREATE_LINK_MUTATION } from "../graphql/Queries";

function Register() {
  const [addUser, { data }] = useMutation(CREATE_LINK_MUTATION);
  const navigate = useNavigate();
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      mobile: "",
    },
    validationSchema: yup.object({
      username: yup.string().required("Username is required"),
      email: yup.string().email().required("Email is required"),
      password: yup
        .string()
        .required("Password is required")
        .min(6, "6 characters required"),
      mobile: yup.string().required("Phone Number is required"),
    }),
    onSubmit: async (data, reset) => {
      console.log(data);
      await addUser({ variables: data }).catch((error) =>
     
        toast.error(error.message)
      );
      reset.resetForm({
        username: "",
        email: "",
        password: "",
        mobile: "",
      });
    },
  });

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

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
          Register
        </Typography>
        <form style={{ marginTop: theme.spacing(3), width: "100%" }}>
          <TextField
            style={{ marginBottom: theme.spacing(3) }}
            variant="outlined"
            required
            fullWidth
            type="text"
            name="username"
            id="username"
            label="Username"
            autoComplete="username"
            value={formik?.values?.username}
            onChange={formik.handleChange}
            helperText={formik.touched.username ? formik.errors.username : null}
            error={formik.touched.username ? formik.errors.username : null}
          />

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
          <TextField
            style={{ marginTop: theme.spacing(3) }}
            variant="outlined"
            required
            fullWidth
            // type="number"
            name="mobile"
            id="mobile"
            label="Phone Number"
            autoComplete="mobile"
            value={formik?.values?.mobile}
            onChange={formik.handleChange}
            helperText={formik.touched.mobile ? formik.errors.mobile : null}
            error={formik.touched.mobile ? formik.errors.mobile : null}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            size="large"
            style={{ marginTop: theme.spacing(4) }}
            onClick={formik.handleSubmit}
          >
            Register
          </Button>
        </form>
        <Grid
          item
          container
          style={{ marginTop: theme.spacing(6), marginLeft: theme.spacing(15) }}
        >
          <Typography>Already have an account? </Typography>
          <Link
            to="/"
            variant="body2"
            style={{
              textDecoration: "none",
              marginLeft: theme.spacing(0.5),
              color: theme.palette.common.aceOrange,
            }}
          >
            {"Sign In"}
          </Link>
        </Grid>
      </Paper>
    </Box>
  );
}

export default Register;
