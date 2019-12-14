const CognitiveServicesCredentials = require('ms-rest-azure').CognitiveServicesCredentials;

const WebSearchAPIClient = require('azure-cognitiveservices-websearch');

let credentials = new CognitiveServicesCredentials('YOUR-ACCESS-KEY');

let webSearchApiClient = new WebSearchAPIClient(credentials);
