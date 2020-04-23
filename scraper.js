//your app id
var app_id = '';
//timestamp for filename
var time = process.hrtime();
var timestamp = Math.round( time[ 0 ] * 1e3 + time[ 1 ] / 1e6 );
//init csv writer
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: 'app_store_reviews_' + timestamp + '.csv',
  header: [
    {id: 'userName', title: 'User'},
    {id: 'userUrl', title: 'User URL'},
    {id: 'version', title: 'App Version'},
    {id: 'score', title: 'Stars'},
    {id: 'title', title: 'Review Title'},
    {id: 'text', title: 'Review Text'},
    {id: 'url', title: 'Review URL'},
  ]
});
//init store-scraper
var store = require('app-store-scraper');
//import countries list
var countries = require('./countries.json')
//start scraping page 1
function reviewScraper(page = 1, country_counter = 0){
    store.reviews({
    id: app_id,
    country: countries[country_counter],
    page: page
    })
.then(function(data){
    //if reviews are returned
    if(data != ''){
        //write reviews to csv
        csvWriter
            .writeRecords(data)
        //wipe data from previous page
        delete data;
        //scrape next page
        page++;
        reviewScraper(page, country_counter);
    }
    //if no more reviews for that country
    else if(data == '' && country_counter != (countries.length - 1)){
        //wipe data from previous run
        delete data;
        //scrape next country
        country_counter++;
        reviewScraper(page = 1, country_counter);
    }
    //scrape complete!
    else{
        console.log('scrape successful')
        return false;
    }
  })
  .catch(console.log);
}
reviewScraper();