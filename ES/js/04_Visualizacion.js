// ********************************************************************************
// VISUALIZACI�N
// ********************************************************************************
// Todos los objetos espaciales (Im�genes y shapes) pueden visualizarse en el mapa
// El mapa tiene por defecto el nombre de variable "Map"
// ********************************************************************************

// Traemos un shapefile
var shape = ee.FeatureCollection("users/dmlmont/Taller_GEE_Univalle/SHP");

// Traemos una imagen Sentinel-2
var s2 = ee.ImageCollection("COPERNICUS/S2")
  .filterDate("2019-01-01","2019-03-01")
  .filterBounds(shape)
  .first();

// ********************************************************************************
// OPCIONES DE VISUALIZACI�N
// ********************************************************************************
// La visualizaci�n depende de las opciones dadas
// Las opciones pueden variar dependiendo de la imagen o shape
// ********************************************************************************

// ********************************************************************************
// OPCIONES B�SICAS DE VISUALIZACI�N DE SHAPES
// ********************************************************************************
// color: "C�digo HEX de un color"
// strokeWidth: "Grosor de la l�nea en pixeles"
// ********************************************************************************

// Visualizaci�n de shape en color rojo con grosor de l�nea 5
var shape_options = {
  color:'FF0000',
  strokeWidth: 5
};

// ********************************************************************************
// OPCIONES B�SICAS DE VISUALIZACI�N DE IM�GENES
// ********************************************************************************
// min: "Valor m�nimo de la imagen a visualizar (por lo general es cero)"
// max: "Valor m�ximo de la imagen a visualizar (no tiene que ser el m�ximo)"
// bands: "Lista de bandas para componer"
// ********************************************************************************

// Visualizaci�n de imagen en valores de 0 a 3000 de las bandas visibles de Sentinel-2
var s2_options_RGB = {
  min: 0,
  max: 3000,
  bands: ["B4","B3","B2"]
};

// Visualizaci�n de imagen en valores de 0 a 5000 de las bandas NIR, Rojo y Azul de Sentinel-2
var s2_options_NIR = {
  min: 0,
  max: 5000,
  bands: ["B8","B4","B2"]
};

// ********************************************************************************
// ADICIONAR OBJETOS AL MAPA
// ********************************************************************************
// Los objetos se adicionan con la funci�n .addLayer("Objeto","Opciones de visualizaci�n","Nombre de Layer")
// Se pueden adicionar varios objetos al mapa
// El orden de visualizaci�n es igual al orden de adici�n
// ********************************************************************************

// Adicionar imagen Sentinel-2 en RGB
Map.addLayer(s2,s2_options_RGB,"SENTINEL-2 RGB");

// Adicionar imagen Sentinel-2 en NIR
Map.addLayer(s2,s2_options_NIR,"SENTINEL-2 NIR");

// Adicionar shapefiles
Map.addLayer(shape,shape_options,"SHAPEFILE");

// Centrar el mapa en el ojeto shapefile
// Tambi�n puede centrarse en una imagen
// Se utiliza la funci�n .centerObject("Objeto")
Map.centerObject(shape);