const fs = require('fs');

// Read the input file
fs.readFile('./src/words.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  // Fix the JSON structure
  const fixedData = data.replace(/([{,]\s*)([a-zA-Z0-9_$]+)\s*:/g, '$1"$2":');

  // Write the corrected JSON to the output file
  fs.writeFileSync('./output.json', fixedData, 'utf8');

  console.log('File saved successfully.');
});
