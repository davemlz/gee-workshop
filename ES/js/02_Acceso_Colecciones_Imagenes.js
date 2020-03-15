// ********************************************************************************
// ACCESO A COLECCIONES
// ********************************************************************************
// Las colecciones son el conjunto de im�genes de un sensor espec�fico
// Se accede a las colecciones con la fuci�n ee.ImageCollection("Ruta de la colecci�n en cat�logo")
// ********************************************************************************

// Acceso a la colecci�n de im�genes de Sentinel-1 (RADAR)
// Accede a todas las im�genes desde que el sensor inici� la captura de informaci�n
// La colecci�n se guarda en la variable "s1"
var s1 = ee.ImageCollection("COPERNICUS/S1_GRD");

// Imprimir en consola las 10 primeras im�genes de la colecci�n "s1"
// Con la funci�n .limit("N�mero") se limita el n�mero de im�genes de una colecci�n
// En la consola no se pueden imprimir todas las im�genes de una colecci�n
// Se pueden imprimir varias variables con una sola funci�n "print", aqu� un texto y una colecci�n
print("COLECCI�N SENTINEL-1",s1.limit(10));

// ********************************************************************************
// ACCESO A IM�GENES
// ********************************************************************************
// las im�genes corresponden a una captura en una fecha espec�fica de una colecci�n de un sensor
// Se utiliza el c�digo id de la imagen a utilizar para acceder a la imagen
// El c�digo id puede verse en la consola al imprimir una colecci�n
// Las im�genes aparecen como una lista de Features, cada Feature es una imagen
// Al dar click en un Feature el c�digo id estar� entre sus atributos
// Se accede a las im�genes con la fuci�n ee.Image("Ruta de la imagen en la colecci�n")
// ********************************************************************************

// Acceso a una imagen de la colecci�n de Sentinel-1 (RADAR)
// La colecci�n se guarda en la variable "s1_image"
var s1_img = ee.Image("COPERNICUS/S1_GRD/S1A_EW_GRDH_1SDH_20141003T003636_20141003T003740_002658_002F54_ECFA");

// Imprimir en la consola la imagen "s1_img"
print("IMAGEN SENTINEL-1",s1_img);

// ********************************************************************************
// FILTROS POR FECHA
// ********************************************************************************
// Los filtros por fecha se realizan sobre colecciones de im�genes
// En la variable asignada s�lo quedar�n aquellas im�genes entre las fechas establecidas
// La funci�n para filtrar por fecha es .filterDate("Fecha Inicial","Fecha Final")
// .filterDate es un m�todo aplicable s�lo a colecciones y se pone con un "." despu�s de la variable
// ********************************************************************************

// Acceso a la colecci�n de im�genes de Sentinel-2 (MULTIESPECTRAL)
// La colecci�n se guarda en la variable "s2"
var s2 = ee.ImageCollection("COPERNICUS/S2");

// Filtrar la colecci�n entre las fechas "2016-01-01" y "2016-06-01"
var s2_filtrada = s2.filterDate("2016-01-01","2016-06-01")

// Imprimir en consola las 10 primeras im�genes de la colecci�n "s2" filtrada
print("COLECCI�N SENTINEL-2 FILTRADA POR FECHA",s2_filtrada.limit(10));

// Acceso a una imagen de la colecci�n de Sentinel-2 filtrada (MULTIESPECTRAL)
// La imagen se guarda en la variable "s2_image"
var s2_img = ee.Image("COPERNICUS/S2/20160101T000037_20160101T030455_T56LNK");

// Imprimir en la consola la imagen "s2_img"
print("IMAGEN SENTINEL-2",s2_img);

// ********************************************************************************
// FILTROS POR UBICACI�N
// ********************************************************************************
// Los filtros por ubicaci�n se realizan sobre colecciones de im�genes
// En la variable asignada s�lo quedar�n aquellas im�genes que "toquen" el objeto ubicado
// La funci�n para filtrar por ubicaci�n es .filterBounds("Geometr�a de objeto")
// .filterBpunds es un m�todo aplicable s�lo a colecciones y se pone con un "." despu�s de la variable
// ********************************************************************************

// Traemos un shapefile para el filtro
var shape = ee.FeatureCollection('users/dmlmont/Taller_GEE_Univalle/SHP');

// Acceso a la colecci�n de im�genes de Landsat-8 (MULTIESPECTRAL)
// La colecci�n se guarda en la variable "l8"
var l8 = ee.ImageCollection("LANDSAT/LC08/C01/T1_SR");

// Filtrar la colecci�n por la ubicaci�n de objetos en la variable "shape"
var l8_filtrada = l8.filterBounds(shape);

// Imprimir en consola las 10 primeras im�genes de la colecci�n "l8" filtrada
print("COLECCI�N LANDSAT-8 FILTRADA POR UBICACI�N",l8_filtrada.limit(10));

// Acceso a una imagen de la colecci�n de Landsat-8 filtrada (MULTIESPECTRAL)
// La imagen se guarda en la variable "l8_image"
var l8_img = ee.Image("LANDSAT/LC08/C01/T1_SR/LC08_009058_20130401");

// Imprimir en la consola la imagen "l8_img"
print("IMAGEN LANDSAT-8",l8_img);

// ********************************************************************************
// VARIOS FILTROS AL TIEMPO
// ********************************************************************************
// Se pueden aplicar filtros de fecha y ubicaci�n al tiempo
// Ambos se ponen con un "." inmediatamente despu�s del otro en la variable de la colecci�n
// ********************************************************************************

// Acceso a la colecci�n de im�genes de Landsat-7 (MULTIESPECTRAL)
// La colecci�n se guarda en la variable "l7_filtrada"
// La colecci�n se filtra por fechas "2008-01-01" a "2009-01-01"
// La colecci�n se filtra por la ubicaci�n de objetos en la variable "shape"
var l7_filtrada = ee.ImageCollection("LANDSAT/LE07/C01/T1_SR")
  .filterDate("2008-01-01","2009-01-01")
  .filterBounds(shape);

// Imprimir en consola las 10 primeras im�genes de la colecci�n "l7"
print("COLECCI�N LANDSAT-7 FILTRADA POR FECHA Y UBICACI�N",l7_filtrada.limit(10));

// Acceso a una imagen de la colecci�n de Landsat-7 (MULTIESPECTRAL)
// La colecci�n se guarda en la variable "l7_image"
var l7_img = ee.Image("LANDSAT/LE07/C01/T1_SR/LE07_009058_20080320");

// Imprimir en la consola la imagen "l7_img"
print("IMAGEN LANDSAT-7",l7_img);