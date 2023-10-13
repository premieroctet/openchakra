import React, { useState, useEffect } from 'react'
import Metadata from './dependencies/Metadata'
import axios from 'axios'
import { ChakraProvider } from '@chakra-ui/react'
import {
  Flex,
  Text,
  Heading,
  Button,
  IconButton,
  Image,
  Input,
  Select,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription
} from '@chakra-ui/react'

import Media from './dependencies/custom-components/Media'

import { DeleteIcon, ChevronLeftIcon, ChevronDownIcon } from '@chakra-ui/icons'

import Fonts from './dependencies/theme/Fonts'
import { ensureToken } from './dependencies/utils/token'
import { useLocation } from 'react-router-dom'
import { useUserContext } from './dependencies/context/user'
import { getComponentDataValue } from './dependencies/utils/values'
import theme from './dependencies/theme/theme'
import withDynamicButton from './dependencies/hoc/withDynamicButton'
import withDynamicContainer from './dependencies/hoc/withDynamicContainer'
import withDynamicText from './dependencies/hoc/withDynamicText'
import withDynamicImage from './dependencies/hoc/withDynamicImage'
import withDynamicInput from './dependencies/hoc/withDynamicInput'
import withDynamicSelect from './dependencies/hoc/withDynamicSelect'
import withMaskability from './dependencies/hoc/withMaskability'

const DynamicButton = withDynamicButton(Button)
const DynamicIconButton = withDynamicButton(IconButton)
const DynamicFlex = withDynamicContainer(Flex)
const DynamicText = withDynamicText(Text)
const DynamicImage = withDynamicImage(Image)
const DynamicInput = withDynamicInput(Input)
const DynamicSelect = withDynamicSelect(Select)

const MaskableButton = withMaskability(Button)
const MaskableFlex = withMaskability(Flex)

