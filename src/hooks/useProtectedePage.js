import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { irParaLogin } from "../routes/coordinator"


//Nessa função fazemos a função para validar o token do usuário
export const useProtectedePage = () =>{
    const navigate = useNavigate()
    const token = localStorage.getItem("token")

    useEffect(()=>{
        if(!token){
            irParaLogin(navigate)
        }
    },[navigate])
}