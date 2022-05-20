FILE=$1

if [ "$FILE" == "" ]
then
  echo "Usage $0 <filename>"
  exit 1
fi

cat $FILE | sed -e "s/export default theme/const style=theme/" | sponge $FILE

echo "export default style" >> $FILE
