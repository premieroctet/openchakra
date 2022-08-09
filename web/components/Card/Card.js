import React, {useState} from 'react'
import ReactHtmlParser from 'react-html-parser'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Link from 'next/link'
import EditIcon from '@material-ui/icons/Edit'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import {withTranslation} from 'react-i18next'
import Rating from '@material-ui/lab/Rating'
import Chip from '@material-ui/core/Chip'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import Dialog from '@material-ui/core/Dialog'
import UserAvatar from '../Avatar/UserAvatar'
import CustomButton from '../CustomButton/CustomButton'
import {getDataModel} from '../../config/config'
import {API_PATH} from '../../utils/consts'


const Card = ({
  link,
  user,
  name,
  picture,
  title,
  description,
  city,
  rating,
  isCpf,
  isPro,
  tags,
  Cta,
  edit,
  remove,
}) => {

  if (!title) {
    return null
  }

  return(
    <Wrapper link={link}>
      <StyledCard theme={getDataModel()}>

        {user!==undefined &&
        <div className='card_avatar customcardpreviewavatar'>
          <UserAvatar user={user} />
        </div>
        }

        <div className={`card_content customcardpreviewbox`}>
          
          <div className='card_content-image'>
            {picture && <img src={picture} alt="" />}
            {(edit || remove) && <CardContentActions>
              {edit && <EditServiceUser editAction={edit} />}
              {remove}
            </CardContentActions>
            }
            <div className='card_content-tags'>
              {isCpf && <Chip label={'CPF'} className={'customcardchipcpf'} />}
              {isPro && <Chip label={'PRO'} className={'customcardchippro'} />}
              {tags && tags.map(tag => <Chip label={tag} className={'customcardchip'} />)}
            </div>
          </div>

          <div className='card_content-text'>
          
            {name !== undefined && <p className={`customcardpreviewname`}>{name}</p>}
            <p className={`customcardpreviewlabel`}>{title}</p>
            {description !==undefined && <p>{description}</p>}
            {city !==undefined && <p className={'customcardpreviewplace'} >{city}</p>}

            {rating !==undefined && <div className={'card_content_rating customcardpreviewrating'}>
              <Rating
                name="simple-controlled"
                value={rating}
                max={1}
                readOnly
              />
              <p>({rating})</p>
            </div>
            }

            {Cta && <Cta />}

          </div>
        </div>
      </StyledCard>
    </Wrapper>
  )
}

Card.propTypes = {
  link: PropTypes.string,
  user: PropTypes.object,
  name: PropTypes.string,
  picture: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  city: PropTypes.string,
  rating: PropTypes.number,
  tags: PropTypes.array,
  edit: PropTypes.function,
  remove: PropTypes.function,
  isCpf: PropTypes.bool,
  isPro: PropTypes.bool,
  Cta: PropTypes.component,
}

const Wrapper = ({link, children}) => (
  link ?
    <Link href={link}>{children}</Link>
    : <div>{children}</div>
)


const EditServiceUser = ({editAction}) => (
  <button aria-label='éditer' onClick={e => {
    e.preventDefault()
    editAction()
  }}>
    <EditIcon />
  </button>
)

