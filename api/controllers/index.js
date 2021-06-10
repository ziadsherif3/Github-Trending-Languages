const fetch = require('node-fetch');

module.exports.getLanguages = async (request, response) => {
    const date = getPriorDate();
    const path = `https://api.github.com/search/repositories?q=created:>${date}&sort=stars&order=desc&per_page=100`

    try {
        const resolve = await fetch(path, {
            method: "GET",
            accept: "application/vnd.github.v3+json"
        });

        if (resolve.status != 200) { // An error occurred at the other end
            const err = new Error("Couldn't fetch data from the remote endpoint");
            err.status = resolve.status; // Saving the response status
            throw err;
        }

        const result = await resolve.json();
        let reposLanguages = new Map();

        for(let repo of result.items) {
            if (repo.language == null) {
                continue;
            }
            if (reposLanguages.has(repo.language)) {
                let languageData = reposLanguages.get(repo.language);
                languageData.count++;
                languageData.repos.push(repo.name);
            }
            else {
                reposLanguages.set(repo.language, {count: 1, repos: [repo.name]});
            }
        }

        reposLanguages = Array.from(reposLanguages, (elem) => { // Convert the Map into an array of JSON objects
            return {
                "name": elem[0],
                "count": elem[1].count,
                "repos": elem[1].repos
            }
        });

        reposLanguages.sort((obj1, obj2) => obj2.count - obj1.count); // Sort the array in descending order of language repo count
        
        response.status(200).json(reposLanguages);

    } catch (err) {
        console.error(err);
        const errStatus = err.status | 500;
        response.status(errStatus).json({ "Error message": err.message });
    }
}

function getPriorDate() {
    const currentDate = new Date();
    let priorDate = new Date().setDate(currentDate.getDate() - 30);
    priorDate = new Date(priorDate);

    const date = priorDate.getDate();
    const month = priorDate.getMonth() + 1;
    const year = priorDate.getFullYear();

    // Returning the date in a format that conforms with ISO8601 standard as stated by Github API docs
    return year + "-" + (month < 10 ? "0" + month : month) + "-" + date;
}