import React, {useState} from 'react'
import styled from 'styled-components'
import { useToast } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { getFullComponents } from '~core/selectors/components'
import { deploy } from '../../utils/deploy'
import { ProjectState } from '~core/models/project'

const deployComponents = (state: ProjectState, toast: any) => {
  toast({
    title: 'Starting publishing',
    status: 'success',
    position: 'top',
    duration: 2000,
    isClosable: true,
  })
  return deploy(state)
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
  const state = useSelector(getFullComponents)
  const [deploying, setIsDeploying]=useState(false)
  return (
    <DeployButton
      onClick={() => {
        setIsDeploying(true)
        deployComponents(state, toast)
          .finally(() => setIsDeploying(false))
      }}
      disabled={deploying}
    >
      {deploying ? 'Deploying...' : 'Deploy'}
    </DeployButton>
  )
}

const DeployButton = styled.button`
  color: ${props => props.disabled ? 'var(--primary-color)' : 'white'};
  display: flex;
  height: min-content;
  font-weight: bold;
  border-radius: 1rem;
  background-color: ${props => props.disabled ? 'white' : 'var(--primary-color)'};
  padding-inline: 0.7rem;
  padding-block: 0.2rem;
`

export default Deploy
