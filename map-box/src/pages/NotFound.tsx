import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <Box
      data-cy="notfound_page"
      height="90vh"
      paddingTop="8px"
      textAlign="center"
    >
      <Box margin="auto" textAlign="center">
        <img
          src="https://img.freepik.com/free-vector/error-404-concept-illustration_114360-1811.jpg?w=2000"
          alt="not found"
          height="800px"
        />
      </Box>
      <Button
        data-cy="back_home_btn"
        variant="contained"
        onClick={() => navigate("/")}
      >
        Back Home
      </Button>
    </Box>
  );
}
