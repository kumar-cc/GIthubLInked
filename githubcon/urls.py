from django.conf.urls import url


from . import views

urlpatterns = [
    url(r'^projectlist$', views.projectlist, name='projectlist'),
    url(r'^login$', views.login, name='login'),
    url(r'^home$', views.home, name='home'),
    url(r'^process$', views.process, name='process'),
    url(r'^userPage$', views.userPage, name='userPage'),
    url(r'^logout$', views.logout, name='logout'),
    url(r'^repoPage(?P<repo>\w{0,50})/$', views.repoPage, name='repoPage'),
    # url(r'^get_access_token/(?P<backend>[^/]+)/$','get_access_token')

    ]