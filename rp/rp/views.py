
'''
TODO: Write it :/
'''

import requests, json, hmac, hashlib
from time import time

from django.shortcuts import render_to_response
from django.http import HttpResponseRedirect


# Hainp: Change this to real preauth key
preauth_key = "0f6f5bbf7f3ee4e99e2d24a7091e262db37eb9542bc921b2ae4434fcb6338284"
# Hainp: Change this to real zimbra mail server url
preauth_url = "http://aurl.org"
# Hainp

def status(request):
    email = request.session.get('email') or request.user.email

    if email:
        url = request.session.get('url')
        if not url:
            url = generate(email)
            request.session['url'] = url
            
        request.session['email'] = email
        return HttpResponseRedirect(url)
        
    return HttpResponseRedirect('/')


def generate(email):
    timestamp = int(time()*1000)
    acct = email
    pak = hmac.new(preauth_key, '%s|name|0|%s'%(acct, timestamp), hashlib.sha1).hexdigest()
    return "%s?account=%s&expires=0&timestamp=%s&preauth=%s"%(preauth_url, acct, timestamp, pak)    
