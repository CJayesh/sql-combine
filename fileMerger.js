const allowedExtensions = ['txt', 'sql'];

function run() {
    document.getElementById('inputFile').addEventListener('change', function(){
        document.getElementById('copied').classList.add('disable');
        const comment = '-'.repeat(10);
        const output = document.getElementById('outputFile');
        const fileNames = document.getElementById('fileNames');
        output.textContent = undefined;
        fileNames.textContent = undefined;
        
        for (const file of this.files) {
            if (allowedExtensions.includes(file.name.split('.').pop()))
            {
                readFile(file).then(result => {
                    output.textContent += comment.concat(file.name, comment, '\n');
                    output.textContent += result.concat('\n\n\n');
                    fileNames.textContent += file.name.concat('\n');
                });
            }
        }
    });
}

function readFile(file) {
    return new Promise(resolve => {
        const fileReader = new FileReader();
        fileReader.onload = function() {
            resolve(fileReader.result.concat('\n\n\n'));
        };
        fileReader.readAsText(file);
    });
}

function copyToClipboard() {
    const selection = document.getElementById('outputFile');
    selection.select();
    document.execCommand('copy');
    document.getElementById('copied').classList.remove('disable');
}

function reset() {
    document.getElementById('inputFile').value = '';
    document.getElementById('outputFile').textContent = '';
    document.getElementById('fileNames').textContent = '';
}