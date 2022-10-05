import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { uploadFile, listFiles, deleteFile } from '../../core/s3'
import {
  Button,
  Portal,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Input,
  Checkbox,
} from '@chakra-ui/react'

interface s3media {
  ChecksumAlgorithm: []
  ETag: string
  Key: string
  LastModified: Date
  Size: number
  StorageClass: string
  publicUrl: string
}

const getExtension = (filename: string) => filename.substring(filename.lastIndexOf('.') + 1, filename.length) ||
filename

const displayDocument = (ext: string, src: string) => {

  const document = {
    width: 200,
    height: 200
  }

  switch (ext) {
    case 'mp4': 
    case 'webm': 
    return  <video 
      width={document.width} 
      controls
      preload='none'
      poster="images/videocover.png"
      >
      <source src={src} type={`video/${ext}`} />
        </video>  
    case 'pdf':
      return  <object
      type="application/pdf"
      data={src}
      role={'document'}
      width={document.width}
      height={document.height}
    ></object>  
    default:
      return <img 
        src={src} 
        width={document.width}
        height={document.height} 
        alt="" 
        />
  }
}

const Medias = () => {

  const autorizedImagesExtensions = ['jpg', 'jpeg', 'png', 'svg', 'gif']
  const autorizedVideosExtensions = ['webm', 'mp4']
  const autorizedFilesExtensions = ['pdf']


  const [fileToUpload, setFileToUpload] = useState()
  const [images, setImages] = useState<s3media[]>([])
  const [extfilters, setExtfilters] = useState<string[]>([])
  
  const handledExtensions = new Set(images
      .map((el: s3media) => getExtension(el.Key))
      .filter(ext => [...autorizedImagesExtensions, ...autorizedVideosExtensions, ...autorizedFilesExtensions].includes(ext)))

  const handleUpload = async (event: React.ChangeEvent) => {
    event.preventDefault()
    fileToUpload && await uploadFile(fileToUpload?.name, fileToUpload)
      .then(() => fetchFiles())
  }

  const handleFilters = (val: string) => {
    if (extfilters.includes(val)) {
      setExtfilters(extfilters.filter(ext => ext !== val))
    } else {
      setExtfilters([...extfilters, val])
    }
  }

  const handleDelete = async (key: string) => {
    await deleteFile(key)
      .then(() => {
        setImages(images.filter((img: s3media) => img.Key !== key))
      })
  }

  const fetchFiles = async () => {
    await listFiles()
      .then((nimages) => {
        setImages(nimages?.data?.Contents)
      })
  }

  useEffect(() => {
    fetchFiles()
  }, [])

  
  const imagesToDisplay = extfilters.length > 0 ? images.filter(img => {
    const ext = getExtension(img?.publicUrl)
    return extfilters.includes(ext)
  }) :  images.filter(img => {
    const ext = getExtension(img?.publicUrl)
    return autorizedImagesExtensions.includes(ext) || autorizedVideosExtensions.includes(ext)
  })


  return (
    <div>
      <form>
        <input
          type="file"
          onChange={e => {
            setFileToUpload(e.target?.files[0])
          }}
        />
        <input type="submit" onClick={handleUpload} />
      </form>
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
        {[...handledExtensions].map((ext: string) => 
          <Checkbox 
            name='filters' 
            value={ext} 
            isChecked={extfilters.length > 0 ? extfilters.includes(ext) : false}
            onChange={() => handleFilters(ext)}
            >{`.${ext}`}</Checkbox>
        )}
      </PopoverBody>
      <PopoverFooter><Button onClick={() => setExtfilters([])}>Reset filters</Button></PopoverFooter>
    </PopoverContent>
  </Portal>
</Popover>
      </DisplayFilterMedias>
      <MediaGrid>
      {imagesToDisplay.map((imgObj: s3media, i) => {
        
        const extension = getExtension(imgObj?.publicUrl)

        return (
          <MediaCard key={`img${i}`}> 
          <button onClick={() => handleDelete(imgObj.Key)}>X</button>
          {displayDocument(extension, imgObj.publicUrl)}
          <p>{imgObj.Key}</p>
          <small>{imgObj.publicUrl}</small>
          </MediaCard>
        )
        }
      )}
      </MediaGrid>
    </div>
  )
}

const DisplayFilterMedias = styled.div`
  display: flex;
`


const MediaGrid = styled.div`
  --grid-space: 2rem;
  display: grid;
  grid-template-columns: repeat( auto-fit, minmax(250px, 1fr) );
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
  box-shadow: 0px 10px  5px rgba(199, 199, 199,0.9);
  
  button {
    border-radius: 50%;
    height: 44px;
    width: 44px;
    background-color: red;
    border: 1px solid orangered;
    position: absolute;
    top: 1rem;
    right: 1rem;
    padding: 0.5rem 1rem;
  }

  video, img {
    width: 100%;
    aspect-ratio: 16/9;
    object-fit: contain;
    border-radius: 1rem;
  }

`

export default Medias
