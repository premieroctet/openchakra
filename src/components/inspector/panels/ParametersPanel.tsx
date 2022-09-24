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
import { useForm } from '~hooks/useForm'

const SEPARATOR = '='

const ParametersPanel = () => {
  const dispatch = useDispatch()
  const inputRef = useRef<HTMLInputElement>(null)

  const activeParamsRef = useInspectorState()
  const { params, id } = useSelector(getSelectedComponent)
  const { setValue } = useForm()

  const [quickParams, setQuickParams] = useState('')
  const [hasError, setError] = useState(false)

  const onDelete = (paramsName: string) => {
    dispatch.components.deleteParams({
      id,
      name: paramsName,
    })
  }

  const activeParams = activeParamsRef || []
  const customParams = Object.keys(params).filter(
    paramsName => !activeParams.includes(paramsName),
  )

  return (
    <>
      <form
        onSubmit={(event: FormEvent) => {
          event.preventDefault()

          const [name, value] = quickParams.split(SEPARATOR)

          if (name && value) {
            setValue(name, value)
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
            placeholder={`params${SEPARATOR}value`}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setQuickParams(event.target.value)
            }
          />
        </InputGroup>
      </form>

      {customParams.map((paramsName, i) => (
        <Flex
          key={paramsName}
          alignItems="center"
          px={2}
          bg={i % 2 === 0 ? 'white' : 'gray.50'}
          fontSize="xs"
          justifyContent="space-between"
        >
          <SimpleGrid width="100%" columns={2} spacing={1}>
            <Box fontWeight="bold">{paramsName}</Box>
            <Box>{params[paramsName]}</Box>
          </SimpleGrid>

          <ButtonGroup display="flex" size="xs" isAttached>
            <IconButton
              onClick={() => {
                setQuickParams(`${paramsName}=`)
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
              onClick={() => onDelete(paramsName)}
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
