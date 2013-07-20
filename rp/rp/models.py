from __future__ import unicode_literals

from django.db import models


class Domain(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.TextField(blank=True)
    key = models.TextField(blank=True)
    
    def __unicode__(self):
        return self.name
    
    class Meta:
        db_table = 'domain'
