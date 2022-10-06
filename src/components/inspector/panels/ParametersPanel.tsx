import React, { memo, useState, FormEvent, ChangeEvent, useRef } from 'react'
import { useInspectorState } from '~contexts/inspector-context'
import { getSelectedComponent } from '~core/selectors/components'
import { useSelector } from 'react-redux'
import { IoIosFlash } from 'react-icons/io'
import {
  IconButton,
  Flex,
  Box,
  SimpleGrid,
  InputGroup,
  InputRightElement,
  Input,
  ButtonGroup,
} from '@chakra-ui/react'
import { EditIcon, SmallCloseIcon } from '@chakra-ui/icons'
import useDispatch from '~hooks/useDispatch'
import { useParamsForm } from '~hooks/useParamsForm'

const SEPARATOR = '='
const SEPARATOR2 = ':'

const ParametersPanel = () => {
  const dispatch = useDispatch()
  const inputRef = useRef<HTMLInputElement>(null)

  const activeParamsRef = useInspectorState()
  const { params, id } = useSelector(getSelectedComponent)
  const { setValue } = useParamsForm()

  const [quickParams, setQuickParams] = useState('')
  const [hasError, setError] = useState(false)

  const onDelete = (paramsName: string) => {
    dispatch.components.deleteParams({
      id,
      name: paramsName,
    })
  }

  const activeParams = activeParamsRef || []
  const customParams = params?.filter(
    (paramsName: any) => !activeParams.includes(paramsName),
  )

  return (
    <>
      <form
        onSubmit={(event: FormEvent) => {
          event.preventDefault()

          const [name, valueType] = quickParams.split(SEPARATOR)
          const [value, type] = valueType.split(SEPARATOR2)

          if (name && value && type) {
            setValue(name, value, type)
            setQuickParams('')
            setError(false)
          } else {
            setError(true)
          }
        }}
      >
        <InputGroup mb={3} size="sm">
          <InputRightElement>
            <Box as={IoIosFlash} color="gray.300" />
          </InputRightElement>
          <Input
            ref={inputRef}
            isInvalid={hasError}
            value={quickParams}
            placeholder={`params${SEPARATOR}value${SEPARATOR2}type`}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setQuickParams(event.target.value)
            }
          />
        </InputGroup>
      </form>

      {customParams?.map((paramsName: any, i: any) => (
        <Flex
          key={paramsName.name}
          alignItems="center"
          px={2}
          bg={i % 2 === 0 ? 'white' : 'gray.50'}
          fontSize="xs"
          justifyContent="space-between"
        >
          <SimpleGrid width="100%" columns={3} spacing={1}>
            <Box fontWeight="bold">{paramsName.name}</Box>
            <Box>{paramsName.value}</Box>
            <Box fontStyle="italic">{paramsName.type}</Box>
          </SimpleGrid>

          <ButtonGroup display="flex" size="xs" isAttached>
            <IconButton
              onClick={() => {
                setQuickParams(`${paramsName.name}=`)
                if (inputRef.current) {
                  inputRef.current.focus()
                }
              }}
              variant="ghost"
              size="xs"
              aria-label="edit"
              icon={<EditIcon path="" />}
            />
            <IconButton
              onClick={() => onDelete(paramsName.name)}
              variant="ghost"
              size="xs"
              aria-label="delete"
              icon={<SmallCloseIcon path="" />}
            />
          </ButtonGroup>
        </Flex>
      ))}
    </>
  )
}

export default memo(ParametersPanel)
