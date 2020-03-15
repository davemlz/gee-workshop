// ********************************************************************************
// INFORMACI�N Y METADATOS DE IM�GENES
// ********************************************************************************
// Se puede acceder a las propiedades de una colecci�n o una imagen imprimiendolas en la consola
// En la consola se despliegan todos los atributos e informaci�n asociada a la variable
// ********************************************************************************

// Guardar una imagen Sentinel-2 en la variable "s2_img"
var s2_img = ee.Image("COPERNICUS/S2/20160101T000037_20160101T030455_T56LNK");

// La lista completa de atributos puede verse con la funci�n .propertyNames()
var prop = s2_img.propertyNames();

// Imprimir propiedades
print("PROPIEDADES DE LA IMAGEN SENTINEL-2",prop);

// ********************************************************************************
// FECHA DE UNA IMAGEN
// ********************************************************************************

// Se obtiene el valor de un atributo con la funci�n .get("nombre del atributo")
// Se accede a la fecha con el atributo "system:time_start"
var date = s2_img.get('system:time_start');

// Para visualizar la fecha, esta debe convertirse a una variable tipo fecha
// Se usa la funci�n ee.Date("Fecha")
var date = ee.Date(date)

// Imprimir la fecha
print("FECHA DE LA IMAGEN SENTINEL-2",date)

// ********************************************************************************
// PORCENTAJE DE COBERTURA NUBOSA
// ********************************************************************************

// Ejemplo con porcentaje de cobertura nubosa
// Se obtiene el porcetaje de cobertura de nubes con el atributo "CLOUDY_PIXEL_PERCENTAGE"
var clouds = s2_img.get("CLOUDY_PIXEL_PERCENTAGE");

// Se imprime el porcentaje de cobertura de nubes
print("COBERTURA DE NUBES",clouds);

// ********************************************************************************
// FILTRAR COLECCIONES POR VALORES DE METADATOS
// ********************************************************************************

// Las propiedades se pueden utilizar para filtrar colecciones
// Se filtra la colecci�n de im�genes de Sentinel-2
// La cobertura nubosa se usa como filtro
// S�lo se obtendr�n las im�genes con una cobertura nubosa menor al 20%
// Se usa la funci�n .filter("filtro")
// Dentro de la funci�n .filter se especifica el tipo de filtro
// ee.Filter.lt("Propiedad","Umbral") -> Valores menores al umbral
// ee.Filter.lte("Propiedad","Umbral") -> Valores menores o iguales al umbral
// ee.Filter.gt("Propiedad","Umbral") -> Valores mayores al umbral
// ee.Filter.gte("Propiedad","Umbral") -> Valores mayores o iguales al umbral
// ee.Filter.eq("Propiedad","Umbral") -> Valores iguales al umbral
var s2_filtrada = ee.ImageCollection('COPERNICUS/S2')
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20));

// ********************************************************************************
// OTROS ATRIBUTOS
// ********************************************************************************

// Algunos otros datos de inter�s pueden ser extra�dos de las im�genes
// Estos son los nombres de las bandas, selecci�n de bandas, proyecci�n y resoluci�n

// Obtener el nombre de las bandas de las im�genes
// Se usa la funci�n .BandNames() sobre la variable de la imagen
print("BANDAS DE SENTINEL-2",s2_img.bandNames());

// Seleccionar una banda de la imagen "s2_img"
var band1 = s2_img.select("B1");

// Imprimir la banda en la consola
print("BANDA 1 DE IMAGEN SENTINEL-2",band1);

// Obtener la proyecci�n de la banda 1 en una variable "prj"
// No importan los distintos tipos de proyecciones manejados
// No es necesario reproyectar siempre y cuando los sistemas de referencia est�n bien asignados
var prj = band1.projection();

// Imprimir la proyecci�n de la banda 1
print("PROYECCI�N DE BANDA 1",prj);

// Obtener la resoluci�n de una proyecci�n en la variable "res"
var res = prj.nominalScale();

// Imprimir la resoluci�n de la banda 1
print("RESOLUCI�N ESPACIAL BANDA 1 (m)",res);

// Las anteriores consultas se pueden realizar sin guardar tantas variables
// Ejemplo para la banda 2
var res_b2 = s2_img.select("B2").projection().nominalScale();

// Imprimir la resoluci�n de la banda 2
print("RESOLUCI�N ESPACIAL BANDA 2 (m)",res_b2);

// ********************************************************************************
// INFORMACI�N Y METADATOS DE SHAPEFILES
// ********************************************************************************
// Se puede acceder a las propiedades de una colecci�n de shapes imprimiendolas en la consola
// En la consola se despliegan todos los atributos e informaci�n asociada a la variable
// ********************************************************************************

// Traemos un shape
var shape = ee.FeatureCollection("users/dmlmont/Taller_GEE_Univalle/SHP");

// Se imprime el shape en la consola para ver sus atributos
print("SHAPEFILE",shape);

// De una colecci�n de shapes se obtienen estad�sticas de un atributo num�rico
var area_stats = shape.aggregate_stats("Area");

// Se imprime las estad�sticas
print("ESTADISTICAS DE �REA",area_stats);

// ********************************************************************************
// FILTRAR COLECCIONES DE SHAPES POR VALORES DE METADATOS
// ********************************************************************************

// Se filtra la colecci�n de shapes por el atributo "STE"
// Se seleccionan s�lo los shapes cuyo atributo "STE" sea igual a "00019A"
// La funci�n .first() se usa para convertir el tipo FeatureCollection a Feature
// Esto es necesario s�lo si se quiere obtener un atributo de un solo shape
// O realizar funciones con un solo shape
var shape_selected = shape.filter(ee.Filter.eq('Lote',2)).first();

// Se imprimen los shapes que cumplen el filtro en la consola
print("LOTE SELECCIONADO - 2",shape_selected);

// Se obtiene el valor de un atributo con la funci�n .get("nombre del atributo")
var codigo_lote = shape_selected.get("Codigo")

// Se imprime el valor obtenido
print("CODIGO DEL LOTE SELECCIONADA",codigo_lote)