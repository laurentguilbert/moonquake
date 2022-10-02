export DJANGO_SETTINGS_MODULE="project.settings_prod"

python manage.py collectstatic --noinput

gunicorn -c gunicorn-config.py
#gunicorn project.wsgi:application --workers 4 --bind 0.0.0.0:8000
