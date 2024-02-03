const express = require('express');
const bodyParser = require('body-parser');
const { execSync } = require('child_process');
const cors = require('cors');
fs = require('fs');
path = require('path');

function generateSeed() {

    let dataNet = parseInt(execSync(`networkQuality | grep Uplink | awk '{print $3}'`, { encoding: 'utf-8' }));

    const output1 = execSync(`top -l 2 | grep -E "^CPU"`, { encoding: 'utf-8' });
    let dataCPU = parseFloat(output1.split(" ")[2]);
    dataCPU = parseInt((dataCPU - parseInt(dataCPU)) * 100);

    let dataTotalSample = execSync(`sysctl kern.entropy.filter.total_sample_count | awk '{print $2}'`, { encoding: 'utf-8' }).split('');
    let dataTS = 0;
    for (i = 0; i < dataTotalSample.length - 1; i++) {
        dataTS += parseInt(dataTotalSample[i]);
    }

    let dataPages = execSync(`vm_stat | grep "Pages active"| awk '{print $3}'`, { encoding: 'utf-8' }).split('');
    let dataPS = 0;
    for (i = 0; i < dataPages.length - 1; i++) {
        if (dataPages[i] == '.') break;
        dataPS += parseInt(dataPages[i]);
    }

    let seed = dataPS ^ dataTS ^ dataNet ^ dataCPU;

    fs.writeFileSync('./seed.txt', seed.toString());
    console.log(seed);

    return seed;
}

const seedFilePath = path.join(__dirname, 'seed.txt');


const app = express();

app.use(cors());


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

setInterval(generateSeed, 24 * 60 * 60 * 1000);



app.get('/api/numbers', (req, res) => {
    var seed = parseInt(fs.readFileSync(seedFilePath, 'utf-8'));
    requestData = JSON.stringify({ 'number': seed });
    res.send(requestData);
})


const port = 3000;
app.listen(port, () => {
    console.log("server is runnning on port " + port);
});