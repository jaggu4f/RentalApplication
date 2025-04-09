const fs = require('fs');

// Read the raw output (e.g., from a temp file or environment variable)
const rawOutput = fs.readFileSync('hf_output.txt', 'utf8');

const jsonMatch = rawOutput.match(/\{[\s\S]*\}/);

if (jsonMatch) {
  try {
    const parsed = JSON.parse(jsonMatch[0]);
    console.log("::set-output name=review_json::" + JSON.stringify(parsed));
  } catch (e) {
    console.error("❌ Failed to parse JSON:", e.message);
    process.exit(1);
  }
} else {
  console.error("❌ No JSON found in response");
  process.exit(1);
}
