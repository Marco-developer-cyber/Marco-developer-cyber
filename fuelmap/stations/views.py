from django.http import JsonResponse
from django.shortcuts import render

from .models import FuelStation


def index(request):
    return render(request, 'stations/index.html')


def stations_api(request):
    stations = FuelStation.objects.filter(is_active=True).values(
        'id', 'name', 'latitude', 'longitude', 'rating', 'opening_hours', 'fuel_price', 'description'
    )
    return JsonResponse({'stations': list(stations)})
