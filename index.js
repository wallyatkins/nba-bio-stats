const fs = require('fs');
const csvWriter = require('csv-writer').createObjectCsvWriter;

let headers = [];
let rows = [];

let year = 1996;
let currentYear = 2022;

while (year < currentYear) {

  let season = year + '-' + (year + 1).toString().substr(-2);
  let seasonFile = season + '.json';

  console.log('Reading file: ' + seasonFile);
  try {
    let data = fs.readFileSync(seasonFile, 'utf8');
    let json = JSON.parse(data);

    // Create Headers if needed
    if (headers.length === 0) {
      console.log('Setting Headers');
      json.resultSets[0].headers.forEach(header => {
        headers.push({
          id: header,
          title: header
        });
      });
      headers.push({id:'SEASON',title:'SEASON'});
    }

    // Create Row Data
    json.resultSets[0].rowSet.forEach(row => {
      let rowData = {};
      for (let i = 0; i < headers.length - 1; i++) {
        rowData[headers[i].id] = row[i];
      }
      rowData['SEASON'] = season;
      rows.push(rowData);
    });
  } catch (err) {
    console.error(err);
  }

  year++;
}
 
let csv = csvWriter({
  path: 'out.csv',
  header: headers
});

csv.writeRecords(rows).then(() => console.log('The CSV file was written successfully'));

