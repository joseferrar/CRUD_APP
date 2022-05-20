import React, { useState } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { theme } from "../theme/default";
import { GET_USER, GET_USER_ID } from "../graphql/Queries";
import ProfileForm from "../components/Forms/ProfileForm";
import ProfileList from "../components/Lists/ProfileList";

function Profile() {
  const token = localStorage.getItem("token");
  const userData = JSON.parse(token);
  const { loading, data } = useQuery(GET_USER_ID, {
    variables: { id: userData },
  });
  const [getUsers, { data: getuser, error }] = useLazyQuery(GET_USER);

  const [disabled, setDisabled] = useState(true);

  const Editbtn = () => {
    setDisabled(!disabled);
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
            {disabled ? "My Profile" : "Edit Profile"}
          </Typography>
          {token ? (
            <IconButton
              onClick={Editbtn}
              color="success"
              aria-label="upload picture"
              component="span"
              style={{ marginLeft: "auto" }}
            >
              <EditIcon />
            </IconButton>
          ) : null}
        </div>
        {disabled ? (
          <ProfileList data={data} token={token} />
        ) : (
          <ProfileForm
            data={data}
            disabled={disabled}
            setDisabled={setDisabled}
          />
        )}
        {token ? null : (
          <Grid
            item
            container
            style={{
              marginTop: theme.spacing(2),
              marginLeft: theme.spacing(12),
            }}
          >
            <Typography>Go back to ? </Typography>
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
        )}
      </Paper>
    </Box>
  );
}

export default Profile;
