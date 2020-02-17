import React from 'react'
import {
  TooltipProps,
  IconButtonProps,
  Tooltip,
  IconButton,
} from '@chakra-ui/core'

interface Props
  extends Omit<TooltipProps, 'label' | 'aria-label' | 'children'> {
  icon: IconButtonProps['icon']
  as?: IconButtonProps['as']
  label: string
  isLoading?: boolean
  onClick?: IconButtonProps['onClick']
  variantColor?: IconButtonProps['variantColor']
}

const ActionButton: React.FC<Props> = ({
  icon,
  as,
  label,
  onClick,
  variantColor,
  isLoading,
  ...props
}) => {
  return (
    <Tooltip hasArrow aria-label={label} label={label} zIndex={11} {...props}>
      <IconButton
        size="xs"
        variant="ghost"
        as={as}
        isLoading={isLoading}
        onClick={onClick}
        icon={icon}
        aria-label={label}
        variantColor={variantColor}
      />
    </Tooltip>
  )
}

export default ActionButton
