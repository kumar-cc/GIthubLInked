from django.shortcuts import render
from django.template.context import RequestContext
from github import Github
import coreapi
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.contrib.auth.models import User
import requests
from django.http import HttpResponse,HttpResponseRedirect
from social_django.utils import load_strategy
from social_django.utils import psa
from django.contrib import auth
from django.contrib.auth import logout as auth_logout


ISSUES_FOR_REPO_URL = 'https://api.github.com/repos/%s/issues'



@login_required
def userPage(request):
    if request.user.is_authenticated():
        user = request.user
    username = user.username
    social = user.social_auth.get(provider='github')
    token = social.extra_data['access_token']
    url = "https://api.github.com/users/" + username + "/repos"
    RepoResponse = requests.get(url, headers={'Authorization': 'Token {}'.format(token)})
    Repolist = RepoResponse.json()
    print("RepoList===========")
    print(Repolist)
    g = Github(token)
    repolist = g.get_user().get_repos()
    return render(request, 'githubcon/userPage.html', {
            'repolist': Repolist,
            })


def projectlist(request):
    g = Github("Parul-jft","")
    for repo in g.get_user().get_repos():
      print(repo.name)



def login(request):
    return render(request, "githubcon/login.html")

def repoPage(request,repo):
    reponame = request.GET.get('q')
    print("reponame========")
    print(reponame)
    if request.user.is_authenticated():
        user = request.user
        username = user.username
    social = user.social_auth.get(provider='github')
    token = social.extra_data['access_token']
    g = Github(token)
    repo = g.get_user().get_repo(reponame)
    issues = repo.get_issues()
    # GET / repos /: owner /:repo / readme
    url1 = "https://api.github.com/repos/" + username + "/" + reponame + "/readme"
    print("url1===========")
    print(url1)
    ReadmeResponse = requests.get(url1, headers={'Authorization': 'Token {}'.format(token)})
    print("Readmeresponse=======")
    print(ReadmeResponse)
    Readmedata = ReadmeResponse.json()
    print("Readmedata===========")
    print( Readmedata.get('content', ''))
    url = "https://api.github.com/repos/" + username + "/" + reponame + "/commits"
    CommitResponse = requests.get(url, headers={'Authorization': 'Token {}'.format(token)})
    commitlist = CommitResponse.json()
    return render(request, 'githubcon/repoPage.html', {
        'issues': issues,'commitlist':commitlist,'reponame':reponame
    })



def home(request):
    print("items============")
    print(request)
    for key in request.GET:
        print(key)
        value = request.GET[key]
        print(value)

    username = request.POST.get("username")
    password = request.POST.get("password")
    g = Github(username, password)
    for repo in g.get_user().get_repos():
        print("reponame===========")
        print(str(repo.name))
    return render(request, "githubcon/home.html")


def process(request):
    return HttpResponseRedirect('http://github.com/login/oauth/authorize')

@psa('social:complete')
def get_access_token(request, backend):
    # This view expects an access_token GET parameter, if it's needed,
    # request.backend and request.strategy will be loaded with the current
    # backend and strategy.
    token = request.GET.get('access_token')
    user = request.backend.do_auth(request.GET.get('access_token'))
    return token

def logout(request):
    def logout_view(request):
        auth_logout(request)
        request.session.flush()
        # request.user = AnonymousUser
    return render(request, "githubcon/login.html")
