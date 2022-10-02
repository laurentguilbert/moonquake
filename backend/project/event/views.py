import datetime

import django_filters
import numpy as np
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ReadOnlyModelViewSet
from scipy.stats import gaussian_kde

from event.models import Event
from event.serializers import EventSerializer


class EventFilter(django_filters.FilterSet):
    class Meta:
        model = Event
        fields = {"type": ["in"], "start_date": ["gte"], "end_date": ["lte"]}


class EventViewSet(ReadOnlyModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    filterset_class = EventFilter

    @action(detail=False)
    def get_timeline_density(self, request):
        events = np.array(
            [
                e.toordinal()
                for e in Event.objects.all().values_list("start_date", flat=True)
            ]
        )
        bandwidth = 0.2
        density_kwargs = {"bw_method": bandwidth / events.std(ddof=1)}
        kde = gaussian_kde(events, **density_kwargs)
        ind = np.linspace(events.min(), events.max(), 1000)
        gkde = kde.evaluate(ind)
        return Response(
            {
                "events": [
                    {
                        "date": datetime.datetime.fromordinal(int(date)),
                        "y": value,
                    }
                    for date, value in zip(ind, gkde)
                ]
            }
        )
