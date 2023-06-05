import { Box, Text } from '@chakra-ui/react'
import JSZip from 'jszip'
import React, { useState } from 'react';
import axios from 'axios'
import mime from 'mime'
import styled from '@emotion/styled'
import xmljs from 'xml-js'
import { ACTIONS } from '../utils/actions';
import { generateUUID } from '../utils/crypto';
import { getExtension } from './MediaWrapper'
import { s3Config, S3UrlRessource } from '../utils/s3Config'
import FileManager from '../utils/S3filemanager'

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

const uploadFileToS3 = async (file: File) => {

  if (!s3Config.rootFolderName) {
    throw new Error(
      `No root folder. Please fill in REACT_APP_S3_ROOTPATH`
    );
  }

  const fileNameForS3 = s3Config.rootFolderName ? `${s3Config.rootFolderName}/public/${generateUUID()}${file.name}` : file.name
  return await FileManager.createFile(fileNameForS3, file, '', file.type, [])
}

const uploadMultipleToS3 = async (folder: string, unzip: any) => {
  for await (const filename of Object.keys(unzip.files)) {
    const blob = await unzip.files[filename].async('blob')
    if (!unzip.files[filename]?.dir) {
      const file = createFileFromBlob(folder, filename, blob)
      await uploadFileToS3(file)
    }
  }
}

const isScormZip = async (unzipped: any) => {
  let scormVersion = null
  // looking for scorm version in imsmanifest.xml
  for (const filename of Object.keys(unzipped.files)) {
    if (!unzipped.files[filename]?.dir) {
      if (filename === 'imsmanifest.xml') {
        const text = await unzipped.files[filename].async('string')
        const imsmanifest = xmljs.xml2js(text, { compact: true })
        //@ts-ignore
        scormVersion = imsmanifest?.manifest?._attributes?.version
      }
    }
  }
  return scormVersion
}

const UploadFile = ({
  notifmsg,
  okmsg = 'Ressource ajoutée',
  dataSource,
  attribute,
  value,
  backend,
  children,
  reload,
  ...props
}: {
  notifmsg: boolean
  okmsg: string
  dataSource: { _id: null } | null
  attribute: string
  value: string
  backend: string
  reload: any
  children: React.ReactNode
}) => {
  FileManager.initialize(
    s3Config.region,
    s3Config.bucketName,
    s3Config.accessKeyId || '',
    s3Config.secretAccessKey || '',
  )
  const [uploadInfo, setUploadInfo] = useState('')
  const [s3File, setS3File] = useState<string|null>()

  const onFileNameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const currentFile = e.target.files && e.target.files[0]
    if (currentFile) {
      await handleUpload(currentFile)
    }
  }

  const handleUpload = async (fileToUpload: File) => {
      const typeOfUpload = getExtension(fileToUpload?.name)

      let paramsBack = {
        action: 'put',
        parent: dataSource?._id,
        attribute,
        value: '',
      }

      type scormVersion = {
        attribute: string,
        value: string | null,
      }

      let paramsScormVersion: scormVersion = {
        ...paramsBack,
        attribute: 'version',
        value: null,
      }
      
      setUploadInfo('')

      const switchUploadType = async () => {
        switch (typeOfUpload) {
          case 'zip':
            const unzipped = await JSZip.loadAsync(fileToUpload)
            const scormVersion = await isScormZip(unzipped)

            await uploadMultipleToS3(fileToUpload?.name, unzipped)

            if (scormVersion) {
              const { scormUrl } = S3UrlRessource({
                folder: fileToUpload?.name,
              })

              paramsBack = { ...paramsBack, ...{ value: encodeURI(scormUrl) } }
              paramsScormVersion = {
                ...paramsScormVersion,
                ...{ value: scormVersion },
              }
            }
            break

          default:
            const res = await uploadFileToS3(fileToUpload)
            setS3File(res.Location)
            paramsBack = { ...paramsBack, ...{ value: res?.Location } }
            break
        }
      }

      const saveUrl = async () => {
        return ACTIONS.putValue({
          context: dataSource?._id,
          props: {attribute: attribute},
          value: paramsBack.value,
        })
          .then(() => {
            if (notifmsg) {
              setUploadInfo(okmsg)
            }
          })
          .then(() => {
            /* scorm file ? save version */
            if (paramsScormVersion.value !== null) {
              axios
                .post(uploadUrl, paramsScormVersion)
                .catch(err => console.error('scormversion not saved', err))
            }
          })
          .catch(e => {
            console.error(e)
            setUploadInfo('Echec ajout ressource')
          })
      }

      await switchUploadType()
      if (dataSource) {
        await saveUrl()
        reload()
      }
    }

  // SAU to propagate attribute
  const pr={...props, attribute, value: s3File}

  return (
    <Box {...pr} data-value={s3File} display='flex' flexDirection='row'>
      <form id="uploadressource">
        <UploadZone>
          <input type="file" onChange={onFileNameChange} />
          {/* Whatever in children, it bring focus on InputFile */}
          {children}
        </UploadZone>
      </form>
      {uploadInfo && <Text>{uploadInfo}</Text>} {/*Component status */}
    </Box>
  )
}

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
