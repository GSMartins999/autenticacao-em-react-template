import React from 'react'
import { FormPost, Input, TextArea } from './styled'
import useForms from '../../hooks/useForms'
import useRequestData from '../../hooks/useRequestData'
import { BASE_URL } from '../../constants/BASE_URL'
import axios from 'axios'
import { useProtectedePage } from '../../hooks/useProtectedePage'

export default function CriarPost() {

  useProtectedePage()
  //Abaixo definimos o token de autorização e atribuimos ele ao nosso header.
  const token = localStorage.getItem("token")
  const config = {
    headers: {
      Authorization: token
    }
  } 

  //Abaixo chamamos o nosso hook useForms e passamos seus valores, title e body.
  const {form, onChange, limparCampos} = useForms({title:"", body:""})


  //Abaixo criamos a função enviar post e passamos sua BASE_URL com o metodo post, seu form(conteúdo do post) e por ultimo(É necessário deixar a autenticação por ultimo) o nosso header com nosso token de autenticação
  const enviarPost = (e) => {
      console.log("entrou")
      axios.post(`${BASE_URL}/posts`, form, config)
      .then((response)=>{
        console.log(response.data.token);
        // localStorage.setItem("token", response.data.token)
        limparCampos()
      })
      .catch((error)=>{
        console.log(error.response)
      })
  }

  return (
    <FormPost onSubmit={enviarPost}>
      <label htmlFor='tituloPost'>Título:</label>
      {/* Nos inputs abaixo passamos os valores para ser possível captar os dados inseridos, no caso a função onChange, o value e o name, essenciais para o funcionamento do post */}
      <Input placeholder='digite um título para o seu post' name="title" value={form.title} onChange={onChange}/>
      <label htmlFor='textoPost'>Texto:</label>
      {/* Aqui em baixo fizemos o mesmo esquema do caso acima */}
      <TextArea placeholder='crie um post!' name="body" value={form.body} onChange={onChange}/>
      <button>Enviar</button>
    </FormPost>
  )
}
