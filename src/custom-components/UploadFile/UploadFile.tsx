import { Box, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import FileManager from '~dependencies/utils/S3filemanager'
import { s3Config } from '~dependencies/utils/s3Config'
import useFetch from 'use-http'
import mime from 'mime-types'




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
      children: React.ReactChildren
    }
  ) => {
  
  FileManager.initialize(s3Config.region, s3Config.bucketName, s3Config.accessKeyId || '', s3Config.secretAccessKey || '')
  const [uploadInfo, setUploadInfo] = useState('')
  const {post, response, error} = useFetch(backend)

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()

    /* test upload */ 
    console.log('uploadTest', dataSource, backend, ressource_id, children, props)
    
    const form = e.target as HTMLFormElement
    const inputFile = form.querySelector('[type="file"]') as HTMLInputElement
    const fileToUpload = inputFile && inputFile?.files && inputFile?.files[0] as File
    
    if (fileToUpload) {
      // upload file to S3
      const uploadedFile = await FileManager.createFile(fileToUpload?.name, fileToUpload, '', mime.lookup(fileToUpload?.name), [])
        .catch((err) => console.error(err))
      // Send ressource url 
      backend && await post(`${backend}/myAlfred/api/action`, {action: 'setResourceFile', parent: ressource_id, url: uploadedFile?.Location})
      if (response.ok) setUploadInfo('Ressource ajoutée')
      if (error) setUploadInfo('Echec ajout ressource')
    }
  }
  
  return (
    <Box {...props} >
      <form onSubmit={handleUpload}>
        {children}
      </form>
      {uploadInfo && <Text>{uploadInfo}</Text>} {/*Component status */}
    </Box>
  )
}

export default UploadFile
