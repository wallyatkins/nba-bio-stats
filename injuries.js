import fs from 'fs';
import csvWriter from 'csv-writer';
const { createObjectCsvWriter } = csvWriter;
import fetch from 'node-fetch';
import { parse } from 'node-html-parser';

let columns = ['Date', 'Team', 'Acquired', 'Reqlinquished', 'Notes'];

let headers = [];
let rows = [];

for (let i = 0; i < columns.length; i++) {
  headers.push({id: columns[i], title: columns[i]});
}

let url = 'http://www.prosportstransactions.com/basketball/Search/SearchResults.php?Player=&Team=&BeginDate=1900-01-01&EndDate=2021-10-29&InjuriesChkBx=yes&Submit=Search';

async function getInjuryData() {
  for (let counter = 0; counter <= 1177; counter++) {
    let fetchUrl;
    if (counter == 0) { // no pagination on first fetch
      fetchUrl = url;
    } else {
      fetchUrl = url + '&start=' + counter * 25;
    }

    console.log(fetchUrl);

    const response = await fetch(fetchUrl);
    const html = await response.text();
    const root = parse(html);

    let table = root.querySelector('.datatable');
    let tableRows = table.getElementsByTagName('tr');
    for (let i in tableRows) {
      if (i != 0) { // ignore first/header row
        let rowData = {};
        let tableCells = tableRows[i].getElementsByTagName('td');
        for (let j in tableCells) {
          rowData[columns[j]] = tableCells[j].childNodes[0].rawText.replace('•', '').trim();
        }
        rows.push(rowData);
      }
    }
  }

  let csv = createObjectCsvWriter({
    path: 'injuries.csv',
    header: headers
  });
  csv.writeRecords(rows).then(() => console.log('The CSV file was written successfully'));
}

getInjuryData();

