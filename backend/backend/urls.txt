
from os import stat
from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static

from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    
    path('',TemplateView.as_view(template_name='index.html')),
    path('api/products/',include('api.urls.product_urls')),
    path('api/users/',include('api.urls.user_urls')),
    path('api/orders/',include('api.urls.order_urls')),
]
urlpatterns += static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL,document_root=settings.STATIC_ROOT)

