# Daily Planner

<!--ts-->
   * [Table of contents](#table-of-contents)
   * [How to run](#how-to-run)
      * [Prerequisites](#prerequisites)
      * [Run](#run)
      * [Exit](#exit)
   * [Interaction](#interaction)
      * [API](#api)
      * [Browsable API documentation](#browsable-api-documentation)
      * [Backend](#backend)
      * [Frontend](#frontend)
      * [Database](#database)
   * [Mobile](#mobile)
   * [License](#license)
<!--te-->

## How to run:
Install virtual evnivorment and activate it.
```bash
python -m venv .venv
.venv\Scripts\activate
```

Next go to daily_planner folder and instal django from requirements.txt.
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
