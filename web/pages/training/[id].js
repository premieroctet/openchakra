import React, {useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import styled from 'styled-components'
// import {client} from '../../utils/client'
import axios from 'axios'
import Layout from '../../hoc/Layout/Layout'


const useIntersectionObserver = (ref, options) => {
  const [isIntersecting, setIsIntersecting] = React.useState(false)

  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      console.log(entry)
      setIsIntersecting(entry.isIntersecting)
    }, options)

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      observer.unobserve(ref.current)
    }
  }, [])

  return isIntersecting
}


const Training = () => {


  const router = useRouter()
  // const [trainingid, setTrainingid] = useState(router.query.id)
  const [trainingid, setTrainingid] = useState('628392fe38657b67d6e5acc5')


  // useEffect(() => {
  //   client({method: 'GET', path: `/training/${trainingid}`})
  //     .then(response => {

  //     })
  //     .catch(error => { console.log(error) })
  // }, [])
  
  useEffect(() => {
    axios.get(`/myAlfred/api/serviceUser/cardPreview/${trainingid}`)
      .then(response => {
        console.log(response)
      })
      .catch(error => { console.log(error) })
  }, [trainingid])

  return (<Layout>
    <StyledTraining>
     
      
      <div className="container-lg">
        
        <div className='cover'>

          <img
            src="https://source.unsplash.com/featured/600x100&q=30"
            alt='cover'
            width={600}
            height={200}
          />

          {/* <div className='cover-desc'> */}

          <div className='card'>
            <h1>Formation AC transport Léger de marchandises</h1>
            <button type='button'>Acheter</button>
          </div>

            
          <dl className='training-ref'>
            <dt>Référence</dt>
            <dd>{trainingid}</dd>
            <dt>Durée de la formation</dt>
            <dd>2jours</dd>
            <dt>Eligigle au CPF</dt>
            <dd></dd>
          </dl>
            
          {/* </div> */}
        </div>
      
      Training {trainingid}

      </div>
    
    
    </StyledTraining>

  </Layout>
  )
}

const StyledTraining = styled.div`

   --bg-color: #f7f7f7;
   --bg-card-color: #39466b;
   --spc-4: 1rem;
   --spc-8: 2rem;

 background-color: var(--bg-color);
 
 .container-lg {
    width: min(calc(100vw - 40px), 60rem);
    margin-inline: auto;
    min-height: 100vh;
  }

  .cover {
    position: relative;
  }

  .cover {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr auto;
    grid-template-areas: 'img img' 'card ref'
  }

  /* .cover-desc {
    position: absolute;
    bottom: -2rem;
    left: var(--spc-8);
    display: flex;
    column-gap: var(--spc-4);
    justify-content: space-between;
  } */

  img {
    grid-area: img;
    margin-top: 5rem;
    width: 100%;
    height: auto;
    aspect-ratio: 16/9;
  }

 .card {
    /* position: absolute;
    bottom: 2rem;
    left: var(--spc-8); */
    grid-area: card;
    background-color: var(--bg-card-color);
    width: min(calc(100% - 2rem), 20rem);
    aspect-ratio: 3/2;
    border: 1px solid #fff;
    box-shadow: 0 0 0.5rem rgba(0,0,0,0.2);
 }

 .training-ref {
    grid-area: ref;
    display: flex;
    flex-wrap: wrap;
    background-color: #fff;
    height: min-content;
    align-items: flex-end;
    align-self: flex-end;
 }


 

`

export default Training
