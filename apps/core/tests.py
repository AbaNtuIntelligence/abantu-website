from django.test import TestCase


class HealthEndpointTest(TestCase):

    def test_health_endpoint(self):

        response = self.client.get(
            "/api/v1/health/"
        )

        self.assertEqual(
            response.status_code,
            200
        )

        self.assertEqual(
            response.json()["status"],
            "ok"
        )
