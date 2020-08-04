import { fileOpen, fileSave } from 'browser-nativefs'
import { INITIAL_COMPONENTS } from '~core/models/components'

export async function loadFromJSON() {
  const blob = await fileOpen({
    extensions: ['json'],
    mimeTypes: ['application/json'],
  })

  const contents: string = await new Promise(resolve => {
    const reader = new FileReader()
    reader.readAsText(blob, 'utf8')
    reader.onloadend = () => {
      if (reader.readyState === FileReader.DONE) {
        resolve(reader.result as string)
      }
    }
  })

  try {
    return JSON.parse(contents)
  } catch (error) {}

  return INITIAL_COMPONENTS
}

export async function saveAsJSON(components: IComponents) {
  const serialized = JSON.stringify(components)
  const name = `components.json`

  await fileSave(
    new Blob([serialized], { type: 'application/json' }),
    {
      fileName: name,
      description: 'OpenChakra file',
    },
    (window as any).handle,
  )
}
