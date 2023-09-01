import { Box, Text } from '@chakra-ui/react'
import React, { useState } from 'react';
import axios from 'axios'
import styled from '@emotion/styled'
import { ACTIONS } from '../utils/actions';

const uploadUrl = `/myAlfred/api/studio/s3uploadfile`

const uploadFileToS3 = async (file: File) => {

  const formData = new FormData();
  formData.append('document', file)

  const uploadedFile = await axios.post(uploadUrl, formData, 
    {
      headers: {
      'Content-Type': 'multipart/form-data'
      },
    }
  ).catch(err => console.error(err))

  return uploadedFile
}


const UploadFile = ({
  notifmsg,
  okmsg = 'Ressource ajoutée',
  komsg = 'Échec ajout ressource',
  dataSource,
  attribute,
  value,
  backend,
  children,
  reload,
  noautosave,
  ...props
}: {
  notifmsg: boolean
  okmsg: string
  komsg: string
  dataSource: { _id: null } | null
  attribute: string
  value: string
  backend: string
  reload: any
  noautosave: boolean | null
  children: React.ReactNode
}) => {
  
  const [uploadInfo, setUploadInfo] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [s3File, setS3File] = useState<string|null>()

  const onFileNameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const currentFile = e.target.files && e.target.files[0]
    if (currentFile) {
      await handleUpload(currentFile)
    }
  }

  const handleUpload = async (fileToUpload: File) => {

      let paramsBack = {
        action: 'put',
        parent: dataSource?._id,
        attribute,
        value: '',
      }

      setUploadInfo('')

      const uploadFile = async () => {

        setIsLoading(true)
        await uploadFileToS3(fileToUpload)
          .then((result) => {
            // @ts-ignore
            const filepath = result?.data?.Location
            setS3File(filepath)
            paramsBack = { ...paramsBack, value: filepath}
          })
          .catch(err => console.error(err))
          .finally(() => {
            setIsLoading(false)
            if (attribute && notifmsg) {
              typeof s3File === 'undefined' ? setUploadInfo(komsg) : setUploadInfo(okmsg)
            }
          })
          
      }

      const saveUrl = async () => {
        const promise=noautosave ?
          Promise.resolve(null)
          :
          ACTIONS.putValue({
            context: dataSource?._id,
            props: {attribute: attribute},
            value: paramsBack.value,
          })
        promise
          .then(() => {
            if (notifmsg) {
              setUploadInfo(okmsg)
            }
          })
          .catch(e => {
            console.error(e)
            setUploadInfo('Échec ajout ressource')
          })
      }

      await uploadFile()
      if (dataSource) {
        typeof s3File !== 'undefined' && await saveUrl()
        reload()
      }
    }

  // SAU to propagate attribute
  const pr={...props, attribute, value: s3File}

  return (
    <>
    <Box {...pr} data-value={s3File} display='flex' flexDirection='row' position={'relative'}>
      <form id="uploadressource">
        <UploadZone>
          <input type="file" onChange={onFileNameChange} />
          {/* Whatever in children, it bring focus on InputFile */}
          {children}
        </UploadZone>
      </form>
      {uploadInfo &&
      // @ts-ignore
      <Text>{uploadInfo}</Text>} {/*Component status */}
      {isLoading && <Loading />}
    </Box>
    </>
  )
}

const Loading = styled.div`
  display: block;
  position: absolute;
  z-index: 999;

  &:after {
    content: " ";
    display: block;
    min-width: 40px;
    width: inherit;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    border: 6px solid #333;
    border-color: #333 transparent #333 transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
`

const UploadZone = styled.label`
  input[type='file'] {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  *:not(input[type='file']) {
    pointer-events: none;
  }
`

export default UploadFile
