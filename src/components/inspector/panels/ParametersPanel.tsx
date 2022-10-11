import React, { memo, useState, FormEvent, ChangeEvent, useRef } from 'react'
import { useInspectorState } from '~contexts/inspector-context'
import { getComponentParams } from '~core/selectors/components'
import { useSelector } from 'react-redux'
import {
  IconButton,
  Flex,
  Box,
  SimpleGrid,
  InputGroup,
  Input,
  ButtonGroup,
  Checkbox,
  Button,
  Spacer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import { ChevronDownIcon, EditIcon, SmallCloseIcon } from '@chakra-ui/icons'
import useDispatch from '~hooks/useDispatch'
import { useParamsForm } from '~hooks/useParamsForm'

const ParametersPanel = () => {
  const dispatch = useDispatch()
  const inputRef = useRef<HTMLInputElement>(null)

  const activeParamsRef = useInspectorState()
  const params = useSelector(getComponentParams)
  const { setValue } = useParamsForm()

  const DEFAULT_PARAMS: {
    name: string
    value: any
    type: string
    optional: boolean
  } = {
    name: '',
    value: '',
    type: '',
    optional: false,
  }
  const [quickParams, setQuickParams] = useState(DEFAULT_PARAMS)
  const [hasError, setError] = useState(false)

  const onDelete = (paramsName: string) => {
    dispatch.components.deleteParams({
      id: 'root',
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
          if (quickParams.name && quickParams.value && quickParams.type) {
            setValue(
              quickParams.name,
              quickParams.value,
              quickParams.type,
              quickParams.optional,
            )
            setQuickParams(DEFAULT_PARAMS)
            setError(false)
          } else {
            setError(true)
          }
        }}
      >
        <InputGroup mb={3} size="sm">
          <Flex direction="column">
            <Flex direction="row">
              <Input
                mb={1}
                isInvalid={hasError}
                value={quickParams.type}
                placeholder={`type`}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setQuickParams({ ...quickParams, type: event.target.value })
                }
              />
              <Menu>
                <MenuButton
                  p={1}
                  m={1}
                  borderRadius="md"
                  borderWidth="1px"
                  type="button"
                >
                  <ChevronDownIcon />
                </MenuButton>
                <MenuList>
                  <MenuItem
                    onClick={() =>
                      setQuickParams({ ...quickParams, type: 'string' })
                    }
                  >
                    string
                  </MenuItem>
                  <MenuItem
                    onClick={() =>
                      setQuickParams({ ...quickParams, type: 'number' })
                    }
                  >
                    number
                  </MenuItem>
                  <MenuItem
                    onClick={() =>
                      setQuickParams({ ...quickParams, type: 'boolean' })
                    }
                  >
                    boolean
                  </MenuItem>
                  <MenuItem
                    onClick={() =>
                      setQuickParams({ ...quickParams, type: 'any' })
                    }
                  >
                    any
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
            <Flex direction="row">
              <Input
                ref={inputRef}
                mr={0.5}
                isInvalid={hasError}
                value={quickParams.name}
                placeholder={`name`}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setQuickParams({ ...quickParams, name: event.target.value })
                }
              />
              <Input
                ml={0.5}
                isInvalid={hasError}
                value={quickParams.value}
                placeholder={`value`}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setQuickParams({ ...quickParams, value: event.target.value })
                }
              />
            </Flex>
            <Flex direction="row">
              <Checkbox
                size="md"
                isChecked={quickParams.optional}
                onChange={event => {
                  setQuickParams({
                    ...quickParams,
                    optional: event.target.checked,
                  })
                }}
              >
                optional?
              </Checkbox>
              <Spacer />
              <Button
                type="submit"
                size="sm"
                variant="outline"
                mt={0.5}
                bgColor="lightblue"
              >
                Add
              </Button>
            </Flex>
          </Flex>
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
            <Box fontWeight="bold">
              {paramsName.name}
              {paramsName.optional && '?'}
            </Box>
            <Box>{paramsName.value}</Box>
            <Box fontStyle="italic">{paramsName.type}</Box>
          </SimpleGrid>

          <ButtonGroup display="flex" size="xs" isAttached>
            <IconButton
              onClick={() => {
                setQuickParams(paramsName)
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
