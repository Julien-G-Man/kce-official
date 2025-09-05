from django.contrib import admin
from .models import CorePage, Event, Sermon, Quote

# Register your models here.

@admin.register(CorePage)
class CorePageAdmin(admin.ModelAdmin):
   list_display = ('title', 'last_updated')
   prepopulated_fields = {'slug': ('title',)}

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
   list_display = ('title', 'category', 'location', 'date')
   list_filter = ('date', 'location', 'category')
   search_fields = ('title', 'description')

@admin.register(Sermon)
class SermonAdmin(admin.ModelAdmin):
   list_display = ('title', 'preacher', 'series', 'date')
   list_filter = ('date', 'preacher', 'series')
   search_fields = ('title', 'preacher', 'subtitle', 'series')

@admin.register(Quote)
class QuoteAdmin(admin.ModelAdmin):
   list_display = ('__str__', 'author', 'sermon_source')
   list_filter = ('author', 'sermon_source')
   search_fields = ('text', 'author')
   autocomplete_fields = ['sermon_source']