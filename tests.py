from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from .models import Drug, Purchase


class DrugModelTest(TestCase):
    def test_drug_str_representation(self):
        drug = Drug.objects.create(name='Test Drug', description='Test Description', price=10.99,
                                   available_quantity=100)
        self.assertEqual(str(drug), 'Test Drug - 10.99')


class DrugAPITest(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.client = APIClient()
        cls.url = reverse('druglist')
        cls.user = User.objects.create_user(username='testuser', password='testpass')
        cls.client.force_authenticate(user=cls.user)


def test_get_drugs(self):
    response = self.client.get(self.url)
    self.assertEqual(response.status_code, status.HTTP_200_OK)


def test_post_drug(self):
    data = {'name': 'Test Drug', 'description': 'Test Description', 'price': 10.99, 'available_quantity': 100}
    response = self.client.post(self.url, data, format='json')
    print(response.content)
    self.assertEqual(response.status_code, status.HTTP_201_CREATED)
