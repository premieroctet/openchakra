import React, { memo, useState, FormEvent, ChangeEvent, useRef } from 'react'
import { useInspectorState } from '~contexts/inspector-context'
import {
  getComponentParamNames,
  getSelectedComponent,
} from '~core/selectors/components'
import { useSelector } from 'react-redux'
import {
  IconButton,
  Flex,
  Box,
  SimpleGrid,
  InputGroup,
  Input,
  ButtonGroup,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  InputRightAddon,
  Portal,
} from '@chakra-ui/react'
import { ChevronDownIcon, EditIcon, SmallCloseIcon } from '@chakra-ui/icons'
import useDispatch from '~hooks/useDispatch'
import { useForm } from '~hooks/useForm'

const CustomPropsPanel = () => {
  const dispatch = useDispatch()
  const inputRef = useRef<HTMLInputElement>(null)

  const activePropsRef = useInspectorState()
  const { props, id } = useSelector(getSelectedComponent)
  const params = useSelector(getComponentParamNames)
  const { setValue } = useForm()

  const DEFAULT_CUSTOM_PROPS: {
    name: string
    value: any
  } = {
    name: '',
    value: '',
  }
  const [quickProps, setQuickProps] = useState(DEFAULT_CUSTOM_PROPS)
  const [hasError, setError] = useState(false)

  const onDelete = (propsName: string) => {
    dispatch.components.deleteProps({
      id,
      name: propsName,
    })
  }

  const activeProps = activePropsRef || []
  const customProps = Object.keys(props).filter(
    propsName => !activeProps.includes(propsName),
  )

  return (
    <>
      <form
        onSubmit={(event: FormEvent) => {
          event.preventDefault()
          if (quickProps.name && quickProps.value) {
            let propVal = quickProps.value.trim()
            if (propVal[0] === '{' && propVal[propVal.length - 1] === '}') {
              propVal = propVal.substring(1, propVal.length - 1).trim()
              // if (!params?.includes(propVal)) {
              //   setError(true)
              //   return
              // }
            }
            setValue(quickProps.name, quickProps.value)
            setQuickProps(DEFAULT_CUSTOM_PROPS)
            setError(false)
          } else {
            setError(true)
          }
        }}
      >
        <Input
          size="sm"
          ref={inputRef}
          isInvalid={hasError}
          value={quickProps.name}
          placeholder={`prop`}
          _placeholder={{
            color: 'gray',
          }}
          borderColor="gray.200"
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setQuickProps({ ...quickProps, name: event.target.value })
          }
        />
        <InputGroup size="sm" my={1}>
          <Input
            isInvalid={hasError}
            value={quickProps.value}
            placeholder={`value`}
            _placeholder={{
              color: 'gray',
            }}
            borderColor="gray.200"
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setQuickProps({ ...quickProps, value: event.target.value })
            }
          />
          <InputRightAddon borderColor="gray.200">
            <Menu>
              <MenuButton type="button">
                <ChevronDownIcon />
              </MenuButton>
              <Portal>
                <MenuList
                  className="customPropsMenu"
                  borderColor="gray.200"
                  color="black"
                >
                  {params?.map((param: string) => (
                    <MenuItem
                      key={param}
                      onClick={() =>
                        setQuickProps({ ...quickProps, value: `{${param}}` })
                      }
                    >
                      {param}
                    </MenuItem>
                  ))}
                </MenuList>
              </Portal>
            </Menu>
          </InputRightAddon>
        </InputGroup>
        <Flex>
          <Button
            mr={0}
            type="submit"
            size="xs"
            variant="outline"
            width="100%"
            bgColor="lightblue"
          >
            Save
          </Button>
        </Flex>
      </form>

      {customProps.map((propsName, i) => (
        <Flex
          key={propsName}
          alignItems="center"
          px={2}
          bg={i % 2 === 0 ? 'white' : 'gray.50'}
          fontSize="xs"
          justifyContent="space-between"
        >
          <SimpleGrid width="100%" columns={2} spacing={1}>
            <Box fontWeight="bold">{propsName}</Box>
            <Box>{props[propsName]}</Box>
          </SimpleGrid>

          <ButtonGroup display="flex" size="xs" isAttached>
            <IconButton
              onClick={() => {
                setQuickProps({
                  name: propsName,
                  value: props[propsName],
                })
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
              onClick={() => onDelete(propsName)}
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

export default memo(CustomPropsPanel)
