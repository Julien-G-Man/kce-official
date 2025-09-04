from django.shortcuts import render, redirect
from django.contrib import messages
from django.http import JsonResponse
from .forms import NewsletterForm, ContactForm


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
         form.save()
         messages.success(request, "Your message has been sent!")
         return redirect("core:contact")
   return redirect("core:contact")
