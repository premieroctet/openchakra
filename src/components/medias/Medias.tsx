import React from 'react'

const Medias = () => {
  const S3Images = [
    {
      name: 'poupee',
      src: 'poupee.jpg',
      width: 860,
      height: 480,
      alt: 'Belle poupée',
    },
  ]

  return (
    <div>
      {S3Images.map(imgObj => (
        <div>
          <img src={imgObj.src} alt={imgObj.alt} />
        </div>
      ))}
    </div>
  )
}

export default Medias
