# Recolección de avales digitales para candidaturas electorales en España

Based on BOE-A-2011-14814: "Instrucción 7/2011, de 15 de septiembre, de la Junta Electoral Central, relativa al procedimiento de acreditación de firmas de apoyo de candidaturas al Congreso de los Diputados, al Senado y al Parlamento Europeo previsto en los artículos 169 y 220 de la Ley Orgánica del Régimen Electoral General."

Link to BOE: [BOE-A-2011-14814](https://www.boe.es/buscar/act.php?id=BOE-A-2011-14814#an)

Esto es un proyecto de página web estática que permite firmar archivos XML utilizando la librería `@firma` con formato XaDes.

# Descarga de autoscript.js
[Portal Cliente de firma electrónica de @firma (autoscript.js)](https://administracionelectronica.gob.es/ctt/verPestanaDescargas.htm?idIniciativa=clienteafirma&idioma=es)

# Licencia
This project is licensed under the [MIT License](LICENSE).

# BOE

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

El fichero firmado deberá tener, por tanto, la estructura reflejada en el siguiente ejemplo: