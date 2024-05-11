function validateAndCalculate() {
    const sampleMean = parseFloat(document.getElementById('sampleMean').value);
    const popStdDev = parseFloat(document.getElementById('popStdDev').value);
    const sampleSize = parseFloat(document.getElementById('sampleSize').value);
    const popMean = parseFloat(document.getElementById('popMean').value);
    const alternative = document.getElementById('alternative').value;
    const significanceLevel = parseFloat(document.getElementById('significanceLevel').value);
    const tailType = document.getElementById('tailType').value;

    console.log("Sample Mean:", sampleMean);
    console.log("Population Standard Deviation:", popStdDev);
    console.log("Sample Size:", sampleSize);
    console.log("Population Mean:", popMean);
    console.log("Alternative Hypothesis:", alternative);
    console.log("Level of Significance:", significanceLevel);
    console.log("Tail Type:", tailType);

    const errorMessages = [];
    if (isNaN(sampleMean)) errorMessages.push("Sample Mean is required.");
    if (isNaN(popStdDev)) errorMessages.push("Population Standard Deviation is required.");
    if (isNaN(sampleSize)) errorMessages.push("Sample Size is required.");
    if (isNaN(popMean)) errorMessages.push("Population Mean is required.");
    if (isNaN(significanceLevel)) errorMessages.push("Level of Significance is required.");

    if (errorMessages.length > 0) {
        const errorDiv = document.getElementById('errorMessages');
        errorDiv.innerHTML = errorMessages.join('<br>');
        return;
    }

    calculateZTest(sampleMean, popStdDev, sampleSize, popMean, alternative, significanceLevel, tailType);
}
