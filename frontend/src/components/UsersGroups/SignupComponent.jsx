import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useCustomContext } from "../../CustomContext/CustomContext";
import axios from "axios";

const SignupComponent = () => {
  // States
  const { state, dispatch } = useCustomContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // handlers
  const handleAuth = async () => {
    if (name != "" && email != "") {
      const resp = await axios.post(
        import.meta.env.VITE_WALMART_PARSER_BACKEND_URL + "/user_auth",
        {
          name: name,
          email: email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({ type: "ADD_USER", payload: resp.data });
    }
  };

  return (
    <Card
      sx={{
        margin: "1%",
        width: "100%",
        boxShadow: 3,
      }}
      key="signin_signup"
    >
      <CardContent>
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: "bold",
            textTransform: "uppercase",
          }}
          gutterBottom
        >
          Signin / Signup
        </Typography>
        <Grid
          item
          style={{
            display: "flex",
            padding: "10px",
            justifyContent: "space-between",
          }}
        >
          <TextField
            id="name"
            key="name"
            label="Display Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value.toLowerCase());
            }}
            placeholder="Enter display name for the user"
            sx={{ width: "35%" }}
          />

          <TextField
            id="email"
            key="email"
            label="Email ID"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value.toLowerCase());
            }}
            placeholder="Enter email ID to uniquely identify the user"
            sx={{ width: "35%" }}
          />

          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              width: "25%",
              backgroundColor: "#002984",
              "&:hover": {
                backgroundColor: "#000264",
              },
            }}
            onClick={() => {
              handleAuth();
              setName("");
              setEmail("");
            }}
          >
            Add New / Existing User
          </Button>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SignupComponent;
