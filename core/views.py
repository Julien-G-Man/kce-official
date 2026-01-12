from django.shortcuts import render, get_object_or_404
from django.utils import timezone
from . import models
from .models import CorePage, Event, Sermon, Quote

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
   events_list = Event.objects.all()
   categories = Event.objects.order_by('category').values_list('category', flat=True).distinct().exclude(category__exact='')

   # Filtering logic
   search_query = request.GET.get('q', '')
   if search_query:
      events_list = events_list.filter(models.Q(title__icontains=search_query) | models.Q(description__icontains=search_query))

   category_query = request.GET.get('category', '')
   if category_query:
      events_list = events_list.filter(category__iexact=category_query)

   date_filter = request.GET.get('date_filter', 'upcoming')
   if date_filter == 'upcoming':
      events_list = events_list.filter(date__gte=timezone.now()).order_by('date')
   elif date_filter == 'past':
      events_list = events_list.filter(date__lt=timezone.now()).order_by('-date')

   context = {
      'events': events_list,
      'categories': categories,
   }
   return render(request, 'core/events.html', context)

def contact(request):
   return render(request, 'core/contact.html')

def sermons(request):
    live_sermon = Sermon.objects.filter(is_live=True).first()
    all_sermons = Sermon.objects.filter(is_live=False).order_by('-date')

    # Get unique preachers and series for the filter dropdowns
    speakers = Sermon.objects.order_by('preacher').values_list('preacher', flat=True).distinct()
    series = Sermon.objects.order_by('series').values_list('series', flat=True).distinct().exclude(series__isnull=True).exclude(series__exact='')

    context = {
       'live_sermon': live_sermon,
        'sermons': all_sermons,
        'speakers': speakers,
        'series_list': series,
    }
    return render(request, 'core/sermons.html', context)

def give(request):
   return render(request, 'core/give.html')

# currently using donation while on the give page 
# we will be buildind and testing integrated payments
def donation(request):
   return render(request, 'core/donation.html')

def quotes(request):
   all_quotes = Quote.objects.order_by('author', 'id')
   return render(request, 'core/quotes.html', {'quotes': all_quotes})

def core_page_detail(request, slug):
   page = get_object_or_404(CorePage, slug=slug)
   context = {'page': page}
   return render(request, 'core/core_page_detail.html', context)

def gallery(request):
   return render(request, 'core/gallery.html')

def books(request):
   return render(request, 'core/books.html')