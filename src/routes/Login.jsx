import { useContext, useState } from "react"
import { UserContext } from "../context/UserProvider"
import {useNavigate} from "react-router-dom"
import { useForm } from "react-hook-form"
import { erroresFirebase } from "../utils/erroresFirebase"
import FormInput from "../components/FormInput"
import FormError from '../components/FormError'
import fromValidate from '../utils/fromValidate'




const Login = () => {
const {loginUser} =  useContext(UserContext)
const navegate = useNavigate()
const {required, patternEmail, minLength, validateTrim} = fromValidate()
const {register, handleSubmit, formState: {errors}, setError} = useForm({
  defaultValues: {
      email: 'rene21@gmail.com',
      password: '123123',
  }
})

const onSubmit = async ({email, password}) => {
  console.log(email,password)
      try {
      await loginUser(email,password)
         navegate('/')
      } catch (error) {
          console.log(error.code)
          setError("firebase", {
              message: erroresFirebase(error.code),
          })
       }
}


    return (
      <>
       <h1>Login</h1> 
       <FormError error={errors.firebase}/>
       <form onSubmit={handleSubmit(onSubmit)}>
       <FormInput 
      type="email"
      placeholder="ingrese Email"
      {...register("email", {
        required,
        pattern: patternEmail,
    })}
    >
    <FormError error={errors.email}/>
    </FormInput>
    <FormInput
    type="password" placeholder="Ingrese password"
    {...register("password", {
        minLength,
    validate: validateTrim,
})}
    >
    <FormError error={errors.password}/>
    </FormInput>
       <button type='submit'>Login</button>
       </form>
      </>
    )
  }
  
  export default Login
  