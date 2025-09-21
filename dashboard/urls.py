from django.urls import path
from . import views

app_name = "dashboard"

urlpatterns = [
   #path('/', views.admin_dashboard, name='admin_dashboard'),
   path('dashboard/', views.admin_dashboard, name='admin_dashboard'),
   path('analytics/', views.analytics, name='analytics'),
   path('users/', views.user_management, name='user_management'),
   path('settings/', views.settings, name='settings'),
   path('export/contacts/', views.export_contacts, name='export_contacts'),
   path('export/subscriptions/', views.export_subscriptions, name='export_subscriptions'),
]

