from rest_framework.serializers import ModelSerializer, FloatField

from event.models import Event


class EventSerializer(ModelSerializer):
    data_avg = FloatField()
    class Meta:
        model = Event
        fields = "__all__"
