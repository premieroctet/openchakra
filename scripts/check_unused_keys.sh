for key in `wget -q -O - --no-check-certificate https://localhost/myAlfred/api/admin/i18n-keys`
do
  echo "Recherche de ${key}"
  ack "$key" | grep -v "trsnlations/fr" > /dev/null
  if [ "$?" -ne "0" ]
  then 
    echo "******** ${key} introuvable"
  fi
done
