//////////// BONUS 1
// 1. get vals of prev and next img from db when opening modal (change query db)

// 2. add buttons with click handler <=  =>
// make sure they only display if there is a prev/next img to be shown --- like displaying the "more" button

// 3. emit to parent ---> askToUpdateUrl
// you CAN pass information along with your event emitter (in the $emit)
// ----> this.emit$("update", imgId) ------------ or sth along these lines

// 5. in modal (together with data, methods etc), add a WATCH prop
// ----> so parent knows that img updated

watch: {
    imgSelected: function() {console.log("prop passed to modal has been updated");}
}

// sugg --- add the fetch to a method and just call it




///////////// BONUS 4 - upload with URL
// you need an http request
// NPM CHEERIO ---- worth taking a look at for this. allows you to make requests to other URLs and get back the body as a response or sth like that


/////////// BONUS 5 - DELETE
// ----> gotta remove image also from s3 bucket!!!



////// ideas for other stuff that might be fun
// -- loading --> have a loading prop, set it to true when fetch req goes out, set it back to false when fetch returns
                // on css side ---> add sth spinning lol

// edit image -->


// ui to upload fail --> when img too big or sth else wrong
                        //  kinda validate data?
