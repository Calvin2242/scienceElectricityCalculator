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

function formatResult(num) {
  return parseFloat(num.toPrecision(4)).toString();
}

function createStepParagraph(text) {
  const p = document.createElement('p');
  p.textContent = text;
  return p;
}

function showResult(summary, steps) {
  resultSummary.innerHTML = summary;
  resultSteps.innerHTML = '';
  steps.forEach((step, index) => {
    const paragraph = document.createElement('p');
    paragraph.className = 'step-line';
    paragraph.innerHTML = `<span class="step-number">${index + 1}</span> ${step}`;
    resultSteps.appendChild(paragraph);
  });
  renderMathInElement(document.getElementById('result-summary'), { delimiters: [{left: '$$', right: '$$', display: true}, {left: '$', right: '$', display: false}] });
  renderMathInElement(resultSteps, { delimiters: [{left: '$$', right: '$$', display: true}, {left: '$', right: '$', display: false}] });
}

function calculateTransformer() {
  const vp = parseValue('vp');
  const vs = parseValue('vs');
  const np = parseValue('np');
  const ns = parseValue('ns');

  const values = [vp, vs, np, ns];
  const emptyCount = values.filter((value) => value === null).length;

  if (emptyCount !== 1) {
    showResult('Error: Leave exactly one field blank.', ['For transformer calculation, ONLY one value must be missing.']);
    return;
  }

  if (vp === null) {
    const result = (vs * np) / ns;
    const formattedResult = formatResult(result);
    const steps = [
      '<strong>Transformer equation:</strong> $\\frac{V_p}{V_s} = \\frac{N_p}{N_s}$',
      '<strong>Rearranged for</strong> $V_p$: $V_p = \\frac{V_s \\times N_p}{N_s}$',
      `<strong>Substitute values:</strong> $V_p = \\frac{${vs} \\times ${np}}{${ns}}$`,
      `<strong>Result:</strong> $V_p = ${formattedResult} \\text{ V}$`,
    ];
    showResult(`Primary voltage $V_p = ${formattedResult}$ V`, steps);
    return;
  }

  if (vs === null) {
    const result = (vp * ns) / np;
    const formattedResult = formatResult(result);
    const steps = [
      '<strong>Transformer equation:</strong> $\\frac{V_p}{V_s} = \\frac{N_p}{N_s}$',
      '<strong>Rearranged for</strong> $V_s$: $V_s = \\frac{V_p \\times N_s}{N_p}$',
      `<strong>Substitute values:</strong> $V_s = \\frac{${vp} \\times ${ns}}{${np}}$`,
      `<strong>Result:</strong> $V_s = ${formattedResult} \\text{ V}$`,
    ];
    showResult(`Secondary voltage $V_s = ${formattedResult}$ V`, steps);
    return;
  }

  if (np === null) {
    const result = (ns * vp) / vs;
    const formattedResult = formatResult(result);
    const steps = [
      '<strong>Transformer equation:</strong> $\\frac{V_p}{V_s} = \\frac{N_p}{N_s}$',
      '<strong>Rearranged for</strong> $N_p$: $N_p = \\frac{N_s \\times V_p}{V_s}$',
      `<strong>Substitute values:</strong> $N_p = \\frac{${ns} \\times ${vp}}{${vs}}$`,
      `<strong>Result:</strong> $N_p = ${formattedResult} \\text{ turns}$`,
    ];
    showResult(`Primary turns $N_p = ${formattedResult}$`, steps);
    return;
  }

  const result = (np * vs) / vp;
  const formattedResult = formatResult(result);
  const steps = [
    '<strong>Transformer equation:</strong> $\\frac{V_p}{V_s} = \\frac{N_p}{N_s}$',
    '<strong>Rearranged for</strong> $N_s$: $N_s = \\frac{N_p \\times V_s}{V_p}$',
    `<strong>Substitute values:</strong> $N_s = \\frac{${np} \\times ${vs}}{${vp}}$`,
    `<strong>Result:</strong> $N_s = ${formattedResult} \\text{ turns}$`,
  ];
  showResult(`Secondary turns $N_s = ${formattedResult}$`, steps);
}

