from django.urls import path
from . import views

app_name = "accounts"

urlpatterns = [
   path('login/', views.admin_login, name='login'),
   path('logout/', views.logout, name='logout'),
   path('register/', views.admin_register, name='admin_register'),
   path('profile/', views.profile, name='profile'),
   path('admin-invite/', views.admin_invite, name='admin_invite'),
]
