from django.shortcuts import render, redirect
from django.contrib import messages
from django.http import JsonResponse
from .forms import NewsletterForm, ContactForm
from core.views import contact as core_contact
from .utils import send_contact_email, send_contact_response_email


def member_list(request):
   return render(request, "member_list")

def newsletter_signup(request):
   if request.method == "POST":
      form = NewsletterForm(request.POST)
      if form.is_valid():
         form.save()
         return JsonResponse({"success": True, "message": "Welcome to our family!"})
      return JsonResponse({"success": False, "errors": form.errors}, status=400)

   return JsonResponse({"success": False, "message": "Invalid request"}, status=405)

def contact_submit(request):
   if request.method == "POST":
      form = ContactForm(request.POST)
      if form.is_valid():
         # Get cleaned data
         name = form.cleaned_data['name']
         email = form.cleaned_data['email']
         phone = form.cleaned_data['phone']
         subject = form.cleaned_data['subject']
         message = form.cleaned_data['message']
         
         # Save form to database
         form.save() 
         # send email
         send_contact_email(name, email, phone, subject, message)
         
         # Send automated response to the user who filled the form
         send_contact_response_email(name, email, message)
         
         return JsonResponse({"success": True, "message": "Your message has been sent successfully! We'll be in touch soon."}, status=200)
      else:
         return JsonResponse({"success": False, "errors": form.errors}, status=400) 
      
   return JsonResponse({"success": False, "message": "Invalid request method."}, status=405)

