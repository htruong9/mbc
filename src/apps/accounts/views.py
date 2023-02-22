from django.shortcuts import render, redirect
from .forms import RegistrationForm, EditProfileForm, ChangePasswordForm
from .models import Account
from order.models import Order
from django.contrib import messages, auth
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse, JsonResponse, HttpRequest
from django.contrib.auth.decorators import login_required
from django.templatetags.static import static
from django.contrib.auth import update_session_auth_hash
from django.middleware import csrf



def register(request: HttpResponse):
    if request.method == 'GET': # TODO: deprecated
        return render(request, 'accounts/register.html')
    elif request.method == 'POST':
        form = RegistrationForm(request.POST)

        response = {
            'success': True,
            'message': '',
            'data': {},
        }

        if form.is_valid():
            first_name = form.cleaned_data['first_name']
            last_name = form.cleaned_data['last_name']
            phone_number = form.cleaned_data['phone_number']
            email = form.cleaned_data['email']
            password = form.cleaned_data['password']
            username = email
            # username = email.split("@")[0]
            user = Account.objects.create_user(first_name=first_name, last_name=last_name, email=email,
                                               username=username, password=password)
            user.phone_number = phone_number
            user.save()
            response['message'] = 'Registration successful.'
        else:
            response['success'] = False
            errors = list(form.errors.values())
            response['message'] = errors[0]

        return JsonResponse(response)



def login(request: HttpRequest):
    if request.method == 'GET': # TODO: deprecated
        if request.user.is_authenticated:
            return redirect('home')
        else:
            return render(request, 'accounts/login.html')
    elif request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']

        user = authenticate(request, email=email, password=password)
        response = {
            'success': True,
            'message': '',
            'data': {},
        }

        # print(email, password, user)
        if user is not None:
            auth.login(request, user)
            # messages.success(request, 'You are now logged in.')
            response['message'] = 'You are now logged in.'
            response['csrf_token'] = csrf.get_token(request)
            return JsonResponse(response)
        else:
            response['success'] = False
            response['message'] = 'Invalid login credentials'
            # messages.error(request, 'Invalid login credentials')
            return JsonResponse(response)


    # return render(request, 'accounts/login.html')


def _logout(request):
    response = {
            'success': True,
            'message': '',
            'data': {},
    }
    logout(request)
    return JsonResponse({})


@login_required
def dashboard(request: HttpRequest):
    account = Account.objects.get(id=request.user.id)
    context = {
        'user': account,
        'orders_count': Order.objects.filter(user=request.user).count()
    }

    return render(request, 'accounts/dashboard.html', context)

@login_required
def edit_profile(request: HttpRequest):
    if request.method == 'GET':
        context = {
            'form': EditProfileForm(user=request.user),
            'user': Account.objects.get(id=request.user.id)
        }

        return render(request, 'accounts/edit_profile.html', context)

    elif request.method == 'POST':
        user = Account.objects.get(id=request.user.id)
        form = EditProfileForm(request.POST, request.FILES, instance=user)
        if form.is_valid():
            form.save()

        return redirect('dashboard')


@login_required
def change_password(request: HttpRequest):
    if request.method == 'GET':
        context = {
            'form': ChangePasswordForm()
        }
        return render(request, 'accounts/reset_password.html', context)
    
    elif request.method == 'POST':
        user = Account.objects.get(id=request.user.id)
        form = ChangePasswordForm(request.POST, instance=user)
        if form.is_valid():
            user.set_password(form.cleaned_data['password'])
            user.save()
            update_session_auth_hash(request, user)
            messages.success(request, 'Your password has been reset!')

        return render(request, "accounts/reset_password.html", {'form': form}) 


@login_required
def view_order(request: HttpRequest):
    orders = Order.objects.filter(user=request.user)
    context = {
        'orders': orders,
        'scripts': [static('js/order.js')]
    }
    return render(request, 'accounts/my_orders.html', context)