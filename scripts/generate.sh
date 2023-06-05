PROJECT_NAME=$1
PORT=$2

if [ "$PROJECT_NAME" == "" ] || [ "$PORT" == "" ]
then
  echo "Usage: $0 <project_name>"
  exit 1
fi
echo $PROJECT_NAME


SCRIPT=$(realpath "$0")
SCRIPTPATH=$(dirname "$SCRIPT")

STUDIO_PORT=$((PORT))
STUDIO_TEST_PORT=$((PORT+1))
BACKEND_PORT=$((PORT+2))

echo "Studio:${STUDIO_PORT}, prod:${STUDIO_TEST_PORT}, backend:${BACKEND_PORT}"

PROJECT_DIRECTORY=~/studio-$PROJECT_NAME-demo
git clone https://github.com/rpasquiou/openchakra.git $PROJECT_DIRECTORY
cd $PROJECT_DIRECTORY
git checkout master
git checkout -b $PROJECT_NAME

(cd studio &&
  echo -e "{\n\"projectName\": \"studio-test\"," > env.json &&
  echo -e "\"targetDomain\": \"https://my-alfred.io:${BACKEND_PORT}\"\n}" >> env.json &&

  echo -e "EXT_PUBLIC_VERSION=1" > .env
  echo -e "NEXT_PUBLIC_BUGSNAG_API_KEY=18bc83982a86e6477448b6bc16c0c18e" >> .env
  echo -e "NEXT_PUBLIC_S3_ID=<S3_ID>" >> .env
  echo -e "NEXT_PUBLIC_S3_SECRET=<S3_SECRET>" >> .env
  echo -e "NEXT_PUBLIC_S3_ROOTPATH=${PROJECT_NAME}" >> .env
  echo -e "NEXT_PUBLIC_PROJECT=${PROJECT_NAME}" >> .env

  echo "Installing studio modules" && yarn
)

(cd studio-test &&
  echo "PORT=${STUDIO_TEST_PORT}" > .env  &&
  sed -i -e "s|\"proxy\":.*$|\"proxy\": \"https://localhost:$BACKEND_PORT\",|" package.json &&
  echo "Installing production modules" && yarn
)

(cd backend/web &&
  ( echo "const HOSTNAME=\"my-alfred.io\"" > mode.js ) &&
  ( echo "const MODE=\"validation\"" >> mode.js ) &&
  ( echo "const PORT=${BACKEND_PORT}" >> mode.js ) &&
  ( echo "const PRODUCTION_PORT=${STUDIO_TEST_PORT}" >> mode.js ) &&
  ( echo "const DATA_MODEL=\"${PROJECT_NAME}\"" >> mode.js ) &&
  ( echo "const DATABASE_NAME=\"${PROJECT_NAME}\"" >> mode.js ) &&
  ( echo "const SITE_MODE=\"marketplace\"" >> mode.js ) &&
  ( echo "const PRODUCTION_ROOT=\"${PROJECT_DIRECTORY}\"" >> mode.js ) &&
  ( echo "const SIB_APIKEY=\"dummy\"" >> mode.js ) &&
  ( echo "module.exports={HOSTNAME, MODE, PORT, PRODUCTION_PORT, DATA_MODEL, DATABASE_NAME, SITE_MODE, PRODUCTION_ROOT, SIB_APIKEY}" >> mode.js ) &&
  mkdir -p server/plugins/${PROJECT_NAME}/schemas
  touch server/plugins/${PROJECT_NAME}/consts.js
  touch server/plugins/${PROJECT_NAME}/functions.js
  touch server/plugins/${PROJECT_NAME}/actions.js
  echo "Installing backend modules" && yarn
)

echo "************************************************************************************************"
echo " Le projet ${PROJECT_NAME} a été généré sous ${PROJECT_DIRECTORY}"
echo "************************************************************************************************"

echo "Ajoutez le bloc suivant à la configuration nginx:"
echo "************************************************************************************************"
cat "$SCRIPTPATH/nginxfragment.txt" | 
	sed -e "s/{PROJECT_NAME}/${PROJECT_NAME}/g" | 
	sed -e "s/{STUDIO_TEST_PORT}/${STUDIO_TEST_PORT}/g" | 
	sed -e "s/{BACKEND_PORT}/${BACKEND_PORT}/g" 


echo "************************************************************************************************"
echo -e "Ajoutez l'entrée suivante dans votre DNS:\n${PROJECT_NAME} IN CNAME my-alfred.io."
echo "************************************************************************************************"

echo "************************************************************************************************"
echo -e "Dans le fichier ${PROJECT_DIRECTORY}/studio/.env\nmettez à jour les entrées NEXT_PUBLIC_S3_ID et NEXT_PUBLIC_S3_SECRET"
echo "************************************************************************************************"
