from django.contrib import admin
from .models import CorePage, Event, Sermon, Quote

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
   
   def save_model(self, request, obj, form, change):
      if obj.is_live:
         Sermon.objects.filter(is_live=True).exclude(pk=obj.pk).update(is_live=True)
      super().save_model(request, obj, form, change)   

@admin.register(Quote)
class QuoteAdmin(admin.ModelAdmin):
   list_display = ('__str__', 'author', 'sermon_source')
   list_filter = ('author', 'sermon_source')
   search_fields = ('text', 'author')
   autocomplete_fields = ['sermon_source']