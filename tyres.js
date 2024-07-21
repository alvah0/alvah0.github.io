let crrValue = null;
let innerValue = null;

function updateRiderPowerValue(value) {
    document.getElementById("riderPowerValue").innerText = value;
}

function updateSurfaceValue(value) {
    document.getElementById("surfaceValue").innerText = value;
}


function getCheckedRadioValue(name) {
    let radios = document.getElementsByName(name);
    for (let radio of radios) {
      if (radio.checked) {
        return radio.value;
      }
    }
    return null;
  }


  document.querySelectorAll('input[type=radio][name=inside]').forEach(radio => {
    radio.addEventListener('change', () => {
      let value = getCheckedRadioValue('inside');
      updateInnerValue(value);
    });
  });

  document.querySelectorAll('input[type=radio][name=crr]').forEach(radio => {
    radio.addEventListener('change', () => {
      let value = getCheckedRadioValue('crr');
      updateTyreValue(value);
    });
  });


  function updateTyreValue(value) {
    console.log("Selected value: " + value);
    crrValue = JSON.parse(value)
    console.log(crrValue)
  }

  function updateInnerValue(value) {
    console.log("Selected value: " + value);
    innerValue = value
  }


  function cubicEquationSolver(A, B, C) {
    function f(x) {
      return A * x * x * x + B * x + C;
    }

    function fPrime(x) {
      return 3 * A * x * x + B;
    }

    let x = 1;
    let tolerance = 1e-7;
    let maxIterations = 1000;
    let iteration = 0;

    while (iteration < maxIterations) {
      let fx = f(x);
      let fpx = fPrime(x);
      let deltaX = fx / fpx;
      x -= deltaX;
      if (Math.abs(deltaX) < tolerance) break;
      iteration++;
    }

    return x;
  }



function calculate() {        

    let p = Number(document.getElementById("riderpower").value);
    let s = Number(document.getElementById("surface").value);
    let w = crrValue.width;
    let bcrr = crrValue.crr;
    let crr = (bcrr * innerValue) * (((0.25 * s) ** 2.3)+ 1) * ((1 + 1 / w)**(5*s))
    let r = 1.292; 
    let bcda = 0.27;
    let cda = bcda * (0.0024 * w + 0.94)
    let m = 80;
    let g = 9.81;

    let A = 0.5 * r * cda;
    let B = 2 * crr * m * g;
    let C = -p /1.015;

    let solution = (cubicEquationSolver(A, B, C)) * 3.6;
    document.getElementById("result").innerText = `Bike speed: ${solution.toFixed(2)} km/h`;
    document.getElementById("rollingresult").innerText = `Rolling resistance: ${(B*(solution/3.6)).toFixed(2)} W`;
    document.getElementById("aeroresult").innerText = `Tyre aero penalty to 25 mm: ${((A*(solution/3.6)*(solution/3.6)*(solution/3.6))-((bcda*0.5*r)*(solution/3.6)*(solution/3.6)*(solution/3.6))).toFixed(2)} W`;

    
}