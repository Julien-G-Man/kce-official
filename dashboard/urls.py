from django.urls import path
from . import views

app_name = "dashboard"

urlpatterns = [
   path('', views.admin_dashboard, name='admin_dashboard'),
   path('analytics/', views.analytics, name='analytics'),
   path('users/', views.user_management, name='user_management'),
   path('settings/', views.settings, name='settings'),
]

