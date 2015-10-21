import requests


class MODQuery(object):
    """
    Wrapper for making calls to a stock market API called Markit On Demand(MOD)

    More information about the api here:
        http://dev.markitondemand.com/MODApis/
    """
    url = 'http://dev.markitondemand.com/Api/v2/'
    data_type = 'json'

    def call(self, parameters):
        query_type = getattr(self, 'type')
        data_type = getattr(self, 'data_type')

        if query_type is None:
            raise NotImplementedError('Subclasses of MODQuery must have the class attribute "type".')

        query_url = "%(base_url)s%(type)s/%(data_type)s" % {
            "base_url": self.url,
            "type": query_type,
            "data_type": data_type,
        }
        response = requests.get(query_url, params=parameters)

        return response.json()


class Lookup(MODQuery):
    type = 'Lookup'


class Quote(MODQuery):
    type = 'Quote'


class Chart(MODQuery):
    type = 'InteractiveChart'
