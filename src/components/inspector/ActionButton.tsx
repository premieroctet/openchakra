import React from 'react'
import {
  TooltipProps,
  IconButtonProps,
  Tooltip,
  IconButton,
  As,
} from '@chakra-ui/react'

interface Props
  extends Omit<TooltipProps, 'label' | 'aria-label' | 'children' | 'onClick'> {
  icon: IconButtonProps['icon']
  label: string
  as?: As
  isLoading?: boolean
  onClick?: IconButtonProps['onClick']
  colorScheme?: IconButtonProps['colorScheme']
}

const ActionButton = ({
  icon,
  as,
  label,
  onClick,
  colorScheme,
  isLoading,
  ...props
}: Props) => {
  return (
    <Tooltip hasArrow aria-label={label} label={label} zIndex={11} {...props}>
      <IconButton
        variant="ghost"
        as={as}
        isLoading={isLoading}
        onClick={onClick}
        icon={icon}
        aria-label={label}
        colorScheme={colorScheme}
        size="xs"
      />
    </Tooltip>
  )
}

export default ActionButton
