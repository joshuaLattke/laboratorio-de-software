const algorithmSelector = document.getElementById("algorithm");
const arraySizeInput = document.getElementById("arraySize");
const generateButton = document.getElementById("generateArray");
const sortButton = document.getElementById("runSort");
const nextStepButton = document.getElementById("nextStep");
const chart = document.getElementById("chart");
const sortTimeDisplay = document.getElementById("sortTime");
const currentStepDisplay = document.getElementById("currentStep");

let array = [];
let sortSteps = [];
let currentStep = 0;

const generateArray = () => {
  array = Array.from({ length: +arraySizeInput.value }, () => Math.random());
  updateChart(array);
  sortSteps = [];
  currentStep = 0;
  updateInfo();
};

const updateChart = (data, comparedIndices = []) => {
  chart.innerHTML = "";
  const maxValue = Math.max(...data);
  data.forEach((value, index) => {
    const bar = document.createElement("div");
    bar.className = "bar";
    bar.style.height = `${(value / maxValue) * 100}%`;
    if (comparedIndices.includes(index)) bar.classList.add("compared");
    chart.appendChild(bar);
  });
};

const updateInfo = () => {
  sortTimeDisplay.textContent = `Sort Time: ${sortSteps.length ? sortSteps[0].time : 0} seconds`;
  currentStepDisplay.textContent = `Current Step: ${currentStep} / ${sortSteps.length - 1}`;
};

const gnomeSort = (arr) => {
  const array = [...arr];
  const steps = [{ data: [...array], comparedIndices: [] }];
  let index = 0;

  while (index < array.length) {
    if (index === 0 || array[index] >= array[index - 1]) {
      index++;
    } else {
      [array[index], array[index - 1]] = [array[index - 1], array[index]];
      steps.push({ data: [...array], comparedIndices: [index, index - 1] });
      index = index > 1 ? index - 1 : 0;
    }
  }

  return steps;
};

// Define bubbleSort and shellSort similarly...

const runSort = () => {
  const startTime = performance.now();
  const sortFunction = algorithmSelector.value === "bubbleSort"
    ? bubbleSort
    : algorithmSelector.value === "shellSort"
    ? shellSort
    : gnomeSort;

  sortSteps = sortFunction(array);
  const endTime = performance.now();
  sortSteps[0].time = ((endTime - startTime) / 1000).toFixed(2);
  currentStep = 0;
  updateInfo();
  updateChart(sortSteps[currentStep].data);
};

const nextStep = () => {
  if (currentStep < sortSteps.length - 1) {
    currentStep++;
    const { data, comparedIndices } = sortSteps[currentStep];
    updateChart(data, comparedIndices);
    updateInfo();
  }
};

// Event Listeners
generateButton.addEventListener("click", generateArray);
sortButton.addEventListener("click", runSort);
nextStepButton.addEventListener("click", nextStep);

// Initialize
generateArray();
