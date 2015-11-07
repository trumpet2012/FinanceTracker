from datetime import datetime

from django.views.generic.base import TemplateView
from django.shortcuts import render_to_response

from mod_api.query import Quote


class IndexView(TemplateView):
    template_name = 'index.html'


class CompanySearchView(TemplateView):
    template_name = 'company_search.html'


def company_detail(request, company_ticker):
    context = {}
    from datetime import timedelta, datetime

    company_json = Quote.get_info(ticker_name=company_ticker)

    ole_date = timedelta(days=company_json.get('MSDate'))
    start_date = datetime(1899,12,31)
    company_json.update({'MSDate': start_date + ole_date})
    context.update({'company': company_json})

    return render_to_response('company_detail.html', context=context)
