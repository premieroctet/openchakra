IMPORT="import ReactHtmlParser from 'react-html-parser'"

KEYS=`wget --no-check-certificate -O - https://localhost/myAlfred/api/admin/i18n-keys`

if true # Passer à false Pour lancer uniquement le test des motifs non remplacés
then
# Remplacement dans les sources
for key in $KEYS
do
 echo "Recherche de $key"
 files=`ack -l "[^']${key}[^_]" pages/ components/ hoc/`
 for f in $files
 do
   echo "Replacing ${key} in ${f}"
   grep "$IMPORT" $f > /dev/null
   if [ "$?" -ne "0" ]
   then
     echo $IMPORT > /tmp/tempo
   fi
   sed -e "s/\([^']\)${key}\([^_a-zA-Z]\)/\1ReactHtmlParser(this.props.t('${key}'))\2/" $f >> /tmp/tempo
   mv /tmp/tempo $f
 done
done
fi

# Vérification
echo "Recherche des clés I18N non remplacées"
for key in $KEYS
do
 #echo "Recherche de $key non remplacé"
 ack ${key} pages/ components/ hoc/ | grep -v "t('" > /tmp/result
 if [ "$?" -eq "0" ]
 then
   echo "Motif ${key} à remplacer manuellement dans " `cat /tmp/result`
 fi
done

