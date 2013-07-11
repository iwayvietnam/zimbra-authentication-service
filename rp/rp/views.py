
'''
TODO: Write it :/
'''

import requests, json, hmac, hashlib
from time import time

from django.shortcuts import render_to_response
from django.http import HttpResponseRedirect


ZIMBRA_EMAIL = '@zimbra.org'
# Hainp: Change this to real preauth key
preauth_key = "0f6f5bbf7f3ee4e99e2d24a7091e262db37eb9542bc921b2ae4434fcb6338284"
# Hainp: Change this to real zimbra mail server url
preauth_url = "https://aurl.com"


def status(request):
    data = {}
    email = request.user.email

    data['email'] = email
    
    user_key = generate(email)

    if user_key:
        data['status'] = 'okay'
        data['user_key'] = user_key

    return render_to_response('status.html', { 'data': data })


def generate(email):

    timestamp = int(time()*1000)

    try:
        #If they're not logged in, an exception will be thrown.
        acct = email.split('@')[0] + ZIMBRA_EMAIL

        pak = hmac.new(preauth_key, '%s|name|0|%s'%(acct, timestamp), hashlib.sha1).hexdigest()

        return "%s?account=%s&expires=0&timestamp=%s&preauth=%s"%(preauth_url, acct, timestamp, pak)
    except:
        pass

    return False
