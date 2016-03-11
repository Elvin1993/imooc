var express = require('express');
var _ = require('underscore');
var path = require('path');
var mongoose = require('mongoose'); //引用mongoose模块
var Movie = require('./models/movies');
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');

var app = express();

mongoose.connect('mongodb://localhost/imooc');

app.set('views', './views/pages');
app.set('view engine', 'jade');

// 设置加载静态地址
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.locals.moment = require('moment');
app.listen(port);

console.log('项目已启动 端口:' + port);



// index page
app.get('/', function(req, res) {
  Movie.fetch(function(err, movies) {
    if (err) {
      console.log(err);
    }

    res.render('index', {
      title: 'imooc 首页',
      movies: movies
    })
  });
});

// detail page
app.get('/movie/:id', function(req, res) {
  var id = req.params.id;

  Movie.findById(id, function(err, movie) {
    if (err) {
      console.log(err);
      return;
    }

    res.render('detail', {
      title: 'imooc 详情页',
      movie: movie
    });
  });

});

// admin page
app.get('/admin', function(req, res) {
  res.render('admin', {
    title: 'imooc 后台页',
    movie: {
      doctor: '',
      country: '',
      title: '',
      year: '',
      poster: '',
      language: '',
      flash: '',
      summary: ''
    }

  })
});

// admin update page
app.get('/admin/update/:id', function(req, res) {
  var id = req.params.id;

  Movie.findById(id, function(err, movie) {
    if (err) {
      console.log(err);
    }
    console.log(movie);
    res.render('admin', {
      title: 'imooc 修改页',
      movie: movie
    });
  });
});

// admin remove
app.post('/admin/remove', function(req, res) {
  var id = req.body.id,
    obj = {
      result: true,
      msg: ''
    };

  if (!id) {
    return false;
  }
  Movie.removeById(id, function(err, movie) {
    if (err) {
      console.log(err);
      obj.result = false;
      obj.msg = err.message;
    }
  });
  console.log(obj);
  res.json(obj);
});

app.delete('/admin/list', function(req, res) {
  var id = req.query.id,
    obj = {
      result: true,
      msg: ''
    };

  if (!id) {
    return
  }
  Movie.removeById(id, function(err, movie) {
    if (err) {
      console.log(err);
      obj.result = false;
      obj.msg = err.message;
    }
    res.json(obj);
  });

});


// admin list page
app.get('/admin/list', function(req, res) {
  Movie.fetch(function(err, movies) {
    if (err) {
      console.log(err);
    }
    $jsonp = req.params.cb;

    // res.render('list', {
    //   $jsonp: $jsonp,
    //   title: 'imooc 列表页',
    //   movies: movies
    // });
  res.send(movies);
  });
});

// 修改或新增
app.post('/admin/movie/new', function(req, res) {
  var id = req.body.movie._id;
  var movieObj = req.body.movie;
  var _movie;

  if (id !== 'undefined') {
    Movie.findById(id, function(err, movie) {
      if (err) {
        console.log(err);
      };
      console.log(movieObj.key);
      _movie = _.extend(movie, movieObj);
      _movie.save(function(err, movie) {
        if (err) {
          console.log(err);
        }
        res.redirect('/admin/list');
        // res.redirect('/movie/' + movie._id);
      });
    });
  } else {
    _movie = new Movie({
      doctor: movieObj.doctor,
      title: movieObj.title,
      language: movieObj.language,
      country: movieObj.country,
      summary: movieObj.summary,
      flash: movieObj.flash,
      poster: movieObj.poster,
      year: movieObj.year
    });

    _movie.save(function(err, movie) {
      if (err) {
        console.log(err);
      }
      res.redirect('/admin/list');
      // res.redirect('/movie/' + movie._id);
    });
  }
});

// 404
app.use(function(req,res,next) {
    res.status(404).send('Sorry cant find that!');
});

