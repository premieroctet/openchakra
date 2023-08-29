import 'dotenv/config'
import AWS from 'aws-sdk';
import { promises as fs } from "fs";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

AWS.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_S3_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET,
  region: 'eu-west-3',
});

const s3 = new AWS.S3();

const sourceBucket = `${process.env.NEXT_PUBLIC_S3_BUCKET}`;
const destinationBucket = `${process.env.NEXT_PUBLIC_S3_BUCKET}`;
const sourceFolder = 'all-inclusive';
const destinationFolder = 'all-inclusive/studio';
const jsonFileToScan = `${__dirname}/components - 2023-07-21T161800.724.json`


let s3images = []

function findImages(data, parentKey = null) {
  if (Array.isArray(data)) {
    data.forEach(item => findImages(item, parentKey));
  } else if (typeof data === 'object' && data !== null) {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const value = data[key];
        const currentKey = parentKey ? `${parentKey}.${key}` : key;

        if (typeof value === 'string' && (value.endsWith('.jpg') || value.endsWith('.png') || value.endsWith('.gif'))) {
          s3images = [...s3images, value]
        } else {
          findImages(value, currentKey);
        }
      }
    }
  }
  return s3images
}

async function scanS3ImagesInJSONFile () {

  let s3files = []
  
  const jasonFile = await fs.readFile(jsonFileToScan, 'utf8', async(err, data) => {
    if (err) {
      console.error('Erreur lors de la lecture du fichier JSON :', err);
      return;
    }
    
    return data
  });

  try {
      console.log('On essaie de parser')
      const jsonData = JSON.parse(jasonFile);
      s3files = findImages(jsonData);
    } catch (err) {
      console.error('Erreur lors de l\'analyse du fichier JSON :', err);
    }


  return s3files
}

async function setImages () {

  const filesToMove = await scanS3ImagesInJSONFile()
    .then(res => {
      return new Set(res)
    })

  const imagesSet = Array.from(filesToMove).map(e => {
    return e.split('/').pop()
  })

  imagesSet.forEach((file) => {
    const filenameUri = file.toLowerCase()
    .replace(/ /gi, '-')
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    const fileKey = `${sourceFolder}/${encodeURI(file)}`;
    const destinationKey = `${destinationFolder}/${filenameUri}`;

    const params = {
      Bucket: destinationBucket,
      CopySource: `/${sourceBucket}/${fileKey}`,
      Key: destinationKey,
    };

    console.log(params)

    s3.copyObject(params, (err) => {
      if (err) {
        console.error('Erreur lors de la copie du fichier', file, ':', err);
      } else {
        console.log('Fichier copié avec succès :', file);
      }
    });
  });

  
}


setImages()


