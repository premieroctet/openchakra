database="$1"

if [ "$database" == "" ]
then
  echo "Usage: $0 database_name"
  exit 1
fi

mongo $database --eval 'db.bookings.updateMany({}, [{$set: { client_fees: "$fees"}}])'
mongo $database --eval 'db.bookings.updateMany({}, {$unset: { fees: 1}})'
