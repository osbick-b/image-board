// we use history api to store and reflect on the url the pages that user has visited
// so that we can pass them on, go back and forth, usw.

//////// history.pushState() : allows you to display sth in your url
// ---- TAKES 3 ARGS: 
// 1: {} or null ---- you can pass metadata here if u want
// 2: "" ---- yes, an empty str. just that. no use, just gotta do it bc reasons
// 3: "/your-url-pathname-goes-here"

history.pushState()



//
location.pathname
// not sure what it does lol

location.pathname.slice(1) // ---> to access path WITHOUT THE "/" --->
// we use SLICE to remove the slash and access the actual value of the url you're using -- or the slash, if that's what you want
                                    // 


/////// GO BACK AND FORTH --- popstate
// 
// in order to be able to navigate back and forth, yuo need to add an event listener
// bc the browser emits an event when user does that, called "popstate"

// app.state // not sure abt syntax
// it is another place like local storage where you can store info about the session




// now the user has power to write shit in the url 
// -- before, it was always us internally who were communicating to the app where it should go, 
// user was always seeing the same old root url

// >>> since now they see the img id also, they can type crap up there as well

// so we need to evaluate the url passed in order to see if it's valid, and then handle what to do (open modal or not usw)

history.replaceState
// used after handling sassy user case, in order to remove invalid URL from your browsing history





///////////////////////////////////////////////

// on mount --- it you type just "/", initial value of thingie will be set to null
// HOWEVER
// if app mounts with a different url (eg. user comes thru a link to a specific image), then thingie should be set to image id