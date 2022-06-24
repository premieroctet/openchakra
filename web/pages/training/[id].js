import React, {useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import styled from 'styled-components'
// import {client} from '../../utils/client'
import axios from 'axios'
import ReactHtmlParser from 'react-html-parser'
import Layout from '../../hoc/Layout/Layout'
import {screen} from '../../styles/screenWidths'
import {getHostUrl} from '../../config/config'


// const useIntersectionObserver = (ref, options) => {
//   const [isIntersecting, setIsIntersecting] = React.useState(false)

//   React.useEffect(() => {
//     const observer = new IntersectionObserver(([entry]) => {
//       console.log(entry)
//       setIsIntersecting(entry.isIntersecting)
//     }, options)

//     if (ref.current) {
//       observer.observe(ref.current)
//     }

//     return () => {
//       observer.unobserve(ref.current)
//     }
//   }, [])

//   return isIntersecting
// }

const AFTRAL_ICON_PATH = '/static/assets/icon/aftral'


const Training = ({training}) => {


  const [viewMore, setViewMore] = useState(false)


  return (<Layout>
    <StyledTraining>
      
      <div className="container-xl">
        
        <div className='cover'>

          <img
            src={training.picture}
            alt='cover'
            width={600}
            height={200}
          />

          <div className='cover-card'>
            <h1>{training.label}</h1>
            <button type='button'>Acheter</button>
          </div>
            
          <dl className='training-ref'>
            <dt>Référence</dt>
            <dd>{training?.reference}</dd>
            <dt>Durée de la formation</dt>
            <dd>{training?.duration_days} {training?.duration_days && training.duration_days > 1 ? 'jours' : 'jour'}</dd>
            <dt>&Eacute;ligigle au <abbr title='compte personnel de formation'>CPF</abbr></dt>
            <dd></dd>
          </dl>
            
        </div>

      </div>

      <div className="container-lg">
        <RoundedBox3items>
          <h2><img width={20} height={16} src={`${AFTRAL_ICON_PATH}/arrow.svg`} alt=''/>Objectif de la formation</h2>

          <div>
            <p>
              <img width={100} height={100} src={`${AFTRAL_ICON_PATH}/diplome.svg`} alt="diplôme" />
              {training?.goals[0] || 'Lorem ipsum dolor sit amet. Cum voluptas temporibus ea blanditiis aliquam ex libero pariatur est deserunt nostrum dolorem voluptate et laborum soluta. Et repellendus expedita ut dolor delectus aut placeat quia a ratione quia et corrupti molestias. ' }
            </p>
           
            <p>
              <img width={60} height={60} src={`${AFTRAL_ICON_PATH}/gestionnaireCompte.svg`} alt="Gestionnaire" />
              {training?.goals[1] || 'Être le gestionnaire de transport d’une entreprise de transport routier de marchandises.'}
            </p>

            <p>
              <img width={60} height={60} src={`${AFTRAL_ICON_PATH}/camion.svg`} alt="véhicule léger" />
              Utiliser exclusivement des véhicules n’excédant pas un poids maximum autorisé de 3,5 tonnes.
            </p>

          </div>
          
 
        </RoundedBox3items>

        <BoxVideoAndDownload>
          <RoundedBox>
            <h2><img width={25} height={14} src={`${AFTRAL_ICON_PATH}/video.svg`} alt=''/>Vidéo</h2>
            <iframe width="560" height="315" src={training?.video} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
            </iframe>
          </RoundedBox>
          <RoundedBox>
            <a href={training?.program} className='download'>
              <img width={100} height={100} src={`${AFTRAL_ICON_PATH}/download.svg`} alt=''/>
              <span>Télécharger</span>
              <span>le programme complet</span>
            </a>
          </RoundedBox>
        </BoxVideoAndDownload>
      </div>

      <BookingButton>Réserver cette formation</BookingButton>

      <Stats>
        <ul>
          <li>
            <span>{training?.duration_hours}</span>
            <span>heures</span>
            <span>de formation</span>
          </li>
          <li>
            <span>{training?.price || 899}</span>
            <span>euros</span>
            <span>Tarif hors dispositif</span>
          </li>
          <li>
            <span>100%</span>
            <span>pris en charge</span>
            <span>par le CPF</span>
          </li>
        </ul>
      </Stats>

      <div className='container-lg'>
        <RoundedBox>
          <h2><img width={21} height={29} src={`${AFTRAL_ICON_PATH}/valid.svg`} alt=''/>Validation du parcours</h2>
          <p className='validation'>{ReactHtmlParser(training?.validation)}</p>

        </RoundedBox>
        <RoundedBox>
          <div className='viewmore'>
            <h2><img width={25} height={25} src={`${AFTRAL_ICON_PATH}/more.svg`} alt=''/>En savoir plus</h2>

            <div className={`detailsmoreinfo ${viewMore ? 'liberate' : ''}`}>
              {ReactHtmlParser(training?.more_info)}
              <div className='moresection'>
                <button onClick={() => setViewMore(!viewMore)}>⇳ en voir plus</button>
              </div>
            </div>
          </div>

        </RoundedBox>

      </div>
    
    
    </StyledTraining>

  </Layout>
  )
}


export async function getServerSideProps(context) {

  const training = await axios.get(`${getHostUrl()}myAlfred/api/service/${context.query.id}`)
    .then(response => {
      return response?.data || null
    })
    .catch(error => { console.log(error) })

  return {props: {training}}
}


const RoundedBox = styled.div`
  padding: 1rem;
  background-color: white;
  border-radius: 2.5rem;
  border: 1px solid lightgray;
  margin-bottom: var(--spc-8);

  h2 {
    font-size: var(--text-xl);
    color: #111;
    display: flex;
    align-items: center;
    margin-left: var(--spc-4);

    img, span {
      color: var(--redaftral);
      font-size: 2rem;
      margin-inline: var(--spc-4) var(--spc-2);
    } 
  }


  /* Format scrapped data from Astral */
  h3, .field-label.title {
    display: block;
    font-size: 1rem;
    font-weight: bold;
    color: var(--redaftral);
    margin-block: var(--spc-4);
  }

  .group-ensavoirplus, .validation {
    padding: var(--spc-2) var(--spc-8) var(--spc-8);

    ul {
      padding: 0;
      list-style: none;
    }
  }

  .detailsmoreinfo {
    position: relative;
    transition: max-height 0.3s ease-out;
    overflow: hidden;
    max-height:40vh;
    overflow: hidden;
    opacity: 0.9;
    text-overflow: fade(10px);
    
    &.liberate {
      max-height: 2800px;
      transition: max-height 3s ease-out;
      opacity: 1;
      transform: none;
    }
    
    .moresection {
      width: 100%;
      padding: 2rem;
      position: absolute;
      bottom: 0;
      display: flex; 
      justify-content: center;
      
    }

    button {
      display: grid;
      font-size: var(--text-xl);
      border: 1px solid var(--redaftral);
      width: max-content;
      background-color: transparent;
      aspect-ratio: 2 / 1;
      margin-inline: auto;
      grid-column: 1 / -1;
      grid-row: 1 / -1;
    }

    button::before {
      grid-column: 1 / -1;
      grid-row: 1 / -1;
      content: '';
      width: 100%;
      height: 100%;
      background-color: gray;
    }

  }

  .viewmore::after {
    content: "";
    width: 100%;
    height: 5rem;
    filter: blur(15px);
    background-color: gray;
  }


`

const RoundedBox3items = styled(RoundedBox)`
  div {
    display: grid;
    column-gap: var(--spc-8);
    justify-content: center;
    grid-template-columns: 1fr;
    align-items: center;
    text-align: center;
    
    @media (${screen.md}) {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }

  p {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    justify-items: center;
    row-gap: var(--spc-2);
    height: 100%;
    margin-inline: var(--spc-4);

    img {
      align-self: center;
    }
  }
`

const BoxVideoAndDownload = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  column-gap: var(--spc-8);

  iframe {
    width: 100%;
    padding: var(--spc-2) var(--spc-8);
  }

  .download {
    display: flex;
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    row-gap: var(--spc-2);

    span {
      color: black;
    }

    span:first-of-type {
      font-size: var(--text-xl);
      font-weight: var(--font-bold);
    }

  }
  
  @media (${screen.md}) {
    grid-template-columns: 2fr 1fr;
  }
`

const BookingButton = styled.button`
  color: white;
  background-color: var(--redaftral);
  font-size: 1.5rem;
  display: block;
  position: sticky;
  bottom: 1rem;
  cursor: pointer;
  width: min(calc(100vw - 2rem), 40rem);
  margin-inline: auto;
  border-radius: 3rem;
  border: 0;
  padding: var(--spc-8) var(--spc-4);
`

const Stats = styled.div`
  background-color: white;
  
  margin-bottom: var(--spc-8);
  
  ul {
    padding: var(--spc-8);
    display: grid;
    grid-template-columns: 1fr;
    row-gap: var(--spc-4);
    width: min(calc(100vw - 2rem), 65rem);
    margin-inline: auto;

    @media (${screen.md}) {
      grid-template-columns: 1fr 1fr 1fr;
      
          li:nth-of-type(1) {
            justify-self: flex-start;
          }
          
          li:nth-of-type(3) {
            justify-self: flex-end;
          }
    }
  }

  li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  span:nth-child(1) {
    color: var(--redaftral);
    font-size: var(--text-4xl);
    font-weight: var(--font-bold);
  }
  span:nth-child(2) {
    font-size: var(--text-lg);
    font-weight: var(--font-bold);
    text-transform: uppercase;
  }
  span:nth-child(3) {
    font-size: var(--text-lg);
  }

  
`

const StyledTraining = styled.div`

   --bg-color: #f7f7f7;
   --bg-card-color: #39466b;
   --spc-2: 0.5rem;
   --spc-3: 0.75rem;
   --spc-4: 1rem;
   --spc-8: 2rem;
   --text-lg: 1.125rem;
   --text-xl: 1.32rem;
   --text-2xl: 1.5rem;
   --text-4xl: 2.25rem;
   --redaftral: #a13849;
   --rounded-xl: 0.75rem;
   --rounded-2xl: 1rem;
   --rounded-3xl: 1.5rem;
   --font-bold: 700;
   
  min-height: 100vh;
  background-color: var(--bg-color);
  position: relative;
 
 .container-xl {
  width: min(calc(100vw - 2rem), 70rem);
  margin-inline: auto;
 }
 
 .container-lg {
  width: min(calc(100vw - 2rem), 60rem);
  margin-inline: auto;
 }


  .cover {
    position: relative;
    display: grid;
    grid-template-columns: 1fr;
    margin-bottom: var(--spc-8);

    img {
      width: 100%;
      height: auto;
      object-position: 50% 30%;
      aspect-ratio: 9 / 3;
      object-fit: cover;
      grid-column: 1 / -1;
      grid-row: 1 / -1;
    }
  }

  

  .cover-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    row-gap: var(--spc-4);
    margin-top: var(--spc-4);
    background-color: var(--bg-card-color);
    min-width: 20rem;
    aspect-ratio: 3/2;
    border: 1px solid #fff;
    box-shadow: 0.7rem 1rem 1rem rgba(0,0,0,0.2);
    margin-bottom: var(--spc-4);
    
    
    h1 {
      /* font-size: clamp(var(--text-lg), var(--text-xl)) ; */
      font-size: var(--text-lg) ;
      padding-inline: var(--spc-3);
      color: white;
      text-align: center;
      text-transform: uppercase;
    }
    
    button {
      cursor: pointer;
      color: white;
      display: block;
      margin-inline: auto;
      text-transform: uppercase;
      background-color: var(--redaftral);
      border: 1px solid gray;
      padding-block: 0.5rem;
      padding-inline: 2.5rem;
      border-radius: var(--rounded-xl);
      margin-bottom: var(--spc-2);
    }
  }
  
  .training-ref {
    display: flex;
    justify-content: space-between;
    column-gap: var(--spc-2);
    row-gap: var(--spc-2);
    flex-wrap: wrap;
    background-color: #fff;
    height: min-content;
    padding: var(--spc-4);
    border: 1px solid black;
    border-radius: var(--rounded-2xl);

    dt {
      color: var(--redaftral);
      font-weight: bold;
    }
    dd {margin: 0}

    dt + dd {
      margin-right: var(--spc-4);
    }
  }
  

  @media (${screen.md}) {
    .cover { 
      grid-template-columns: 2rem 1fr 1fr 1fr 2rem;
      grid-template-rows: repeat(3, 1fr);
      column-gap: var(--spc-4);
    }
    .cover-card {
      grid-column: 2 / 3;
      grid-row: 2 / 4;
      margin-bottom: 0;
    }

    .training-ref {
      grid-row: 3;
      grid-column: 3 / span 2;
    }
  }

  @media (${screen.lg}) {
    .cover { 
      grid-template-columns: 2rem 1fr 1fr 1fr 2rem;
      grid-template-rows: repeat(4, 1fr);
      column-gap: var(--spc-4);
    }

    .cover-card {
      grid-column: 2 / 3;
      grid-row: 3 / 5;
    }

    .training-ref {
      margin-top: 0;
      grid-row: 4;
      grid-column: 3 / span 2;
    }
  }
 

`


export default Training
