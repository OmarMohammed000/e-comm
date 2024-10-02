import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

function Copyright() {
  return (
    <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
      {"Copyright © "}
      <Link color="text.secondary" href="/">
        TrendyFit
      </Link>
      &nbsp;
      {new Date().getFullYear()}
    </Typography>
  );
}
function Footer() {
  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 4, sm: 8 },
        py: { xs: 8, sm: 10 },
        textAlign: { sm: "center", md: "left" },
        bgcolor: "primary.main",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          width: "100%",
          justifyContent: "space-between",
          gap: { xs: 4, sm: 8 }, // Add this gap between columns
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            minWidth: { xs: "100%", sm: "60%" },
          }}
        >
          <Box sx={{ width: { xs: "100%", sm: "60%" } }}>
            <Box
              component="img"
              src="https://res.cloudinary.com/dy7r2qdi0/image/upload/v1726483726/finalIcon_efo3yr.png"
              alt="icon"
              sx={{ width: 133, height: 100, mb: 3 }}
            ></Box>

            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Thank you for shopping with us! We hope you love your purchase. If
              you have any questions or need assistance, please don't hesitate
              to contact our friendly customer service team. Happy shopping!
            </Typography>
          </Box>
        </Box>

        {/* Company Section */}
      </Box>

      {/* Footer Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          pt: { xs: 4, sm: 8 },
          width: "100%",
          borderTop: "1px solid",
          borderColor: "whitesmoke",
        }}
      >
        <div>
          <Copyright />
        </div>

        <Stack
          direction="row"
          spacing={1}
          useFlexGap
          sx={{ justifyContent: "left", color: "text.secondary" }}
        >
          <IconButton
            color="inherit"
            size="small"
            href="https://github.com/OmarMohammed000"
            aria-label="GitHub"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ alignSelf: "center" }}
          >
            <GitHubIcon />
          </IconButton>

          <IconButton
            color="inherit"
            size="small"
            href="https://linkedin.com/in/omar-mohammed-8a965a254"
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ alignSelf: "center" }}
          >
            <LinkedInIcon />
          </IconButton>
        </Stack>
      </Box>
    </Container>
  );
}

export default Footer;
