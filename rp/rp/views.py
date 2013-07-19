
'''
TODO: Write it :/
'''

import requests, json, hmac, hashlib
from time import time

from django.shortcuts import render_to_response
from django.http import HttpResponseRedirect



zimbra_url = "https://iway.dyndns.org:8001"
preauth_url = zimbra_url + "/service/preauth"
mail_url = zimbra_url + "/mail"

def status(request):
    if request.session.get('email'):
        return HttpResponseRedirect(mail_url)

    if request.user.email:
        email = request.user.email

        # domain_key should be obtained dynamically
        domain_key = "6b445ab7b53c432eaf1f7e00e82b68953688816ccb895f035f66f69fc206b3d2"
        
        url = generate(email, domain_key)
        
        request.session['url'] = url
        request.session['email'] = email
        
        return HttpResponseRedirect(url)
        
    return HttpResponseRedirect('/')


def generate(email, domain_key):
    timestamp = int(time()*1000)
    acct = email
    pak = hmac.new(domain_key, '%s|name|0|%s'%(acct, timestamp), hashlib.sha1).hexdigest()
    return "%s?account=%s&expires=0&timestamp=%s&preauth=%s"%(preauth_url, acct, timestamp, pak)    
