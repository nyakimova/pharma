from django.db import models
from django.contrib.auth.models import User



# Create your models here.
class Drug(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    available_quantity = models.PositiveIntegerField(default=0)
    def __str__(self):
        return f"{self.name} - {self.price}"


class Purchase(models.Model):
    drug_name = models.CharField(max_length=250)
    quantity = models.PositiveIntegerField()
    total = models.DecimalField(max_digits=10, decimal_places=2)
    date_purchase = models.DateField(auto_now_add=True)


def __str__(self):
    return f"Purchase of {self.quantity} units of {self.drug.name} on {self.purchase_date}"




class Demand(models.Model):
    drug_name = models.CharField(max_length=255)
    quantity = models.PositiveIntegerField()


    def __str__(self):
        return f"Demand for {self.quantity} units of {self.drug_name}"
