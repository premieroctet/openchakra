/*
  update all image entries on s3 database which haven't been resized
  
  consider those consts in your main .env file
  - DATABASE_NAME
  - S3_REGION
  - S3_BUCKET
  - S3_PROD_ROOTPATH
*/


const path=require('path')
const myEnv = require('dotenv').config({path: path.resolve(__dirname, '../../../.env')})
const dotenvExpand = require('dotenv-expand')
dotenvExpand.expand(myEnv)
const mongoose = require('mongoose')
const sharp = require('sharp')
const {Upload} = require('@aws-sdk/lib-storage')
const {S3} = require('@aws-sdk/client-s3')
const {sanitizeFilename, generateUUID} = require('../utils/functions')
const {IMAGES_WIDTHS_FOR_RESIZE, IMAGE_SIZE_MARKER, THUMBNAILS_DIR} = require('../utils/consts')
const {IMAGE_SETTINGS, IMAGE_SIZE_SEPARATOR, switchbuffer} = require('../server/utils/images')

const rootPath = process.env?.S3_PROD_ROOTPATH
const s3 = new S3({
  region: process.env?.S3_REGION,
})
const database = process.env.DATABASE_NAME
const url = `mongodb://localhost:27017/${database}`;

const generateImageSet = async(awsurl, filename) => {

  const response = await fetch(awsurl);
  const blob = await response.blob();
  const {type:filemimetype} = blob
  const arrayBuffer = await blob.arrayBuffer();
  const bufferfromaws = Buffer.from(arrayBuffer);

  const isImage = Object.keys(IMAGE_SETTINGS).includes(filemimetype)
  const uploadedfilenamebase = filename.substring(0, filename.lastIndexOf('.'))
  
  if (isImage) {
    let availableSizes = []
    let dataForAWS = []
    const buffer = await switchbuffer(bufferfromaws, filemimetype)
      .catch(err => {throw new Error(err)})
    
      // watch out for original image width
      const {width: originalWidth} = await sharp(buffer)
      .metadata()
      .then(metadata => {
        return {
          width: metadata.width,
        }
      })
      .catch(err => {
        throw Error('Error while obtaining image dimensions :', err)
      })

    const retainedImageSizes = IMAGES_WIDTHS_FOR_RESIZE
      .filter(size => size < originalWidth)
      .sort((a, b) => a - b)
      
    const imagesSet = new Set([...retainedImageSizes, originalWidth])

    const sharpImages = [...imagesSet].map(width => {

      return new Promise(async(resolve, reject) => {
        availableSizes.push(width)
        const image = await sharp(buffer)
        .resize({width})
        .toFormat(IMAGE_SETTINGS[filemimetype].outputFormat, IMAGE_SETTINGS[filemimetype].options)
        .toBuffer()
        .catch(err => {
          reject(err)
        })

        const imageData = {
          filename: originalWidth === width // spread availables image dimensions on original file. Others in thumbnails dir
            ? `${rootPath}/${uploadedfilenamebase}${IMAGE_SIZE_MARKER}${availableSizes.join(IMAGE_SIZE_SEPARATOR)}.${IMAGE_SETTINGS[filemimetype].extension}`
            : `${THUMBNAILS_DIR}/${rootPath}/${uploadedfilenamebase}_w:${width}.${IMAGE_SETTINGS[filemimetype].extension}`,
          mimetype: IMAGE_SETTINGS[filemimetype].outputMime,
          buffer: image,
        }
        
        dataForAWS.push(imageData)
        resolve(image)
      })
    })
    
    await Promise.allSettled(sharpImages)
      .catch(err => console.error(err))

    return dataForAWS
  }

  return false
}

const sendFilesToAws = async(data) => {
  const documentsToSend = data.map(document => {
    
    return new Promise(async(resolve, reject) => {
      const params = {
        Bucket: process.env?.S3_BUCKET,
        Key: document.filename,
        Body: document.buffer,
        ContentType: document.mimetype,
      }

      await new Upload({
        client: s3,
        params,
      }).done()
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
  })

  return await Promise.all(documentsToSend)
    .catch(err => {throw Error('Error while obtaining image dimensions :', err)})
}

const deletePreviousUrl = async(urlToDelete) => {

  const params = {
    Bucket: process.env.S3_BUCKET,
    Key: urlToDelete, // File name you want to delete as in S3
  }
  return s3.deleteObject(params)
    .then(res => {
      return Promise.resolve(res)
    })
    .catch(err => {
      return Promise.reject(err)
    })

}

const generateFilename = (originalurl)  => {
  const urldecoded = decodeURIComponent(originalurl)
  const [filename] = urldecoded.match(/[^/]*$/)
  const withUUID = /^[a-fA-F\d]{8}\b-[a-fA-F\d]{4}\b-[a-fA-F\d]{4}\b-[a-fA-F\d]{4}\b-[a-fA-F\d]{12}/.test(filename)
  return withUUID ? sanitizeFilename(filename) : `${generateUUID()}_${sanitizeFilename(filename)}`
}


mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on('open', function () {
  mongoose.connection.db.listCollections().toArray(function (err, names) {
    if (err) {
      console.error(err);
    } else {
      
      names.forEach(function(e,i,a) {
        mongoose.connection.db.collection(e.name, function(err, collection) {
            
            collection.find().toArray(function(err, data) {
            
              data.forEach(async function(doc) {

                for (const key in doc) {
  
                  const currentValue = doc[key]
                  const isAwsFile = typeof currentValue === 'string' && currentValue.includes('amazonaws.com/')
                  /* 
                    1. filter if image doesn't correspond to pattern with srcset
                    2. keep filename, and generate future filename
                    3. Buffer actual image, and generate images 
                    4. get new filename and update in database
                    5. drop the old image
                  */
  
                  if (isAwsFile) {
                    
                    /* does filename contains pattern with srcset (already with sizes) */
                    const filePathParts = currentValue.split(encodeURIComponent("_srcset:")) || [];
                    
                    if (filePathParts.length === 1) {  
                      const futurefilename = generateFilename(currentValue)
                      const dataforAWS = await generateImageSet(currentValue, futurefilename).catch(err => console.error(err))

                      if (dataforAWS) {
                        const awsreturn = await sendFilesToAws(dataforAWS).catch(err => console.error(err))
                        const [objectimageresized] = Array.isArray(awsreturn) && awsreturn.filter(s3obj => s3obj.Location.includes(encodeURIComponent(IMAGE_SIZE_MARKER)))
                        await collection.updateOne({ _id: doc._id }, { $set: { [key]: objectimageresized.Location } })
                          .catch(err => console.error(err));
                        await deletePreviousUrl(currentValue)
                          .catch(err => console.error(err))
                      }
                    }
                  }
                }
              });
            });
        });
      });
    }
  });
});





// mongoose.connection.close();


// process.exit(0)


