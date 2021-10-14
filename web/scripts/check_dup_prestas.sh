python3 -m alfred.db_export.full_export test-myAlfred-V2 ~/exportAfter/
mongo test-myAlfred-V2 --eval "db.prestations.find({}, {label:1, category:1, service:1, filter_presentation:1}).forEach(function(r){print([r.label, r.service, r.filter_presentation])})" | sort > /tmp/all
item=`uniq -c /tmp/all | sort -n | grep -v " 1 " | tail -1 | cut -b 9- | cut -d ',' -f1`
uniq -c /tmp/all | sort -n | grep -v " 1 " | tail -1 
if [ "$item" != "" ]
then
  ids=`grep ";${item};" ~/exportAfter/prestations.csv | cut -d ";" -f1`
  for id in $ids
  do
    count=`grep "'${id}'" ~/exportAfter/serviceusers.csv | wc -l`
    echo $id $count
  done
else
  echo "Pas de doublons"
fi
