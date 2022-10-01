from django.db import models


class Event(models.Model):
    class Type(models.TextChoices):
        CLASSIFIED_DEEP_MOONQUAKE = "A"
        UNCLASSIFIED_DEEP_MOONQUAKE = "M"
        METEOROID_IMPACT = "C"
        SHALLOW_MOONQUAKE = "H"
        MOSTLY_SHORT_PERIOD_EVENT = "Z"
        LM_IMPACT = "L"
        S_IVB = "S"

    class Grade(models.TextChoices):
        HIGH = "A"
        MEDIUM = "B"
        LOW = "C"

    class Quality(models.IntegerChoices):
        NO_DATA = 1
        NOISY_DATA = 2
        MASKED_BY_ANOTER_EVENT = 3
        COMPRESSED_PLOT_IS_CLIPPED = 4
        SEE_COMMENTS = 5
        COMPUTER_GENERATED_TIME = 6

    start_date = models.DateTimeField()
    end_date = models.DateTimeField()

    type = models.TextField(choices=Type.choices, max_length=1, blank=True, null=True)
    grade = models.TextField(choices=Grade.choices, max_length=1, blank=True, null=True)

    data_1 = models.FloatField(blank=True, null=True)
    data_2 = models.FloatField(blank=True, null=True)
    data_3 = models.FloatField(blank=True, null=True)
    data_4 = models.FloatField(blank=True, null=True)

    data_quality_1 = models.IntegerField(choices=Quality.choices, blank=True, null=True)
    data_quality_2 = models.IntegerField(choices=Quality.choices, blank=True, null=True)
    data_quality_3 = models.IntegerField(choices=Quality.choices, blank=True, null=True)
    data_quality_4 = models.IntegerField(choices=Quality.choices, blank=True, null=True)

    comments = models.CharField(max_length=150, blank=True, null=True)
    cluster_number = models.IntegerField(blank=True, null=True)