const Boutique = () => {
  const query = new URLSearchParams(useLocation().search)
  const id = query.get('booking') || query.get('id')
  const [componentsValues, setComponentsValues] = useState({})

  const setComponentValue = (compId, value) => {
    setComponentsValues(s => ({ ...s, [compId]: value }))
  }

  const getComponentValue = (compId, index) => {
    let value = componentsValues[compId]
    if (!value) {
      value = componentsValues[`${compId}${index}`]
    }
    if (!value) {
      value = getComponentDataValue(compId, index)
    }
    return value
  }

  // ensure token set if lost during domain change
  useEffect(() => {
    ensureToken()
  }, [])

  const { user } = useUserContext()

  const get = axios.get
  const [root, setRoot] = useState([])
  const [LF2LUUFMK51YG, setLF2LUUFMK51YG] = useState([])
  const [LF2LUUFMD4Q8X, setLF2LUUFMD4Q8X] = useState([])
  const [LF2LUUFMRO3Q9, setLF2LUUFMRO3Q9] = useState([])
  const [LF2LUUFMGB5R9, setLF2LUUFMGB5R9] = useState([])

  const [refresh, setRefresh] = useState(false)

  const reload = () => {
    setRefresh(!refresh)
  }

  useEffect(() => {
    get(
      `/myAlfred/api/studio/booking/${
        id ? `${id}/` : ``
      }?fields=items,items.product.name,items.total_price,total_price,items.quantity,items.price,remaining_total,guests.email`
    )
      .then(res => setRoot(res.data))
      .catch(
        err =>
          !(err.response?.status == 401) &&
          err.code != 'ERR_NETWORK' &&
          alert(err?.response?.data || err)
      )
    get(`/myAlfred/api/studio/loggedUser/`)
      .then(res => setLF2LUUFMK51YG(res.data))
      .catch(
        err =>
          !(err.response?.status == 401) &&
          err.code != 'ERR_NETWORK' &&
          alert(err?.response?.data || err)
      )
    get(`/myAlfred/api/studio/drinkCategory/`)
      .then(res => setLF2LUUFMD4Q8X(res.data))
      .catch(
        err =>
          !(err.response?.status == 401) &&
          err.code != 'ERR_NETWORK' &&
          alert(err?.response?.data || err)
      )
    get(
      `/myAlfred/api/studio/mealCategory/?fields=products,products.picture,products.name,products.price`
    )
      .then(res => setLF2LUUFMRO3Q9(res.data))
      .catch(
        err =>
          !(err.response?.status == 401) &&
          err.code != 'ERR_NETWORK' &&
          alert(err?.response?.data || err)
      )
    get(`/myAlfred/api/studio/cigarCategory/`)
      .then(res => setLF2LUUFMGB5R9(res.data))
      .catch(
        err =>
          !(err.response?.status == 401) &&
          err.code != 'ERR_NETWORK' &&
          alert(err?.response?.data || err)
      )
  }, [get, id, refresh])

  return (
    <ChakraProvider resetCSS theme={theme}>
      <Fonts />
      <Metadata metaTitle={''} metaDescription={''} metaImageUrl={''} />
      <DynamicFlex
        getComponentValue={getComponentValue}
        id="comp-LF2LUUFMNXKD3"
        reload={reload}
        context={root?.[0]?._id}
        backend="/"
        dataModel="booking"
        dynamicContainer
        flexDirection={{ base: 'column' }}
        maxHeight={{ base: '100v h' }}
        flexGrow={1}
        p={{ base: '0' }}
        m={{ base: '0' }}
        overflow={{ base: 'visible' }}
        dataSourceId={'root'}
        key={root[0]?._id}
        dataSource={root}
      >
        <Flex
          getComponentValue={getComponentValue}
          id="comp-LF2LUUFMATEOB"
          reload={reload}
          flexDirection={{ base: 'column' }}
          justifyContent={{ base: 'flex-start' }}
          alignItems={{ base: 'stretch' }}
          mb={{ base: '0' }}
          m={{ base: '0' }}
          p={{ base: '0' }}
          overflow={{ base: 'scroll' }}
          flexGrow={1}
          mr={{ base: '0' }}
          pr={{ base: '0' }}
        >
          <Flex
            getComponentValue={getComponentValue}
            id="comp-LF2LUUFM9ZMA1"
            reload={reload}
            flexDirection={{ base: 'column' }}
            p={{ base: '0' }}
            m={{ base: '0' }}
            maxWidth={{ base: '100%' }}
          />
          <Flex
            getComponentValue={getComponentValue}
            id="comp-LF2LUUFMPQVVU"
            reload={reload}
            width={{ base: '100%' }}
            overflow={{ base: 'visible' }}
            mb={{ base: '10%' }}
            pb={{ base: '10%' }}
            mr={{ base: '0' }}
            ml={{ base: '0' }}
            mt={{ base: '0' }}
            m={{ base: '0' }}
            p={{ md: '1' }}
            flexDirection={{ base: 'column' }}
            display={{ base: 'none' }}
          >
            <DynamicFlex
              getComponentValue={getComponentValue}
              id="comp-LF2LUUFMJDG4E"
              reload={reload}
              context={root?.[0]?._id}
              backend="/"
              dataModel="mealCategory"
              dynamicContainer
              dataSourceId={'comp-LF2LUUFMRO3Q9'}
              key={LF2LUUFMRO3Q9[0]?._id}
              dataSource={LF2LUUFMRO3Q9}
              attribute="products"
              flexDirection={{ base: 'column' }}
            >
              <Flex
                getComponentValue={getComponentValue}
                id="comp-LF2LUUFMMOPR9"
                reload={reload}
                backgroundColor="#ffffff"
                borderRadius={5}
                mt={{ base: '2' }}
                flexGrow={1}
                alignItems={{ base: 'center' }}
                justifyContent={{ base: 'space-between' }}
                boxShadow={{ base: '4px 3px 5px #E6E6E6' }}
                p={{ base: '2' }}
                border="1px solid #707070"
              >
                <DynamicImage
                  getComponentValue={getComponentValue}
                  id="comp-LF2LUUFMWV25R"
                  reload={reload}
                  context={root?.[0]?._id}
                  backend="/"
                  dataModel="product"
                  width={{ base: '15%', lg: '6%' }}
                  src="https://www.alfredplace.io/wp-content/uploads/2022/11/cave-a-cigares.jpeg"
                  borderRadius="5px"
                  dataSourceId={'comp-LF2LUUFMRO3Q9'}
                  key={LF2LUUFMRO3Q9[0]?._id}
                  dataSource={LF2LUUFMRO3Q9}
                  attribute="picture"
                  maxWidth={{ base: '15%' }}
                />
                <Flex
                  getComponentValue={getComponentValue}
                  id="comp-LF2LUUFM9E21I"
                  reload={reload}
                  flexDirection={{ base: 'column' }}
                  pl={{ base: '4%' }}
                  width={{ base: '65%' }}
                >
                  <DynamicText
                    getComponentValue={getComponentValue}
                    id="comp-LF2LUUFMDXQ1I"
                    reload={reload}
                    context={root?.[0]?._id}
                    backend="/"
                    dataModel="product"
                    fontWeight="bold"
                    dataSourceId={'comp-LF2LUUFMRO3Q9'}
                    key={LF2LUUFMRO3Q9[0]?._id}
                    dataSource={LF2LUUFMRO3Q9}
                    attribute="name"
                  >
                    PARTAGAS LEGADOS
                  </DynamicText>
                  <Flex
                    getComponentValue={getComponentValue}
                    id="comp-LF2LUUFMK2YDW"
                    reload={reload}
                  >
                    <DynamicText
                      getComponentValue={getComponentValue}
                      id="comp-LF2LUUFMDVKM0"
                      reload={reload}
                      context={root?.[0]?._id}
                      backend="/"
                      dataModel="product"
                      dataSourceId={'comp-LF2LUUFMRO3Q9'}
                      key={LF2LUUFMRO3Q9[0]?._id}
                      dataSource={LF2LUUFMRO3Q9}
                      attribute="price"
                    >
                      80€00
                    </DynamicText>
                    <Text
                      getComponentValue={getComponentValue}
                      id="comp-LF2LUUFM9145H"
                      reload={reload}
                      attribute="price"
                    >
                      €
                    </Text>
                  </Flex>
                  <DynamicButton
                    getComponentValue={getComponentValue}
                    id="comp-LF2LUUFM2FWK2"
                    reload={reload}
                    context={root?.[0]?._id}
                    backend="/"
                    dataModel="product"
                    variant="unstyled"
                    size="sm"
                    opacity={1}
                    textAlign="left"
                    action="openPage"
                    actionProps='{"page":"produit-mets","open":"false"}'
                    dataSourceId={'comp-LF2LUUFMRO3Q9'}
                    key={LF2LUUFMRO3Q9[0]?._id}
                    dataSource={LF2LUUFMRO3Q9}
                    color="#dab679"
                    textDecoration="underline"
                    pageName={'produit-mets'}
                    onClick={() => (window.location = '/produit-mets')}
                  >
                    En savoir plus
                  </DynamicButton>
                </Flex>
                <Flex
                  getComponentValue={getComponentValue}
                  id="comp-LF2LUUFMMI98V"
                  reload={reload}
                  pr={{ base: '1%' }}
                  alignItems={{ base: 'center' }}
                  justifyContent={{ base: 'flex-end' }}
                  width={{ base: '20%' }}
                  flexDirection={{ base: 'column' }}
                >
                  <Input
                    setComponentValue={setComponentValue}
                    getComponentValue={getComponentValue}
                    id="comp-LF2LUUFMEDKV0"
                    reload={reload}
                    focusBorderColor="#dab679"
                    type="number"
                  />
                  <DynamicButton
                    getComponentValue={getComponentValue}
                    id="comp-LF2LUUFM9XU3Q"
                    reload={reload}
                    context={root?.[0]?._id}
                    backend="/"
                    dataModel="product"
                    variant="solid"
                    size="sm"
                    m={{ base: '4%' }}
                    backgroundColor="#dab679"
                    color="#fff"
                    action="setOrderItem"
                    actionProps='{"quantity":"comp-LF2LUUFMEDKV0"}'
                    dataSourceId={'comp-LF2LUUFMRO3Q9'}
                    key={LF2LUUFMRO3Q9[0]?._id}
                    dataSource={LF2LUUFMRO3Q9}
                  >
                    Ajouter
                  </DynamicButton>
                </Flex>
              </Flex>
            </DynamicFlex>
          </Flex>
          <Flex
            getComponentValue={getComponentValue}
            id="comp-LF2LUUFML5OYL"
            reload={reload}
            flexDirection={{ base: 'column' }}
            m={{ base: '0' }}
            p={{ base: '0' }}
          >
            <Flex
              getComponentValue={getComponentValue}
              id="comp-LF2LUUFMTVDSD"
              reload={reload}
              flexDirection={{ base: 'column' }}
              display={{ base: 'none' }}
            >
              <Flex
                getComponentValue={getComponentValue}
                id="comp-LF2LUUFMZZ9AA"
                reload={reload}
                p={{ base: '2' }}
                color="#fff"
                fontWeight="bold"
                backgroundColor="#dab679"
                mb={{ base: '2%' }}
                flexGrow={1}
                mt={{ base: '3%' }}
                width={{ base: '100%' }}
              >
                <Text
                  getComponentValue={getComponentValue}
                  id="comp-LF2LUUFM0HVBI"
                  reload={reload}
                  fontSize={{ base: '16px' }}
                >
                  Détails
                </Text>
              </Flex>
              <DynamicFlex
                getComponentValue={getComponentValue}
                id="comp-LF2LUUFMEVAVL"
                reload={reload}
                context={root?.[0]?._id}
                backend="/"
                dataModel="booking"
                dynamicContainer
                flexDirection={{ base: 'column' }}
                width={{ base: '100%' }}
                dataSourceId={'root'}
                key={root[0]?._id}
                dataSource={root}
                attribute="items"
              >
                <Flex
                  getComponentValue={getComponentValue}
                  id="comp-LF2LUUFMO9H0X"
                  reload={reload}
                  width={{ base: '100%' }}
                  justifyContent={{ base: 'space-between' }}
                  backgroundColor="#fff"
                  boxShadow={{ base: '4px 3px 5px #E6E6E6' }}
                  mb={{ base: '1%' }}
                >
                  <Flex
                    getComponentValue={getComponentValue}
                    id="comp-LF2LUUFMMAAIE"
                    reload={reload}
                    flexDirection={{ base: 'column' }}
                    alignItems={{ base: 'flex-start' }}
                    justifyContent={{ base: 'center' }}
                    ml={{ base: '2%' }}
                    flexGrow={1}
                  >
                    <DynamicText
                      getComponentValue={getComponentValue}
                      id="comp-LF2LUUFMG0LOE"
                      reload={reload}
                      context={root?.[0]?._id}
                      backend="/"
                      dataModel="orderItem"
                      dataSourceId={'root'}
                      key={root[0]?._id}
                      dataSource={root}
                      attribute="product.name"
                      width={{ base: '100%' }}
                      fontFamily={{ base: 'radikal' }}
                    >
                      Whisky choix numéro°1 - au verre
                    </DynamicText>
                    <Flex
                      getComponentValue={getComponentValue}
                      id="comp-LF2LUUFMAJKF5"
                      reload={reload}
                      alignItems={{ base: 'center' }}
                      flexGrow={1}
                      width={{ base: '100%' }}
                    >
                      <DynamicText
                        getComponentValue={getComponentValue}
                        id="comp-LF2LUUFMNBX0M"
                        reload={reload}
                        context={root?.[0]?._id}
                        backend="/"
                        dataModel="orderItem"
                        dataSourceId={'root'}
                        key={root[0]?._id}
                        dataSource={root}
                        attribute="price"
                        fontSize={{ base: 'md' }}
                        color="blackAlpha.500"
                      >
                        23
                      </DynamicText>
                      <Text
                        getComponentValue={getComponentValue}
                        id="comp-LF2LUUFMYKYGR"
                        reload={reload}
                        fontSize={{ base: 'md' }}
                        color="blackAlpha.500"
                      >
                        €
                      </Text>
                      <Flex
                        getComponentValue={getComponentValue}
                        id="comp-LF2LUUFMQZZ4O"
                        reload={reload}
                        ml={{ base: '2' }}
                        flexGrow={0.8}
                      >
                        <Text
                          getComponentValue={getComponentValue}
                          id="comp-LF2LUUFM1PM6Z"
                          reload={reload}
                          attribute="quantity"
                          fontSize={{ base: 'md' }}
                          color="blackAlpha.500"
                        >
                          x
                        </Text>
                        <DynamicText
                          getComponentValue={getComponentValue}
                          id="comp-LF2LUUFMNIYIJ"
                          reload={reload}
                          context={root?.[0]?._id}
                          backend="/"
                          dataModel="orderItem"
                          dataSourceId={'root'}
                          key={root[0]?._id}
                          dataSource={root}
                          attribute="quantity"
                          fontSize={{ base: 'md' }}
                          color="blackAlpha.500"
                        >
                          4
                        </DynamicText>
                      </Flex>
                      <Flex
                        getComponentValue={getComponentValue}
                        id="comp-LF2LUUFMWJI3V"
                        reload={reload}
                        ml={{ base: '2' }}
                      >
                        <DynamicText
                          getComponentValue={getComponentValue}
                          id="comp-LF2LUUFM52G7Y"
                          reload={reload}
                          context={root?.[0]?._id}
                          backend="/"
                          dataModel="orderItem"
                          dataSourceId={'root'}
                          key={root[0]?._id}
                          dataSource={root}
                          attribute="total_price"
                          fontWeight={{ base: 'bold' }}
                        >
                          92€00
                        </DynamicText>
                        <Text
                          getComponentValue={getComponentValue}
                          id="comp-LF2LUUFMSH6Q9"
                          reload={reload}
                          attribute="total_price"
                        >
                          €
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                  <Flex
                    getComponentValue={getComponentValue}
                    id="comp-LF2LUUFM560Y6"
                    reload={reload}
                    width={{ base: '10%' }}
                    justifyContent={{ base: 'flex-end' }}
                    alignItems={{ base: 'center' }}
                    mr={{ base: '2%' }}
                  >
                    <DynamicIconButton
                      getComponentValue={getComponentValue}
                      id="comp-LF2LUUFMLNGJS"
                      reload={reload}
                      context={root?.[0]?._id}
                      backend="/"
                      dataModel="orderItem"
                      aria-label="icon"
                      icon={<DeleteIcon />}
                      size="sm"
                      isRound
                      backgroundColor="#dab679"
                      color="#fff"
                      action="removeOrderItem"
                      dataSourceId={'root'}
                      key={root[0]?._id}
                      dataSource={root}
                    />
                  </Flex>
                </Flex>
              </DynamicFlex>
              <Flex
                getComponentValue={getComponentValue}
                id="comp-LF2LUUFML7ISD"
                reload={reload}
                p={{ base: '2' }}
                color="#fff"
                fontWeight="bold"
                backgroundColor="#dab679"
                mb={{ base: '2%' }}
                flexGrow={1}
                justifyContent={{ base: 'space-between' }}
                pr={{ base: '6%' }}
                pl={{ base: '4%' }}
                mt={{ base: '3%' }}
                width={{ base: '100%' }}
                alignItems={{ base: 'center' }}
              >
                <Text
                  getComponentValue={getComponentValue}
                  id="comp-LF2LUUFMYCPIK"
                  reload={reload}
                  fontSize={{ base: '16px' }}
                  fontFamily={{ base: 'radikal' }}
                >
                  TOTAL
                </Text>
                <Flex
                  getComponentValue={getComponentValue}
                  id="comp-LF2LUUFMRJMQH"
                  reload={reload}
                >
                  <DynamicText
                    getComponentValue={getComponentValue}
                    id="comp-LF2LUUFM1P5G9"
                    reload={reload}
                    context={root?.[0]?._id}
                    backend="/"
                    dataModel="booking"
                    fontWeight="bold"
                    dataSourceId={'root'}
                    key={root[0]?._id}
                    dataSource={root}
                    attribute="total_price"
                    fontSize={{ base: '16px' }}
                  >
                    227€00
                  </DynamicText>
                  <Text
                    getComponentValue={getComponentValue}
                    id="comp-LF2LUUFMZPI9U"
                    reload={reload}
                    fontWeight="bold"
                    attribute="total_price"
                    fontSize={{ base: '16px' }}
                  >
                    €
                  </Text>
                </Flex>
              </Flex>
              <Flex
                getComponentValue={getComponentValue}
                id="comp-LF2LUUFMQ44Q4"
                reload={reload}
                p={{ base: '2%' }}
                color="#fff"
                fontWeight="bold"
                mb={{ base: '2%' }}
                flexGrow={1}
                justifyContent={{ base: 'space-between' }}
                pr={{ base: '6%' }}
                pl={{ base: '4%' }}
                mt={{ base: '1%' }}
                width={{ base: '100%' }}
                alignItems={{ base: 'center' }}
              >
                <Text
                  getComponentValue={getComponentValue}
                  id="comp-LF2LUUFMHYWNB"
                  reload={reload}
                  fontSize={{ base: '16px' }}
                  color="#505050"
                  fontFamily={{ base: 'radikal' }}
                >
                  RESTE À PAYER
                </Text>
                <Flex
                  getComponentValue={getComponentValue}
                  id="comp-LF2LUUFMPF2GR"
                  reload={reload}
                  flexDirection={{ base: 'column' }}
                >
                  <Flex
                    getComponentValue={getComponentValue}
                    id="comp-LF2LUUFMXCFH9"
                    reload={reload}
                  >
                    <DynamicText
                      getComponentValue={getComponentValue}
                      id="comp-LF2LUUFMU77EP"
                      reload={reload}
                      context={root?.[0]?._id}
                      backend="/"
                      dataModel="booking"
                      fontWeight="bold"
                      dataSourceId={'root'}
                      key={root[0]?._id}
                      dataSource={root}
                      attribute="remaining_total"
                      fontSize={{ base: '16px' }}
                      color="#505050"
                    >
                      227€00
                    </DynamicText>
                    <Text
                      getComponentValue={getComponentValue}
                      id="comp-LF2LUUFMJTMYM"
                      reload={reload}
                      fontWeight="bold"
                      attribute="total_price"
                      fontSize={{ base: '16px' }}
                      color="#505050"
                    >
                      €
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
              <MaskableFlex
                getComponentValue={getComponentValue}
                id="comp-LF2LUUFM374U8"
                reload={reload}
                justifyContent={{ base: 'center' }}
                alignItems={{ base: 'center' }}
                hiddenRoles='["FUMOIR_ADMIN","FUMOIR_CHEF","FUMOIR_MANAGER"]'
                user={user}
              >
                <DynamicButton
                  getComponentValue={getComponentValue}
                  id="comp-LF2LUUFMH9O4Y"
                  reload={reload}
                  context={root?.[0]?._id}
                  backend="/"
                  dataModel="booking"
                  variant="solid"
                  size="md"
                  backgroundColor="#dab679"
                  fontSize={{ base: 'md' }}
                  ml={{ base: '5%' }}
                  mr={{ base: '5%' }}
                  mb={{ base: '20%' }}
                  mt={{ base: '10%' }}
                  p={{ base: '3%' }}
                  page="page-L9QSPE0HX8JP4"
                  action="payOrder"
                  color="#fff"
                  hiddenRoles='["FUMOIR_CHEF"]'
                  user={user}
                  dataSourceId={'root'}
                  key={root[0]?._id}
                  dataSource={root}
                  actionProps='{"redirect":"mes-reservations","color":"#dab679"}'
                  fontFamily={{ base: 'radikal' }}
                  hideIfForbidden
                >
                  Payer
                </DynamicButton>
                <DynamicButton
                  getComponentValue={getComponentValue}
                  id="comp-LF2LUUFMIW9XS"
                  reload={reload}
                  context={root?.[0]?._id}
                  backend="/"
                  dataModel="booking"
                  variant="solid"
                  size="md"
                  backgroundColor="#dab679"
                  fontSize={{ base: 'md' }}
                  ml={{ base: '5%' }}
                  mr={{ base: '5%' }}
                  mb={{ base: '20%' }}
                  mt={{ base: '10%' }}
                  p={{ base: '3%' }}
                  page="page-L9QSPE0HX8JP4"
                  action="openPage"
                  actionProps='{"page":"mes-reservations","open":"false"}'
                  color="#fff"
                  hiddenRoles='["FUMOIR_CHEF"]'
                  user={user}
                  dataSourceId={'root'}
                  key={root[0]?._id}
                  dataSource={root}
                  fontFamily={{ base: 'radikal' }}
                  hideIfForbidden
                  pageName={'mes-reservations'}
                  onClick={() => (window.location = '/mes-reservations')}
                >
                  Réglement sur place
                </DynamicButton>
              </MaskableFlex>
              <MaskableFlex
                getComponentValue={getComponentValue}
                id="comp-LF2LUUFM5NZL7"
                reload={reload}
                flexDirection={{ base: 'column' }}
                borderRadius={{ base: '10' }}
                backgroundColor="#ffffff"
                boxShadow={{ base: 'rgba(0, 0, 0, 0.25) 0px 25px 50px -12px' }}
                pl={{ base: '2' }}
                hiddenRoles='["FUMOIR_MEMBER"]'
                user={user}
                m={{ base: '2%' }}
                p={{ base: '2%' }}
                mb={{ base: '10%' }}
              >
                <Flex
                  getComponentValue={getComponentValue}
                  id="comp-LF2LUUFMVO9D0"
                  reload={reload}
                  flexDirection={{ base: 'column' }}
                >
                  <Text
                    getComponentValue={getComponentValue}
                    id="comp-LF2LUUFMQWXXU"
                    reload={reload}
                    textDecoration="underline"
                    fontWeight={{ base: 'bold' }}
                    textAlign={{ base: 'center' }}
                    fontFamily={{ base: 'radikal' }}
                    fontSize={{ base: 'md' }}
                  >
                    Encaisser les invités
                  </Text>
                  <Flex
                    getComponentValue={getComponentValue}
                    id="comp-LF2LUUFM12Z93"
                    reload={reload}
                    mt={{ base: '2%' }}
                  >
                    <Text
                      getComponentValue={getComponentValue}
                      id="comp-LF2LUUFMJ7GXD"
                      reload={reload}
                      mr={{ base: '2%' }}
                      fontWeight={{ base: 'bold' }}
                      fontFamily={{ base: 'radikal' }}
                    >
                      Reste à payer :{' '}
                    </Text>
                    <DynamicText
                      getComponentValue={getComponentValue}
                      id="comp-LF2LUUFMV8LJ8"
                      reload={reload}
                      context={root?.[0]?._id}
                      backend="/"
                      dataModel="booking"
                      dataSourceId={'root'}
                      key={root[0]?._id}
                      dataSource={root}
                      attribute="remaining_total"
                    >
                      Text value
                    </DynamicText>
                    <Text
                      getComponentValue={getComponentValue}
                      id="comp-LF2LUUFMAJCAQ"
                      reload={reload}
                    >
                      €
                    </Text>
                  </Flex>
                  <Flex
                    getComponentValue={getComponentValue}
                    id="comp-LF2LUUFMFPN9K"
                    reload={reload}
                  >
                    <Flex
                      getComponentValue={getComponentValue}
                      id="comp-LF2LUUFM710OI"
                      reload={reload}
                      flexDirection={{ base: 'column' }}
                      width={{ base: '100%' }}
                    >
                      <Flex
                        getComponentValue={getComponentValue}
                        id="comp-LF2LUUFMV377E"
                        reload={reload}
                        flexDirection={{ base: 'column' }}
                      >
                        <Text
                          getComponentValue={getComponentValue}
                          id="comp-LF2LUUFMEK9C8"
                          reload={reload}
                          mb={{ base: '2' }}
                        >
                          Paiement par :
                        </Text>
                        <Flex
                          getComponentValue={getComponentValue}
                          id="comp-LF2LUUFM9NW1S"
                          reload={reload}
                          flexDirection={{ base: 'column' }}
                        >
                          <Flex
                            getComponentValue={getComponentValue}
                            id="comp-LF2LUUFMNZXY2"
                            reload={reload}
                            justifyContent={{ base: 'flex-start' }}
                            alignItems={{ base: 'center' }}
                            p={{ base: '2' }}
                            width={{ base: '100%' }}
                          >
                            <DynamicSelect
                              setComponentValue={setComponentValue}
                              getComponentValue={getComponentValue}
                              id="comp-LF2LUUFM6WD3G"
                              reload={reload}
                              backend="/"
                              icon={<ChevronDownIcon />}
                              variant="outline"
                              size="md"
                              subDataSourceId={'root'}
                              subDataSource={root}
                              subAttribute="guests"
                              subAttributeDisplay="email"
                              placeholder="Le membre"
                              mr={{ base: '2' }}
                              width={{ base: '40%' }}
                            />
                            <DynamicInput
                              setComponentValue={setComponentValue}
                              getComponentValue={getComponentValue}
                              id="comp-LF2LUUFMAT6BD"
                              reload={reload}
                              backend="/"
                              type="number"
                              model="payment"
                              attribute="amount"
                              width={{ base: '20%' }}
                              placeholder="Montant payé"
                              fontFamily={{ base: 'radikal thin' }}
                            />
                            <Text
                              getComponentValue={getComponentValue}
                              id="comp-LF2LUUFM7U5T1"
                              reload={reload}
                            >
                              €
                            </Text>
                          </Flex>
                          <Alert
                            getComponentValue={getComponentValue}
                            id="comp-LF2LUUFMIQVBY"
                            reload={reload}
                            status="info"
                            variant="subtle"
                            backgroundColor="#eeeeee"
                            mt={{ base: '2' }}
                          >
                            <AlertIcon
                              getComponentValue={getComponentValue}
                              id="comp-LF2LUUFMRR7XL"
                              reload={reload}
                              color="gray.500"
                            />
                            <AlertTitle
                              getComponentValue={getComponentValue}
                              id="comp-LF2LUUFMGA5XU"
                              reload={reload}
                              mr={1}
                              fontWeight="bold"
                              fontFamily={{ base: 'radikal' }}
                            >
                              Information
                            </AlertTitle>
                            <AlertDescription
                              getComponentValue={getComponentValue}
                              id="comp-LF2LUUFMU7VYO"
                              reload={reload}
                              fontFamily={{ base: 'radikal thin' }}
                              fontWeight={{ base: 'bold' }}
                            >
                              Si aucun email d'invité n'est sélectionné, le
                              montant payé sera automatiquement affecté au
                              membre ayant effectué la réservation.{' '}
                            </AlertDescription>
                          </Alert>
                        </Flex>
                        <Flex
                          getComponentValue={getComponentValue}
                          id="comp-LF2LUUFMI7ZGZ"
                          reload={reload}
                          justifyContent={{ base: 'space-around' }}
                        >
                          <DynamicButton
                            getComponentValue={getComponentValue}
                            id="comp-LF2LUUFM98RJU"
                            reload={reload}
                            context={root?.[0]?._id}
                            backend="/"
                            dataModel="booking"
                            variant="solid"
                            size="md"
                            backgroundColor="#dab679"
                            color="#fff"
                            mt={{ base: '2%' }}
                            dataSourceId={'root'}
                            key={root[0]?._id}
                            dataSource={root}
                            action="cashOrder"
                            actionProps='{"guest":"comp-LF2LUUFM6WD3G","amount":"comp-LF2LUUFMAT6BD","mode":"CASH"}'
                            nextAction="openPage"
                            nextActionProps='{"page":"boutique","open":"false"}'
                          >
                            Encaisser espèces{' '}
                          </DynamicButton>
                          <DynamicButton
                            getComponentValue={getComponentValue}
                            id="comp-LF2LUUFMP6LTM"
                            reload={reload}
                            context={root?.[0]?._id}
                            backend="/"
                            dataModel="booking"
                            variant="solid"
                            size="md"
                            backgroundColor="#dab679"
                            color="#fff"
                            mt={{ base: '2%' }}
                            dataSourceId={'root'}
                            key={root[0]?._id}
                            dataSource={root}
                            action="cashOrder"
                            actionProps='{"guest":"comp-LF2LUUFM6WD3G","amount":"comp-LF2LUUFMAT6BD","mode":"CARD"}'
                            nextAction="openPage"
                            nextActionProps='{"page":"boutique","open":"false"}'
                          >
                            Encaisser CB
                          </DynamicButton>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
              </MaskableFlex>
            </Flex>
          </Flex>
        </Flex>
      </DynamicFlex>
      <Flex
        getComponentValue={getComponentValue}
        id="comp-LF2M5Q4KJUAXC"
        reload={reload}
        flexGrow={1}
        backgroundImage="https://my-alfred-data-test.s3-eu-west-3.amazonaws.com/fumoir/smoke03.gif"
        flexDirection={{ base: 'column' }}
        height={{ base: '100vh' }}
        backgroundSize="cover"
        backgroundPosition="center"
      >
        <Flex
          getComponentValue={getComponentValue}
          id="comp-LF2LUUFM4DVTD"
          reload={reload}
          justifyContent={{ base: 'space-between', md: 'space-between' }}
          alignItems={{ base: 'flex-end', md: 'flex-end' }}
          flexGrow={1}
          width={{ base: '100%', md: '' }}
          height={{ base: '100px', md: '10vh' }}
          minWidth={{ base: '100%' }}
          maxHeight={{ base: '100px', md: '10vh' }}
          minHeight={{ base: '100px', md: '10vh' }}
          backgroundImage="https://my-alfred-data-test.s3-eu-west-3.amazonaws.com/fumoir/Fond%20fumoir.svg"
          backgroundSize="cover"
          position="fixed"
          top="-1px"
          right="0px"
          left="0px"
          zIndex={1}
          pl={{ base: '3' }}
          pr={{ base: '3' }}
          pb={{ base: '1' }}
          display={{ base: 'flex', md: 'flex' }}
          pt={{ base: '3' }}
        >
          <DynamicIconButton
            getComponentValue={getComponentValue}
            id="comp-LF2LUUFM9WU92"
            reload={reload}
            context={root?.[0]?._id}
            backend="/"
            dataModel="booking"
            aria-label="icon"
            icon={<ChevronLeftIcon />}
            size="md"
            fontSize={{ base: 'lg' }}
            backgroundColor="whiteAlpha.500"
            color="#fff"
            dataSourceId={'root'}
            key={root[0]?._id}
            dataSource={root}
            action="previous"
          />
          <Heading
            getComponentValue={getComponentValue}
            id="comp-LF2LUUFMIWRAW"
            reload={reload}
            size="sm"
            textAlign="center"
            m={{ base: '3' }}
            color="#fff"
            fontFamily={{ base: 'radikal' }}
            fontSize={{ base: 'xl' }}
          >
            Boutique George
          </Heading>
          <Flex
            getComponentValue={getComponentValue}
            id="comp-LF2NQABTR09QH"
            reload={reload}
            height={{ base: '70%' }}
            justifyContent={{ base: 'flex-end' }}
            alignItems={{ base: 'flex-end' }}
            pl={{ base: '4' }}
            pt={{ base: '4' }}
            pr={{ base: '2' }}
            pb={{ base: '2' }}
          >
            <Image
              getComponentValue={getComponentValue}
              id="comp-LF2NQJ236SJ90"
              reload={reload}
              height={{ base: '70%' }}
              src="https://my-alfred-data-test.s3-eu-west-3.amazonaws.com/fumoir/cigar12.svg"
            />
          </Flex>
        </Flex>
        <Flex
          getComponentValue={getComponentValue}
          id="comp-LF2MCRB3K1GFT"
          reload={reload}
          flexDirection={{ base: 'column' }}
          height={{ base: '100%' }}
          justifyContent={{ base: 'flex-start' }}
          alignItems={{ base: 'center' }}
          pt={{ base: '100px' }}
          pb={{ base: '100px' }}
        >
          <Text
            getComponentValue={getComponentValue}
            id="comp-LF2MD06WXDCI8"
            reload={reload}
            color="#ffffff"
            fontFamily={{ base: 'radikal' }}
            fontSize={{ base: 'xl' }}
            width={{ base: '100%' }}
            fontWeight={{ base: 'bold' }}
            p={{ base: '5%' }}
          >
            Découvrez notre sélection d'accessoires exclusive au Fumoir George !{' '}
          </Text>
          <Image
            getComponentValue={getComponentValue}
            id="comp-LF2MHPF8L6HAW"
            reload={reload}
            width={{ base: '50%' }}
            src="https://my-alfred-data-test.s3-eu-west-3.amazonaws.com/fumoir/Logo%20Le%20Fumoir%20George%20Or&amp;B.svg"
            mt={{ base: '10' }}
          />
          <Text
            getComponentValue={getComponentValue}
            id="comp-LF2ME0BBLNBQR"
            reload={reload}
            color="#ffffff"
            fontFamily={{ base: 'radikal' }}
            mt={{ base: '10' }}
          >
            Bientôt disponible !{' '}
          </Text>
        </Flex>
      </Flex>
    </ChakraProvider>
  )
}

export default Boutique
