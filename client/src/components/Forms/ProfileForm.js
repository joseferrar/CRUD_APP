import React from "react";
import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { theme } from "../../theme/default";
import { UPDATE_USER } from "../../graphql/Queries";
import { toast } from "react-toastify";

function ProfileForm(props) {
  const { data, disabled, setDisabled, getUsers } = props;

  const [updateUser, { data: datae }] = useMutation(UPDATE_USER);

  const initialValues = {
    username: data?.user?.username,
    email: data?.user?.email,
    mobile: data?.user?.mobile,
    id: data?.user?.id,
  };
  const formik = useFormik({
    initialValues,
    validationSchema: yup.object({
      username: yup.string().required("Username is required"),
      email: yup.string().email().required("Email is required"),
      mobile: yup.number().required("Phone Number is required"),
    }),
    onSubmit: async (data) => {
      await updateUser({ variables: data });
      await toast.success("Updated sucessfully!!!");
      await window.location.reload(false);
      setDisabled(true);
    },
  });

  console.log("loag", data);
  return (
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
  );
}

export default ProfileForm;
