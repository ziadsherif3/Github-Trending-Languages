const fetch = require('node-fetch');

module.exports.getLanguages = (req, res) => {
    
}

function getPriorDate() {
    let currentDate = new Date();
    let priorDate = new Date().setDate(currentDate.getDate()-30);
    priorDate = new Date(priorDate);

    let date = priorDate.getDate();
    let month = priorDate.getMonth() + 1;
    let year = priorDate.getFullYear();

    return year + "-" + (month < 10 ? "0" + month : month) + "-" + date;
}