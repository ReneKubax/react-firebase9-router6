import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import FormError from '../components/FormError'
import FormInput from '../components/FormInput'
import Title from '../components/Title'
import { UserContext } from '../context/UserProvider'
import { erroresFirebase } from '../utils/erroresFirebase'
import fromValidate from '../utils/fromValidate'

const Register = () => {

 const navegate = useNavigate()
 const {registerUser } = useContext(UserContext)
 const {required, patternEmail, minLength, validateTrim} = fromValidate()
 const {register, handleSubmit, formState: {errors}, getValues, setError} = useForm({
    defaultValues: {
        email: 'rene21@gmail.com',
        password: '123123',
        repassword: '123123'
    }
 })

 const onSubmit = async ({email, password}) => {
    console.log(email,password)
        try {
        await registerUser(email,password)
           navegate('/')
        } catch (error) {
            console.log(error.code)
            const {code, message} = erroresFirebase(error.code)
            setError(code, {
                message,
            })
         }
 }




//  const handleSubmit = async (e) => {
//     e.preventDefault()
//     console.log("procesando form", email, password)
//     try {
//         await registerUser(email, password)
//         console.log('Usuario creado')
//         navegate('/')
//     } catch (error) {
//         console.log(error.code)
//     }
//  }

  return (
    <>
    <Title text="Users Register"/>
    <form onSubmit={handleSubmit(onSubmit)}>
    <FormInput 
      type="email"
      placeholder="ingrese Email"
      {...register("email", {
        required,
        pattern: patternEmail,
    })}
    label="Ingresa tu correo"
    error={errors.email}
    >
    <FormError error={errors.email}/>
    </FormInput>
    <FormInput
    type="password" placeholder="Ingrese password"
    {...register("password", {
        minLength,
        validate: validateTrim,
})}
     label="Ingresa tu password"
     error={errors.password}
    >
    <FormError error={errors.password}/>
    </FormInput>
    <FormInput
    type="password" placeholder="Ingrese su password de nuevo"
    {...register("repassword", {
        validate: {
            equals: v => v === getValues("password") || "No coinciden las passwords",
        }
    })}
    label="Repita su password"
    error={errors.repassword}
    >
    <FormError error={errors.repassword}/>
    </FormInput>
    <Button text="Register" type="submit"/>
    </form>
    </>
  )
}

export default Register
