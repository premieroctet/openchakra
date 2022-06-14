F=$1

echo $F
grep "ligible.*span" $F | cut -d '<' -f1
grep "<h1>" $F | cut -d '>' -f2 | cut -d '<' -f1
echo
grep item-heures $F | sed -e "s/^.*item-heures\">//" | cut -d '<' -f1
grep item-jours $F | sed -e "s/^.*item-jours\">//" | cut -d '<' -f1
