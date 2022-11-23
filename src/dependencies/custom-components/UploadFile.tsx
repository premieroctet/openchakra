import { Box, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import FileManager from '../utils/S3filemanager'
import { s3Config, S3UrlRessource } from '../utils/s3Config'
import useFetch from 'use-http'
import mime from 'mime'
import JSZip from 'jszip'
import { getExtension } from './MediaWrapper'

const uploadUrl = `/myAlfred/api/studio/action`

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
      const typeOfUpload = getExtension(fileToUpload?.name)

      switch (typeOfUpload) {
        case 'zip':
          await JSZip.loadAsync(fileToUpload)
            .then(async zip => {
              for await (const filename of Object.keys(zip.files)) {
                zip.files[filename]
                  .async('blob')
                  .then(async function(fileData) {
                    /* If we're not reading a folder */
                    if (!zip.files[filename]?.dir) {
                      const { fileInFolder } = S3UrlRessource({
                        filename,
                        folder: fileToUpload?.name,
                      })
                      let file = new File([fileData], fileInFolder, {
                        type: mime.getType(getExtension(filename)) || '',
                      })

                      await FileManager.createFile(
                        file.name,
                        file,
                        '',
                        file.type,
                        [],
                      )
                    }
                  })
              }
            })
            .then(res => {
              const { scormUrl } = S3UrlRessource({
                folder: fileToUpload?.name,
              })

              post(uploadUrl, {
                action: 'put',
                parent: ressource_id,
                attribute,
                // When scorm uploaded (usually zip file), refer story.html
                value: encodeURI(scormUrl),
              })
            })
            .catch(err => console.error('uploadzippedfiles', err))

          break

        default:
          await FileManager.createFile(
            fileToUpload?.name,
            fileToUpload,
            '',
            // @ts-ignore
            fileToUpload?.type,
            [],
          )
            .then(res => {
              // Send ressource url
              post(uploadUrl, {
                action: 'put',
                parent: ressource_id,
                attribute,
                value: res?.Location,
              })
            })
            .catch(err => console.error(err))
          break
      }

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
