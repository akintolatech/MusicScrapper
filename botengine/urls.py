from django.urls import path
from . import views

app_name = "botengine"

urlpatterns = [
    path('change-status/<int:bot_id>/', views.change_status, name='change_status'),
    path('clear_logs/', views.clear_logs, name="clear_logs"),
    path('get_logs/', views.get_logs, name='get_logs'),
    path('get_songs/', views.get_songs, name='get_songs'),
]
