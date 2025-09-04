from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def admin_login(request):
   return HttpResponse("Accounts: admin_login placeholder")

def logout(request):
   return HttpResponse("Accounts: logout placeholder")

def admin_register(request):
   return HttpResponse("Accounts: admin_register placeholder")

def profile(request):
   return HttpResponse("Accounts: profile placeholder")

def admin_invite(request):
   return HttpResponse("Accounts: admin_invite placeholder")


"""

def admin_invite(request):
   return render(request, 'admin_invite')

def admin_signup(request):
   return render(request, 'admin_signup')

def admin_login(request):
   return render(request, 'admin_login')

def logout(request):
   return render(request, 'logout')

def profile(request):
   return render(request, 'profile')
   
"""