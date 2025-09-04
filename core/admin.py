from django.contrib import admin
from .models import CorePage

# Register your models here.

@admin.register(CorePage)
class CorePageAdmin(admin.ModelAdmin):
   list_display = ('title', 'last_updated')
   prepopulated_fields = {'slug': ('title',)}