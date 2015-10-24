import requests


class MODQuery(object):
    """
    Wrapper for making calls to a stock market API called Markit On Demand(MOD)

    More information about the api here:
        http://dev.markitondemand.com/MODApis/
    """
    url = 'http://dev.markitondemand.com/Api/v2/'
    data_type = 'json'

    @classmethod
    def call(cls, parameters):
        query_type = getattr(cls, 'type')
        data_type = getattr(cls, 'data_type')

        if query_type is None:
            raise NotImplementedError('Subclasses of MODQuery must have the class attribute "type".')

        query_url = "%(base_url)s%(type)s/%(data_type)s" % {
            "base_url": cls.url,
            "type": query_type,
            "data_type": data_type,
        }
        response = requests.get(query_url, params=parameters)

        return response.json()

    @classmethod
    def get_info(cls, *args):
        raise NotImplementedError


class Lookup(MODQuery):
    type = 'Lookup'

    @classmethod
    def get_info(cls, company_name):
        return super().call({
            'input': company_name
        })


class Quote(MODQuery):
    type = 'Quote'

    @classmethod
    def get_info(cls, ticker_name):
        return super().call({
            'symbol': ticker_name
        })


class Chart(MODQuery):
    type = 'InteractiveChart'

    @classmethod
    def get_info(cls, parameters):
        # TODO add proper parameters
        return super().call({
            'input': parameters
        })
