// ********************************************************************************
// SERIES DE TIEMPO
// ********************************************************************************
// Las series de tiempo se construyen en gr�ficos que pueden exportarse como tal o como tablas
// Es necesario una colecci�n de im�genes y una region o series de regiones
// Se utiliza la funci�n ui.Chart.image.series("Colecci�n","Shape","Reductor","Resoluci�n")
// ********************************************************************************

// Traemos un shape
var shape = ee.FeatureCollection("users/dmlmont/Taller_GEE_Univalle/SHP");

// Se imprime el shape en la consola para ver sus columnas
// En Series de tiempo por regi�n es necesario
print("SHAPEFILE",shape);

// Traemos una colecci�n de Sentinel-2 filtrada por fecha, ubicaci�n y metadatos
var s2 = ee.ImageCollection("COPERNICUS/S2")
  .filterDate("2018-01-01","2018-12-31")
  .filterBounds(shape)
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20));

// Vamos a calcular el NDVI para toda la colecci�n
// Para poder hacerlo hay que crear una funci�n
// Se empieza llamando la clase "function", el nombre de la funci�n y los argumentos
// En este caso el nombre de la funci�n es "NDVI" y el argumento es "img"
// Estos dos pueden tener los nombres que se deseen
// El argumento "img" representar� cada imagen de la colecci�n
// Dentro de la funci�n podemos crear m�s variables con la clase "var"
// Se crea dentro una variable "image" que ser� el NDVI de la imagen, recortada.
// La funci�n .clip("shape") corta la imagen con el shape deseado
// La funci�n .normalizedDifference("Bandas") calcula el NDVI de la imagen recortada
// La funci�n "return" retorna la variable "image"
// La funci�n .copyProperties() es obligatoria para mantener las fechas de las im�genes
function NDVI(img){
  var image = img.clip(shape).normalizedDifference(['B8','B2']);
  return image.copyProperties(img, ['system:time_start']);
}

// La funci�n .map("Funci�n") se usa para aplicar una funci�n sobre cada imagen de una colecci�n
// En este caso se aplica la funci�n NDVI sobre la colecci�n de Sentinel-2
var s2_NDVI = s2.map(NDVI);

// Se crea la serie de tiempo del NDVI
var ts = ui.Chart.image.series(s2_NDVI,shape,ee.Reducer.mean(),10);

// Se imprime la serie de tiempo en la consola
// Es un gr�fico
print(ts);

// ********************************************************************************
// SERIES DE TIEMPO POR REGI�N
// ********************************************************************************
// Para las series de tiempo por regi�n se necesitan otros par�metros
// Se utiliza la funci�n ui.Chart.image.seriesByRegion("Colecci�n","Shape","Reductor","Nombre de la banda","Resoluci�n","Propiedad de tiempo","Atributo del shape")
// El atributo del shape es importante ya que ser� el divisor de las regiones
// Si no se ponde el atributo del shape se har� por defecto la divisi�n con el id otorgado por GEE
// ********************************************************************************

// Se crea la serie de tiempo por regiones
// El reductor es la media: ee.Reducer.mean()
// El nombre de la banda del NDVI es "nd"
// Si no saben el nombre da la banda pueden saberlo con la funci�n .bandNames()
// "system:time_start" es la propiedad de tiempo de la colecci�n
// "COD_UNICO" es el atributo del shape elegido para realizar la divisi�n
var ts_regions = ui.Chart.image.seriesByRegion(
  s2_NDVI,
  shape,
  ee.Reducer.mean(),
  "nd",
  10,
  'system:time_start',
  'Lote');

// Se imprime la serie de tiempo por regi�n en la consola
// Es un gr�fico
print(ts_regions);