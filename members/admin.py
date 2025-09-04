from django.contrib import admin
from .models import NewsletterSubscription, ContactMessage

# Registered admins

@admin.register(NewsletterSubscription)
class NewsletterSubscriptionAdmin(admin.ModelAdmin):
   # Show likely fields in list view. Adjust fields if your model uses different names.
   list_display = ("email", "name", "whatsapp", "subscribed_at")  # comment: use these if present
   search_fields = ("email", "name", "whatsapp")
   ordering = ("-subscribed_at",)

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
   # Show key info for contact messages in admin list view
   list_display = ("name", "email", "sent_at")
   search_fields = ("name", "email", "message")
   ordering = ("-sent_at",)