import { useContext } from "react"
import { UserContext } from "../context/UserProvider"
import {useNavigate} from "react-router-dom"

const Login = () => {

const {user, setUser} =  useContext(UserContext)
const navegate = useNavigate()

const handleClickLogin = () => {
    setUser(true)
    navegate("/")
}

    return (
      <>
       <h1>Login</h1> 
       <h2>
       {
        user ? "En linea" : "Fuera de Linea"
       }
       <button onClick={handleClickLogin}>Acceder</button>
       </h2>
      </>
    )
  }
  
  export default Login
  