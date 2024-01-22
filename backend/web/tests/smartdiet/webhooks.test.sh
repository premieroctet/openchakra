curl -i -k -X POST \
  https://localhost/myAlfred/api/smartdiet/coaching \
  -H 'Content-Type: application/json' \
  -d '{
    "patient_email": "sebastien.auvray@wappizy.com",
    "diet_email": "annelaure.meunier75@gmail.com",
    "coaching_date": "2019-09-18 14:00:00",
    "assessment": true
  }'

