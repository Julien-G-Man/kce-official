from django.db import models
from django.contrib.auth.models import AbstractUser

# Option 1: Use Django’s default User model for now. No custom models needed.
# Option 2 (future): Create a custom user model by subclassing AbstractUser.

class CustomUser(AbstractUser): 
   # CustomUser class in inheritinng from the AbstractUser class
   # Add extra fields here when needed, e.g. role (admin/member/pastor)
   role = models.CharField(max_length=50, default="member")

   def __str__(self):
      return self.username
