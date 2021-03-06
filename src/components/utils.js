// 'use strict';
import {MICROSOFT_API_KEY} from '../.env.js';


const ImageSearchAPIClient = require('azure-cognitiveservices-imagesearch');

const CognitiveServicesCredentials = require('ms-rest-azure').CognitiveServicesCredentials;


//instantiate the image search client
let credentials = new CognitiveServicesCredentials(MICROSOFT_API_KEY);
let imageSearchApiClient = new ImageSearchAPIClient(credentials);


//a helper function to perform an async call to the Bing Image Search API
const sendQuery = async (query) => {
    return await imageSearchApiClient.imagesOperations.search(query);
};

const GetPictures = (query) => {
  const finalQuery = query + " black and white 400px";
  return sendQuery(finalQuery).then(imageResults => {
    if (imageResults == null) {
    console.log("No image results were found.");
    }
    else {
        console.log(`Total number of images returned: ${imageResults.value.length}`);
        let firstImageResult = imageResults.value[0];
        //display the details for the first image result. After running the application,
        //you can copy the resulting URLs from the console into your browser to view the image.
        console.log(`Total number of images found: ${imageResults.value.length}`);
        console.log(`Copy these URLs to view the first image returned:`);
        console.log(`First image thumbnail url: ${firstImageResult.thumbnailUrl}`);
        console.log(`First image content url: ${firstImageResult.contentUrl}`);
    }
    return imageResults;
  })
  .catch(err => console.error(err))

}

export default GetPictures;
