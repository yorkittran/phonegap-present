document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  document.getElementById('name').innerHTML = device.name;
  document.getElementById('cordova').innerHTML = "Cordova: " + device.cordova;
  document.getElementById('model').innerHTML = "Model: " + device.model;
  document.getElementById('platform').innerHTML = "Platform: " + device.platform;
  document.getElementById('uuid').innerHTML = "UUID: " + device.uuid;
  document.getElementById('version').innerHTML = "Version: " + device.version;
  document.getElementById('manufacturer').innerHTML = "Manufacturer: " + device.manufacturer;
  document.getElementById('isVirtual').innerHTML = "isVirtual: " + device.isVirtual;
  document.getElementById('serial').innerHTML = "Serial: " + device.serial;
}