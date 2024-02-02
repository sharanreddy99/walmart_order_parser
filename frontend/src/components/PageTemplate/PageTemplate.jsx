import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

import "./PageTemplate.css";

const PageTemplate = ({ children }) => {
  const navigate = useNavigate();

  const buttonConfig = [
    { name: "Users & Groups", redirectURL: "/users_groups" },
    { name: "Order", redirectURL: "/order" },
    { name: "Order Summary", redirectURL: "/order_summary" },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar
          sx={{
            backgroundColor: "#002984",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h6"
            component="p"
            sx={{
              backgroundColor: "black",
              color: "white",
              padding: "8px",
              borderRadius: "10px",
            }}
          >
            Walmart Order Parser
          </Typography>
          <Box
            sx={{
              justifyContent: "space-between",
              backgroundColor: "#002984",
            }}
          >
            {buttonConfig.map((config) => {
              return (
                <Button
                  key={config.redirectURL}
                  onClick={() => {
                    navigate(config.redirectURL);
                  }}
                  className="navbar_button"
                >
                  {config.name}
                </Button>
              );
            })}
          </Box>
        </Toolbar>
      </AppBar>
      {children}
    </Box>
  );
};

export default PageTemplate;
