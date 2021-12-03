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

# Add attribute bookings.reason
mongo $database --eval 'db.bookings.update({reason: {$exists: false}}, {$set: {reason: null}}, {multi:1})'

#Update attribute bookings end_time => end_date && time_prestation => prestation_date
mongo $database --eval 'db.bookings.find({end_time: {$exists: true}).forEach(function(b){const [hour, minute]= b.end_time.split(':'); b.end_date = b.end_date.set('hour', hour).set('minute', minute); db.bookings.save(b)})'
mongo $database --eval 'db.bookings.find({time_prestation: {$exists: true}).forEach(function(b){const [day, month, year]= b.end_time.split('/');b.time_prestation = b.date_prestation.set('day', day).set('month', month).set('year', year);db.bookings.save(b)})'

# Rename time_prestation => prestation_date
mongo $database --eval 'db.bookings.update({time_prestation: {$exists: true}, {$rename: {time_prestation: prestation_date}}'