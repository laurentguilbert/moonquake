from rest_framework.viewsets import ReadOnlyModelViewSet

from event.models import Event
from event.serializers import EventSerializer


class EventViewSet(ReadOnlyModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
