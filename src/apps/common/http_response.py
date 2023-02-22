from ast import Dict
from json import JSONEncoder
from typing import Any, Optional, Type
from django.http import JsonResponse


class RestJsonResponseTemplate(JsonResponse):
    """ 
    Return json response with template:
    {
        "status": enum("success", "fail", "error"),
        "data": array or single object from api,
        "message": message for error and fail,
        "redirect_uri": tell client to redirect to this uri
    }
    """

    SUCCESS = 'success'
    FAIL = 'fail'
    ERROR = 'error'

    def __init__(self, status, data=[], message: str = '', redirect_uri: str = '', encoder: Type[JSONEncoder] = ..., safe: bool = ..., json_dumps_params: Optional[Dict[str, Any]] = ..., **kwargs: Any) -> None:
        data = {
            "status": status,
            "data": data,
            "message": message,
            "redirect_uri": redirect_uri,
        }
        super().__init__(data, encoder, safe, json_dumps_params, **kwargs)
