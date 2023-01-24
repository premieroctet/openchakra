DB_NAMES=`mongo --eval "db.adminCommand({listDatabases:1})" | grep name | grep test[0-9] | cut -d '"' -f4`

echo "Removing ${DB_NAMES}"

for db in $DB_NAMES
do 
  mongo $db --eval "db.dropDatabase()"
done
