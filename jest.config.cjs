const path = require('path');

// Função para obter a data e hora atual no formato desejado
function getCurrentDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
}

module.exports = {
    testEnvironment: 'node',
    reporters: [
        'default',
        ['jest-stare', {
            resultDir: path.join('jest-stare', getCurrentDateTime()),
            reportTitle: 'Relatório de Testes',
            additionalResultsProcessors: ['jest-html-reporter']
        }]
    ]
};