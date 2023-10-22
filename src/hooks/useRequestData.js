import  { useEffect, useState } from 'react'
import { BASE_URL } from '../constants/BASE_URL'
import axios from 'axios'


//Pegamos nossa url de Authorization atráves do headers.
export default function useRequestData(estadoInicial, path, headers) {

    const [dados, setDados] = useState(estadoInicial)
    const [erro, setErro] = useState('')

    const receberDados = () =>{
        // Pegamos ela(Authirization) atráves do get e definimos ela para as demais páginas. No caso para ser possível acessar o conteúdo a pessoa necessita ter um token de acesso.
        axios.get(`${BASE_URL}${path}`, headers)
        .then((resposta) => {
            setDados(resposta.data)
        })
        .catch((erro) => {
            console.log(erro.response)
            setErro(erro.response)
        })
    }
    
    useEffect(() => {
        receberDados()
    }, [path])

    return [dados, receberDados, erro]
}
