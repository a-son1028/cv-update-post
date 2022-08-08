const axios = require("axios");

const API_KEY =
  "d87e4551c27d28a8621abf30fcbfff4fdb826edc9b03313215ba5a6c86af4d7a";
const api = axios.create({
  baseURL: "https://serpapi.com",
  timeout: 10000,
});

function getAuthor(authorId) {
  return api.get(
    `/search?engine=google_scholar_author&author_id=${authorId}&num=100&api_key=${API_KEY}`
  );
}

function getArticle(citationId) {
  return api.get(
    `/search.json?engine=google_scholar_author&view_op=view_citation&citation_id=${citationId}&api_key=${API_KEY}`
  );
}

module.exports = {
  getAuthor,
  getArticle,
};
