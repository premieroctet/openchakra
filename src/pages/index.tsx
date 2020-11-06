import React from 'react'
import { Link, Button, Stack } from '@chakra-ui/core'
import { HotKeys } from 'react-hotkeys'
import { Global } from '@emotion/core'
import Metadata from '~components/Metadata'
import useShortcuts, { keyMap } from '~hooks/useShortcuts'
import { useSession } from 'next-auth/client'
import Header from '~components/Header'

const App = () => {
  const { handlers } = useShortcuts()
  const [session] = useSession()

  return (
    <HotKeys allowChanges handlers={handlers} keyMap={keyMap}>
      <Global
        styles={() => ({
          html: { minWidth: '860px', backgroundColor: '#1a202c' },
        })}
      />
      <Metadata />
      <Header session={session} projectPage={true} />

      <Stack isInline spacing={8} justify="center" align="center" pt={20}>
        <Link href="/editor">
          <Button variantColor="teal" mr={5}>
            Editor
          </Button>
        </Link>
        <Link href="/project/public">
          <Button variantColor="teal" ml={5}>
            Component gallery
          </Button>
        </Link>
      </Stack>
    </HotKeys>
  )
}

export default App
