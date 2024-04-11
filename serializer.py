from rest_framework import serializers
from .models import Drug, Demand

class DrugSerializer(serializers.Serializer):
    class Meta:
        model = Drug
        fields = '__all__'

class PurchaseSerializer(serializers.Serializer):
    drug_name = serializers.CharField()
    quantity = serializers.IntegerField()
    total = serializers.IntegerField
    date_purchase = serializers.DateTimeField(read_only=True)

class DemandSerializer(serializers.Serializer):
    class Meta:
        model = Demand
        fields = '__all__'
