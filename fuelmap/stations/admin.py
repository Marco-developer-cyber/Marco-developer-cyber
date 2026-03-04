from django.contrib import admin

from .models import FuelStation


@admin.register(FuelStation)
class FuelStationAdmin(admin.ModelAdmin):
    list_display = ('name', 'rating', 'fuel_price', 'opening_hours', 'is_active')
    list_filter = ('is_active',)
    search_fields = ('name', 'description')
    fieldsets = (
        ('Основная информация', {'fields': ('name', 'description', 'is_active')}),
        ('Координаты', {'fields': ('latitude', 'longitude')}),
        ('Детали', {'fields': ('rating', 'opening_hours', 'fuel_price')}),
    )
