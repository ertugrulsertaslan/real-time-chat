import { React } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container, Box, Paper } from "@mui/material";
const Room = ({ username, room, setUsername, setRoom, error, socket }) => {
  const generateRandomName = () => {
    const length = 6;
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  };

  const handleClick = () => {
    const randomUserName = `Guest-${generateRandomName()}`;
    if (!username) {
      setUsername(randomUserName);
    }
    let _username = username || randomUserName;
    socket.emit("room", { room, username: _username });
  };
  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "white",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          borderRadius: 2,
          backgroundColor: "white",
          width: "100%",
          maxWidth: 400,
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          width="100%"
          sx={{ gap: 8 }}
        >
          <Typography
            variant="h4"
            component="h1"
            align="center"
            gutterBottom
            sx={{ marginTop: 10, color: "primary.main" }}
          >
            Real Chat
          </Typography>
          <TextField
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
          />
          <TextField
            label="Room Number"
            variant="outlined"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleClick}
            sx={{
              marginTop: 2,
              marginBottom: 8,
              width: {
                xs: "100%", // Extra küçük ekranlarda %100 genişlik
                sm: "80%", // Küçük ekranlarda %80 genişlik
                md: "70%", // Orta ekranlarda %60 genişlik
                lg: "70%", // Büyük ekranlarda %40 genişlik
                xl: "70%", // Extra büyük ekranlarda %30 genişlik
              },
            }}
          >
            Join Room
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};
export default Room;
