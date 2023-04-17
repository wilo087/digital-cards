'use client'
import React, { useState } from 'react'
import { TextField, Button, FormControlLabel, Checkbox, Container } from '@material-ui/core'
import { LockOutlined } from '@material-ui/icons'

const LoginForm = (): React.ReactElement => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (): void => {
    console.log('Email:', email)
    console.log('Password:', password)
  }

  return (
    <form>
      <Container maxWidth='sm' style={{ marginTop: '100px' }}>
        <h2>Login</h2>

        <TextField
          label='Email'
          variant='outlined'
          fullWidth
          margin='normal'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label='Password'
          variant='outlined'
          type='password'
          fullWidth
          margin='normal'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <FormControlLabel
          control={<Checkbox color='primary' />}
          label='Remember me'
        />

        <Button
          variant='contained'
          color='primary'
          startIcon={<LockOutlined />}
          onClick={handleLogin}
        >
          Login
        </Button>
      </Container>
    </form>
  )
}

export default LoginForm
