const fs = require('fs');
const wanakana = require('wanakana');

// Function to transform the JSON data
function transformJson(inputFile, outputFile) {
    // Read the input JSON file
    fs.readFile(inputFile, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the input file:', err);
            return;
        }

        // Parse the JSON data
        let jsonData;
        try {
            jsonData = JSON.parse(data);
        } catch (parseErr) {
            console.error('Error parsing JSON data:', parseErr);
            return;
        }

        // Iterate over each object in the JSON array
        jsonData.forEach(item => {
            if (item.jp) {

                delete item.jp.iskata;
                // Add the "kata": false key-value pair
                item.jp.isKatakana = wanakana.isKatakana(item.jp.wd);

            }
        });

        // Convert the transformed data back to a JSON string
        const outputData = JSON.stringify(jsonData, null, 4);

        // Write the transformed data to the output JSON file
        fs.writeFile(outputFile, outputData, 'utf8', (writeErr) => {
            if (writeErr) {
                console.error('Error writing to the output file:', writeErr);
                return;
            }
            console.log('Transformation complete. Output written to', outputFile);
        });
    });
}

const inputFile = '../data/words.json';  
const outputFile = '../data/words1.json';

// Call the function to transform the JSON
transformJson(inputFile, outputFile);