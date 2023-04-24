import { extendTheme } from "@chakra-ui/react";
import { colors } from "./colors";

const brand:string = process.env.NEXT_PUBLIC_S3_ROOTPATH || process.env.REACT_APP_S3_ROOTPATH || 'default'

const theme = {
  //@ts-ignore
  colors: colors?.[brand] 
}

export default extendTheme(theme)

