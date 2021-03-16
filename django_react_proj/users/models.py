from django.db import models

class User(models.Model):
    name = models.CharField("Name", max_length=100)
    password = models.CharField("Password", max_length=240)
    registrationDate = models.DateField("Registration Date", auto_now_add=True)


    def __str__(self):
        return self.name