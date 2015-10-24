from django.http import JsonResponse

from .query import Lookup, Quote


def lookup_view(request, company_name):
    results_list = Lookup.get_info(company_name)

    return JsonResponse(results_list, safe=False)


def quote_view(request, ticker_name):
    results_list = Quote.get_info(ticker_name)

    return JsonResponse(results_list, safe=False)
