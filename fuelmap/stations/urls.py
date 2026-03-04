from django.urls import path

from .views import index, stations_api

urlpatterns = [
    path('', index, name='index'),
    path('api/stations/', stations_api, name='stations_api'),
]
