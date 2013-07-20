

class DomainRouter(object):
    def db_for_read(self, model, **hints):
        if model._meta.app_label == 'rp':
            return 'domain_db'
            
        return None
        
    def allow_syncdb(self, db, model):
        if db == 'domain_db':
            return model._meta.app_label == 'rp'
        elif model._meta.app_label == 'rp':
            return False
        return None
        
