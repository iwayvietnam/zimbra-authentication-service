
'''
TODO: Write it :/
'''

import requests, json, hmac, hashlib
from time import time

from django.shortcuts import render_to_response
from django.http import HttpResponseRedirect

from models import Domain


zimbra_url = "https://iway.dyndns.org:8001"
preauth_url = zimbra_url + "/service/preauth"
mail_url = zimbra_url + "/mail"

def status(request):
    email = request.session.get('email') or request.user.email
    if email:
        domain_name = email.split('@')[1]
        try:
            domain = Domain.objects.get(name=domain_name)
            url = generate(email, str(domain.key))
            request.session['email'] = email
            return HttpResponseRedirect(url)
        except Domain.DoesNotExist:
            request.session.flush()
            return HttpResponseRedirect('/?bid_login_failed=1')

    return HttpResponseRedirect('/')


def generate(email, domain_key):
    timestamp = int(time()*1000)
    acct = email
    pak = hmac.new(domain_key, '%s|name|0|%s'%(acct, timestamp), hashlib.sha1).hexdigest()
    return "%s?account=%s&expires=0&timestamp=%s&preauth=%s"%(preauth_url, acct, timestamp, pak)
