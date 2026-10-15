import hashlib

from django.conf import settings
from rest_framework.throttling import SimpleRateThrottle


class EnquiryBurstThrottle(SimpleRateThrottle):
    scope = "enquiry_burst"

    def get_rate(self):
        return settings.CONTACT_BURST_RATE

    def get_cache_key(self, request, view):
        return self.cache_format % {"scope": self.scope, "ident": self.get_ident(request)}


class EnquirySustainedThrottle(EnquiryBurstThrottle):
    scope = "enquiry_sustained"

    def get_rate(self):
        return settings.CONTACT_SUSTAINED_RATE


class EnquiryEmailThrottle(SimpleRateThrottle):
    scope = "enquiry_email"

    def get_rate(self):
        return settings.CONTACT_EMAIL_RATE

    def get_cache_key(self, request, view):
        if not isinstance(request.data, dict):
            return None
        email = str(request.data.get("email", ""))[:254].strip().lower()
        digest = hashlib.sha256(email.encode()).hexdigest()
        return self.cache_format % {"scope": self.scope, "ident": digest}
