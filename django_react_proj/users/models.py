from django.db import models

class User(models.Model):
    name = models.CharField("Name", max_length=100)
    password = models.CharField("Password", max_length=500)
    deadline = models.DateTimeField('Deadline', auto_now=False, auto_now_add=False, default='2021-11-04 20:25')
    done = models.BooleanField('Done', default=False)
    registrationDate = models.DateField("Registration Date", auto_now_add=True)


    def __str__(self):
        return self.name