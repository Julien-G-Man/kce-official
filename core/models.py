from django.db import models

# Create your models here.

class CorePage(models.Model):
   title = models.CharField(max_length=200, unique=True)
   slug = models.SlugField(max_length=200, unique=True)
   content = models.TextField()
   last_updated = models.DateTimeField(auto_now=True)
    
   def __str__(self):
      return self.title
   

class Event(models.Model):
   title = models.CharField(max_length=200)
   description = models.TextField()
   date = models.DateTimeField()
   location = models.CharField(max_length=255)

   def __str__(self):
      return self.title

class Sermon(models.Model):
   title = models.CharField(max_length=200)
   preacher = models.CharField(max_length=100)
   date = models.DateField()
   video_url = models.URLField(blank=True, null=True)

   def __str__(self):
      return f"{self.title} ({self.date})"

class Quote(models.Model):
   text = models.TextField()
   author = models.CharField(max_length=100, blank=True)

   def __str__(self):
      return self.text[:50]  # show first 50 chars in admin   