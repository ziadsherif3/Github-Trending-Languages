const fetch = require('node-fetch');

module.exports.getLanguages = async (request, response) => {
    const date = getPriorDate();
    const path = `https://api.github.com/search/repositories?q=created:>${date}&sort=stars&order=desc&per_page=100`

    try {
        const resolve = await fetch(path, {
            method: "GET",
            accept: "application/vnd.github.v3+json"
        });

        const repos = await resolve.json();
        const reposLanguages = [];

        repos.items.forEach(repo => {
            reposLanguages.push({
                "name": repo.name,
                "Language": repo.language,
                "Date": repo.created_at,
                "Stargazers": repo.stargazers_count
            });
        })
        response.status(200).json(reposLanguages);

    } catch (error) {
        console.error(err);
        res.status(500).json({ "Error message": err.message });
    }
}

function getPriorDate() {
    const currentDate = new Date();
    let priorDate = new Date().setDate(currentDate.getDate() - 30);
    priorDate = new Date(priorDate);

    const date = priorDate.getDate();
    const month = priorDate.getMonth() + 1;
    const year = priorDate.getFullYear();

    return year + "-" + (month < 10 ? "0" + month : month) + "-" + date;
}