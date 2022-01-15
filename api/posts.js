const PostsRepository = require("../repository/sequelize/PostRepository");

exports.getPosts = (req, res, next) => {
  PostsRepository.getPosts()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getPostById = (req, res, next) => {
  const postId = req.params.postId;

  PostsRepository.getPostById(postId)
    .then((post) => {
      if (!post) {
        res.status(404).json({ message: `Post with id: ${postId} not found` });
      } else {
        res.status(200).json(post);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.createPost = (req, res, next) => {
  PostsRepository.createPost(req.body)
    .then((newPost) => {
      res.status(201).json(newPost);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updatePost = (req, res, next) => {
  const postId = req.params.postId;
  console.log(postId);
  console.log(req.body);
  PostsRepository.updatePost(postId, req.body)
    .then((result) => {
      res.status(200).json({ message: "post updated!", post: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deletePost = (req, res, next) => {
  const postId = req.params.postId;

  PostsRepository.deletePost(postId)
    .then((result) => {
      res.status(200).json({ message: "Removed post!", post: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
