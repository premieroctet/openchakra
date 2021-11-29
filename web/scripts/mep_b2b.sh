database="$1"

if [ "$database" == "" ]
then
  echo "Usage: $0 database_name"
  exit 1
fi

# Bookings : fees => customer_fee & provider_fee
mongo $database --eval 'db.bookings.find({fees: {$exists: true}}).forEach(function(b){ b.customer_fee=b.fees; b.provider_fee=0; db.bookings.save(b)})'
mongo $database --eval 'db.bookings.update({fees: {$exists: true}}, {$unset: {fees:1}}, {multi:1})'

# Service : remove travel_expense, picking_expense && travel_tax (becomes virtual)
mongo $database --eval 'db.services.update({}, {$unset: {travel_expense: 1, picking_expense: 1, travel_tax:1}}, {multi:1})'

# ServiceUser : remove graduated && is_certified (becomes virtual)
mongo $database --eval 'db.serviceusers.update({}, {$unset: {graduated: 1, is_certified: 1}}, {multi:1})'
mongo $database --eval 'db.serviceusers.update({"diploma.name": "null"}, {$set: {diploma: null}}, {multi:1})'
mongo $database --eval 'db.serviceusers.update({"certification.name": "null"}, {$set: {certification: null}}, {multi:1})'

# Remove unused models
mongo $database --eval 'db.calculatings.drop()'
mongo $database --eval 'db.calendars.drop()'
mongo $database --eval 'db.favoris.drop()'
mongo $database --eval 'db.bookings.update({}, {$unset: {option: 1}}, {multi:1})'
mongo $database --eval 'db.options.drop()'
mongo $database --eval 'db.shopbanners.drop()'
mongo $database --eval 'db.categories.update({}, {$unset: {tags: 1}}, {multi:1})'
mongo $database --eval 'db.services.update({}, {$unset: {tags: 1}}, {multi:1})'
mongo $database --eval 'db.prestations.update({}, {$unset: {tags: 1}}, {multi:1})'
mongo $database --eval 'db.tags.drop()'

# Added bookings.reason
mongo $database --eval 'db.bookings.update({}, {$set: {reason: null}}, {multi:1})'
