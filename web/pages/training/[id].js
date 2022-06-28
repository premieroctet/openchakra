import React, {useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import styled from 'styled-components'
// import {client} from '../../utils/client'
import axios from 'axios'
import ReactHtmlParser from 'react-html-parser'
import Layout from '../../hoc/Layout/Layout'
import {screen} from '../../styles/screenWidths'
import {getHostUrl} from '../../config/config'
import DrawerBooking from '../../components/Drawer/DrawerBooking/DrawerBooking'
import PureDialog from '../../components/Dialog/PureDialog'


const Stars = ({rating, max}) => {
  const ratingToDisplay = Math.round(rating)
  return (<span className='stars'>
    {`${'★'.repeat(ratingToDisplay)}${'☆'.repeat(max - Math.round(ratingToDisplay))}` }
  </span>
  )
}

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

const toggleDrawer = open => event => {
  if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
    return
  }
  setDrawerVisible(open)
}

const AFTRAL_ICON_PATH = '/static/assets/icon/aftral'


const Training = ({training}) => {


  const globalNote = Number(4.4).toPrecision(2)
  const maxNote = 5

  const someComments = [
    {
      name: 'Wil',
      date: '01/02/2022',
      rating: 4.5,
      comment: `Tout s'est parfaitement passé. Cette formation est complète et très enrichissante. Je recommande vivement.`,
    },
    {
      name: 'Sole',
      date: '01/01/2022',
      rating: 4.7,
      comment: `Magique. Du pur bonheur. Le formateur nous a enchanté 🦄`,
    },
    {
      name: 'Marion',
      date: '30/12/2021',
      rating: 3.2,
      comment: `Si j'avais su, j'aurais pas venu.`,
    },
  ]


  const [viewMore, setViewMore] = useState(false)
  const [isOpenDialog, setIsOpenDialog] = useState(false)


  return (
    <>
      <Layout>
        <StyledTraining>

          <div className="container-xl">

            <div className='cover'>

              <img
                src={training.service?.picture}
                alt='cover'
                width={600}
                height={200}
              />

              <div className='cover-card'>
                <h1>{training.service?.label}</h1>
                <button type='button'>Acheter</button>
              </div>

              <dl className='training-ref'>
                <dt>Référence</dt>
                <dd>{training.service?.reference}</dd>
                <dt>Durée de la formation</dt>
                <dd>{training.service?.duration_days} {training.service?.duration_days && training.service.duration_days > 1 ? 'jours' : 'jour'}</dd>
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
                  {training.service?.goals[0] || 'Lorem ipsum dolor sit amet. Cum voluptas temporibus ea blanditiis aliquam ex libero pariatur est deserunt nostrum dolorem voluptate et laborum soluta. Et repellendus expedita ut dolor delectus aut placeat quia a ratione quia et corrupti molestias. ' }
                </p>

                <p>
                  <img width={60} height={60} src={`${AFTRAL_ICON_PATH}/gestionnaireCompte.svg`} alt="Gestionnaire" />
                  {training.service?.goals[1] || 'Être le gestionnaire de transport d’une entreprise de transport routier de marchandises.'}
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
                <iframe width="560" height="315" src={training.service?.video} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                </iframe>
              </RoundedBox>
              <RoundedBox>
                <a href={training.service?.program} className='download'>
                  <img width={100} height={100} src={`${AFTRAL_ICON_PATH}/download.svg`} alt=''/>
                  <span>Télécharger</span>
                  <span>le programme complet</span>
                </a>
              </RoundedBox>
            </BoxVideoAndDownload>
          </div>

          <BookingButton onClick={() => setIsOpenDialog(true)}>Réserver cette formation</BookingButton>

          <Stats>
            <ul>
              <li>
                <span>{training.service?.duration_hours}</span>
                <span>heures</span>
                <span>de formation</span>
              </li>
              <li>
                <span>{training?.prestations[0].price.toLocaleString('fr-FR', {style: 'decimal', maximumFractionDigits: 2}) || 899}</span>
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
              <p className='validation'>{ReactHtmlParser(training.service?.validation)}</p>

            </RoundedBox>

            <MoreInfo>
              <h2><img width={25} height={25} src={`${AFTRAL_ICON_PATH}/more.svg`} alt=''/>En savoir plus</h2>

              <div className={`detailsmoreinfo ${viewMore ? 'liberate' : ''}`}>
                {ReactHtmlParser(training.service?.more_info)}
              </div>
              <button onClick={() => setViewMore(!viewMore)}><span>{'>'}</span> {!viewMore ? 'en voir plus' : 'réduire'}</button>


            </MoreInfo>

            <Opinions>

              <h2><img width={25} height={21} src={`${AFTRAL_ICON_PATH}/opinions.svg`} alt=''/>Avis</h2>

              <div className='stateoftheart'>

                <div>
                  <h3>NOTE GENERALE</h3>
                  <p>
                    <span>{globalNote.toLocaleString()}</span>
                    <Stars rating={globalNote} max={maxNote} />
                  </p>
                </div>

                <div>
                  <h3>Commentaires</h3>
                  <p>{'10'}</p>
                </div>
              </div>

              <hr />

              <div className='somecomments'>

                {someComments.map((el, i) => <div className='uniqcomment' key={`comment${i}`}>
                  <div className='whoen'><span>{el.name}</span> <span>{el.date}</span></div>
                  <div className='whaow'><Stars rating={el.rating} max={maxNote} /> {el.comment}</div>
                </div>,
                )}

              </div>

              <hr />


            </Opinions>


          </div>


        </StyledTraining>

      </Layout>

      <BookingDialog title={'Réservation - formation'} open={isOpenDialog}
        onClose={() => setIsOpenDialog(false)} >

        <DrawerBooking
          trainingMode={true}
          serviceUserId={training._id}
          toggleDrawer={toggleDrawer}
        />

      </BookingDialog>
    </>
  )
}


