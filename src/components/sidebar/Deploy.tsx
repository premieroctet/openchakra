import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import { useToast } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { ProjectState } from '~core/models/project'
import { getFullComponents } from '~core/selectors/components'
import { deploy } from '../../utils/deploy'
import { getModels } from '../../core/selectors/dataSources';

const deployComponents = (state: ProjectState, models: any, toast: any) => {
  toast({
    title: 'Starting publishing',
    status: 'success',
    position: 'top',
    duration: 2000,
    isClosable: true,
  })
  return deploy(state, models)
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
      console.error(err)
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
  const models = useSelector(getModels)

  return (
    <DeployButton
      onClick={() => {
        setIsDeploying(true)
        deployComponents(state, models, toast)
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
