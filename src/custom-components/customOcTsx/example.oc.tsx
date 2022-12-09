import React, { RefObject } from 'react'
import {
  ChakraProvider,
  Box,
  Image,
  Text,
  Link,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  FormHelperText,
  Checkbox,
  Button
} from '@chakra-ui/react'

type AppPropsTypes = {
  headline?: string,
  signup_url?: string,
  forgot_password_url?: string,
  show_forgot_password?: boolean,
  auth_provider_name_1?: string,
  auth_provider_name_2?: string,
  img_url?: string,
  email_value?: string,
  onEmailChange?: any,
  passwordValue?: string,
  onPasswordChange?: any,
  show_both_auth_providers?: boolean,
  show_auth_provider_1?: boolean,
  show_auth_provider_2?: boolean
}

const App = ({
  headline = 'Log in to your account',
  signup_url = '/signup',
  forgot_password_url = '/forgot',
  show_forgot_password = true,
  auth_provider_name_1 = 'DevConnect',
  auth_provider_name_2 = 'DevConnect',
  img_url = 'https://cdn-icons-png.flaticon.com/512/5087/5087579.png',
  email_value = 'ishaan@gmail.com',
  onEmailChange = null,
  passwordValue = 'pass123',
  onPasswordChange = null,
  show_both_auth_providers = true,
  show_auth_provider_1 = true,
  show_auth_provider_2 = true
}: AppPropsTypes) => (
  <>
    <Box display="flex" justifyContent="center" alignItems="center">
      <Image height="100px" width="100px" src={img_url} />
    </Box>
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      mt={5}
      mb={5}
    >
      <Text fontWeight="bold" fontSize="3xl">
        {headline}
      </Text>
    </Box>
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      mt={5}
      mb={5}
    >
      <Text color="blackAlpha.500" mr={5}>
        Don't have an account?
      </Text>
      <Link color="messenger.500" href={signup_url}>
        Sign up
      </Link>
    </Box>
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      mr={300}
      ml={300}
      backgroundColor="blackAlpha.50"
      borderRadius="50px 50px 0px 0px"
    >
      <FormControl width={80} p={5} mt={10}>
        <FormLabel color="blackAlpha.700">Email</FormLabel>
        <Input border="1px" value={email_value} onChange={onEmailChange} />
        <FormErrorMessage>Error message</FormErrorMessage>
      </FormControl>
      <FormControl width={80} p={5}>
        <FormLabel color="blackAlpha.700">Password</FormLabel>
        <Input border="1px" value={passwordValue} onChange={onPasswordChange} />
        <FormHelperText></FormHelperText>
        <FormErrorMessage>Error message</FormErrorMessage>
      </FormControl>
    </Box>
    {show_forgot_password ? (
      <>
        <Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            mr={300}
            ml={300}
            color="blackAlpha.500"
            backgroundColor="blackAlpha.50"
            height={20}
          >
            <Checkbox isReadOnly>Remember me</Checkbox>
            <Link ml={18} color="messenger.500" href={forgot_password_url}>
              Forgot Password
            </Link>
          </Box>
        </Box>
      </>
    ) : (
      <>
        <Box />
      </>
    )}
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      mr={300}
      ml={300}
      height={40}
      backgroundColor="blackAlpha.50"
      flexDirection="column"
    >
      <Button
        variant="solid"
        size="md"
        width={80}
        backgroundColor="messenger.400"
        color="whiteAlpha.900"
        mt={5}
        onClick={() => {
          return 1
        }}
      >
        Sign In
      </Button>
      <Text mt={5} backgroundColor="whiteAlpha.400" color="blackAlpha.300">
        or continue with{' '}
      </Text>
    </Box>
    <Box
      mr={300}
      ml={300}
      borderRadius="0px 0px 50px 50px"
      backgroundColor="blackAlpha.50"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      {show_both_auth_providers ? (
        <>
          <Box display="flex">
            {show_auth_provider_1 ? (
              <>
                <Box>
                  <Button
                    variant="solid"
                    size="md"
                    width={40}
                    backgroundColor="blackAlpha.800"
                    color="whiteAlpha.900"
                    mb={10}
                    mr={5}
                    onClick={() => {
                      return 1
                    }}
                  >
                    {auth_provider_name_1}
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <Box />
              </>
            )}
            {show_auth_provider_2 ? (
              <>
                <Box>
                  <Button
                    variant="solid"
                    size="md"
                    width={40}
                    backgroundColor="orange.800"
                    color="whiteAlpha.900"
                    mb={10}
                    ml={5}
                    onClick={() => {
                      return 1
                    }}
                  >
                    {auth_provider_name_2}
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <Box />
              </>
            )}
          </Box>
        </>
      ) : (
        <>
          <Box />
        </>
      )}
    </Box>
  </>
)

export default App
