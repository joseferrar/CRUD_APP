import React, { useEffect, useState } from "react";
import { gql, useQuery, useMutation, useLazyQuery } from "@apollo/client";
import Box from "@mui/material/Box";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate, useLocation } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { theme } from "../theme/default";
import {
  GET_DOG_PHOTO,
  GET_USER,
  GET_USER_ID,
  UPDATE_USER,
} from "../graphql/Queries";
import { toast } from "react-toastify";

function Profile() {
  const token = localStorage.getItem("token");
  const userData = JSON.parse(token);
  // const { loading, error, data } = useQuery(GET_DOG_PHOTO);
  const id = "6285dc5b13312d39e92b06e2";
  const { loading, data } = useQuery(GET_USER_ID, {
    variables: { id: userData },
  });
  const [getUsers, { data: getuser, error }] = useLazyQuery(GET_USER);

  const [updateUser, { data: datae }] = useMutation(UPDATE_USER);
  console.log(data?.user?.email);
  const [disabled, setDisabled] = useState(true);

  const initialValues = {
    username: data?.user?.username,
    email: data?.user?.email,
    mobile: data?.user?.mobile,
    id: data?.user?.id,
  }
  const formik = useFormik({
    initialValues,
    validationSchema: yup.object({
      username: yup.string().required("Username is required"),
      email: yup.string().email().required("Email is required"),
      mobile: yup.number().required("Phone Number is required"),
    }),
    onSubmit: async (data) => {
      console.log("dataaaaaaaaaaaaaaaaaaaa", data);
      await updateUser({ variables: data });
      await getUsers();

      toast.success("Updated sucessfully!!!");
      setDisabled(true);
    },
  });

  const Editbtn = () => {
    setDisabled(!disabled);
  };
console.log("loag", loading)
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
          flexDirection: "column",
          alignItems: "center",
          width: 400,
          margin: "100px auto",
          padding: 20,
          height: "auto",
        }}
      >
        {" "}
        <div style={{ display: "flex" }}>
          <Typography component="h1" variant="h5">
            My Profile - {data?.note?.name}
          </Typography>
          <IconButton
            onClick={Editbtn}
            color="success"
            aria-label="upload picture"
            component="span"
            style={{ marginLeft: "auto" }}
          >
            <EditIcon />
          </IconButton>
        </div>
        <form style={{ marginTop: theme.spacing(3), width: "100%" }}>
          <TextField
            style={{ marginBottom: theme.spacing(3) }}
            variant="outlined"
            required
            disabled={disabled}
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
            disabled={disabled}
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
          <TextField
            style={{ marginTop: theme.spacing(3) }}
            variant="outlined"
            required
            fullWidth
            disabled={disabled}
            type="text"
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
            disabled={disabled}
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            size="large"
            style={{ marginTop: theme.spacing(4) }}
            onClick={formik.handleSubmit}
          >
            Save
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default Profile;
