ssh -i ~/.ssh/ALFRED-AWS.pem  ec2-user@my-alfred.io "rm -rf ~/dump"
ssh -i ~/.ssh/ALFRED-AWS.pem  ec2-user@my-alfred.io "mongodump"
cd 
rm -rf dump
scp -r -i ~/.ssh/ALFRED-AWS.pem ec2-user@my-alfred.io:~/dump .
mongorestore --drop
