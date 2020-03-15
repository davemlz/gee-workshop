// ********************************************************************************
// CREACI�N DE SHAPES
// ********************************************************************************
// Para crear un shape se utilizan las herramientas de dibujo del mapa
// Las herramientas de dibujo se encuentran en la esquina superior izquierda del mapa
// Se pueden crear geometr�as de puntos, l�neas y pol�gonos
// En la pesta�a "Geometry imports", al lado de las herramientas de dibujo, se manejan las geometr�as creados
// En esa misma pesta�a se crean nuevas con la opci�n "+ new layer"
// ********************************************************************************

// Se han creado dos geometr�as de pol�gonos y aparecen al inicio del Script en la pesta�a "Imports"
// El nombre de la geometr�a se puede cambiar de "geometry" a cualquier otro (sin espacios)
// No es necesario volverlos a crear en el Script con la funci�n "var"
// Ya se pueden utilizar e imprimir en la consola
print("POL�GONO 1",poly1);
print("POL�GONO 2",poly2);

// Acceder a las coordenadas de los v�rtices del pol�gono, funci�n .coordinaets()
print("COORDENADAS POL�GONO 1",poly1.coordinates());

// Obtener el per�metro y el �rea de las geometr�as, funciones .perimeter() y .area()
print("PER�METRO DEL POL�GONO 1 (m)",poly1.perimeter());
print("�REA DEL POL�GONO 1 (m^2)",poly1.area());

// Para obtener el �rea en Ha dividimos con la funci�n .divide("Valor para dividir")
print("�REA DEL POL�GONO 1 (Ha)",poly1.area().divide(10000^2));

// ********************************************************************************
// GEOPROCESOS
// ********************************************************************************
// Diferentes geoprocesos pueden ser aplicados sobre las geometr�as
// En algunos casos deber�n ser necesitados m�s de una geometr�a
// ********************************************************************************

// Crear un bufer de 100 m con la funci�n .buffer("Valor en m")
var buffer = poly1.buffer(100);
Map.addLayer(buffer,{},"BUFFER");

// Crear un centroide con la funci�n .centroid()
var centroid = poly1.centroid();
Map.addLayer(centroid,{color: "#000000"},"CENTROID");

// Crear la envolvente convexa con la funci�n .convexHull()
var convex = poly2.convexHull();
Map.addLayer(convex,{color: "#0000FF"},"CONVEX HULL");

// Realizar la intersecci�n con la funci�n .intersection("Segunda geometr�a")
var inter = poly1.intersection(poly2);
Map.addLayer(inter,{},"INTERSECTION");

// Realizar la uni�n con la funci�n .union("Segunda geometr�a")
var uni = poly1.union(poly2);
Map.addLayer(uni,{},"UNION");

// Realizar la diferencia con la funci�n .difference("Segunda geometr�a")
var diff = poly1.difference(poly2);
Map.addLayer(diff,{},"DIFFERENCE");

// Realizar la diferencia sim�trica con la funci�n .symmetricDifference("Segunda geometr�a")
var symdiff = poly1.symmetricDifference(poly2);
Map.addLayer(symdiff,{},"SYMMETRIC DIFFERENCE");

// ********************************************************************************
// GEOMETR�AS A SHAPEFILES
// ********************************************************************************
// Las geometr�as s�lo son la parte vectorial del shape
// Para asignar atributos hay que convertir las geometr�as a shapes
// ee.Feature("Geometr�a") convierte la geometr�a a shape
// .set({"Atributo1":"Valor1","Atributo2":"Valor2",...}) asigna valores a atributos
// ********************************************************************************

// Convierte la geometr�a "poly1" al shape "shape"
var shape = ee.Feature(poly1)

// Crea dos atributos: Lote y Area
// Al atributo "Lote" se le asigna el valor 1
// Al atributo "Area" se le asigna el c�lculo del �rea de la geometr�a
var shape = shape.set({
  Lote:1,
  Area:poly1.area().divide(10000^2)
});

// Imprimir en la consola el shape
print("GEOMETR�A A SHAPE",shape);