from collections import defaultdict

from rest_framework.serializers import ModelSerializer, SerializerMethodField

from event.models import Event, DataPoint


class EventSerializer(ModelSerializer):
    data_points = SerializerMethodField()

    def get_data_points(self, event):
        data_points = DataPoint.objects.filter(
            date__lte=event.end_date, date__gte=event.start_date
        )
        formatted_data_points = defaultdict(list)
        for data_point in data_points:
            formatted_data_points[data_point.site].append(
                {
                    "date": data_point.date,
                    "value": data_point.value,
                    "label": data_point.channel,
                }
            )
        return formatted_data_points

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
            "data_points",
        ]
