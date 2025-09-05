from django.shortcuts import render
from django.utils import timezone
from .models import Event, Sermon, Quote

# Create your views here.
def home(request):
   # Fetch data to display on the homepage
   latest_sermon = Sermon.objects.order_by('-date').first()
   upcoming_event = Event.objects.filter(date__gte=timezone.now()).order_by('date').first()
   random_quote = Quote.objects.order_by('?').first()

   context = {
      'latest_sermon': latest_sermon,
      'upcoming_event': upcoming_event,
      'random_quote': random_quote,
   }
   return render(request, 'core/home.html', context)

def about(request):
   return render(request, 'core/about.html')

def events(request):
   all_events = Event.objects.order_by('-date')
   return render(request, 'core/events.html', {'events': all_events})

def contact(request):
   return render(request, 'core/contact.html')

def sermons(request):
   all_sermons = Sermon.objects.order_by('-date')
   return render(request, 'core/sermons.html', {'sermons': all_sermons})

def give(request):
   return render(request, 'core/give.html')

def quotes(request):
   all_quotes = Quote.objects.all()
   return render(request, 'core/quotes.html', {'quotes': all_quotes})