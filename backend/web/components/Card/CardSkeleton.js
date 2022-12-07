import React from 'react'
import styled from 'styled-components'
import {Skeleton} from '@material-ui/lab'


const CardSkeleton = () => {

  return (
    
    <StyledCard >
      <div className={'paperloadingCard'}>
        <div className={'cardLoadingImgCont'}>
          <div className={'cardLoadingCard'}>
            <Skeleton animation="wave" variant="rect" className={'media'} />
          </div>
          <div>
            <Skeleton animation="wave" height={10} width="50%" style={{margin: 5, marginTop: 20}}/>
          </div>
          <div>
            <Skeleton animation="wave" height={10} width="80%" style={{margin: 5}}/>
          </div>
          <div>
            <Skeleton animation="wave" height={10} width="70%" style={{margin: 5}}/>
          </div>
          <div>
            <Skeleton animation="wave" height={10} width="50%" style={{margin: 5}}/>
          </div>
          <div style={{position: 'absolute', bottom: 0, right: 0}}>
            <Skeleton animation="wave" width={80} height={50} style={{borderRadius: 24, padding: '5px 30px'}}/>
          </div>
        </div>
      </div>
    </StyledCard>
  )
}

const StyledCard = styled.div`
  width: 100%;
  border-radius: 1rem;
  box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12);

  .paperloadingCard {
    border-radius: 20;
    display: flex;
    justify-content: center;
    height: 450px;
    cursor: pointer;
  }

  .cardLoadingImgCont {
    position: relative;
    width: 80%;
    margin-top: 8%;
    margin-bottom: 5%;
    display: flex;
    flex-direction: column;
  }

  .cardLoadingCard {
    width: 100%;
    height: 200px;
  }

  .media {
    width: 100%;
    height: 100%;
    border-radius: 20px;
  }

`

export default CardSkeleton
