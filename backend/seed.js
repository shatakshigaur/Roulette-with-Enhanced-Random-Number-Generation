const { execSync } = require('child_process');
const fs = require('fs');

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