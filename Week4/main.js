// 1️⃣ String Parsing Function
function parseString(input) {
  if (typeof input !== "string") throw new Error("Input must be a string");

  const trimmed = input.trim();
  return {
    length: input.length,
    words: trimmed ? trimmed.split(/\s+/) : [],
    upper: input.toUpperCase(),
    lower: input.toLowerCase(),
    capitalized: input
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" "),
  };
}

// 2️⃣ API Call Function
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return null;
  }
}

// 3️⃣ Math Logic Function
function calculate(operation, a, b) {
  switch (operation) {
    case "add":
      return a + b;
    case "subtract":
      return a - b;
    case "multiply":
      return a * b;
    case "divide":
      if (b === 0) throw new Error("Cannot divide by zero");
      return a / b;
    default:
      throw new Error("Unsupported operation");
  }
}

module.exports = { parseString, fetchData, calculate };
