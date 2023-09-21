import { CheckboxGroup, Checkbox, Flex } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import React from 'react'
import * as Chakra from '@chakra-ui/react'
import {getComponents} from '~core/selectors/components'
import { getDataProviderDataType } from '~utils/dataSources'
import { getModels } from '~core/selectors/dataSources'
import { useDropComponent } from '~hooks/useDropComponent'
import { useInteractive } from '~hooks/useInteractive'

import WithChildrenPreviewContainer from '../WithChildrenPreviewContainer';

interface Props {
  component: IComponent
}

const CheckboxGroupPreview = ({ component }: Props) => {
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

  console.log(`DP is ${JSON.stringify(dp)}`)
  const values=dp?.enumValues || []

  if (props.dataSource && values && component.children?.length==0) {
  return (
    <CheckboxGroup ref={ref} {...props} style={{bgColor: 'red'}}>
      <Flex flexDirection={props.flexDirection} justifyContent={props.justifyContent}>
      {Object.keys(values).map((k, idx) => <Flex flexDirection='row'><Radio value={k} />{values[k]}</Flex>)}
      </Flex>
    </CheckboxGroup>
  )
  }
  else {
    return <WithChildrenPreviewContainer
      {...props}
      enableVisualHelper
      component={component}
      type={Chakra.RadioGroup}
      isBoxWrapped
    />

  }
}

export default CheckboxGroupPreview
