from django.db import models
from django.utils.text import slugify
from urllib.parse import urlparse, parse_qs

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
   category = models.CharField(max_length=100, blank=True, help_text="e.g., 'Special Service', 'Conference', 'Youth Program'")
   date = models.DateTimeField()
   location = models.CharField(max_length=255)
   image = models.ImageField(upload_to='event_images/', blank=True, null=True, help_text="Optional image for the event.")

   def __str__(self):
      return self.title   

class Sermon(models.Model):
   title = models.CharField(max_length=200)
   subtitle = models.CharField(max_length=200, blank=True, null=True)
   preacher = models.CharField(max_length=100)
   series = models.CharField(max_length=200, blank=True, null=True)
   date = models.DateField()
   highlight_url = models.URLField(blank=True, null=True) # Shirt clip in website
   video_url = models.URLField(blank=True, null=True)     # full video in YouTube
   thumbnail = models.ImageField(upload_to='sermon_thumbnails/', blank=True, null=True)

   def __str__(self):
      return f"{self.title} ({self.date})"

   @property
   def highlight_embed(self):
      """
      Convert a YouTube watch URL into an embeddable one.
      Example: https://www.youtube.com/watch?v=abc123 → https://www.youtube.com/embed/abc123
      """
      if self.highlight_url and "youtube.com" in self.highlight_url:
         url_data = urlparse(self.highlight_url)
         query = parse_qs(url_data.query)
         video_id = query.get("v")
         if video_id:
            return f"https://www.youtube.com/embed/{video_id[0]}"
      if self.highlight_url and "youtu.be" in self.highlight_url:
         video_id = self.highlight_url.split("/")[-1]
         return f"https://www.youtube.com/embed/{video_id}"
      return None

   def get_youtube_id(self):
      """Extracts the YouTube video ID from the full URL"""
      if not self.video_url:
         return None
      parsed_url = urlparse(self.video_url)
      if parsed_url.hostname in ["www.youtube.com", "youtube.com"]:
         return parse_qs(parsed_url.query).get("v", [None])[0]
      elif parsed_url.hostname == "youtu.be":
         return parsed_url.path[1:]
      return None

   def get_embed_url(self):
      """Returns the full YouTube embed URL"""
      video_id = self.get_youtube_id()
      return f"https://www.youtube.com/embed/{video_id}" if video_id else None

   @property
   def get_highlight_id(self):
      """Extracts the YouTube video ID from the highlight URL"""
      if not self.highlight_url:
         return None
      parsed_url = urlparse(self.highlight_url)
      if parsed_url.hostname in ["www.youtube.com", "youtube.com", "m.youtube.com"]:
         return parse_qs(parsed_url.query).get("v", [None])[0]
      elif parsed_url.hostname in ["youtu.be", "www.youtu.be"]:
         return parsed_url.path.strip("/")
      return None

class Quote(models.Model):
   text = models.TextField()
   author = models.CharField(max_length=100, blank=True)
   reference = models.CharField(max_length=100, blank=True, null=True)
   sermon_source = models.ForeignKey(Sermon, on_delete=models.SET_NULL, blank=True, null=True, related_name='quotes')

   def __str__(self):
      return self.text[:50]  # show first 50 chars in admin