from django.urls import path
from . import views

app_name = "core"

urlpatterns = [
   path('', views.home, name='home'),
   path('about/', views.about, name='about'),
   path('contact/', views.contact, name='contact'),
   path('events/', views.events, name='events'),
   path('sermons/', views.sermons, name='sermons'),
   path('give/', views.give, name='give'),
   path('quotes/', views.quotes, name='quotes'),
]
