var parser = new DOMParser();

function makeRequest(method, url) {
  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response);
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText,
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText,
      });
    };
    xhr.send();
  });
}

async function doRequests() {
  var candidatura = await makeRequest("GET", "xml/candidatura.xml");
  console.log(candidatura);
}

document.addEventListener("DOMContentLoaded", function () {
  doRequests();
  // create and manipulate your DOM here. doAjaxThings() will run asynchronously and not block your DOM rendering
  console.log("DOM fully loaded and parsed");
});

async function populateAvalistaXml() {
  var xmlPreviewSpan = document.getElementById("xml-preview");
  xmlPreviewSpan.textContent = "";
  xmlPreviewSpan.classList.remove("error");

  // Check for empty required fields
  var requiredFields = ["nomb", "ape1", "ape2", "fnac", "tipoid", "id"];
  var isFormValid = true;

  requiredFields.forEach(function (fieldId) {
    var fieldValue = document.getElementById(fieldId).value;
    if (fieldValue.trim() === "") {
      isFormValid = false;
      console.log("El campo " + fieldId + " es requerido.");
      xmlPreviewSpan.textContent += "El campo " + fieldId + " es requerido.\n";
    }
  });

  if (!isFormValid) {
    console.log("Please fill in all required fields.");
    xmlPreviewSpan.textContent += "Por favor, rellene todos los campos.\n";
    xmlPreviewSpan.classList.remove("error");
    return;
  }

  var avalista = document.implementation.createDocument("", "", null);

  // Get form values
  var nombre = document.getElementById("nomb").value;
  var apellido1 = document.getElementById("ape1").value;
  var apellido2 = document.getElementById("ape2").value;
  var fechaNacimiento = document.getElementById("fnac").value;
  var tipoDocumento = document.getElementById("tipoid").value;
  var numeroDocumento = document.getElementById("id").value;

  // Create XML elements and append them to doc
  var avalistaElement = avalista.createElement("avalista");
  avalista.appendChild(avalistaElement);

  var nombreElement = avalista.createElement("nomb");
  nombreElement.textContent = nombre;
  avalistaElement.appendChild(nombreElement);

  var apellido1Element = avalista.createElement("ape1");
  apellido1Element.textContent = apellido1;
  avalistaElement.appendChild(apellido1Element);

  var apellido2Element = avalista.createElement("ape2");
  apellido2Element.textContent = apellido2;
  avalistaElement.appendChild(apellido2Element);

  var fechaNacimientoElement = avalista.createElement("fnac");
  fechaNacimientoElement.textContent = fechaNacimiento.replace(/-/g, "");
  avalistaElement.appendChild(fechaNacimientoElement);

  var tipoDocumentoElement = avalista.createElement("tipoid");
  tipoDocumentoElement.textContent = tipoDocumento;
  avalistaElement.appendChild(tipoDocumentoElement);

  var numeroDocumentoElement = avalista.createElement("id");
  numeroDocumentoElement.textContent = numeroDocumento;
  avalistaElement.appendChild(numeroDocumentoElement);

  // Print XML to textarea
  var serializer = new XMLSerializer();
  var xmlString = serializer.serializeToString(avalista);

  xmlPreviewSpan.textContent = xmlString;
}

function invokeSign() {
  var xmlPreviewTextarea = document.getElementById("xml-preview");
  var xml = xmlPreviewTextarea.value;
  var parser = new DOMParser();
  var xmlDoc = parser.parseFromString(xml, "text/xml");
  var format = "XAdES Enveloped";
  var encoding = "UTF-8";
  var mimeType = "text/xml";
  insertEnvelopedSignatureOnNodeByXPath(xmlDoc, "/oce/avalcandidatura");
  let dataB64 = AutoScript.getBase64FromXML(xmlDoc);
  AutoScript.sign(dataB64, "SHA512withRSA", "XAdES");
}
