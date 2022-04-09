import BoardModel from '../models/Board.js';

class BoardController {
  getAllPost = (req, res, next) => {
    const posts = BoardModel.find();
    posts.then((data) => {
      if (!data.length) throw res.status(404).send('Not Found Posts');

      const posts = data.map((item) => {
        return {...item}
      });
      res.render('board/index',{posts});
    }).catch((err) => {});
  };
  getPostById = (req, res, next) => {
    const post = BoardModel.findOne({bo_no: req.params.bo_no});
    post.then((data) => {
      if (!data.length) throw res.status(404).send('Not Found Post');

      res.render('board/view',{data: data[0]});
    }).catch((err) => {});
  };
  writePost = (req, res, next) => {
    if (req.method === 'GET') {
      res.render('board/write',{})
    } else if (req.method === 'POST') {
      const result = BoardModel.create(req.body);
      if (!result) throw res.status(500).send('Something went Wrong');

      res.status(201).send('Post was created!');
    }
  };
  updatePost = (req, res, next) => {
    if(req.method === 'GET') {
      const post = BoardModel.findOne({bo_no: req.params.bo_no});
      post.then((data) => {
        if (!data.length) throw res.status(404).send('Not Found Post');
  
        res.render('board/update',{data: data[0]});
      }).catch((err) => {});
    } else if (req.method === 'POST') {
      const result = BoardModel.update(req.body, req.params.bo_no);
      if (!result) throw res.status(500).send('Something went Wrong');

      res.status(201).send('Post was updated!');
    }
  };
  deletePost = (req, res, next) => {
    const result = BoardModel.delete(req.params.bo_no);
    if (!result) throw res.status(500).send('Something went Wrong');

    res.status(201).send('Post was delete!');
  };
}

export default new BoardController;