import requests
from bs4 import BeautifulSoup
import json

# URL de la página a scrapear
url = 'https://www.burgerking.cl/cupones/'

# Realizamos la solicitud HTTP para obtener el contenido de la página
response = requests.get(url)

# Verificamos si la solicitud fue exitosa
if response.status_code == 200:
    # Parseamos el contenido HTML con BeautifulSoup
    soup = BeautifulSoup(response.content, 'html.parser')
    
    # Buscamos los cupones
    cupones = soup.find_all('button', class_='card-tab')
    
    cupon_data = []

    # Iteramos sobre los cupones y extraemos información
    for idx, cupon in enumerate(cupones, start=1):
        # Título del cupón
        titulo_elemento = cupon.find('h6', class_='coupon-name mb-1')
        name = titulo_elemento.text.strip() if titulo_elemento else 'Sin título'

        # Descripción del producto
        descripcion_elemento = cupon.find("p", class_="coupon-description mb-0")
        descripcion = descripcion_elemento.text.strip() if descripcion_elemento else "Sin Descripción"

        # Imagen del producto
        imagen_elemento = cupon.find('img')
        image = imagen_elemento['src'] if imagen_elemento else 'Sin imagen'

        # Precio con descuento y precio anterior
        precio_elemento = cupon.find('span', class_='price-discount')  # Precio con descuento
        previous_precio_elemento = cupon.find('span', class_='price-original')  # Precio anterior

        price = precio_elemento.text.strip() if precio_elemento else 'Sin Precio'
        previous_price = previous_precio_elemento.text.strip() if previous_precio_elemento else 'Sin Precio Anterior'

        # Almacenar la información en un diccionario
        cupon_data.append({
            'id': idx,
            'name': name,
            'liked': False,
            'category': 'burgerking', 
            'image': image,
            'description': descripcion,
            'type': 'cupon',
            'price': 'Sin Precio',  # Precio con descuento
        })
    
    # Guardar los cupones en un archivo JSON
    with open('./src/components/cupones.json', 'w', encoding='utf-8') as f:
        json.dump(cupon_data, f, ensure_ascii=False, indent=4)

    print("Datos guardados en cupones.json")
else:
    print(f'Error al acceder a la página: {response.status_code}')
