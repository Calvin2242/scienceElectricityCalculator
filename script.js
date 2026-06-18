const sections = {
  transformer: document.getElementById('transformer-section'),
  watt: document.getElementById('watt-section'),
  ohm: document.getElementById('ohm-section'),
};

const resultSummary = document.getElementById('result-summary');
const resultSteps = document.getElementById('result-steps');

const stateButtons = {
  transformer: document.getElementById('btn-transformer'),
  watt: document.getElementById('btn-watt'),
  ohm: document.getElementById('btn-ohm'),
};

function setActiveSection(key) {
  Object.keys(sections).forEach((sectionKey) => {
    sections[sectionKey].classList.toggle('active', sectionKey === key);
    stateButtons[sectionKey].classList.toggle('active', sectionKey === key);
  });
  resultSummary.textContent = 'Enter values and click Calculate to see the result and steps.';
  resultSteps.innerHTML = '';
}

function parseValue(id) {
  const value = document.getElementById(id).value.trim();
  return value === '' ? null : Number(value);
}

function createStepParagraph(text) {
  const p = document.createElement('p');
  p.textContent = text;
  return p;
}

function showResult(summary, steps) {
  resultSummary.textContent = summary;
  resultSteps.innerHTML = '';
  steps.forEach((step) => {
    const paragraph = document.createElement('p');
    paragraph.textContent = step;
    resultSteps.appendChild(paragraph);
  });
}

function calculateTransformer() {
  const vp = parseValue('vp');
  const vs = parseValue('vs');
  const np = parseValue('np');
  const ns = parseValue('ns');

  const values = [vp, vs, np, ns];
  const emptyCount = values.filter((value) => value === null).length;

  if (emptyCount !== 1) {
    showResult('Error: Leave exactly one field blank.', ['For transformer calculation, one value must be missing.']);
    return;
  }

  if (vp === null) {
    const result = (vs * np) / ns;
    const steps = [
      'Transformer equation: Vp / Vs = Np / Ns',
      'Rearranged for Vp: Vp = (Vs * Np) / Ns',
      `Substitute values: Vp = (${vs} * ${np}) / ${ns}`,
      `Result: Vp = ${result.toFixed(6)} V`,
    ];
    showResult(`Primary voltage Vp = ${result.toFixed(6)} V`, steps);
    return;
  }

  if (vs === null) {
    const result = (vp * ns) / np;
    const steps = [
      'Transformer equation: Vp / Vs = Np / Ns',
      'Rearranged for Vs: Vs = (Vp * Ns) / Np',
      `Substitute values: Vs = (${vp} * ${ns}) / ${np}`,
      `Result: Vs = ${result.toFixed(6)} V`,
    ];
    showResult(`Secondary voltage Vs = ${result.toFixed(6)} V`, steps);
    return;
  }

  if (np === null) {
    const result = (ns * vp) / vs;
    const steps = [
      'Transformer equation: Vp / Vs = Np / Ns',
      'Rearranged for Np: Np = (Ns * Vp) / Vs',
      `Substitute values: Np = (${ns} * ${vp}) / ${vs}`,
      `Result: Np = ${result.toFixed(6)} turns`,
    ];
    showResult(`Primary turns Np = ${result.toFixed(6)}`, steps);
    return;
  }

  const result = (np * vs) / vp;
  const steps = [
    'Transformer equation: Vp / Vs = Np / Ns',
    'Rearranged for Ns: Ns = (Np * Vs) / Vp',
    `Substitute values: Ns = (${np} * ${vs}) / ${vp}`,
    `Result: Ns = ${result.toFixed(6)} turns`,
  ];
  showResult(`Secondary turns Ns = ${result.toFixed(6)}`, steps);
}

function calculateWatt() {
  const p = parseValue('pw');
  const v = parseValue('vw');
  const i = parseValue('iw');
  const values = [p, v, i];
  const emptyCount = values.filter((value) => value === null).length;

  if (emptyCount !== 1) {
    showResult('Error: Leave exactly one field blank.', ['For watt calculation, one value must be missing.']);
    return;
  }

  if (p === null) {
    const result = v * i;
    const steps = [
      'Power equation: P = V * I',
      `Substitute values: P = ${v} * ${i}`,
      `Result: P = ${result.toFixed(6)} W`,
    ];
    showResult(`Power P = ${result.toFixed(6)} W`, steps);
    return;
  }

  if (v === null) {
    const result = p / i;
    const steps = [
      'Power equation: P = V * I',
      'Rearranged for V: V = P / I',
      `Substitute values: V = ${p} / ${i}`,
      `Result: V = ${result.toFixed(6)} V`,
    ];
    showResult(`Voltage V = ${result.toFixed(6)} V`, steps);
    return;
  }

  const result = p / v;
  const steps = [
    'Power equation: P = V * I',
    'Rearranged for I: I = P / V',
    `Substitute values: I = ${p} / ${v}`,
    `Result: I = ${result.toFixed(6)} A`,
  ];
  showResult(`Current I = ${result.toFixed(6)} A`, steps);
}

function calculateOhm() {
  const v = parseValue('vo');
  const i = parseValue('io');
  const r = parseValue('ro');
  const values = [v, i, r];
  const emptyCount = values.filter((value) => value === null).length;

  if (emptyCount !== 1) {
    showResult('Error: Leave exactly one field blank.', ['For Ohm\'s Law calculation, one value must be missing.']);
    return;
  }

  if (v === null) {
    const result = i * r;
    const steps = [
      'Ohm\'s Law: V = I * R',
      `Substitute values: V = ${i} * ${r}`,
      `Result: V = ${result.toFixed(6)} V`,
    ];
    showResult(`Voltage V = ${result.toFixed(6)} V`, steps);
    return;
  }

  if (i === null) {
    const result = v / r;
    const steps = [
      'Ohm\'s Law: V = I * R',
      'Rearranged for I: I = V / R',
      `Substitute values: I = ${v} / ${r}`,
      `Result: I = ${result.toFixed(6)} A`,
    ];
    showResult(`Current I = ${result.toFixed(6)} A`, steps);
    return;
  }

  const result = v / i;
  const steps = [
    'Ohm\'s Law: V = I * R',
    'Rearranged for R: R = V / I',
    `Substitute values: R = ${v} / ${i}`,
    `Result: R = ${result.toFixed(6)} Ω`,
  ];
  showResult(`Resistance R = ${result.toFixed(6)} Ω`, steps);
}

document.getElementById('btn-transformer').addEventListener('click', () => setActiveSection('transformer'));
document.getElementById('btn-watt').addEventListener('click', () => setActiveSection('watt'));
document.getElementById('btn-ohm').addEventListener('click', () => setActiveSection('ohm'));
document.getElementById('calc-transformer').addEventListener('click', calculateTransformer);
document.getElementById('calc-watt').addEventListener('click', calculateWatt);
document.getElementById('calc-ohm').addEventListener('click', calculateOhm);
