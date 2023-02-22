from django.shortcuts import render, redirect
from .models import *
from .forms import *
from django.http import HttpResponse
from django.contrib import messages



# Create your views here.
def contact(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            data = ContactMessage()  # create relation with model
            data.name = form.cleaned_data['name']  # get form input data
            data.email = form.cleaned_data['email']
            data.subject = form.cleaned_data['subject']
            data.message = form.cleaned_data['message']
            data.ip = request.META.get('REMOTE_ADDR')
            data.save()  # save data to table
            messages.success(request, "Your message has ben sent. Thank you for your message.")
            return redirect('contact')

    else:
        setting = Setting.objects.get(id=1)
        form = ContactForm

        context = {
            'setting': setting,
            'form': form,
        }
        return render(request, 'home/contact.html', context)