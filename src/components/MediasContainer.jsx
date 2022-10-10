import React from 'react'
import styled from 'styled-components'
import Medias from './medias/Medias'

const MediasContainer = () => {

    return <BgMedias>
        <Medias />
    </BgMedias>

}

const BgMedias = styled.div`
  background: url('/images/backgroundMedias.svg');
  height: 100%;
  margin-inline: 1rem;
  background-size: cover;
  overflow-y: scroll;
`

export default MediasContainer