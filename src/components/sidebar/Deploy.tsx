import React from 'react'
import styled from 'styled-components'
import { useToast } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { getComponents } from '~core/selectors/components'
import { deploy } from '../../utils/deploy'

const deployComponents = (components: IComponents, toast: any) => {
  toast({
    title: 'Starting publishing',
    status: 'success',
    position: 'top',
    duration: 2000,
    isClosable: true,
  })
  deploy(components)
    .then(() => {
      toast({
        title: 'Published on production',
        status: 'success',
        position: 'top',
        duration: 2000,
        isClosable: true,
      })
    })
    .catch(err => {
      toast({
        title: 'Error while publishing',
        description: String(err),
        status: 'error',
        position: 'top',
        duration: 2000,
        isClosable: true,
      })
    })
}

const Deploy = () => {
  const toast = useToast()
  const components = useSelector(getComponents)
  return (
    <DeployButton
      onClick={() => deployComponents(components, toast)}
      alt="Deploy"
    >
      Deploy
    </DeployButton>
  )
}

const DeployButton = styled.button`
  color: white;
  display: flex;
  height: min-content;
  font-weight: bold;
  border-radius: 1rem;
  background-color: var(--primary-color);
  padding-inline: 0.7rem;
  padding-block: 0.2rem;
`

export default Deploy
