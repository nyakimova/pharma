from django.forms import model_to_dict
from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import render
from pharmacy.models import Drug, Demand, Purchase
from pharmacy.serializer import DrugSerializer, DemandSerializer, PurchaseSerializer
from drf_yasg.utils import swagger_auto_schema
from django.http import JsonResponse
from .models import Drug, Demand

def search_by_name(request):
    if request.method == 'GET':
        name = request.GET.get('query')

        drugs = Drug.objects.filter(name=name)

        drug_data = [{'name': drug.name,
                      'description': drug.description,
                      'price': str(drug.price),
                      'available_quantity': drug.available_quantity} for drug in drugs]

        return JsonResponse(drug_data, safe=False)
class DrugByNameAPIView(APIView):
    def get(self, request, name):
        drugs = Drug.objects.filter(name__icontains=name)
        serializer = DrugSerializer(drugs, many=True)
        return Response(serializer.data)
class DrugAPIView(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        get_drug = Drug.objects.all().values()
        return Response({'drug': list(get_drug)})

class DemandAPIView(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(request_body=DemandSerializer)
    def post(self, request):
        new_demand = Demand.objects.create(
            drug_name=request.data['drug_name'],
            quantity=request.data['quantity']
        )
        return Response({'demand': model_to_dict(new_demand)})

class PurchaseAPIView(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        show_purchase = Purchase.objects.all().values()
        return Response({'purchases': list(show_purchase)})

    @swagger_auto_schema(request_body=PurchaseSerializer)
    def post(self, request):
        new_purchase = Purchase.objects.create(
            drug_name=request.data['drug_name'],
            quantity=request.data['quantity'],
        )
        return Response({'purchase': model_to_dict(new_purchase)})



def home(request):
    # Query all data from the Drug and Purchase models
    drug_data = Drug.objects.all().values()
    purchase_data = Purchase.objects.all().values()
    demand_data = Demand.objects.all().values()

    # Render the 'index.html' template with the queried data as context
    return render(request, 'index.html', {'drug_data': drug_data, 'purchase_data': purchase_data, 'demand_data': demand_data})
