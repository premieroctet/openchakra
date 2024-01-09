cat smart_consultation.csv.org | 
 sed -e 's:\\"::g' |
 sed -e 's:\\\\::g' |
 sponge smart_consultation.csv
