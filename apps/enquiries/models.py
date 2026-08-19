from django.db import models


class Enquiry(models.Model):

    ORGANISATION_CHOICES = [

        ("government", "Government"),

        ("education", "Education"),

        ("sme", "SMME / Enterprise"),

        ("ngo", "NGO / Community"),

        ("investor", "Investor"),

        ("other", "Other"),
    ]


    STATUS_CHOICES = [

        ("new", "New"),

        ("contacted", "Contacted"),

        ("qualified", "Qualified"),

        ("proposal", "Proposal"),

        ("won", "Won"),

        ("closed", "Closed"),
    ]


    name = models.CharField(
        max_length=150
    )

    organisation = models.CharField(
        max_length=200,
        blank=True
    )

    email = models.EmailField()

    phone = models.CharField(
        max_length=50,
        blank=True
    )

    organisation_type = models.CharField(
        max_length=20,
        choices=ORGANISATION_CHOICES,
        default="other"
    )

    sector = models.ForeignKey(
        "sectors.Sector",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="enquiries"
    )

    project_type = models.CharField(
        max_length=200,
        blank=True
    )

    budget_range = models.CharField(
        max_length=100,
        blank=True
    )

    message = models.TextField()

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="new"
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )


    class Meta:

        ordering = [
            "-created_at"
        ]


    def __str__(self):

        return (
            f"{self.name} â€” "
            f"{self.organisation or 'No organisation'}"
        )
