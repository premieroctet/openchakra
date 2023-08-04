import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import axios from 'axios'
import config from '../../../env.json'
import { uploadFile, listFiles, deleteFile } from '../../core/s3'
import {
  Button,
  Input,
  Portal,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Checkbox,
  useDisclosure,
} from '@chakra-ui/react'
import {
  getExtension,
  mediaWrapper,
} from '~dependencies/custom-components/MediaWrapper'

interface s3media {
  //ChecksumAlgorithm: []
  ETag: string
  Key: string
  LastModified: Date
  Size: number
  StorageClass: string
  publicUrl: string
}

const Medias = ({
  setMediaSrc,
  mediaPanelClose,
}: {
  setMediaSrc: any
  mediaPanelClose: any
}) => {
  const autorizedImagesExtensions = ['jpg', 'jpeg', 'png', 'svg', 'gif', 'webp']
  const autorizedVideosExtensions = ['webm', 'mp4']
  const autorizedFilesExtensions = ['pdf', 'txt', 'doc', 'docx', 'xls', 'xlsx']
  const autorizedExtensions = [
    ...autorizedImagesExtensions,
    ...autorizedVideosExtensions,
    ...autorizedFilesExtensions,
  ]

  const [fileToUpload, setFileToUpload] = useState()
  const [mediaSearch, setMediaSearch] = useState<string>('')
  const [images, setImages] = useState<s3media[]>([])
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [extfilters, setExtfilters] = useState<string[]>([])

  const handledExtensions = new Set(
    images
      .map((el: s3media) => getExtension(el.Key))
      .filter(ext => autorizedExtensions.includes(ext)),
  )

  const handleUpload = async (event: React.ChangeEvent) => {
    event.preventDefault()

    if (fileToUpload) {
      const formData = new FormData();
      formData.append('document', fileToUpload)
  
      const sendFile = await axios.post(
        `${config.targetDomain}/myAlfred/api/studio/uploadFiles`, 
        formData, 
        {
          headers: {
          'Content-Type': 'multipart/form-data'
          },
        }
      )
        .then(() => onClose())
        .then(() => setFileToUpload(undefined))
        .then(() => fetchFiles())
        .catch(err => console.error(err))
    }
    
  }

  const handleFilters = (val: string) => {
    if (extfilters.includes(val)) {
      setExtfilters(extfilters.filter(ext => ext !== val))
    } else {
      setExtfilters([...extfilters, val])
    }
  }

  const handleDelete = async (key: string) => {
    await deleteFile(key).then(() => {
      setImages(images.filter((img: s3media) => img.Key !== key))
    })
  }

  const fetchFiles = async () => {
    await listFiles().then(nimages => {
      setImages(nimages?.data?.Contents)
    })
  }

  useEffect(() => {
    fetchFiles()
  }, [])

  // Images filtered by extension
  const filteredImages =
    extfilters.length > 0
      ? images.filter(img => {
          const ext = getExtension(img?.publicUrl)
          return extfilters.includes(ext)
        })
      : images.filter(img => {
          const ext = getExtension(img?.publicUrl)
          return autorizedExtensions.includes(ext)
        })

  // Images filtered by search input => TODO improve search
  const imagesToDisplay = mediaSearch
    ? filteredImages.filter((img: s3media) => {
      const s3file = img.Key.toLowerCase()
      return s3file.includes(mediaSearch.toLowerCase())
    })
    : filteredImages

  return (
    <div>
      <Button colorScheme={'teal'} onClick={onOpen} mb={2}>
        Upload your media
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent minW={'50vw'}>
          <ModalHeader>Choose your media</ModalHeader>
          <ModalCloseButton />
          <ModalBody display={'flex'} flexDirection={'column'}>
            <UploadForm encType="multipart/form-data" method="post">
              <label htmlFor="uploadfile">
                <div>
                  <img src="/images/backgroundMedias.svg" />
                  <p>Click to choose a file</p>
                  <input
                    id="uploadfile"
                    type="file"
                    onChange={e => {
                      setFileToUpload(e.target?.files[0])
                    }}
                  />
                </div>
              </label>
              {fileToUpload?.name}
            </UploadForm>
            <input type="submit" onClick={handleUpload} value="Upload" />
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>

      <DisplayFilterMedias>
        <small>{imagesToDisplay.length} au total</small>
        <Popover>
          <PopoverTrigger>
            <Button>Filter</Button>
          </PopoverTrigger>
          <Portal>
            <PopoverContent>
              <PopoverArrow />
              <PopoverHeader>Filter extensions</PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody>
                {[...handledExtensions].map((ext: string, i: number) => (
                  <Checkbox
                    key={`filt${i}`}
                    name="filters"
                    value={ext}
                    isChecked={
                      extfilters.length > 0 ? extfilters.includes(ext) : false
                    }
                    onChange={() => handleFilters(ext)}
                  >{`.${ext}`}</Checkbox>
                ))}
              </PopoverBody>
              <PopoverFooter>
                <Button onClick={() => setExtfilters([])}>Reset filters</Button>
              </PopoverFooter>
            </PopoverContent>
          </Portal>
        </Popover>
        <MediaSearch
          value={mediaSearch}
          placeholder={'Search on title'}
          onChange={e => setMediaSearch(e.target.value)}
        />
      </DisplayFilterMedias>
      <MediaGrid>
        {imagesToDisplay.map((imgObj: s3media, i) => {
          return (
            <MediaCard key={`img${i}`}>
              <button
                className="closeButton"
                onClick={() => handleDelete(imgObj.Key)}
              >
                X
              </button>
              {mediaWrapper({ src: imgObj.publicUrl })}
              <p>{imgObj.Key}</p>
              {setMediaSrc && (
                <Button
                  colorScheme={'teal'}
                  onClick={() => {
                    setMediaSrc('src', imgObj.publicUrl)
                    mediaPanelClose && mediaPanelClose()
                  }}
                >
                  Select
                </Button>
              )}
            </MediaCard>
          )
        })}
      </MediaGrid>
    </div>
  )
}

const UploadForm = styled.form`
  row-gap: 0.5rem;

  #uploadfile {
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

  label {
    cursor: pointer;

    & > div {
      display: grid;
      min-height: 50vh;
      align-items: center;
      justify-items: center;
      font-size: 2rem;
    }

    & > div > * {
      grid-column: 1/-1;
      grid-row: 1/-1;
    }
  }
`

const DisplayFilterMedias = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const MediaSearch = styled.input`
  min-width: 50%;
  border: 1px solid black;
  border-radius: 1rem;
  padding-block: 0.3rem;
  padding-inline: 1rem;
`

const MediaGrid = styled.div`
  --grid-space: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  column-gap: var(--grid-space);
  row-gap: var(--grid-space);
  padding: 2rem;
`

const MediaCard = styled.div`
  position: relative;
  display: grid;
  justify-items: center;
  background-color: rgb(243, 243, 243);
  padding: 1rem;
  row-gap: 1rem;
  border-radius: 2rem;
  box-shadow: 0px 10px 5px rgba(199, 199, 199, 0.9);

  iframe {
    width: 100%;
  }

  p {
    word-break: break-all;
    font-size: 0.8em;
  }

  .closeButton {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    height: 44px;
    width: 44px;
    background-color: red;
    border: 1px solid orangered;
    position: absolute;
    top: 1rem;
    right: 1rem;
  }

  video,
  img {
    width: 100%;
    aspect-ratio: 16/9;
    object-fit: contain;
    border-radius: 1rem;
  }
`

export default Medias
