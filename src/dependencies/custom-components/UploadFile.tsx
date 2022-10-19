import { Box, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import FileManager from '../utils/S3filemanager'
import { s3Config } from '../utils/s3Config'
import useFetch from 'use-http'
import mime from 'mime'

const UploadFile = (
  {
    dataSource, 
    backend, 
    ressource_id, 
    children, 
    ...props
  }
  : {
      dataSource: {_id: null} | null, 
      backend: string, 
      ressource_id: string, 
      children: React.ReactNode
    }
  ) => {
  
  FileManager.initialize(s3Config.region, s3Config.bucketName, s3Config.accessKeyId || '', s3Config.secretAccessKey || '')
  const [uploadInfo, setUploadInfo] = useState('')
  const {post, response, error} = useFetch(backend)

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const form = e.target as HTMLFormElement
    const inputFile = form.querySelector('[type="file"]') as HTMLInputElement
    const fileToUpload = inputFile && inputFile?.files && inputFile?.files[0] as File
    
    if (fileToUpload) {
      // upload file to S3
      await FileManager.createFile(fileToUpload?.name, fileToUpload, '', mime.getExtension(fileToUpload?.name) || '', [])
        .then(res => {
          // Send ressource url 
          backend && post(`myAlfred/api/studio/action`, {action: 'put', model: 'resource', parent: ressource_id, attribute:'url', value: res?.Location})
        })
        .catch((err) => console.error(err))
      
      if (response.ok) setUploadInfo('Ressource ajoutée')
      if (error) setUploadInfo('Echec ajout ressource')
    }
  }
  
  return (
    <Box {...props} >
      <form onSubmit={(ev) => handleUpload(ev)}>
        {children}
      </form>
      {uploadInfo && <Text>{uploadInfo}</Text>} {/*Component status */}
    </Box>
  )
}

export default UploadFile
