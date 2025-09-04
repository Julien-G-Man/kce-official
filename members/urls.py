
from django.urls import path
from . import views

app_name = "members"

urlpatterns = [
   path("subscribe/", views.newsletter_signup, name="subscribe"),
   path("contact/", views.contact_submit, name="contact_submit"),
   path("list/", views.member_list, name="member_list"),
]

