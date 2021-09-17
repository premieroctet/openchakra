KEYS=`wget -q -O - --no-check-certificate https://localhost/myAlfred/api/admin/i18n-keys`
echo "Recherche de `echo $KEYS | wc -w` clés"
for key in $KEYS
do
  #echo "Recherche de ${key}"
  ack "$key"| grep -v "translations/fr" > /dev/null
  if [ "$?" -ne "0" ]
  then 
    echo "******** ${key} introuvable"
  fi
done
