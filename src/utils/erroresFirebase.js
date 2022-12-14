export const erroresFirebase = (code) => {
    switch(code){
        case "auth/email-already-in-use":
            return "Usuario ya registrado"
        case "auth/invalid-email":
            return "Formato de email no valido"
        case "auth/user-not-found":
                return "Usuario no registrado"
        case "auth/wrong-password":    
        return "pw invalida"    
            default:
                return "Ocurrio un error en el server"
    }
}