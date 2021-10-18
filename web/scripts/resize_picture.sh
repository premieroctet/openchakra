size=$1
filename=$2

if [ "$size" == "" ] || [ "$filename" == "" ]
then
  echo "<taille> <fichier> attendus"
  exit 1
fi

if [ ! -f "$filename" ]
then 
  echo "$filename n'est pas un fichier"
  exit 1
fi

base=`basename "$filename"`
ffmpeg -y -i "$filename" -vf scale=$size:-1 "/tmp/${base}" && mv "/tmp/${base}" "$filename"
