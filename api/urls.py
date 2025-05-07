from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegisterView, LoginView, PredictView, CustomUserViewSet, DrugViewSet, DrugRemarkViewSet

# Create a router for the ViewSet
router = DefaultRouter()
router.register(r'users', CustomUserViewSet, basename='user')
router.register(r'drugs', DrugViewSet)
router.register(r'remarks', DrugRemarkViewSet)


urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('predict/', PredictView.as_view(), name='predict'),
    
    # Include the router URLs
    path('', include(router.urls)),
]