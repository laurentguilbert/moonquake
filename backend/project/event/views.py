import django_filters
from rest_framework.viewsets import ReadOnlyModelViewSet

from event.models import Event
from event.serializers import EventSerializer


class EventFilter(django_filters.FilterSet):
    class Meta:
        model = Event
        fields = {"type": ["exact"], "start_date": ["gte"], "end_date": ["lte"]}


class EventViewSet(ReadOnlyModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    filterset_class = EventFilter
