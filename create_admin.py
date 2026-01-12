import os
import django

# Set the settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'kce_online.settings')
django.setup()

from django.contrib.auth import get_user_model

User = get_user_model()

username = os.environ.get('ADMIN_USERNAME')
email = os.environ.get('ADMIN_EMAIL')
password = os.environ.get('ADMIN_PASSWORD')

if username and password:
    if not User.objects.filter(username=username).exists():
        print(f"Creating superuser: {username}")
        User.objects.create_superuser(
            username=username, 
            email=email, 
            password=password, 
            role="admin"
        )
    else:
        print(f"Superuser {username} already exists.")
else:
    print("Admin environment variables not set. Skipping superuser creation.")