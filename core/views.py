from django.shortcuts import render

# Create your views here.
def home(request):
   return render(request, 'core/home.html')

def about(request):
   return render(request, 'core/about.html')

def events(request):
   return render(request, 'core/events.html')

def contact(request):
   return render(request, 'core/contact.html')

def sermons(request):
   return render(request, 'core/sermons.html')

def give(request):
   return render(request, 'core/give.html')

def quotes(request):
   return render(request, 'core/quotes.html')