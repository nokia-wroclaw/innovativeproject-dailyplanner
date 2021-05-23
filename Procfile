release: python django_react_proj/manage.py migrate
web: gunicorn --pythonpath django_react_proj/django_react_proj.wsgi.application --preload --workers 1