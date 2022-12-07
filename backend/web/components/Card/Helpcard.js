import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
import styled from 'styled-components'
import Paper from '@material-ui/core/Paper'

const RawCardServiceUserInfo = ({t}) => {
  
  return (
    <Paper elevation={1} className={`customcardinfopaper`}>
      <h2 className={`customcardinfotitle`}>
        {ReactHtmlParser(t('CARD_SERVICE.card_help_title'))}
      </h2>
      <p className={`customcardinfosubtitle`}>
        {ReactHtmlParser(t('CARD_SERVICE.card_help_chat'))}
      </p>
    </Paper>
  )
  
}

const CardServiceUserInfo=withTranslation(null, {withRef: true})(RawCardServiceUserInfo)


const Helpcard = () => {

  return (
    <StyledCardServiceUserInfo className={`customcardinfocont`}>
      <CardServiceUserInfo />
    </StyledCardServiceUserInfo>
  )
}

const StyledCardServiceUserInfo = styled.div`

  width: 100%;

  h2, p {
    color: var(--white);
  }
  
  .customcardinfopaper {
    border-radius: 20px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
 
`

export default Helpcard
