let energyChart;

function updateRiderWeightValue(value) {
  document.getElementById("riderweightValue").innerText = value;
}
function updateBikeWeightValue(value) {
  document.getElementById("bikeweightValue").innerText = value;
}
function updateVelocityValue(value) {
  document.getElementById("velocityValue").innerText = value;
}
function updateWindVelocityValue(value) {
  document.getElementById("windvelocityValue").innerText = value;
}
function updateGradientValue(value) {
  document.getElementById("gradientValue").innerText = value;
}
function updateCdaValue(value) {
  document.getElementById("cdaValue").innerText = value;
}
function updateCrrValue(value) {
  document.getElementById("crrValue").innerText = value;
}

function calculate() {
  const riderweight = Number(document.getElementById("riderweight").value);
  const bikeweight = Number(document.getElementById("bikeweight").value);
  const velocity = document.getElementById("velocity").value;
  const windvelocity = document.getElementById("windvelocity").value;
  const gradient = document.getElementById("gradient").value;
  const cda = document.getElementById("cda").value;
  const crr = document.getElementById("crr").value;
  const rho = 1.292;

  const rollingresistance =
    2 * (velocity / 3.6) * (crr / 10000) * (riderweight + bikeweight) * 9.81;
  const gravity =
    Math.sin((gradient * Math.PI) / 180) *
    (velocity / 3.6) *
    (riderweight + bikeweight) *
    9.81;
  const aero =
    0.5 *
    rho *
    (velocity / 3.6) *
    ((velocity - windvelocity) / 3.6) ** 2 *
    (cda / 100);
    const other = (aero+gravity+rollingresistance)*0.015
  const total = rollingresistance + gravity + aero + other;

  let pro = 39079146.5512 / (total / riderweight) ** 5.54323725055;
  if (pro > 7200) {
    pro = "all day";
  } else if (pro < 1) {
    pro = "no can do";
  } else if (pro > 100) {
    pro = (pro / 60).toFixed(2) + "min";
  } else pro = pro.toFixed(2) + "s";
  document.getElementById(
    "rollingresult"
  ).innerText = `Rolling resistance: ${rollingresistance.toFixed(2)} W`;
  document.getElementById(
    "gravityresult"
  ).innerText = `Gravity: ${gravity.toFixed(2)} W`;
  document.getElementById("aeroresult").innerText = `Aero: ${aero.toFixed(
    2
  )} W`;
  document.getElementById("otherresult").innerText = `Bike Efficiency: ${other.toFixed(2)} W`;
  document.getElementById("totalresult").innerText = `Total: ${total.toFixed(
    2
  )} W`;
  (document.getElementById(
    "pro"
  ).innerText = `Pro can hold that pace for: ${pro}`),
    updateChart(rollingresistance, gravity, aero);
}

function updateChart(rollingresistance, gravity, aero) {
  const ctx = document.getElementById("energyChart").getContext("2d");

  if (energyChart) {
    energyChart.destroy();
  }

  energyChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Rolling resistance", "Gravity", "Aero", "Bike Efficiency"],
      datasets: [
        {
          data: [rollingresistance, gravity, aero, other],
          backgroundColor: ["#ADD8E6", "#36a2eb", "#000080", "#301090"],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: "top",
        },
      },
    },
  });
}
