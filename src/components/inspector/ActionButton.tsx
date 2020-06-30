import React from 'react'
import {
  TooltipProps,
  IconButtonProps,
  Tooltip,
  IconButton,
} from '@chakra-ui/core'

//@ts-ignore
interface Props
  extends Omit<TooltipProps, 'label' | 'aria-label' | 'children'> {
  icon: IconButtonProps['icon']
  as?: IconButtonProps['as']
  label: string
  isLoading?: boolean
  onClick?: IconButtonProps['onClick']
  colorScheme?: IconButtonProps['colorScheme']
}

const ActionButton: React.FC<Props> = ({
  icon,
  as,
  label,
  onClick,
  colorScheme,
  isLoading,
  ...props
}) => {
  return (
    <Tooltip hasArrow aria-label={label} label={label} zIndex={11} {...props}>
      <IconButton
        boxSize="xs"
        variant="ghost"
        as={as}
        isLoading={isLoading}
        onClick={onClick}
        icon={icon}
        aria-label={label}
        colorScheme={colorScheme}
      />
    </Tooltip>
  )
}

export default ActionButton
