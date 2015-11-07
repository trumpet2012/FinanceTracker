from django.conf.urls import url

from .views import lookup_view, quote_view

urlpatterns = [
    url(r'^lookup/(.+)/', lookup_view, name='lookup'),
    url(r'^quote/(.+)/', quote_view, name='quote'),
]
