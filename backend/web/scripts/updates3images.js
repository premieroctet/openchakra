const path=require('path')
const {fs} = require('fs/promises')
const myEnv = require('dotenv').config({path: path.resolve(__dirname, '../../../.env')})
const dotenvExpand = require('dotenv-expand')
dotenvExpand.expand(myEnv)
const mongoose = require('mongoose')

const url = `mongodb://localhost:27017/${process.env.DATABASE_NAME}`;

mongoose.connect(url, { useNewUrlParser: true });

function generateImageSet(currenturl) {
  console.log(currenturl)
  return 'https://awsurl_' + Math.random().toString(36).substring(7);
}

// Récupération de la liste de toutes les collections
mongoose.connection.db.collections(async (err, collections) => {
  if (err) throw err;

  for (let i = 0; i < collections.length; i++) {
    const collection = collections[i];
    const modelName = collection.collectionName.charAt(0).toUpperCase() + collection.collectionName.slice(1);

    try {
      // Définition du schéma pour cette collection
      const schema = new mongoose.Schema({}, { strict: false, collection: collection.collectionName });

      // Création du modèle
      const Model = mongoose.model(modelName, schema);

      // Récupération de tous les documents dans la collection
      const documents = await Model.find({});

      // Parcours des documents
      for (let j = 0; j < documents.length; j++) {
        const document = documents[j];

        // Parcours des champs
        for (const key in document.toObject()) {
          if (document[key].contains('amazonaws.com/')) {
            const urlimageresized = await generateImageSet(document[key]);

            // Mise à jour du champ
            //await Model.updateOne({ _id: document._id }, { $set: { [key]: urlimageresized } });
          }
        }
      }
    } catch (error) {
      console.error(`Erreur lors du traitement de la collection ${collection.collectionName}: ${error}`);
    }
  }

  mongoose.connection.close();
});




console.log('Let start this shit')

process.exit(0)


