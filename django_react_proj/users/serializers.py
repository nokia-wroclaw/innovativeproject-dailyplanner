from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'taskName', 'taskDescription', 'startTime','endTime', 'done', 'taskType','registrationDate', 'email')
