/// <reference path=@types/jquery />

/* ^ get jq typedefs from GitHub or NPMjs.com (@types/jquery), make line 1 this ref path comment (this is called XML, read about it) & tell vscode where to find autosuggest or "intellisense" for the jquery cdn, make dev exp better!
can also get types for bootstrap, I don't believe moment.js though... find snippet ext, or see notes on built-in 'new Date()' object below
*/
$(document).ready(function () {
    console.info('jquery CDN loaded & ready to run on web app...'); // log that document is ready with jquery available 
/*
you need to use document sometimes passing it into "$('jq-functon')" but not querySelector or createElement - jq handles that, or just don't use jq & use document.this() & document.that = 'this text' with eventListeners * onclick attribute instead....
*/
// build your url with `${templateLiteral} string interpolation`, concatenation using backticks ``, pass dynamic js vals: this is es6+ modern JS syntax: same as doing 'string' + someVar + 'last part of string...'
const apiKey = 'some-weather-api-key';
const apiUrl = 'https://api.openweather.com/';
console.info(`${apiUrl}/data/2.5/forecast?q=${cityString}&appid?q=${apiKey}`); // see how we can build a string elegantly like this & resuse this everywhere: DRY code..!

// store & access user search history from pared local storage
const searchHistory; // with what tho..?

// try messing around with the built-in date object instead if moment if is pain in the @$$
const localeDateTime = moment().format('dd ?? ???? hh:??') ?? new Date(); // ?? does something neat, but new operator creates 'new instanceof of SomeObjectClass(...any[] || undefined) with any or no params... look up class keyword, common if not only construct in other langs
    
console.info(`localeDateTime`, localeDateTime?.); //optional chaining: checks for null props on objs w/ dot notation like this 'obj?.prop' , but what moment funcs/methods we need..?

/* var(s) that ref any existing elements, or can create them & append, set, etc. to index.html w/ jQuery... do not mix document.whatever, use little if any doc methods with jquery, should not mix use one or other - they accomplish the same thing, but prone to errors using them together & makes no sense to mix heavily the 2; why I recommended using @types/jquery above 
*/
  const someParentElement = $('.some-class' || '#some-id'); // how many do we need..? can we access all we need w/o 10 vars..? how?
  
  // jquery for loop basically, or while same thing basically... lots of loops:many way => similar result
  someParentElem.each((elem, i) => console.log('jq each looping children elements of parent:', element, `@ array ${i} index`);

  function getUserCoords(city) {
  const userGeoPrompt = () => navigator.geolocation.getCurrentPosition((coords) => { ...coords }, (err) => console.error(err)); // native JS navigator obj could be used to get users coords, other info too, will     ask on DOM load (optional)
  console.info(userGeoPrompt ? 'yes' : 'no'); // what if they say no tho..?

  // do stuff here...



  const optsObj = { 'look-up-prop': 'look-up-value' }; // opts obj that fetch takes as optional second param but what props / vals does it need to be & what do they do?

  //use fetch, or $.get but ONLY handle getting user coords, .then(()), .catch(()), .finally(()), return data in 2nd .then(()) chain promises so other functions can use it to display the data (SOLID principles of programming..)
  fetch(`${apiUrl}/apikey?q=${apiKey}/some/path/to/${city}/geocode/for/getting/coords`, optsObj) // what will it do..? what can we do with it..?
    .then((res) => console.log('geo response', res))
           .catch((err) => console.error(err));
           .finally(() => console.info('finally block optional, code ALWAYS will run in finally!'))
  };


  function getCurrentWeather() {
    // coords = { lat: null, lon: null } this is what the above does, use it to call the actual weather endpoints, always going to be an obj with props like this from getUserCoords...

          const coords = getUserCoords('raleigh');
        return () => fetch(`${undefined}where/5/what/query?string=${coords?.here}&query2?string2=${coords?.there}}`, { key: 'value' }).then((res) => res.json()).then((data) => $(document.body).append(JSON.stringify(data))).catch((err) => throw Error(err)) // ... and theeeeen... aaaaand theeeennnnnnnn..... aaaaaand th--- catch...? ERR?! THROW ERROR(err)?? ~/ : P

  };

  function getForecast() {
    // SAME IDEA as above, couple ways to do it like always, so "READ THE OPEN wAPI DOCS!!"

    // some nice fetch.then chain logic that returns 5 days from the city searched for goes here, returns an array of objs prob...


    /*
     every 30 secs, will resolve to that object with 3 props, is what JS uses natively "bulit-in" & is the "type" of object window.fetch() returns so thought I'd put it here.. we are returning an arrow function (look   up closures!) that creates a new       instanceof a Promise "class" which is basically just a blueprint for an object we can define those to ourselves with the "class" keyword, but we also have native JS ones like String() Math() Error() Object() Array() & more - these all work in the bg of JS & provide us "abstractions" that help us, compared to other, HARDER program langs...
     */
      const resolve = (data) => document.body.append(JSON.stringify(data));
      const reject = (err = 'ERROR!!!') => throw Error(err);
      // return an arrow function literal: can write one liners, can sometimes omit curly braces too like here, called an implied return, less "tokens" to reason & worry about..!
      return () => new Promise((resolve, reject) => (
          // call setTimeout, using curly braces with arrow functions here:
          setTimeout(() => {
              const json = { id: 24, city: 'Raleigh, NC', weather: 'overcast', temp: 26 }; // try changing json to null, false, -1, etc.
              if(json) return resolve(json)
            // return reject cb func otherwise
                return reject()
          }), 30000)
      )
  };

  function loadSearchHistory() {
    let history; // declared but not assigned...?
    if(localSorage.getItem('history')) history = localSorage.getItem('history'); // conditionally assign the history on DOM load..? we gotta see if there is any localStorage history from prior visits.. idk what do we   do here..?
  };

  function handleSearch(event) {
    console.log('search submitted...', event); // big obj
    console.table('search target', $(event.curentTarget.id)) // curr child elem that fired event..? or can use $(event.currentTarget.id).val() maybe..? use JQUERY..!
    console.info(loadSearchHistory()); // ??? we need return values & function calls here but what..?
    console.log(getUserCoords(event?.target?.value)); // why are we logging all these here? this is bound to on('click) jq func, look up how
  };

  function displayCurrent() {
    console.log(getCurrentWeather()); // $('jquery').use().to().do().dom().stuff() with data from promise.then(()) get funcs up above...
  };

  function displayFiveDayForecast() {
    // ... same as above: jquery.use().data().to().make().html().elems();
  };
  
  const jqFormElem = $('form[action='javascript:handleSearch()'); // adv. css selector: form, attr w/ action='javascript:func()'
  jqForm.on('submit', handleSearch())z