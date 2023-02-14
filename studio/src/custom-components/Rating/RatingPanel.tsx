import React, { memo } from 'react'
import { 
  Input, 
  Select,
} from '@chakra-ui/react'
import { useForm } from '~hooks/useForm'
import FormControl from '~components/inspector/controls/FormControl'
import usePropsSelector from '~hooks/usePropsSelector'

const RatingPanel = () => {

  const { setValueFromEvent } = useForm()
  const illu = usePropsSelector('illu')
  const size = usePropsSelector('size')
  const scale = usePropsSelector('scale')
  const fillColor = usePropsSelector('fillColor')
  const strokeColor = usePropsSelector('strokeColor')

  return (
    <>
       <FormControl htmlFor="icon" label="Icon">
        <Select
          id="icon"
          value={illu || ''}
          onChange={setValueFromEvent}
          name="illu"
          size="sm"
        >
          <option value={'Star'}>Star</option>
          <option value={'Flame'}>Flame</option>
        </Select>
      </FormControl>
       <FormControl label="Size" htmlFor="ratingsize">
        <Input
          value={size || ''}
          id="ratingsize"
          type={'number'}
          size="sm"
          name="size"
          onChange={setValueFromEvent}
        />
      </FormControl>
       <FormControl label="Fill color" htmlFor="ratingfillcolor">
        <Input
          value={fillColor || ''}
          id="ratingfillcolor"
          size="sm"
          name="fillColor"
          onChange={setValueFromEvent}
        />
      </FormControl>
       <FormControl label="Stroke color" htmlFor="ratingstrokecolor">
        <Input
          value={strokeColor || ''}
          id="ratingstrokecolor"
          size="sm"
          name="strokeColor"
          onChange={setValueFromEvent}
        />
      </FormControl>
      <FormControl label="Scale" htmlFor="ratingscale">
        <Input
          value={scale || ''}
          id="ratingscale"
          type={'number'}
          size="sm"
          name="scale"
          onChange={setValueFromEvent}
        />
      </FormControl>
    </>
  )
}

export default memo(RatingPanel)
