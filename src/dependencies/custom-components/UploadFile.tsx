import { Box, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import FileManager from '../utils/S3filemanager'
import { s3Config } from '../utils/s3Config'
import useFetch from 'use-http'
import mime from 'mime'

const UploadFile = ({
  dataSource,
  attribute,
  value,
  backend,
  ressource_id,
  children,
  ...props
}: {
  dataSource: { _id: null } | null
  attribute: string
  value: string
  backend: string
  ressource_id: string
  children: React.ReactNode
}) => {
  FileManager.initialize(
    s3Config.region,
    s3Config.bucketName,
    s3Config.accessKeyId || '',
    s3Config.secretAccessKey || '',
  )
  const [uploadInfo, setUploadInfo] = useState('')
  const { post, response, error } = useFetch()

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()

    const form = e.target as HTMLFormElement
    const inputFile = form.querySelector('[type="file"]') as HTMLInputElement
    const fileToUpload =
      inputFile && inputFile?.files && (inputFile?.files[0] as File)

    if (fileToUpload) {
      // upload file to S3
      await FileManager.createFile(
        fileToUpload?.name,
        fileToUpload,
        '',
        mime.lookup(fileToUpload?.name) || '',
        [],
      )
        .then(res => {
          // Send ressource url
          post(`myAlfred/api/studio/action`, {
            action: 'put',
            parent: ressource_id,
            attribute,
            value: res?.Location,
          })
        })
        .catch(err => console.error(err))

      if (response.ok) setUploadInfo('Ressource ajoutée')
      if (error) setUploadInfo('Echec ajout ressource')
    }
  }

  //   useEffect(() => {
  //     const form = document.querySelector('#uploadressource') as HTMLFormElement
  //     const inputFile = form.querySelector('[type="file"]') as HTMLInputElement
  //     inputFile.value = value
  // }, [value])

  return (
    <Box {...props}>
      <form id="uploadressource" onSubmit={ev => handleUpload(ev)}>
        {children}
      </form>
      {uploadInfo && <Text>{uploadInfo}</Text>} {/*Component status */}
    </Box>
  )
}

export default UploadFile
