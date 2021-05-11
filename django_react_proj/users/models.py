from django.db import models

class User(models.Model):
    taskName = models.CharField("TaskName", max_length=100, default='')
    taskDescription = models.CharField("TaskDescription", max_length=500, default='')
    startTime = models.DateTimeField('StartTime', auto_now=False, auto_now_add=False, default='')
    endTime = models.DateTimeField('EndTime', auto_now=False, auto_now_add=False, default='')
    done = models.BooleanField('Done', default=False)
    taskType = models.CharField('Done', max_length=100, default='Meeting')
    registrationDate = models.DateField("Registration Date", auto_now_add=True)
    email = models.CharField("Email", max_length= 254, null = True)

    def __str__(self):
        return self.name