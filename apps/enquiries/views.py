from django.conf import settings
from django.db import IntegrityError, transaction
from rest_framework import status, viewsets
from rest_framework.exceptions import PermissionDenied, ValidationError
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response

from .delivery import deliver_enquiry
from .models import Enquiry
from .serializers import EnquirySerializer
from .throttles import EnquiryBurstThrottle, EnquiryEmailThrottle, EnquirySustainedThrottle


class EnquiryViewSet(viewsets.ModelViewSet):
    queryset = Enquiry.objects.all()
    serializer_class = EnquirySerializer

    def get_permissions(self):
        return [AllowAny()] if self.action == "create" else [IsAdminUser()]

    def get_throttles(self):
        if self.action == "create":
            return [EnquiryBurstThrottle(), EnquirySustainedThrottle(), EnquiryEmailThrottle()]
        return super().get_throttles()

    def create(self, request, *args, **kwargs):
        origin = request.headers.get("Origin")
        if origin and origin not in settings.CONTACT_ALLOWED_ORIGINS:
            raise PermissionDenied("This website is not allowed to submit enquiries.")

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        key = serializer.validated_data.get("submission_id")
        existing = Enquiry.objects.filter(submission_id=key).first() if key else None
        if existing:
            return self._existing_response(existing, serializer.validated_data)

        try:
            with transaction.atomic():
                enquiry = serializer.save()
        except IntegrityError:
            # Resolve a concurrent request using the same idempotency key.
            existing = Enquiry.objects.filter(submission_id=key).first() if key else None
            if existing is None:
                raise
            return self._existing_response(existing, serializer.validated_data)

        deliver_enquiry(enquiry.pk)
        enquiry.refresh_from_db()
        return self._receipt(enquiry)

    def _existing_response(self, enquiry, validated):
        for field, value in validated.items():
            if field == "submission_id":
                continue
            if getattr(enquiry, field) != value:
                raise ValidationError("This submission reference was already used. Refresh the form for a new enquiry.")
        # Repeated client requests never trigger another SMTP send.
        return self._receipt(enquiry)

    @staticmethod
    def _receipt(enquiry):
        return Response(
            {"message": "Your enquiry has been received. Thank you—we’ll get back to you.",
             "reference": str(enquiry.submission_id or enquiry.pk)},
            status=status.HTTP_201_CREATED if enquiry.email_status == "sent" else status.HTTP_202_ACCEPTED,
        )
