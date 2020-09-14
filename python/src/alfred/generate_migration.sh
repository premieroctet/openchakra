if [ "$1" == "" ]
then
  echo "Donner un titre à la migration"
  exit
fi

export PYTHONPATH=.
/Library/Frameworks/Python.framework//Versions/2.7/bin/alembic revision --autogenerate -m "$1"
