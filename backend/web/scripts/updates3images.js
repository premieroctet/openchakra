const path=require('path')
const myEnv = require('dotenv').config({path: path.resolve(__dirname, '../../../.env')})
const dotenvExpand = require('dotenv-expand')
dotenvExpand.expand(myEnv)
const sharp = require('sharp')
const {fs} = require('fs/promises')
const mongoose = require('mongoose')
const {sanitizeFilename, generateUUID} = require('../utils/functions')
const {IMAGES_WIDTHS_FOR_RESIZE, IMAGE_SIZE_MARKER, THUMBNAILS_DIR} = require('../utils/consts')
const {IMAGE_SETTINGS, IMAGE_SIZE_SEPARATOR, switchbuffer} = require('../server/middlewares/resizeImage')

const rootPath = process.env?.S3_PROD_ROOTPATH

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
    const buffer = await switchbuffer(bufferfromaws)
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

    console.log(dataForAWS)

  }
  
}

const generateFilename = (originalurl)  => {
  const urldecoded = decodeURIComponent(originalurl)
  const [filename] = urldecoded.match(/[^/]*$/)
  const withUUID = /^[a-fA-F\d]{8}\b-[a-fA-F\d]{4}\b-[a-fA-F\d]{4}\b-[a-fA-F\d]{4}\b-[a-fA-F\d]{12}/.test(filename)
  return withUUID ? sanitizeFilename(filename) : `${generateUUID()}_${sanitizeFilename(filename)}`
}



const url = `mongodb://localhost:27017/${process.env.DATABASE_NAME}`;

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on('open', function () {
  mongoose.connection.db.listCollections().toArray(function (err, names) {
    if (err) {
      console.error(err);
    } else {
      
      names.forEach(function(e,i,a) {
        mongoose.connection.db.collection(e.name, function(err, collection) {
          
          if (e.name === 'users') {
            
            collection.find().toArray(function(err, data) {
            
              data.forEach(async function(doc) {
                
                if (doc['email'] === 'hello+ti@wappizy.com') {

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
                      const futureimage = generateImageSet(currentValue, futurefilename)
                      
                      
                    }
                  }
  
                    
                  // await collection.updateOne({ _id: document._id }, { $set: { [key]: urlimageresized } });
                  
                }
               }
              });
            });
          }


        });
      });
    }
  });
});





// mongoose.connection.close();


// process.exit(0)


