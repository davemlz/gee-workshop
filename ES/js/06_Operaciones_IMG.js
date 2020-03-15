// ********************************************************************************
// OPERACIONES CON IM�GENES
// ********************************************************************************
// Existen funciones para realizar operaciones matem�ticas con las im�genes
// ********************************************************************************

// Traemos un shape
var shape = ee.FeatureCollection('users/dmlmont/Taller_GEE_Univalle/SHP');

// Opciones de visualizaci�n RGB
var s2_RGB = {
  bands: ["B4","B3","B2"],
  min: 0,
  max: 3000
};

// Imagen 2018 (Febrero 26)
var s2_2018 = ee.Image("COPERNICUS/S2/20180226T153609_20180226T153610_T18NUJ");
Map.addLayer(s2_2018,s2_RGB,"2018");
Map.centerObject(s2_2018);

// Imagen 2019 (Enero 2)
var s2_2019 = ee.Image("COPERNICUS/S2/20190102T153619_20190102T153616_T18NUJ");
Map.addLayer(s2_2019,s2_RGB,"2019");

// ********************************************************************************
// �NDICES DE VEGETACI�N
// ********************************************************************************
// Los �ndices de Vegetaci�n (IV) se calculan sobre im�genes
// Hay varias maneras de calcularlos
// Calculadora Raster: usar funciones .add("Imagen"), .subtract("Imagen"), .divide("Imagen")...
// Expresiones: funci�n .expression("Expresi�n matem�tica","Diccionario de expresi�n")
// Funciones predeterminadas: .normalizedDifference(["Primera Banda","Segunda Banda"])
// ********************************************************************************

// Opciones de visualizaci�n NDVI
var s2_NDVI = {
  min: 0,
  max: 1,
  palette: ["#C63819","#31C619","#00B6FF","#F000FF"]
};

// NDVI de la imagen 2018 usando calculadora raster
var rojo = s2_2018.select("B4");
var nir = s2_2018.select("B8");
var ndvi_calc = nir.subtract(rojo).divide(nir.add(rojo));

// NDVI de la imagen 2018 usando expresiones
var ndvi_exp = s2_2018.expression("(NIR - Red) / (NIR + Red)",{
  "NIR": s2_2018.select("B8"),
  "Red": s2_2018.select("B4")
});

// NDVI de la imagen 2018 usando funciones predeterminadas
var ndvi_2018 = s2_2018.normalizedDifference(["B8","B4"]);

// NDVI de la imagen 2019 usando funciones predeterminadas
var ndvi_2019 = s2_2019.normalizedDifference(["B8","B4"]);

// Mostrar en el mapa
Map.addLayer(ndvi_2018,s2_NDVI,"NDVI 2018");
Map.addLayer(ndvi_2019,s2_NDVI,"NDVI 2019");

// Diferencia entre ambos NDVI
var ndvi_diff = ndvi_2019.subtract(ndvi_2018);
Map.addLayer(ndvi_diff,s2_NDVI,"Diferencia NDVI");

// ********************************************************************************
// REDUCTORES
// ********************************************************************************
// Los reductores convierten una colecci�n de im�genes a una sola imagen con una estad�stica
// Se pueden hacer con la imagen completa o por regiones
// Se utilizan las funciones .reducer("Reductor")
// En el "Reductor" se utiliza ee.Reducer."Estad�stica"()
// ee.Reducer.median()
// ee.Reducer.mean()
// ee.Reducer.max()
// ee.Reducer.min(), etc...
// ********************************************************************************

// Traemos una colecci�n de Sentinel-2 filtrada por fecha, n�mero de �rbita, porcentaje de nubosidad y ubicaci�n
var s2 = ee.ImageCollection("COPERNICUS/S2")
  .filterDate("2018-01-01","2018-12-31")
  .filter(ee.Filter.eq('SENSING_ORBIT_NUMBER',68))
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20))
  .filterBounds(shape);

// Reducimos la colecci�n a una imagen correspondiente a la media y otra a la mediana
// Cada banda es reducida a estas estad�sticas
var mean = s2.reduce(ee.Reducer.mean());
var median = s2.reduce(ee.Reducer.median());

// Se imprimen los nuevos nombres de las bandas
// Estos cambian y las opciones de visualizaci�n hay que cambiarlas
print("NUEVOS NOMBRES BANDAS MEDIA",mean.bandNames());
print("NUEVOS NOMBRES BANDAS MEDIANA",median.bandNames());

// Opciones de visualizaci�n RGB para la imagen reducida en media
var s2_RGB_mean = {
  bands: ["B4_mean","B3_mean","B2_mean"],
  min: 0,
  max: 3000
};

// Opciones de visualizaci�n RGB para la imagen reducida en mediana
var s2_RGB_median = {
  bands: ["B4_median","B3_median","B2_median"],
  min: 0,
  max: 3000
};

// Se agregan al mapa
Map.addLayer(mean,s2_RGB_mean,"Media 2018");
Map.addLayer(median,s2_RGB_median,"Median 2018");

// ********************************************************************************
// REDUCTORES POR REGION
// ********************************************************************************
// Funciona como Estad�sticas Zonales
// Se realizan sobre una imagen y un shape base
// Se utilizan las funciones "Imagen".reduceRegions("Opciones de reducci�n")
// En las opciones de reducci�n se utiliza la variable "collection", la cual es el shape
// La variable "reducer", que es el reductor:
// ee.Reducer.median()
// ee.Reducer.mean()
// ee.Reducer.max()
// ee.Reducer.min(), etc...
// Y la variable "scale", que es el tama�o de pixel del cual se reduce
// ********************************************************************************

// Se reduce a la media la imagen NDVI del 2019 en las geometr�as del shape "shape"
var mean_regions = ndvi_2019.reduceRegions({
  collection: shape,
  reducer: ee.Reducer.mean(),
  scale: 10,
});

// Se imprime en la consola el nuevo shape "mean_regions"
// Se agregan nuevas columnas (atributos) al shape con el valor medio
print("NUEVO SHAPE REDUCIDO",mean_regions);