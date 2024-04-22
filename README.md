# Recolección de avales digitales para candidaturas electorales en España

Based on BOE-A-2011-14814: "Instrucción 7/2011, de 15 de septiembre, de la Junta Electoral Central, relativa al procedimiento de acreditación de firmas de apoyo de candidaturas al Congreso de los Diputados, al Senado y al Parlamento Europeo previsto en los artículos 169 y 220 de la Ley Orgánica del Régimen Electoral General."

Link to BOE: [BOE-A-2011-14814](https://www.boe.es/buscar/act.php?id=BOE-A-2011-14814#an)

Esto es un proyecto de página web estática que permite firmar archivos XML utilizando la librería `@firma` con formato XaDes.

# Descarga de autoscript.js
[Portal Cliente de firma electrónica de @firma (autoscript.js)](https://administracionelectronica.gob.es/ctt/verPestanaDescargas.htm?idIniciativa=clienteafirma&idioma=es)

# Licencia
This project is licensed under the [MIT License](LICENSE).

# (BOE) II. Especificaciones técnicas para la recogida de avales de candidaturas con firma electrónica 
(ANEXO A LA INSTRUCCIÓN 7/2011, DE 15 DE SEPTIEMBRE DE 2011, DE LA JUNTA ELECTORAL CENTRAL)

## Introducción

Los avales para las candidaturas electorales deberán presentarse en formato XML y firmados electrónicamente por el avalista. En este documento se detalla el formato del fichero xml a firmar, el tipo de firma a incorporar y el formato del fichero zip a entregar en la Junta Electoral competente.

## Formato

El formato del fichero sin firmar es el siguiente:

https://github.com/nestoroa/aval-candidatura-digital/blob/main/xml/aval-sin-firmar.xml

La estructura y restricciones de contenido del fichero queda definido por el siguiente fichero xsd (XML Schema Definition).

https://github.com/nestoroa/aval-candidatura-digital/blob/main/xml/aval-sin-firmar.xsd

## Firma
El fichero a entregar deberá incorporar una firma XMLDsig. Esta firma se incorporará al propio fichero de aval, firmando los datos del nodo «avalcandidatura», esto es, una firma tipo «enveloped».

El fichero de aval firmado deberá verificar las especificaciones siguientes:

1. [XMLDSig] XML Signature Syntax and Processing.

2. [XADES] XML Advanced Electronic Signatures ETSI TS 101 903.

El fichero firmado deberá tener, por tanto, la estructura reflejada en el siguiente ejemplo (Ver BOE-A-2011-14814).

### Nombre de los ficheros XML.
El fichero anterior deberá almacenarse con el nombre siguiente NNNNNNNNN.xml donde NNNNNNNNN es el NIF/NIE de la persona que avala la candidatura y que además firma el aval. Esto es, es el NIF/NIE del certificado usado para firmar y el NIF/NIE del campo <ID>.

### Formato del fichero ZIP.
Para cada tipo de elecciones, circunscripción y candidatura se formará un fichero zip con todos los avales correspondientes, con el siguiente nombre:

EEEEEE.CCCCCC.PPPPPP.zip, donde cada campo tiene el siguiente significado:

| Campo | Descripción |
| --- | --- |
| EEEEEE | Nombre de elecciones. Sólo se admiten los valores especificados para la etiqueta <elecciones /> del xml de entrega. Éstos valores aparecen recogidos en el esquema. |
| CCCCCC | Nombre de la circunscripción. Sólo se admiten los valores especificados para la etiqueta <circunscripción /> del xml de entrega. Éstos valores aparecen recogidos en el esquema. |
| PPPPPP | Nombre de la candidatura. Sólo se admiten los valores especificados para la etiqueta <nombre /> del xml de entrega. Éstos valores aparecen recogidos en el esquema. |

Así por ejemplo, para una candidatura de nombre Candidatura1, que presenta avales al Congreso y al Senado por la circunscripción de Almería, el nombre del fichero sería:

CONGRESO Y SENADO.Almería.Candidatura1.zip, y todos los ficheros xml del fichero zip deberán tener esos valores en las etiquetas correspondientes.

En el supuesto de candidaturas al Congreso y al Senado (elecciones=CONGRESO y SENADO) en las provincias insulares, dado que las circunscripciones de ambas elecciones son distintas, se deberán aportar dos ficheros zip, uno con los avales al Congreso para la circunscripción provincial y otro con los avales al Senado para la circunscripción de la isla o agrupación de islas por la que se pretenda la candidatura.