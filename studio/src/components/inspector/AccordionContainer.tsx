import React, { ReactNode, memo } from 'react'
import {
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  AccordionItemProps,
} from '@chakra-ui/react'

const AccordionContainer: React.FC<{
  title: ReactNode
  defaultIsOpen?: boolean
  children: ReactNode
} & AccordionItemProps> = ({ title, children, defaultIsOpen = true }) => {
  return (
    <AccordionItem>
      {/* <AccordionItem defaultIsOpen={defaultIsOpen}> */}
      <AccordionButton zIndex={2} px={3} py={2} fontSize="sm">
        <Box flex="1" textAlign="left">
          {title}
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel bg="white" px={3} pb={4}>
        {children}
      </AccordionPanel>
    </AccordionItem>
  )
}

export default memo(AccordionContainer)
