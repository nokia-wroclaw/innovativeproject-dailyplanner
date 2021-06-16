# Daily Planner

<!--ts-->
   * [Table of contents](#table-of-contents)
   * [How to run](#how-to-run)
   * [About aplication](#about-aplication)
   * [Heroku deployment](#heroku-deployment)
<!--te-->

## How to run:
Install virtual evnivorment and activate it.
```bash
python -m venv .venv
.venv\Scripts\activate
```

Next go to daily_planner folder and install django from requirements.txt.
```bash
cd daily_planner
pip install -r requirements.txt
```

Run server.
```bash
python manage.py migrate
python manage.py runserver
```

Go to fontend folder, install npm and start Daily Planner!
```bash
cd frontend
npm install
npm start
```
## Heroku deployment
