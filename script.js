function validateAndCalculate() {
  const sampleMean = parseFloat(document.getElementById("sampleMean").value);
  const popStdDev = parseFloat(document.getElementById("popStdDev").value);
  const sampleSize = parseFloat(document.getElementById("sampleSize").value);
  const popMean = parseFloat(document.getElementById("popMean").value);
  const alternative = document.getElementById("alternative").value;
  const significanceLevel = parseFloat(
    document.getElementById("significanceLevel").value
  );
  const tailType = document.getElementById("tailType").value;

  const errorMessages = [];
  if (isNaN(sampleMean)) errorMessages.push("Sample Mean is required.");
  if (isNaN(popStdDev))
    errorMessages.push("Population Standard Deviation is required.");
  if (isNaN(sampleSize)) errorMessages.push("Sample Size is required.");
  if (isNaN(popMean)) errorMessages.push("Population Mean is required.");
  if (isNaN(significanceLevel))
    errorMessages.push("Level of Significance is required.");

  if (errorMessages.length > 0) {
    const errorDiv = document.getElementById("errorMessages");
    errorDiv.innerHTML = errorMessages.join("<br>");
    return;
  }

  calculateZTest(
    sampleMean,
    popStdDev,
    sampleSize,
    popMean,
    alternative,
    significanceLevel,
    tailType
  );
}

function calculateZTest(
  sampleMean,
  popStdDev,
  sampleSize,
  popMean,
  alternative,
  significanceLevel,
  tailType
) {
  const zScore = (sampleMean - popMean) / (popStdDev / Math.sqrt(sampleSize));
  let pValue = 0;

  if (alternative === "greater") {
    pValue = 1 - standardNormalCDF(zScore);
  } else if (alternative === "less") {
    pValue = standardNormalCDF(zScore);
  } else if (alternative === "notEqual") {
    pValue = 2 * (1 - standardNormalCDF(Math.abs(zScore)));
  }

  let result = "";

  if (tailType === "oneTailed") {
    if (pValue < significanceLevel) {
      result += '<span class="reject">Reject Null Hypothesis</span>\n' + "\n";
    } else {
      result +=
        '<span class="accept">Fail to Reject Null Hypothesis</span>\n' + "\n";
    }
  } else if (tailType === "twoTailed") {
    if (pValue < significanceLevel / 2) {
      result += '<span class="reject">Reject Null Hypothesis</span>\n' + "\n";
    } else {
      result +=
        '<span class="accept">Fail to Reject Null Hypothesis</span>\n' + "\n";
    }
  }

  // Append Test Statistic (Z) and P-value on separate lines
  result += "Test Statistic (Z): " + zScore.toFixed(4) + "\n";
  result += "P-value: " + pValue.toFixed(4) + "\n";

  // Display the result
  document.getElementById("result").innerHTML = result;

  const errorDiv = document.getElementById("errorMessages");
  errorDiv.innerHTML = ""; // Clear any previous error messages
}

// Append each part of the result separately
result += "Test Statistic (Z): " + zScore.toFixed(4) + "\n";
result += "P-value: " + pValue.toFixed(4) + "\n";

// Display the result
document.getElementById("result").textContent = result;

const errorDiv = document.getElementById("errorMessages");
errorDiv.innerHTML = ""; // Clear any previous error messages

function standardNormalCDF(z) {
  return 0.5 * (1 + Math.sign(z) * erf(Math.abs(z) / Math.sqrt(2)));
}

function erf(x) {
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  const sign = x < 0 ? -1 : 1;
  const t = 1 / (1 + p * Math.abs(x));
  const y =
    1 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

  return 0.5 * (1 + sign * y);
}
