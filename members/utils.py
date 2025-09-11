from django.core.mail import EmailMessage, get_connection
from django.conf import settings
import ssl
import certifi

def send_contact_email(name, email, phone, subject, message):
   """
   Sends a contact form submission as an email.
   """
   full_subject = f"New Message from KCE Website: {subject}"
   email_message = f"You have received a new message from your website contact form.\n\n"
   email_message += f"Name: {name}\n"
   email_message += f"Email: {email}\n"
   email_message += f"Phone Number: {phone}\n"
   email_message += f"Subject: {subject}\n"
   email_message += f"Message:\n{message}\n"
   
   # Create an SSL context using certifi's certificates
   ssl_context = ssl.create_default_context(cafile=certifi.where())
    
   # Use EmailMessage and get_connection to pass the SSL context
   with get_connection(
      host=settings.EMAIL_HOST,
      port=settings.EMAIL_PORT,
      username=settings.EMAIL_HOST_USER,
      password=settings.EMAIL_HOST_PASSWORD,
      use_tls=settings.EMAIL_USE_TLS,
      ssl_context=ssl_context
   ) as connection:
      email_obj = EmailMessage(
         full_subject,
         email_message,
         settings.DEFAULT_FROM_EMAIL,
         [settings.CONTACT_FORM_RECEIVER_EMAIL],
         connection=connection
      )
      email_obj.send()  
