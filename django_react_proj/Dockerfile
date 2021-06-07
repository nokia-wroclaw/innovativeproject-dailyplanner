FROM python:3

WORKDIR /app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV PORT 80

CMD [ "sh",  "-c", "python ./manage.py migrate && python ./manage.py runserver 0.0.0.0:$PORT" ]
