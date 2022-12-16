import { useContext, useState } from "react"
import { UserContext } from "../context/UserProvider"
import {useNavigate} from "react-router-dom"
import { useForm } from "react-hook-form"
import { erroresFirebase } from "../utils/erroresFirebase"
import FormInput from "../components/FormInput"
import FormError from '../components/FormError'
import fromValidate from '../utils/fromValidate'
import Title from "../components/Title"
import Button from "../components/Button"




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
          const {code, message} = erroresFirebase(error.code)
            setError(code, {
                message,
            })
       }
}


    return (
      <>
       <Title text="Login"/>
       <form onSubmit={handleSubmit(onSubmit)}>
       <FormInput 
       label="Ingresa tu email"
      type="email"
      placeholder="ingrese Email"
      {...register("email", {
        required,
        pattern: patternEmail,
    })}
    error={errors.email}
    >
    <FormError error={errors.email}/>
    </FormInput>
    <FormInput
    label="Ingresa tu password"
    type="password" placeholder="Ingrese password"
    {...register("password", {
        minLength,
    validate: validateTrim,
})}
error={errors.password}
    >
    <FormError error={errors.password}/>
    </FormInput>
       <Button text="Login" type="submit"/>
       </form>
      </>
    )
  }
  
  export default Login
  