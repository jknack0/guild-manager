import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../../reducers/userReducer'
import {
  RegisterFormContainer,
  RegisterHeading,
  RegisterForm,
  FormItem,
  FormInput,
  SubmitButton
} from './Styles'

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [characterName, setCharacterName] = useState('')
  const [realm, setRealm] = useState('')
  const dispatch = useDispatch()

  const handleRegisterUser = (event) => {
    event.preventDefault()

    const newUser = {
      username,
      password,
      characterName,
      realm
    }
    
    setUsername('')
    setPassword('')
    setRealm('')
    setCharacterName('')

    dispatch(registerUser(newUser))
  }
  return (
    <RegisterFormContainer>
      <RegisterHeading>
        Register Your Character
      </RegisterHeading>
      <RegisterForm onSubmit={handleRegisterUser}>
        <FormItem>
          Username: <FormInput type='text' value={username} onChange={({target}) => setUsername(target.value)} />
        </FormItem>
        <FormItem>
          Password: <FormInput type='password' value={password} onChange={({target}) => setPassword(target.value)} />
        </FormItem>
        <FormItem>
          Character Name: <FormInput type='text' value={characterName} onChange={({target}) => setCharacterName(target.value)} />
        </FormItem>
        <FormItem>
          Character Realm: <FormInput type='text' value={realm} onChange={({target}) => setRealm(target.value)} />
        </FormItem>
        <SubmitButton>
          Submit
        </SubmitButton>
      </RegisterForm>
    </RegisterFormContainer>
  )
}

export default Register