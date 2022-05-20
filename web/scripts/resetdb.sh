DBNAME=$1

if [ "$DBNAME" == "" ]
then
  echo "usage: $0 <database_name>"
  exit 1
fi

ssh -i ~/.ssh/ALFRED-AWS.pem  ec2-user@my-alfred.io "rm -rf ~/dump"
ssh -i ~/.ssh/ALFRED-AWS.pem  ec2-user@my-alfred.io "mongodump --db=${DBNAME}"
cd 
rm -rf dump
scp -r -i ~/.ssh/ALFRED-AWS.pem ec2-user@my-alfred.io:~/dump .
mongorestore --drop
