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
  Portal,
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

const paramTypes = ['string', 'number', 'boolean', 'Function', 'any']

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
    ref: false,
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
  const viewParamsRef = useRef(null)

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
              quickParams.ref,
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
              isInvalid={hasError}
              value={quickParams.type}
              placeholder={`type`}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setQuickParams({ ...quickParams, type: event.target.value })
              }
              _placeholder={{
                color: 'gray',
              }}
              borderColor="gray.200"
            />

            <InputRightAddon borderColor="gray.200">
              <Menu>
                <MenuButton type="button">
                  <ChevronDownIcon />
                </MenuButton>
                <Portal>
                  <MenuList
                    borderColor="gray.200"
                    color="black"
                    className="paramsMenu"
                  >
                    {paramTypes.map((type: string) => (
                      <MenuItem
                        key={type}
                        onClick={() =>
                          setQuickParams({ ...quickParams, type: type })
                        }
                      >
                        {type}
                      </MenuItem>
                    ))}
                  </MenuList>
                </Portal>
              </Menu>
            </InputRightAddon>
          </InputGroup>
          <Flex direction="row" mt={1}>
            <Input
              ref={inputRef}
              size="sm"
              isInvalid={hasError}
              value={quickParams.name}
              placeholder={`name`}
              _placeholder={{
                color: 'gray',
              }}
              borderColor="gray.200"
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setQuickParams({ ...quickParams, name: event.target.value })
              }
            />
            <Input
              ml={1}
              size="sm"
              isInvalid={hasError}
              value={quickParams.value}
              placeholder={`value`}
              _placeholder={{
                color: 'gray',
              }}
              borderColor="gray.200"
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
              borderColor="gray.200"
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
          <Button type="submit" size="xs" variant="outline" bgColor="lightblue">
            Save
          </Button>
        </Flex>
      </form>

      {customParams?.length ? (
        <SimpleGrid width="100%" columns={4} spacing={1} bgColor="yellow.100">
          <Box fontSize="sm" fontWeight="bold" pl={1}>
            Name
          </Box>
          <Box fontSize="sm" fontStyle="italic">
            Type
          </Box>
          <Box fontSize="sm">Value</Box>
        </SimpleGrid>
      ) : (
        <></>
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
