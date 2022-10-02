export DJANGO_SETTINGS_MODULE="project.settings_prod"

python manage.py collectstatic --noinput
python manage.py migrate

gunicorn -c gunicorn-config.py
