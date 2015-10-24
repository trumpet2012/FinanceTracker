from django.views.generic.base import TemplateView


class IndexView(TemplateView):
    template_name = 'index.html'


class CompanySearchView(TemplateView):
    template_name = 'company_search.html'
