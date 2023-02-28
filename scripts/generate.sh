PROJECT_NAME=$1
PORT=$2

if [ "$PROJECT_NAME" == "" ] || [ "$PORT" == "" ]
then
  echo "Usage: $0 <project_name>"
  exit 1
fi
echo $PROJECT_NAME

STUDIO_PORT=$((PORT))
STUDIO_TEST_PORT=$((PORT+1))
BACKEND_PORT=$((PORT+2))

echo "Studio:${STUDIO_PORT}, prod:${STUDIO_TEST_PORT}, backend:${BACKEND_PORT}"

PROJECT_DIRECTORY=~/workspace/$PROJECT_NAME
git clone https://github.com/rpasquiou/openchakra.git $PROJECT_DIRECTORY
cd $PROJECT_DIRECTORY
git checkout master
git checkout -b $PROJECT_NAME

(cd studio &&
  echo '{\n"projectName": "studio-test"' > env.json &&
  echo "\"targetDomain\": \"https://my-alfred.io:${BACKEND_PORT}\"\n}" >> env.json &&
  echo "Installing studio modules" && yarn
)

(cd studio-test &&
  echo "PORT=${STUDIO_TEST_PORT}" > .env  &&
  sed -i -e "s|\"proxy\":.*$|\"proxy\": \"https://localhost:$BACKEND_PORT\",|" package.json &&
  echo "Installing production modules" && yarn
)

(cd backend/web &&
  ( echo "const MODE=\"validation\"" > mode.js ) &&
  ( echo "const PORT=${BACKEND_PORT}" >> mode.js ) &&
  ( echo "const PRODUCTION_PORT=${STUDIO_TEST_PORT}" >> mode.js ) &&
  ( echo "const DATA_MODEL=\"${PROJECT_NAME}\"" >> mode.js ) &&
  ( echo "const DATABASE_NAME=\"${PROJECT_NAME}\"" >> mode.js ) &&
  ( echo "const SITE_MODE=\"marketplace\"" >> mode.js ) &&
  ( echo "const PRODUCTION_ROOT=\"${PROJECT_DIRECTORY}\"" >> mode.js ) &&
  ( echo "const SIB_APIKEY=\"dummy\"" >> mode.js ) &&
  ( echo "module.exports={MODE, PORT, PRODUCTION_PORT, DATA_MODEL, DATABASE_NAME, SITE_MODE, PRODUCTION_ROOT, SIB_APIKEY}" >> mode.js ) &&
  mkdir -p server/plugins/${PROJECT_NAME}/schemas
  touch server/plugins/${PROJECT_NAME}/consts.js
  touch server/plugins/${PROJECT_NAME}/functions.js
  touch server/plugins/${PROJECT_NAME}/actions.js
  echo "Installing backend modules" && yarn
)
