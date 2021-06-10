# Github-Trending-Languages

This project implements a simple REST microservice that sends the languages used in the top 100 trending repositories
along with the number of the repositories using this language and a list of these repositories names
as the response to the requesting end.

## Setting things up

1. Clone the repository.
2. Run the `npm install` command in the command line to install dependencies.
3. Use `npm start` to start the server.

## Important notes

1. Although, this is a simple project, a router is used to take the possibility of extending the project later in time into consideration rather than directly adding the route handler to the main entry point of the project.

2. This project uses the language property of each repository in the items array returned in the JSON response from the Github Search API request. The value of this property is the main language of the corresponding repository. This is mentioned because each repository in the items array has a languages_url property whose value is a URL to which a request could be done to retrieve a list of all languages used by a specific repository. There are some problems if all languages used by each repository are required to be processed on:

    * In order to retrieve the list of languages, a separate blocking request to the list of each repository should be made where subsequent requests to other lists would have to wait for an ongoing request. This could be solved by using concurrent requests: for example, in nodejs you could use `Promise.all([])` with the fetch requests. You could also fork child processes where each child process would make a request to a specific list. However, these approaches would introduce the problem discussed in the second point.

    * Github API only allows 60 requests in an hour for unauthenticated users and the required requests to be made are 100 because the number of repositories required are 100. So, if `Promise.all([])` is to be used, this would end up blocking the process because `Promise.all([])` waits until all the requests to either resolve or reject, and if the second approach is to be used, a lot of child processes would be running in the background leeching resources from the host machine.
