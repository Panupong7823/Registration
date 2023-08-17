import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import './App.css';
import axios from 'axios';
import Swal from 'sweetalert2';

interface FormData {

  firstname: string;
  lastname: string;
  email: string;
  password: string;
  requirement: string;
}

export default function App() {
  const [firstname, setFname] = useState('');
  const [lastname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('')
  const [requirement, setRequirement] = useState('');
  const [firstnameError, setFirstnameError] = useState('');
  const [lastnameError, setLastnameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (firstname.length < 2) {
      Swal.fire({
        title: 'Error',
        text: 'First name must be at least 2 characters long.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }
    if (lastname.length < 2) {
      Swal.fire({
        title: 'Error',
        text: 'last name must be at least 2 characters long.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      Swal.fire({
        title: 'Error',
        text: 'Please enter a valid email address.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    if (password.length < 6) {
      Swal.fire({
        title: 'Error',
        text: 'Password must be at least 6 characters long.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    const regisData: FormData = {
      firstname,
      lastname,
      email,
      password,
      requirement,
    };

    axios.post('http://localhost:4000/regis', regisData)
      .then(response => {
        Swal.fire({
          title: 'Registration successful',
          icon: 'success',
          confirmButtonText: 'Confirm',
        }).then(() => {
          window.location.reload();
        });
        console.log(response.data);
      })
      .catch(error => {
        Swal.fire({
          title: 'Registration fail',
          icon: 'error',
          confirmButtonText: 'Confirm',
        })
        console.error(error);
      });
  };

  return (
    <Container maxWidth="md" sx={{ bgcolor: '#f2f2f3', padding: '20px', borderRadius: '10px', boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.6)' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography
          component="h2"
          variant="h4"
          sx={{
            fontFamily: 'Arial, sans-serif',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '20px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            background: 'linear-gradient(45deg, #1246f3, #7fb7f3, #9b59b6)',
            '-webkit-background-clip': 'text',
            '-webkit-text-fill-color': 'transparent',
            borderBottom: '2px solid #1976D2',
            width: '100%',
            paddingBottom: '10px',
          }}
        >
          Register
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstname"
                required
                fullWidth
                id="firstname"
                label="First Name"
                autoFocus
                variant="outlined"
                helperText={firstnameError}
                error={Boolean(firstnameError)}
                onChange={(event) => {
                  setFname(event.target.value);
                  if (event.target.value.length < 2) {
                    setFirstnameError('First name must be at least 2 characters long.');
                  } else {
                    setFirstnameError('');
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastname"
                label="Last Name"
                name="lastname"
                autoComplete="family-name"
                variant="outlined"
                helperText={lastnameError}
                error={Boolean(lastnameError)}
                onChange={(event) => {
                  setLname(event.target.value);
                  if (event.target.value.length < 2) {
                    setLastnameError('Last name must be at least 2 characters long.');
                  } else {
                    setLastnameError('');
                  }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                variant="outlined"
                helperText={emailError}
                error={Boolean(emailError)}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (!/^\S+@\S+\.\S+$/.test(event.target.value)) {
                    setEmailError('Please enter a valid email address.');
                  } else {
                    setEmailError('');
                  }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                variant="outlined"
                helperText={passwordError}
                error={Boolean(passwordError)}
                onChange={(event) => {
                  setPassword(event.target.value);
                  if (event.target.value.length < 6) {
                    setPasswordError('Password must be at least 6 characters long.');
                  } else {
                    setPasswordError('');
                  }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                variant="outlined"
                helperText={
                  (confirmPassword &&
                    (confirmPassword !== password)) ? 'Passwords do not match.' : ''
                }
                error={Boolean(confirmPassword && confirmPassword !== password)}
                onChange={(event) => {
                  setConfirmPassword(event.target.value);
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="requirement"
                label="Requirements"
                multiline
                rows={5}
                fullWidth
                required
                variant="outlined"
                onChange={(event) => setRequirement(event.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 4,
              mb: 2,
              borderRadius: '5px',
              background: '#2196F3',
              color: 'white',
              fontWeight: 'bold',
              '&:hover': {
                background: '#1976D2',
                transform: 'scale(1.05)',
              },
            }}
            endIcon={<SendIcon />}
          >
            submit
          </Button>

        </Box>
      </Box>
    </Container>
  );
}
