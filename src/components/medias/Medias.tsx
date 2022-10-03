import React, { useEffect, useState } from 'react'
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

const Medias = () => {
  const [fileToUpload, setFileToUpload] = useState()
  const [images, setImages] = useState([])

  const handleUpload = (event: React.ChangeEvent) => {
    event.preventDefault()
    fileToUpload && uploadFile(fileToUpload?.name, fileToUpload)
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

  const autorizedImagesExtensions = ['jpg', 'jpeg', 'svg', 'gif']
  const imagesToDisplay = images.filter(img => {
    const ext =
      img?.publicUrl.substring(img.publicUrl.lastIndexOf('.') + 1, img?.publicUrl.length) ||
      img?.publicUrl
    return autorizedImagesExtensions.includes(ext)
  })

  console.log(images, imagesToDisplay)

  // const href = "https://s3." + REGION + ".amazonaws.com/";
  //   const bucketUrl = href + albumBucketName + "/";
  //   const photos = data.Contents.map(function (photo) {
  //     const photoKey = photo.Key;
  //     const photoUrl = bucketUrl + encodeURIComponent(photoKey);

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
      {imagesToDisplay.map((imgObj: s3media, i) => {
        
        // console.log(imgObj.publicUrl)
        // var params = {Bucket: 'xxx-xx-xxx', Key: '1.jpg'};
        // var promise = s3.getSignedUrlPromise('getObject', params);
        // promise.then(function(url) {
        //   res.send(url)
        // }, function(err) { console.log(err) });

        return (
        <div key={`img${i}`}>
          <img width={150} height={150} src={decodeURI(imgObj.publicUrl)} alt={''} />
        </div>
      )
        })}
    </div>
  )
}

export default Medias
