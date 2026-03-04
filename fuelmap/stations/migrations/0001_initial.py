from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name='FuelStation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=120)),
                ('latitude', models.FloatField(help_text='Широта (Y)')),
                ('longitude', models.FloatField(help_text='Долгота (X)')),
                ('rating', models.DecimalField(decimal_places=1, default=0, max_digits=2)),
                ('opening_hours', models.CharField(default='24/7', max_length=120)),
                ('fuel_price', models.DecimalField(decimal_places=2, help_text='Цена за литр', max_digits=10)),
                ('description', models.TextField(blank=True)),
                ('is_active', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
            options={'ordering': ('-rating', 'name')},
        ),
    ]
