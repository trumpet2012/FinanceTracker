from django.http import JsonResponse

from .query import Lookup, Quote
from .models import Company


def lookup_view(request, company_name):
    results_list = Lookup.get_info(company_name)
    for company in results_list:
        Company.objects.get_or_create(symbol=company.get('Symbol'), exchange=company.get('Exchange'), name=company.get('Name'))

    return JsonResponse(results_list, safe=False)


def quote_view(request, ticker_name):
    results_list = Quote.get_info(ticker_name)

    return JsonResponse(results_list, safe=False)
