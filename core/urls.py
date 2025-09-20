from django.urls import path
from . import views

app_name = 'core'

urlpatterns = [
   path('', views.home, name='home'),
   path('about/', views.about, name='about'),
   path('events/', views.events, name='events'),
   path('contact/', views.contact, name='contact'),
   path('sermons/', views.sermons, name='sermons'),
   path('give/', views.give, name='give'),
   path('donation/', views.donation, name='donation'),
   path('quotes/', views.quotes, name='quotes'),
   path('gallery/', views.gallery, name='gallery'),
   path('books/', views.books, name='books'),
   path('<slug:slug>/', views.core_page_detail, name='core_page_detail'), # Must be last
]