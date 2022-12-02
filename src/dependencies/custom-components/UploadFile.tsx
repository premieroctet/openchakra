import { Box, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import FileManager from '../utils/S3filemanager'
import { s3Config, S3UrlRessource } from '../utils/s3Config'
import axios from 'axios'
import mime from 'mime'
import JSZip from 'jszip'
import { getExtension } from './MediaWrapper'

const uploadUrl = `/myAlfred/api/studio/action`

function createFileFromBlob(folder: string, filename: string, fileData: Blob) {
  const { fileInFolder } = S3UrlRessource({
    filename,
    folder,
  })
  return new File([fileData], fileInFolder, {
    type: mime.getType(getExtension(filename)) || '',
  })
}

async function uploadFileToS3(file: File) {
  return await FileManager.createFile(file.name, file, '', file.type, [])
}

const sendMultipleToS3 = async (folder: string, unzip: any) => {
  for await (const filename of Object.keys(unzip.files)) {
    const blob = await unzip.files[filename].async('blob')
    if (!unzip.files[filename]?.dir) {
      const file = createFileFromBlob(folder, filename, blob)
      await uploadFileToS3(file)
    }
  }
}

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

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()

    const form = e.target as HTMLFormElement
    const inputFile = form.querySelector('[type="file"]') as HTMLInputElement
    const fileToUpload =
      inputFile && inputFile?.files && (inputFile?.files[0] as File)

    if (fileToUpload) {
      const typeOfUpload = getExtension(fileToUpload?.name)

      let paramsBack = {
        action: 'put',
        parent: ressource_id,
        attribute,
      }

      setUploadInfo('')

      const switchUploadType = async () => {
        switch (typeOfUpload) {
          case 'zip':
            const unzipped = await JSZip.loadAsync(fileToUpload)
            await sendMultipleToS3(fileToUpload?.name, unzipped)

            const { scormUrl } = S3UrlRessource({
              folder: fileToUpload?.name,
            })

            paramsBack = { ...paramsBack, ...{ value: encodeURI(scormUrl) } }
            break

          default:
            const res = await uploadFileToS3(fileToUpload)
            paramsBack = { ...paramsBack, ...{ value: res?.Location } }
            break
        }
      }

      const saveUrl = async () => {
        console.log('Hey, on y arrive', uploadUrl, paramsBack)
        axios
          .post(uploadUrl, paramsBack)
          .then(() => {
            setUploadInfo('Ressource ajoutée')
          })
          .then(() => {
            
            axios.post(uploadUrl, {
              action: 'put',
              parent: ressource_id,
              attribute: 'version',
              value: versionScorm,
            })
          })
          .catch(e => {
            setUploadInfo('Echec ajout ressource')
          })
      }

      await switchUploadType()
      await saveUrl()
    }
  }

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
