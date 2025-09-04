from django.db import models
from django.utils import timezone

class SiteAnalytics(models.Model):
   page = models.CharField(max_length=200)
   views = models.PositiveIntegerField(default=0)
   last_updated = models.DateTimeField(default=timezone.now)

   def __str__(self):
      return f"{self.page} - {self.views} views"
