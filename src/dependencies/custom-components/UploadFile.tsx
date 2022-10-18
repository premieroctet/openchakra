import { Box, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { uploadFile } from '~core/s3'
import useFetch from 'use-http'

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
  
  const [uploadInfo, setUploadInfo] = useState('')
  const {post, response, error} = useFetch(backend)

  const handleUpload = async (e: React.FormEvent) => {

    /* For prod test */ 
    console.log('uploadTest', dataSource, backend, ressource_id, children, props)
    
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const inputFile = form.querySelector('[type="file"]') as HTMLInputElement
    const fileToUpload = inputFile && inputFile?.files && inputFile?.files[0] as File
    
    if (fileToUpload) {
      
      // upload file to S3
      const uploadedFile = await uploadFile(fileToUpload?.name , fileToUpload)
        .catch((err) => console.error(err))
      // Send ressource url 
      await post('myAlfred/api/action', {action: 'setResourceFile', parent: ressource_id, url: uploadedFile?.Location})
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
