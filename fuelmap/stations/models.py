from django.db import models


class FuelStation(models.Model):
    name = models.CharField(max_length=120)
    latitude = models.FloatField(help_text='Широта (Y)')
    longitude = models.FloatField(help_text='Долгота (X)')
    rating = models.DecimalField(max_digits=2, decimal_places=1, default=0)
    opening_hours = models.CharField(max_length=120, default='24/7')
    fuel_price = models.DecimalField(max_digits=10, decimal_places=2, help_text='Цена за литр')
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('-rating', 'name')

    def __str__(self) -> str:
        return self.name
