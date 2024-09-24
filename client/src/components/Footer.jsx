import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FacebookIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/X';


function Copyright() {
    return (
      <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
        {'Copyright © '}
        <Link color="text.secondary" href="https://mui.com/">
          Sitemark
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
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: { xs: 4, sm: 8 },
      py: { xs: 8, sm: 10 },
      textAlign: { sm: 'center', md: 'left' },
      bgcolor:"primary.main",
    }}
  >
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        width: '100%',
        justifyContent: 'space-between',
        gap: { xs: 4, sm: 8 }, // Add this gap between columns
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          minWidth: { xs: '100%', sm: '60%' },
        }}
      >
        <Box sx={{ width: { xs: '100%', sm: '60%' } }}>
          <Box  component="img"
            src="https://res.cloudinary.com/dy7r2qdi0/image/upload/v1726483726/finalIcon_efo3yr.png"
            alt="icon" sx={{ width: 133, height: 100 ,mb:3}}></Box>
         
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Thank you for shopping with us! We hope you love your purchase. If you have any questions or need assistance, please don't hesitate to contact our friendly customer service team. Happy shopping!
          </Typography>
          
        </Box>
      </Box>
  
      {/* Company Section */}
      <Box
        sx={{
          display: { xs: 'none', sm: 'flex' },
          flexDirection: 'column',
          gap: 1,
           
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 'medium', color:"error.main" }}>
          Company
        </Typography>
        <Link color="text.secondary" variant="body2" href="#">
          About us
        </Link>
        <Link color="text.secondary" variant="body2" href="#">
          Contact
        </Link>
       
      </Box>
  
      {/* Legal Section */}
      <Box
        sx={{
          display: { xs: 'none', sm: 'flex' },
          flexDirection: 'column',
          gap: 1,
          marginLeft: { sm: 1 }, // Add margin to separate Company and Legal sections
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 'medium' ,color:"error.main" }}>
          Legal
        </Typography>
        <Link color="text.secondary" variant="body2" href="#">
          Terms
        </Link>
        <Link color="text.secondary" variant="body2" href="#">
          Privacy
        </Link>
       
      </Box>
    </Box>
  
    {/* Footer Section */}
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        pt: { xs: 4, sm: 8 },
        width: '100%',
        borderTop: '1px solid',
        borderColor: 'whitesmoke',
      }}
    >
      <div>
        <Link color="text.secondary" variant="body2" href="#">
          Privacy Policy
        </Link>
        <Typography sx={{ display: 'inline', mx: 0.5, opacity: 0.5 }}>
          &nbsp;•&nbsp;
        </Typography>
        <Link color="text.secondary" variant="body2" href="#">
          Terms of Service
        </Link>
        <Copyright />
      </div>
  
      <Stack
        direction="row"
        spacing={1}
        useFlexGap
        sx={{ justifyContent: 'left', color: 'text.secondary' }}
      >
        <IconButton
          color="inherit"
          size="small"
          href="https://github.com/mui"
          aria-label="GitHub"
          sx={{ alignSelf: 'center' }}
        >
          <FacebookIcon />
        </IconButton>
        <IconButton
          color="inherit"
          size="small"
          href="https://x.com/MaterialUI"
          aria-label="X"
          sx={{ alignSelf: 'center' }}
        >
          <TwitterIcon />
        </IconButton>
        <IconButton
          color="inherit"
          size="small"
          href="https://www.linkedin.com/company/mui/"
          aria-label="LinkedIn"
          sx={{ alignSelf: 'center' }}
        >
          <LinkedInIcon />
        </IconButton>
      </Stack>
    </Box>
  </Container>
  
  )
}

export default Footer