const EditDeleteService = ({id_service, t}) => {

  const [showDialog, setShowDialog] = useState(false)
  
  const deleteService = id_service => {
    axios.delete(`${API_PATH}/serviceUser/${id_service}`)
      .then(() => {
        setShowDialog(false)
      })
      .catch(err => console.error(err))
  }

  return (<>
    
    <button aria-label="supprimer" onClick={() => setShowDialog(true)}>
      <DeleteForeverIcon />
    </button>
    {showDialog && <Dialog
      open={showDialog}
      onClose={() => setShowDialog(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{ReactHtmlParser(t('CARD_SERVICE.dialog_delete_title'))}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {ReactHtmlParser(t('CARD_SERVICE.dialog_delete_content'))}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <CustomButton onClick={() => setShowDialog(false)} color="primary">
          {ReactHtmlParser(t('COMMON.btn_cancel'))}
        </CustomButton>
        <CustomButton onClick={() => deleteService(id_service)} >
          {ReactHtmlParser(t('COMMON.btn_delete'))}
        </CustomButton>
      </DialogActions>
    </Dialog>}
  </>
  )
}

const CardContentActions = styled.div`
  position: absolute;
  top: var(--spc-3);
  z-index: 1;
  display: flex;
  column-gap: var(--spc-1);
  row-gap: var(--spc-2);
  flex-direction: column;
  left: var(--spc-3);

  a, button {
    border: 0;
    cursor: pointer;
    padding: var(--spc-1);
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0,0,0,0.7);
    color: var(--white);
    border-radius: var(--rounded-full);
  }
  
  a svg {
    color: var(--white);
  }

`

const EditDelete = withTranslation(null, {withRef: true})(EditDeleteService)


const StyledCard = styled.a`

  --card-padding: var(--spc-4);

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 80px auto;
  grid-template-areas:  'card_avatar'
                        'card_content';
  min-width: 250px;
  aspect-ratio: 4 / 5;
  cursor: pointer;
  transition: transform var(--delayIn) ease-out;

  &:hover {
    .card_content-image::after {
      background-color: transparent;
    }
  }

  .card_avatar {
    justify-self: center;
    grid-area: card_avatar;
    z-index: 2;
  }
  
  .card_avatar + * {
    margin-top: 40px;
  }
  
  .card_content {
    grid-area: card_content;
    display: grid;
    grid-template-areas: 'card_content-image' 'card_content-text';
    grid-template-rows: minmax(0,1fr) minmax(0,1fr);
    overflow: hidden;
    border-radius: 1rem;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.3);
    grid-row: 1 / -1;
    grid-column: 1 / -1;
    margin-bottom: var(--spc-4);

    &> :is(p, div, ):not(.card_content-image) {
      padding: var(--card-padding);
    }

    p {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
      text-overflow: ellipsis;
      margin: 0;
      margin-bottom: var(--spc-1);
    }

    &> * {
      transition: var(--delayIn) ease-in;
    }
  }

  .card_content-actions, .card_content-tags {
    position: absolute;
    top: var(--spc-3);
    z-index: 1;
    display: flex;
    column-gap: var(--spc-1);
    row-gap: var(--spc-2);
  }

  .card_content-actions {
    flex-direction: column;
    left: var(--spc-3);
  }

  .card_content-tags {
    right: var(--spc-3);
    justify-content: end;
    flex-wrap: wrap;
    margin-inline-start: var(--spc-12);

    &> * {
      background-color: var(--primary-color);
      color: var(--white);
      width: min-content;
    }
  }

  .card_content-image {
    grid-area: card_content-image;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }

  .card_content-image::after {
    transition: background-color var(--delayIn) ease-in-out;
    content: '';
    width: 100%;
    height: 100%;
    display: block;
    inset: 0;
    background-color: var(--secondary-color);
    filter: opacity(0.4);
    position: absolute;
  }

  .card_content-text {
    grid-area: card_content-text;
    align-self: flex-start;
    color: var(--black);
    z-index: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    button {
      color: var(--white);
      background-color: var(--secondary-color);
      padding-inline: var(--spc-8);
      align-self: center;
      width: min-content;
      margin-block-start: var(--spc-2);
      margin-inline-end: var(--spc-1);
      border-radius: var(--rounded-3xl);
      text-transform: unset;
    }
  }

  .card_content_rating {
    display: flex;
    align-items: last baseline;
    justify-content: end;
  }


  ${props => {
  if (props.theme === 'aftral') {
    return `

      p {
        font-weight: bold;
      }

      `
  }

  return `

  `
}
 }

`

export default withTranslation(null, {withRef: true})(Card)
