from django.db import models

# Create your models here.
class NewsletterSubscription(models.Model):
   name = models.CharField(max_length=150)
   whatsapp = models.CharField(max_length=20)
   email = models.EmailField(unique=True)
   subscribed_at = models.DateTimeField(auto_now_add=True)

   def __str__(self):
      return f"{self.email} ({self.email})"


class ContactMessage(models.Model):
   name = models.CharField(max_length=100)
   email = models.EmailField()
   message = models.TextField()
   sent_at = models.DateTimeField(auto_now_add=True)

   def __str__(self):
      return f"Message from {self.name} ({self.email})"
