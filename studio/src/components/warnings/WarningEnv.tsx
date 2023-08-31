import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from '@emotion/styled'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react'

const WarningEnv = () => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [missingVars, setMissingVars] = useState([])

  useEffect(() => {

    let missedParts = []

    console.log('process.env.NEXT_PUBLIC_PROJECT_TARGETDOMAIN', process.env.NEXT_PUBLIC_PROJECT_TARGETDOMAIN)
    if (!process.env.NEXT_PUBLIC_PROJECT_TARGETDOMAIN || process.env.NEXT_PUBLIC_PROJECT_TARGETDOMAIN === '') {
      alert(`Without NEXT_PUBLIC_PROJECT_TARGETDOMAIN, we're not gonna get anything. Or backend server is down`)
      return
    }

    axios.get(`${process.env.NEXT_PUBLIC_PROJECT_TARGETDOMAIN}/myAlfred/api/studio/checkenv/`)
      .then(res => {
        missedParts = res.data
        setMissingVars(res.data)
      })
      .catch(err => console.error(err))
      .finally(() => {
        if (missedParts.length > 0) {
          onOpen()
        }
      })
      
  }, [])

  return (

    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent minW={'50vw'}>
        <ModalHeader>Something is missing</ModalHeader>
        <ModalCloseButton />
        <ModalBody display={'flex'} flexDirection={'column'}>
          <WarningBox>
              <img 
                src="/images/snoopy.webp"
                width="100%"
                alt="Représentation d'un développeur du studio"
              />
              <div>
                <p>Please, fill in {missingVars.length > 1 ? 'these': 'this'} following .env var</p>
                <ul>
                  {missingVars.map((misvar) => <li key={misvar}>{misvar}</li>)}
                </ul>
              </div>
          </WarningBox>
          
        </ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  )
}

const WarningBox = styled.div`
  display:flex;
  column-gap: 2rem;

  div {
    flex: 1;
    font-size: 0.9rem;
  }
  
  img {
    flex: 1;
    aspect-ratio: 1/1;
    object-fit: cover;
  }
`

export default WarningEnv