export async function getServerSideProps(context) {

  const training = await axios.get(`${getHostUrl()}myAlfred/api/serviceUser/${context.query.id}`)
    .then(response => {
      return response?.data || null
    })
    .catch(error => { console.log(error) })

  return {props: {training}}
}

const BookingDialog = styled(PureDialog)`

h2 {
  text-align: center;
  color: var(--black);
  margin-bottom: var(--spc-8);
}

.dialogcontent {
  width: min(calc(100% - 2rem), 45rem);
  background-color: #fff;
  padding: var(--spc-10);
  border-radius: var(--rounded-2xl)
}
`


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
    grid-template-rows: 100px 1fr;
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
      color: var(--black);
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

const MoreInfo = styled(RoundedBox)`


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

    &.liberate {
      max-height: 2800px;
      transition: max-height 3s ease-out;

      &::after {
        background: none;
      }
    }

    &::after {
      content: '';
      width: 100%;
      height: 100%;
      background: linear-gradient(0deg, white, transparent 100%);
      display: block;
      position: absolute;
      top: 0;
    }
  }

  .detailsmoreinfo + button {

    span {
      font-size: 1.2rem;
      padding-bottom: 0.2rem;
      display: inline-flex;
      transform: rotate(90deg);
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      border: 1px solid var(--redaftral);
      width: 2rem;
      aspect-ratio: 1 / 1;
    }

    min-width: 30ch;
    padding-block: var(--spc-4);
    margin-block: var(--spc-4);
    display: block;
    grid-template-columns: 1fr;
    font-size: var(--text-xl);
    margin-inline: auto;
    border: 0;
    background: none;
  }

  .detailsmoreinfo.liberate + button {

    span {
      transform: rotate(-90deg);
    }

  }

`


const Opinions = styled(RoundedBox)`

  .stateoftheart {

    display: flex;
    column-gap: var(--spc-8);
    row-gap: var(--spc-8);
    flex-wrap: wrap;
    justify-content: space-around;
    margin-bottom: var(--spc-8);

    &>div {

      h3 {
        margin: 0;
        font-size: var(--text-lg);
        text-transform: uppercase;
        color: silver;
      }

      p {
        margin: 0;
        font-weight: bold;
        font-size: var(--text-xl);
        display: flex;
        align-items: baseline;
        column-gap: var(--spc-4);
      }

      display: flex;
      flex-direction: column-reverse;
    }


  }

  .stars {
    color:  #ffc107;
    font-size: var(--text-2xl);
  }

  hr {
    border:0;
    border-bottom: 1px solid silver;
    width: calc(100% - 4rem);
    margin-bottom: var(--spc-8);
  }

  .somecomments {


    .uniqcomment {

      width: calc(100% - 4rem);
      margin-inline: auto;
      display: flex;
      justify-content: space-between;
      column-gap: var(--spc-4);
      flex-wrap: wrap;
      margin-bottom: var(--spc-4);
    }


    .whoen, .whaow {
      display: flex;
      flex-direction: column;
    }

    .whoen {
      font-size: var(--text-base);
      font-weight: bold;
    }

    .whaow {
      flex-grow: 2;
      max-width: 80%;
    }

  }



`

const StyledTraining = styled.div`

  --bg-color: #f7f7f7;
  --bg-card-color: #39466b;
  --redaftral: #a13849;

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

 .flex {
  display: flex;
 }

 .flex-row-reverse {
  flex-direction: row-reverse;
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
    border: 1px solid var(--black);
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
