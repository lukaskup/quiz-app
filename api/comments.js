const CommentsRepository = require("../repository/sequelize/CommentRepository");
const PostsRepository = require("../repository/sequelize/PostRepository");

exports.getComments = (req, res, next) => {
  CommentsRepository.getComments()
    .then((comments) => {
      res.status(200).json(comments);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCommentById = (req, res, next) => {
  const commentId = req.params.commentId;

  CommentsRepository.getCommentById(commentId)
    .then((comment) => {
      if (!comment) {
        res
          .status(404)
          .json({ message: `Comment with id: ${commentId} not found` });
      } else {
        res.status(200).json(comment);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.createComment = (req, res, next) => {
  CommentsRepository.createComment(req.body)
    .then((newComment) => {
      res.status(201).json(newComment);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    })
    .then(() => {
      return PostsRepository.getPostById(req.body.postId);
    })
    .then((post) => {
      PostsRepository.updatePost(post._id, {
        commentsCount: post.commentsCount + 1,
      });
    });
};

exports.updateComment = (req, res, next) => {
  const commentId = req.params.commentId;
  console.log(commentId);
  console.log(req.body);
  CommentsRepository.updateComment(commentId, req.body)
    .then((result) => {
      res.status(200).json({ message: "comment updated!", comment: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteComment = (req, res, next) => {
  const commentId = req.params.commentId;

  CommentsRepository.deleteComment(commentId)
    .then((result) => {
      res.status(200).json({ message: "Removed comment!", comment: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
