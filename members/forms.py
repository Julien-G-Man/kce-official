from django import forms
from .models import NewsletterSubscription, ContactMessage

class NewsletterForm(forms.ModelForm):
   class Meta:
      model = NewsletterSubscription
      fields = ['name', 'whatsapp', 'email']


class ContactForm(forms.ModelForm):
   class Meta:
      model = ContactMessage
      fields = ['name', 'email', 'phone', 'subject', 'message']
