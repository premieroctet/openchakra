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
  Tooltip,
  InputRightAddon,
} from '@chakra-ui/react'
import {
  ChevronDownIcon,
  EditIcon,
  InfoOutlineIcon,
  SmallCloseIcon,
} from '@chakra-ui/icons'
import useDispatch from '~hooks/useDispatch'
import { useParamsForm } from '~hooks/useParamsForm'
import { getSelectedCustomComponentId } from '~core/selectors/customComponents'

const ParametersPanel = () => {
  const dispatch = useDispatch()
  const inputRef = useRef<HTMLInputElement>(null)

  const activeParamsRef = useInspectorState()
  const params = useSelector(getComponentParams)
  const customComponentName = useSelector(getSelectedCustomComponentId)
  const { setValue } = useParamsForm()

  const DEFAULT_PARAMS: ParametersType = {
    name: '',
    value: '',
    type: '',
    optional: false,
    exposed: false,
  }
  const [quickParams, setQuickParams] = useState(DEFAULT_PARAMS)
  const [hasError, setError] = useState(false)

  const onDelete = (paramsName: string) => {
    dispatch.components.deleteParams({
      id: 'root',
      name: paramsName,
    })
    if (customComponentName)
      dispatch.customComponents.deleteParams({
        id: customComponentName,
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
              quickParams.exposed,
            )
            setQuickParams(DEFAULT_PARAMS)
            setError(false)
          } else {
            setError(true)
          }
        }}
      >
        <Flex direction="column">
          <InputGroup size="sm">
            <Input
              mb={1}
              isInvalid={hasError}
              value={quickParams.type}
              placeholder={`type`}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setQuickParams({ ...quickParams, type: event.target.value })
              }
            />

            <InputRightAddon>
              <Menu>
                <MenuButton type="button">
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
            </InputRightAddon>
          </InputGroup>
          <Flex direction="row">
            <Input
              ref={inputRef}
              mr={0.5}
              size="sm"
              isInvalid={hasError}
              value={quickParams.name}
              placeholder={`name`}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setQuickParams({ ...quickParams, name: event.target.value })
              }
            />
            <Input
              ml={0.5}
              size="sm"
              isInvalid={hasError}
              value={quickParams.value}
              placeholder={`value`}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setQuickParams({ ...quickParams, value: event.target.value })
              }
            />
          </Flex>
          <Flex direction="row" alignItems="center">
            <Checkbox
              size="sm"
              isChecked={quickParams.optional}
              onChange={event => {
                setQuickParams({
                  ...quickParams,
                  optional: event.target.checked,
                })
              }}
            >
              optional
              <Tooltip
                label="Make parameter optional (?)"
                fontSize="xs"
                hasArrow
                placement="left"
              >
                <InfoOutlineIcon color="teal.300" w={3} h={3} ml={1} />
              </Tooltip>
            </Checkbox>
            <Spacer />
          </Flex>
          <Button
            type="submit"
            size="xs"
            variant="outline"
            my={0.5}
            bgColor="lightblue"
          >
            Save
          </Button>
        </Flex>
      </form>

      {customParams && (
        <SimpleGrid width="100%" columns={4} spacing={1} bgColor="yellow.100">
          <Box fontSize="sm" fontWeight="bold" pl={1}>
            Name
          </Box>
          <Box fontSize="sm" fontStyle="italic">
            Type
          </Box>
          <Box fontSize="sm">Value</Box>
        </SimpleGrid>
      )}
      {customParams?.map((paramsName: ParametersType, i: any) => (
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
              {paramsName.exposed && '*'}
            </Box>
            <Box fontStyle="italic">{paramsName.type}</Box>
            <Box>{paramsName.value}</Box>
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
