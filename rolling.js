let energyChart;

function updateMassDiameterValue(value) {
  document.getElementById("massDiameterValue").innerText = value;
}
function updateTyreDiameterValue(value) {
  document.getElementById("tyreDiameterValue").innerText = value;
}
function updateStartVelocityValue(value) {
  document.getElementById("startVelocityValue").innerText = value;
}
function updateEndVelocityValue(value) {
  document.getElementById("endVelocityValue").innerText = value;
}
function updateRollingWeightValue(value) {
  document.getElementById("rollingWeightValue").innerText = value;
}
function updateTimeValue(value) {
  document.getElementById("timeValue").innerText = value;
}

function calculate() {
  const massdiameter = (Number(document.getElementById("massdiameter").value))/2000;
  const tyrediameter = (Number(document.getElementById("tyrediameter").value))/2000;
  const startvelocity = (document.getElementById("startvelocity").value)/3.6;
  const endvelocity = (document.getElementById("endvelocity").value)/3.6;
  const rollingweight = (document.getElementById("rollingweight").value)/1000;
  const time = document.getElementById("time").value;

  const power = 2*((rollingweight * massdiameter * massdiameter) * ((endvelocity ** 2) - (startvelocity ** 2))) / (2 * (tyrediameter ** 2) * time)
  const kinetic = 0.5*80*((endvelocity**2)-(startvelocity**2)) / time

  document.getElementById("result").innerText = `Rolling mass power: ${power.toFixed(2)} W`;
  document.getElementById("kineticresult").innerText = `Kinetic power: ${kinetic.toFixed(2)} W`;
}
