
from django.urls import path
from . import views

app_name = "members"

urlpatterns = [
   path("subscribe/", views.newsletter_subscription, name="subscribe"),
   path("contact/", views.contact_submit, name="contact_submit"),
   path("list/", views.member_list, name="member_list"),
   path('contact_submit/', views.contact_submit, name='contact_submit'),
   #path("subscribe", views.subscribe, name="subscribe"),
]

