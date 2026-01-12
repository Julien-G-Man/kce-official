from django.db import models
from django.contrib.auth.models import AbstractUser

# Option 1: Use Django’s default User model for now. No custom models needed.
# Option 2 (future): Create a custom user model by subclassing AbstractUser.

class CustomUser(AbstractUser): 
   pass
