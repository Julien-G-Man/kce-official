from django.db import models
from django.utils.text import slugify
from urllib.parse import urlparse, parse_qs

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

# Sermons -Videos in Sermons Page
class Sermon(models.Model):
   title = models.CharField(max_length=200)
   subtitle = models.CharField(max_length=200, blank=True, null=True)
   preacher = models.CharField(max_length=100)
   series = models.CharField(max_length=200, blank=True, null=True)
   date = models.DateField()
   
   highlight_url = models.URLField(blank=True, null=True)  # Short clip in website
   video_url = models.URLField(blank=True, null=True)     # full video in YouTube
   thumbnail = models.ImageField(upload_to='sermon_thumbnails/', blank=True, null=True)

   is_live = models.BooleanField(default=False)
   
   def __str__(self):
      return f"{self.title} ({self.date})"

   def save(self, *args, **kwargs):
      if self.is_live:
         # Unset any other live sermon
         Sermon.objects.filter(is_live=True).exclude(pk=self.pk).update(is_live=False)
      super().save(*args, **kwargs)
        
   @property
   def highlight_embed(self):
      """
      Convert a YouTube highlight URL (including Shorts) into an embeddable URL.
      """
      if not self.highlight_url:
         return None

      # Extract video ID from any YouTube URL type
      parsed_url = urlparse(self.highlight_url)
      video_id = None
        
      # Handle standard URLs
      if parsed_url.hostname in ["www.youtube.com", "youtube.com", "m.youtube.com"]:
         # Check for a "v" query parameter (standard video)
         query = parse_qs(parsed_url.query)
         video_id = query.get("v", [None])[0]
         if not video_id:
            # Check for a Shorts URL in the path
            path_parts = parsed_url.path.strip("/").split("/")
            if "shorts" in path_parts and len(path_parts) > path_parts.index("shorts") + 1:
               video_id = path_parts[path_parts.index("shorts") + 1]
        
      # Handle youtu.be URLs
      elif parsed_url.hostname in ["youtu.be", "www.youtu.be"]:
         video_id = parsed_url.path.strip("/")

      # Construct the embed URL if a valid video ID was found
      if video_id:
         return f"https://www.youtube.com/embed/{video_id}"
            
      return None

   def get_youtube_id(self):
       """Extracts YouTube video ID from any valid YouTube URL"""
       if not self.video_url:
           return None

       parsed_url = urlparse(self.video_url)
       hostname = parsed_url.hostname or ""

       # Standard YouTube URLs
       if hostname in ["www.youtube.com", "youtube.com", "m.youtube.com"]:
           query = parse_qs(parsed_url.query)
           video_id = query.get("v", [None])[0]

           # Handle Shorts URLs
           if not video_id:
               path_parts = parsed_url.path.strip("/").split("/")
               if "shorts" in path_parts:
                   idx = path_parts.index("shorts")
                   if len(path_parts) > idx + 1:
                       video_id = path_parts[idx + 1]

           return video_id

       # Short URLs
       if hostname in ["youtu.be", "www.youtu.be"]:
           return parsed_url.path.strip("/")

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
        
      # Extract video ID from any YouTube URL type
      parsed_url = urlparse(self.highlight_url)
      video_id = None
        
      # Handle standard URLs
      if parsed_url.hostname in ["www.youtube.com", "youtube.com", "m.youtube.com"]:
         # Check for a "v" query parameter (standard video)
         query = parse_qs(parsed_url.query)
         video_id = query.get("v", [None])[0]
         if not video_id:
            # Check for a Shorts URL in the path
            path_parts = parsed_url.path.strip("/").split("/")
            if "shorts" in path_parts and len(path_parts) > path_parts.index("shorts") + 1:
               video_id = path_parts[path_parts.index("shorts") + 1]
        
      # Handle youtu.be URLs
      elif parsed_url.hostname in ["youtu.be", "www.youtu.be"]:
         video_id = parsed_url.path.strip("/")

      return video_id
     
class Quote(models.Model):
   text = models.TextField()
   author = models.CharField(max_length=100, blank=True)
   reference = models.CharField(max_length=100, blank=True, null=True)
   sermon_source = models.ForeignKey(Sermon, on_delete=models.SET_NULL, blank=True, null=True, related_name='quotes')

   def __str__(self):
      return self.text[:50]  # show first 50 chars in admin