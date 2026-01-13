from django.shortcuts import render, redirect
from django.http import HttpResponse
from members.models import ContactMessage, NewsletterSubscription
from members.views import contact_submit, newsletter_subscription
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User

def admin_dashboard(request):
   """
   Renders the main admin dashboard page.
   Retrieves and displays recent contact submissions and newsletter subscriptions.
   """
   # Fetch data from the database
   # The 'order_by'('-sent_at') fetches the latest entries first.
   contact_submission = ContactMessage.objects.all().order_by('-sent_at')[:10] 
   subscription = NewsletterSubscription.objects.all().order_by('-subscribed_at')[:10]
   
   context = {
      'contact': contact_submit,
      'subscription': newsletter_subscription,
   }
   return render(request, 'dashboard/admin_dashboard.html', context)

def analytics(request):
   return HttpResponse("Dashboard: analytics placeholder")

@login_required
def user_management(request):
   """
   Manages users from a simple, non-technical interface.
   """
   # Exclude staff and superusers from the list for simplicity
   users = User.objects.filter(is_staff=False, is_superuser=False).order_by('-date_joined')
    
   context = {
      'users': users,
      'title': 'User Management',
   }
   return render(request, 'dashboard/user_management.html', context)

def settings(request):
   return HttpResponse("Dashboard: settings placeholder")

def admin_invite(request):
   render(request, 'admin_invite.htm')
 
def export_contacts(request):
   return render(request, 'export_contacts') 
 
def export_subscriptions(request):
   return render(request, 'export_subscriptions') 
 
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