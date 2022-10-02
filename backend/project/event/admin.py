from django.contrib import admin

from event.models import DataPoint, Event

admin.site.register(Event)
admin.site.register(DataPoint)
