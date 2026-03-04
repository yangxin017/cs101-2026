from django.contrib import admin
from django.urls import path
from . import views  # 確保這行有寫

urlpatterns = [
    path('admin/', admin.site.urls),
    path('hello/', views.hello_cgu), # 這裡的 hello_cgu 必須跟 views.py 裡的名字一樣
]