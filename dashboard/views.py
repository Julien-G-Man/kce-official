from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.


def admin_dashboard(request):
   return HttpResponse("Dashboard: admin_dashboard placeholder")

def analytics(request):
   return HttpResponse("Dashboard: analytics placeholder")

def user_management(request):
   return HttpResponse("Dashboard: user_management placeholder")

def settings(request):
   return HttpResponse("Dashboard: settings placeholder")
 
 
"""

def admin_dashboard(request):
   return render(request, 'admin_dashboard.html')

def analytics(request):
   return render(request, 'analytics.html')

def user_management(request):
   return(request, 'user_management.html')

def settings(request):
   return render(request, 'settings.html')

"""