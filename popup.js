const units = {
  bp: {
    toBase: x => x,
    fromBase: x => x
  },
  kb: {
    toBase: x => x * 1e3,
    fromBase: x => x / 1e3
  },
  mb: {
    toBase: x => x * 1e6,
    fromBase: x => x / 1e6
  },
  gb: {
    toBase: x => x * 1e9,
    fromBase: x => x / 1e9
  },
  aa: {
    toBase: x => x * 3,
    fromBase: x => x / 3
  }
};

let updating = false;

function updateFrom(sourceUnit) {
  if (updating) return;
  updating = true;

  const input = document.getElementById(sourceUnit).value;
  const inputVal = parseFloat(input.replace(/,/g, ''));

  if (isNaN(inputVal)) {
    updating = false;
    return;
  }

  const bpValue = units[sourceUnit].toBase(inputVal);

  for (const [unit, conversion] of Object.entries(units)) {
    const field = document.getElementById(unit);
    if (unit !== sourceUnit) {
      const val = conversion.fromBase(bpValue);
      field.value = Number.isFinite(val) ? val.toFixed(3) : '';
    }
  }

  updating = false;
}

for (const unit of Object.keys(units)) {
  document.getElementById(unit).addEventListener('input', () => updateFrom(unit));
}

document.getElementById('clear').addEventListener('click', () => {
  for (const unit of Object.keys(units)) {
    document.getElementById(unit).value = '';
  }
});
