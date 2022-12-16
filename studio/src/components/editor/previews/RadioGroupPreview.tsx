import React from 'react'
import { useDropComponent } from '~hooks/useDropComponent'
import { useInteractive } from '~hooks/useInteractive'
import { RadioGroup, Radio, Flex } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import {getComponents} from '~core/selectors/components'
import { getModels, getModelAttributes } from '~core/selectors/dataSources'
import { getDataProviderDataType } from '~utils/dataSources'

import icons from '~iconsList'

interface Props {
  component: IComponent
}

const RadioGroupPreview = ({ component }: Props) => {
  const { isOver } = useDropComponent(component.id)
  const { props, ref } = useInteractive(component, true)
  const components: IComponents = useSelector(getComponents)
  const models = useSelector(getModels)


  if (isOver) {
    props.bg = 'teal.50'
  }


  let dp=null
  if (component && components && props.dataSource && models) {
    try {
      dp=getDataProviderDataType(component, components, props.dataSource, models)
    }
    catch(err) {
      console.error(err)
    }
  }
  const values=dp?.enumValues || []

  return (
    <RadioGroup ref={ref} {...props}>
    <>
    {
      values.map((e, idx) => <Flex flexDirection='row'><Radio value={e} />{e}</Flex>)
    }
    </>
    </RadioGroup>
  )
}

export default RadioGroupPreview
