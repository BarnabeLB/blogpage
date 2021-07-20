//jshint esversion:6

const express = require("express");
const ejs = require("ejs");
const _ = require("lodash");
// const truncate = require(__dirname + "/truncate.js");




const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();


app.set('view engine', 'ejs');                                                    // permet de séparer les header/footer

app.use(express.urlencoded({                                                      // bodyparser présent dans express, permet les req.body.[namedInput]
  extended: true
}));
app.use(express.static("public"));                                                //permet d'accéder au dossier public et au fichier présent dedans.

let posts = [];
///////////////////////////////////////////////////////////////////
app.get("/", function (req, res) {

  res.render('home', {
    startingContent: homeStartingContent,
    posts: posts
  });
});

app.get("/about", function (req, res) {
  res.render("about", {
    aboutContent: aboutContent
  });
});

app.get("/contact", function (req, res) {
  res.render("contact", {
    contactContent: contactContent
  });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {

  const post = {                                                // création d'un objet javascript, on enregistre dans ses propriétés les valeurs rentrées dans les 
    title: req.body.newTitle,                                   // inputs de compose.ejs
    publication: req.body.newPublication
  };

  posts.push(post);                                             // chaque instance de l'objet est envoyé dans un array posts[]


  res.redirect('/');                                            // on revient sur le home après avoir validé le formulaire
});


                                                                                          /*automatisation de la création de page*/
app.get("/posts/:postName", function (req, res) {               //
  const requestedPostName = _.lowerCase(req.params.postName);   // récupération de la string présente après les : de la ligne précédante. Stockage dans une variable
                                                                // et transformation des majuscule en minuscule, des espace en dash
  posts.forEach(function (post) {                               
    const storedName = _.lowerCase(post.title);                 // pour chaque case de posts[] correspondant à la valeur récupérée en l.54 on stock en minuscle+dash la string

    if (storedName === requestedPostName) {                     // et si cette string partage la valeur et le type de celle que <a href></a> de home.ejs ajoute àl'adresse
      res.render("post", {                                      // alors on affiche le fichier post.ejs
        requestedTitle: post.title,                             // et on lui envoit les  valeurs titre et contenu de l'input utilisateur dans les slots prévus à cet effet
        requestedPublication: post.publication
      })
    }

  });

  //////////////////////////////////////////// la boucle for classique ne semble pas aussi bien marcher que le forEach, pourquoi ?
  // for (let i = 0; i<posts.length; i++){
  //   const storedName = posts[i].title;

  //   if( storedName == requestedPostName){
  //     console.log("match found");
  //   }
  // }

});








app.listen(3000, function () {
  console.log("Server started on port 3000");
});