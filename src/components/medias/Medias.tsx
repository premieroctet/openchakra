import React, { useEffect, useState } from 'react'
import { uploadFile, listFiles } from '../../core/s3'

const Medias = () => {
  const [fileToUpload, setFileToUpload] = useState()
  const [images, setImages] = useState([])

  const handleUpload = (event: React.ChangeEvent) => {
    event.preventDefault()
    fileToUpload && uploadFile(fileToUpload?.name, fileToUpload)
  }

  useEffect(() => {
    const mazette = async () => {
      const nimages = await listFiles()
      setImages(nimages?.data?.Contents)
    }

    mazette()
  }, [])

  const autorizedImagesExtensions = ['jpg', 'jpeg', 'svg', 'gif']
  const imagesToDisplay = images.filter(img => {
    const ext =
      img?.Key.substring(img.Key.lastIndexOf('.') + 1, img?.Key.length) ||
      img?.Key
    return autorizedImagesExtensions.includes(ext)
  })

  console.log(images, imagesToDisplay)

  return (
    <div>
      <form>
        <input
          type="file"
          onChange={e => {
            console.log(e.target?.files[0])
            setFileToUpload(e.target?.files[0])
          }}
        />
        <input type="submit" onClick={handleUpload} />
      </form>
      {imagesToDisplay.map((imgObj, i) => (
        <div key={`img${i}`}>
          <img width={150} height={150} src={imgObj.publicUrl} alt={''} />
        </div>
      ))}
    </div>
  )
}

export default Medias
