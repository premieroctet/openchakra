import { extendTheme } from "@chakra-ui/react";
import { colors } from "./colors";

const brand:string = process.env.NEXT_PUBLIC_PROJECT || process.env.REACT_APP_PROJECT || 'default'

const theme = {
  //@ts-ignore
  colors: colors?.[brand] 
}

export default extendTheme(theme)

