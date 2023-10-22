import React  from 'react'
import CardPost from '../../components/CardPost/CardPost'
import CriarPost from '../../components/CriarPost/CriarPost'
import useRequestData from '../../hooks/useRequestData'
import { FeedContainer } from './styled'
import { useProtectedePage } from '../../hooks/useProtectedePage'


export default function Feed() {

  //Para tirar os erros do console, passamos para o nosso useRequestData o nosso token de verificação:
  //1- Pegamos ele do localStorage
  //2- passamos ele como Authorization do headers
  //3- Chamamos ele na nossa desetruturação do post
  const token = localStorage.getItem("token")
  const config = {
    headers: {
      Authorization: token
    }
  } 
  const [posts] = useRequestData([], '/posts', config)

  //Podemos fazer uma verificação do token pelo useEffect no próprio feed, porém é mais viável por modo mais práticos criamos uma pasta e chamar a verficação toda vez que quisermos:
  //Então passamos disso:
  // useEffect(()=>{
  //   if(!token){
  //     irParaLogin(navigate)
  //   }
  // }, [navigate])
 //Para isso:

 useProtectedePage()

  return (
    <FeedContainer>
      <h1>Feed</h1>
      <section>
        <h3>Novo post</h3>
        <CriarPost />
      </section>
      {
        posts.map((post) => {
          return <CardPost key={post.id} post={post} />
        })
      }
    </FeedContainer>
  )
}
