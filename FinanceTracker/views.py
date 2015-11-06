from django.views.generic.base import TemplateView
from django.shortcuts import render_to_response

from mod_api.query import Quote


class IndexView(TemplateView):
    template_name = 'index.html'


class CompanySearchView(TemplateView):
    template_name = 'company_search.html'


def company_detail(request, company_ticker):
    context = {}
    context.update({'company': Quote.get_info(ticker_name=company_ticker)})

    return render_to_response('company_detail.html', context=context)
