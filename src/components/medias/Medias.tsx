import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { uploadFile, listFiles } from '../../core/s3'

interface s3media {
  ChecksumAlgorithm: []
  ETag: string
  Key: string
  LastModified: Date
  Size: number
  StorageClass: string
  publicUrl: string
}

const getExtension = filename => filename.substring(filename.lastIndexOf('.') + 1, filename.length) ||
filename

const displayDocument = (ext: string, src: string) => {

  const document = {
    width: 200,
    height: 200
  }

  switch (ext) {
    case 'pdf':
      return  <object
      type="application/pdf"
      data={src}
      role={'document'}
      width={document.width}
      height={document.height}
    ></object>  
    default:
      return <img src={src} width={document.width}
      height={document.height} alt="" />
  }
}

const Medias = () => {
  const [fileToUpload, setFileToUpload] = useState()
  const [images, setImages] = useState([])

  const handleUpload = async (event: React.ChangeEvent) => {
    event.preventDefault()
    fileToUpload && await uploadFile(fileToUpload?.name, fileToUpload)
      .then(() => fetchFiles())
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

  const autorizedImagesExtensions = ['jpg', 'jpeg', 'png', 'svg', 'gif']
  const imagesToDisplay = images.filter(img => {
    const ext = getExtension(img?.publicUrl)
    return autorizedImagesExtensions.includes(ext)
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
      <MediaGrid>
      {imagesToDisplay.map((imgObj: s3media, i) => {
        
        const extension = getExtension(imgObj?.publicUrl)

        return (
          <MediaCard key={`img${i}`}> 
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

const MediaGrid = styled.div`
  --grid-space: 2rem;
  display: grid;
  grid-template-columns: repeat( auto-fit, minmax(250px, 1fr) );
  column-gap: var(--grid-space);
  row-gap: var(--grid-space);
  padding: 2rem;
`

const MediaCard = styled.div`
  display: grid;
  justify-items: center;
  background-color: rgb(243, 243, 243);
  padding: 1rem;
  row-gap: 1rem;
  border-radius: 2rem;
  box-shadow: 0px 10px  5px rgba(199, 199, 199,0.9);
  
  img {
    width: 100%;
    height: auto;
    border-radius: 1rem;
  }

`

export default Medias
