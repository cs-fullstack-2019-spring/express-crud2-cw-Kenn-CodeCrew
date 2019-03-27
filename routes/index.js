var express = require('express');
var router = express.Router();
var PostCollection = require("../models/PostSchema");

/* GET home page. */
router.get('/', function(req, res) {

  PostCollection.find({}, (errors, results)=>{
    if (errors) res.send(errors);
    else {
      context = {
        allEntries: results,
      };
      res.render('index', context);
    }
  });
});

router.get("/create", (request, response)=>{
  response.render('create');
});

router.get('/saveNewPost', (request, response)=>{
  PostCollection.create(
      {
        userId: request.query.userId,
        id: request.query.id,
        title: request.query.title,
        body: request.query.body,
      }, (errors)=>{
        if (errors) response.send(errors);
        else{
          response.redirect('/');
        }
      }
  )
});

router.get('/update', (request, response)=>{
  response.render('update');
});

router.get('/saveOldPost', (req, res)=>{
  PostCollection.updateOne(
      {
        id: req.query.id,
      },
      {
        title: req.query.title,
        body: req.query.body,
      }, (errors)=>{
        if (errors) res.send(errors);
        else res.redirect("/");
      }
  )
});

router.get('/delete', (req,res)=>
{
  res.render("delete");
});

router.get('/deletePost', (req, res)=>{
  PostCollection.deleteOne(
      {
        id: req.query.id,
      }, (error)=>{
        if (error) res.send(error);
        else res.redirect('/');
      }
  )
});

module.exports = router;
