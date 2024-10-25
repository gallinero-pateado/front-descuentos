package main

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/PuerkitoBio/goquery"
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
)

// Producto estructura para almacenar los detalles del producto
type Producto struct {
	Categoria      string `json:"category"`
	Nombre         string `json:"name"`
	Descripcion    string `json:"description"`
	Precio         string `json:"price"`
	PrecioAnterior string `json:"previous_price"`
	Descuento      string `json:"discount"`
	Tipo 		   string `json:"type"`
	Imagen         string `json:"image"`
}

// ObtenerProductos realiza el scraping de la página y devuelve los productos
func ObtenerProductos(c *gin.Context) {
	url := "https://www.wendys.cl/pedir"
	res, err := http.Get(url)
	if err != nil || res.StatusCode != 200 {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Error al cargar la página, código: %d", res.StatusCode)})
		return
	}
	defer res.Body.Close()

	// Carga el documento HTML
	doc, err := goquery.NewDocumentFromReader(res.Body)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al analizar el contenido HTML"})
		return
	}

	var productos []Producto

	// Busca todos los productos en la página
	doc.Find("div.product-card").Each(func(i int, s *goquery.Selection) {
		titulo := strings.TrimSpace(s.Find("span.line-clamp-2").Text()) // Extrae el título del producto
		if titulo == "" {
			titulo = "No disponible"
		}

		// Extrae la descripción del producto
		descripcion := strings.TrimSpace(s.Find("p.text-xs").Text())
		if descripcion == "" {
			descripcion = "No disponible"
		}

		// Extrae el precio y separa los precios
		precioTexto := strings.TrimSpace(s.Find("div.flex.gap-x-2.text-sm.flex-row").Text())
		precios := strings.Split(precioTexto, "$")

		var precio string
		var precioAnterior string

		if len(precios) > 2 { // Si hay dos precios (indicando que hay descuento)
			precio = "$" + strings.TrimSpace(precios[1])         // Precio con descuento
			precioAnterior = "$" + strings.TrimSpace(precios[2]) // Precio anterior
		} else {
			return // Si no hay descuento, no se incluye el producto en la lista
		}

		// Extraer el descuento
		descuento := strings.TrimSpace(s.Find("span").Text())
		if strings.Contains(descuento, `\u003Cimg alt=\`) {
			descuento = "No disponible"
		}

		// Extrae la imagen del producto
		imagen, exists := s.Find("img").Attr("src") // Obtener el atributo src de la imagen
		if !exists || imagen == "" {
			imagen = "No disponible" // Si no se encuentra imagen
		}

		// Añadir el producto solo si tiene un precio anterior (descuento)
		productos = append(productos, Producto{
			Categoria:      "wendys",
			Nombre:         titulo,
			Descripcion:    descripcion,
			Precio:         precio,
			PrecioAnterior: precioAnterior,
			Descuento:      descuento,
			Tipo: 			"producto",
			Imagen:         imagen,
		})
	})

	// Devuelve los productos como JSON
	c.JSON(http.StatusOK, productos)
}

func main() {
	r := gin.Default()

	// Configurar CORS para permitir solicitudes desde el frontend
	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:3000"},
		AllowMethods: []string{"GET", "POST"},
		AllowHeaders: []string{"Origin", "Content-Type"},
	}))

	// Ruta para obtener los productos del scraping
	r.GET("/productos", ObtenerProductos)

	r.Run(":8080") // Corre el servidor en el puerto 8080
}

