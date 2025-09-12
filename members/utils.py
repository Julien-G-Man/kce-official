from django.core.mail import EmailMessage, get_connection
from django.conf import settings
from django.template.loader import render_to_string 
import ssl
import certifi

def send_contact_email(name, email, phone, subject, message):
    """
    Sends a contact form submission as an email using an HTML template.
    """
    full_subject = f"KCE Website: New Message from {name}"

    # Context dictionary to pass data to the template
    context = {
        'name': name,
        'email': email,
        'phone': phone,
        'subject': subject,
        'message': message,
    }

    # Render the HTML template with the context data
    html_message = render_to_string('emails/contact_form_email.html', context)

    # Plain text version of the email for compatibility
    plain_message = (
        f"You have received a new message from your website.\n\n"
        f"Name: {name}\n"
        f"Email: {email}\n"
        f"Phone Number: {phone}\n"
        f"Subject: {subject}\n"
        f"Message:\n{message}\n"
        f"---- End of Message ----\n\n"
        f"This is an automated email. from the KCE official website"
    )
    
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
            plain_message, # Pass the plain message as the main body
            settings.DEFAULT_FROM_EMAIL,
            [settings.CONTACT_FORM_RECEIVER_EMAIL],
            connection=connection
        )
        # Attach the HTML version and set content type
        email_obj.content_subtype = "html"
        email_obj.body = html_message
        
        email_obj.send()

# Automatic response sent to person
def send_contact_response_email(name, email, message):
    """
    Sends an automated response email to the user who submitted the form.
    """
    try:
        full_subject = "Thank you for contacting Kingdom Civilization Embassy"
        
        context = {
            'name': name,
            'message': message,
        }
        
        html_message = render_to_string('emails/contact_response_email.html', context)
        plain_message = (
            f"Shalom shalom {name},\n\n"
            f"Thank you for contacting us. This is a confirmation that we have received your message. We appreciate you reaching out and will get back to you as soon as possible.\n\n"
            f"Your message was:\n{message}\n\n"
            f"If you have any urgent inquiries, please feel free to call us directly at (+233)054 630 4940. \n\n"
            f"Have a shalom day!\n"
        )
        
        ssl_context = ssl.create_default_context(cafile=certifi.where())
        
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
                plain_message,
                settings.DEFAULT_FROM_EMAIL,
                [email],
                connection=connection
            )
            email_obj.content_subtype = "html"
            email_obj.body = html_message
            email_obj.send()
            print("User response email sent successfully!")
    except Exception as e:
        print(f"Error sending user response email: {e}")        
        

def send_newsletter_welcome_email(name, email):
    try:
        full_subject = "Welcome to the KCE Family!"
        context = {'name': name}
        html_message = render_to_string('emails/newsletter_welcome.html', context)
        plain_message = (
            f"Hello {name},\n\n"
            f"Thank you for subscribing to our newsletters. We're excited to have you as part of our community and will be sharing updates about our upcoming events, sermons, and spiritual growth opportunities.\n\n"
            f"Best regards,\n"
            f"Kingdom Civilization Embassy Team"
        )
        ssl_context = ssl.create_default_context(cafile=certifi.where())
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
                plain_message,
                settings.DEFAULT_FROM_EMAIL,
                [email],
                connection=connection
            )
            email_obj.content_subtype = "html"
            email_obj.body = html_message
            email_obj.send()
    except Exception as e:
        print(f"Error sending newsletter welcome email: {e}")        