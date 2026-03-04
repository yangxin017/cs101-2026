from django.http import HttpResponse

def hello_cgu(request):
    return HttpResponse("<h1>Hello CGU</h1>")