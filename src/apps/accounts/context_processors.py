from django.http import HttpRequest
from .forms import RegistrationForm


def inject_auth_forms(request: HttpRequest):
    # if not request.user.is_authenticated:
        signup_form = RegistrationForm()
        return {
            'signup_form': signup_form,
            'is_auth': request.user.is_authenticated
        }
