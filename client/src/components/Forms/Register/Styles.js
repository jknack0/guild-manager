import styled from 'styled-components'

export const RegisterFormContainer = styled.div`
  width: 30vw;
  height: 50vh;
  background-color: white;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10%;
  box-shadow: 0px 0px 5px black;
`

export const RegisterHeading = styled.h2`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  padding: 1em;
  color: rgb(50,50,50);
  font-size: 30px;
  font-weight: 400;
  margin-bottom: 10px;
`

export const RegisterForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 80%;
  height:70%;
`

export const FormItem = styled.div`
  font-size: 1.2em;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const FormInput = styled.input`
  width: 60%;
  height: 20px;
  padding: 3px;
  border-radius: 6px;
`

export const SubmitButton = styled.button`
  height:50px;
  border-radius: 5px;
  background-color: rgb(87, 104, 186);
  color: white;
  font-size: 18px;
  cursor: pointer;
  &:hover {
    background-color: white;
    color: rgb(87, 104, 186);
  }
`