function calculateWatt() {
  const p = parseValue('pw');
  const v = parseValue('vw');
  const i = parseValue('iw');
  const values = [p, v, i];
  const emptyCount = values.filter((value) => value === null).length;

  if (emptyCount !== 1) {
    showResult('Error: Leave exactly one field blank.', ['For watt calculation, ONLY one value must be missing.']);
    return;
  }

  if (p === null) {
    const result = v * i;
    const formattedResult = formatResult(result);
    const steps = [
      '<strong>Power equation:</strong> $P = V \\times I$',
      `<strong>Substitute values:</strong> $P = ${v} \\times ${i}$`,
      `<strong>Result:</strong> $P = ${formattedResult} \\text{ W}$`,
    ];
    showResult(`Power $P = ${formattedResult}$ W`, steps);
    return;
  }

  if (v === null) {
    const result = p / i;
    const formattedResult = formatResult(result);
    const steps = [
      '<strong>Power equation:</strong> $P = V \\times I$',
      '<strong>Rearranged for</strong> $V$: $V = \\frac{P}{I}$',
      `<strong>Substitute values:</strong> $V = \\frac{${p}}{${i}}$`,
      `<strong>Result:</strong> $V = ${formattedResult} \\text{ V}$`,
    ];
    showResult(`Voltage $V = ${formattedResult}$ V`, steps);
    return;
  }

  const result = p / v;
  const formattedResult = formatResult(result);
  const steps = [
    '<strong>Power equation:</strong> $P = V \\times I$',
    '<strong>Rearranged for</strong> $I$: $I = \\frac{P}{V}$',
    `<strong>Substitute values:</strong> $I = \\frac{${p}}{${v}}$`,
    `<strong>Result:</strong> $I = ${formattedResult} \\text{ A}$`,
  ];
  showResult(`Current $I = ${formattedResult}$ A`, steps);
}

function calculateOhm() {
  const v = parseValue('vo');
  const i = parseValue('io');
  const r = parseValue('ro');
  const values = [v, i, r];
  const emptyCount = values.filter((value) => value === null).length;

  if (emptyCount !== 1) {
    showResult('Error: Leave exactly one field blank.', ['For Ohm\'s Law calculation, ONLY one value must be missing.']);
    return;
  }

  if (v === null) {
    const result = i * r;
    const formattedResult = formatResult(result);
    const steps = [
      '<strong>Ohm\'s Law:</strong> $V = I \\times R$',
      `<strong>Substitute values:</strong> $V = ${i} \\times ${r}$`,
      `<strong>Result:</strong> $V = ${formattedResult} \\text{ V}$`,
    ];
    showResult(`Voltage $V = ${formattedResult}$ V`, steps);
    return;
  }

  if (i === null) {
    const result = v / r;
    const formattedResult = formatResult(result);
    const steps = [
      '<strong>Ohm\'s Law:</strong> $V = I \\times R$',
      '<strong>Rearranged for</strong> $I$: $I = \\frac{V}{R}$',
      `<strong>Substitute values:</strong> $I = \\frac{${v}}{${r}}$`,
      `<strong>Result:</strong> $I = ${formattedResult} \\text{ A}$`,
    ];
    showResult(`Current $I = ${formattedResult}$ A`, steps);
    return;
  }

  const result = v / i;
  const formattedResult = formatResult(result);
  const steps = [
    '<strong>Ohm\'s Law:</strong> $V = I \\times R$',
    '<strong>Rearranged for</strong> $R$: $R = \\frac{V}{I}$',
    `<strong>Substitute values:</strong> $R = \\frac{${v}}{${i}}$`,
    `<strong>Result:</strong> $R = ${formattedResult} \\text{ Ω}$`,
  ];
  showResult(`Resistance $R = ${formattedResult}$ Ω`, steps);
}

document.getElementById('btn-transformer').addEventListener('click', () => setActiveSection('transformer'));
document.getElementById('btn-watt').addEventListener('click', () => setActiveSection('watt'));
document.getElementById('btn-ohm').addEventListener('click', () => setActiveSection('ohm'));
document.getElementById('calc-transformer').addEventListener('click', calculateTransformer);
document.getElementById('calc-watt').addEventListener('click', calculateWatt);
document.getElementById('calc-ohm').addEventListener('click', calculateOhm);
