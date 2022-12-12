import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserProvider'

const Register = () => {

 const navegate = useNavigate()
 const {registerUser } = useContext(UserContext)
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
            console.log('Usuario creado')
           navegate('/')
        } catch (error) {
            console.log(error.code)
            switch(error.code){
                case "auth/email-already-in-use":
                    console.log("Usuario ya registrado")
                    setError("email", {
                        message: "Usuario ya registrado"
                    })
                    break;
                case "auth/invalid-email":
                    setError("email", {
                        message: "Formato de Email no valido"
                    })
                    break;
                    default:
                        console.log("Ocurrio un error en el server")
            }
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
    <h1>Register</h1>
    <form onSubmit={handleSubmit(onSubmit)}>
    <input type="email" placeholder="Ingrese email"
    {...register("email", {
        required: {
        value: true,
        message: "Campo obligatorio"
    }, 
        pattern: {
            value: /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
            message: "Formato de email incorrecto"
        }
    })}
    />
    {
        errors.email && <p>{errors.email.message}</p>
    }
    <input type="password" placeholder="Ingrese password"
    {...register("password", {
        setValueAs: v => v.trim(),
        minLength:{
        value: 6,
        message: "Minimo 6 caracteres"
    },
    validate: {
        trim: v => {
            if( !v.trim()) return "No seas payaso, escribe algo"
            true;
        }
    }
})}
    />
    {
        errors.password && <p>{errors.password.message}</p>
    }
    <input type="password" placeholder="Ingrese su password de nuevo"
    {...register("repassword", {
        setValueAs: v => v.trim(),
        validate: {
            equals: v => v === getValues("password") || "No coinciden las passwords",
        }
    })}
    />
    {
        errors.repassword && <p>{errors.repassword.message}</p>
    }
    <button type='submit'>Register</button>
    </form>
    </>
  )
}

export default Register
