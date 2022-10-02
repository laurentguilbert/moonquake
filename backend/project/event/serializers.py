from rest_framework.serializers import ModelSerializer

from event.models import Event


class EventSerializer(ModelSerializer):
    class Meta:
        model = Event
        fields = [
            "id",
            "start_date",
            "end_date",
            "type",
            "grade",
            "data_1",
            "data_2",
            "data_3",
            "data_4",
        ]
