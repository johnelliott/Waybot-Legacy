// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.


console.log('hello from the hits.js file in ruby');

window.client = new Faye.Client('http://localhost:3001/hits', {
    retry: 5,
    timeout: 120
});

var subscription = window.client.subscribe('/hits', function(message) {
    console.log(message);
});