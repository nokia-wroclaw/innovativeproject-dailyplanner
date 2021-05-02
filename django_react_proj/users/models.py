from django.db import models

class User(models.Model):
    name = models.CharField("Name", max_length=100)
    password = models.CharField("Password", max_length=500)
    deadline = models.DateTimeField('Deadline', auto_now=False, auto_now_add=False, default='')
    deadlinev2 = models.DateTimeField('Deadlinev2', auto_now=False, auto_now_add=False, default='')
    done = models.BooleanField('Done', default=False)
    registrationDate = models.DateField("Registration Date", auto_now_add=True)
    email = models.CharField("Email", max_length= 254, null = True)


    def __str__(self):
        return self.name