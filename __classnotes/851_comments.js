
///// COMMENTS //////

// HAS to be its own component
// will live inside the MODAL component

// -- must REGISTER subcomponent in your component

// for implementing ---- insert a comment manually in SQL so you have sth to see


// the imgId that you have for rendering the modal --> modal is now the parent and
// is gonna need to pass it on to its child, the comment section
// you're also gonna need it in the comments table in DB

// POST request
// no form data!!! -- it's only when you send along a file to the server
// ----> reccom: send a normal JS obj with the info you want with the req (comment, username, imgId, timestamp)
// !!! make sure you're using the correct middleware --> json
// commt should show up immediately

// but also a FETCH request to show the commts that have been written for that particular image
