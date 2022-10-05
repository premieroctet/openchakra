import fs from 'fs'

export default function handler(req, res) {
    console.log(req.body);
    console.log(process.cwd())
    const fileName = req.body.path.split('/').slice(-1)[0]
    let fileArray = fileName.split('-')
    fileArray.forEach((word) => {word = `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`})
    const pascalName = fileArray.join('').slice(0, -8)
    try {
        fs.writeFileSync(`../../../../../../.oc/previews/${pascalName}Preview.oc.tsx`, `import React from 'react'
        import { useDropComponent } from '~hooks/useDropComponent'
        import { useInteractive } from '~hooks/useInteractive'
        import { Box, Center, Button, Text } from '@chakra-ui/react'
        
        interface Props {
          component: IComponent;
        }
        
        const ${pascalName}Preview = ({ component }: Props) => {
          const { isOver } = useDropComponent(component.id)
          const { props, ref } = useInteractive(component, true)
        
          if (isOver) {
            props.bg = 'teal.50'
          }
        
          return (
            <Box {...props} ref={ref}>
              <Center
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="flex-start"
                m={16}
                p={8}
                backgroundColor="cyan.100"
                bgGradient="linear(to right, green.200,blue.500)"
              >
                <Text
                  opacity={1}
                  fontWeight="bold"
                  fontSize="lg"
                  letterSpacing="widest"
                >
                  Some text blah blah blah
                </Text>
                <Button
                  variant="ghost"
                  size="md"
                  bgGradient="linear(to right, messenger.500,green.500)"
                  borderRadius={100}
                  border={20}
                >
                  Test button
                </Button>
              </Center>
            </Box>
          )
        }
        
        export default ${pascalName}Preview`, (err) => {
          if (err) throw err;
          else{
             console.log("The file is updated with the given data")
          }
       });
        fs.writeFileSync(`../../../../../../.oc/panels/${pascalName}Panel.oc.tsx`, `import React, { memo } from 'react'

const ${pascalName}Panel = () => {
  return <></>
}

export default memo(${pascalName}Panel)`, (err) => {
          if (err) throw err;
          else{
            console.log("The file is updated with the given data")
          }
      });
      } catch (err) {
        console.log(err);
      }
  }