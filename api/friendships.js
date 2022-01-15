const FriendshipsRepository = require("../repository/sequelize/FriendshipRepository");

exports.getFriendships = (req, res, next) => {
  FriendshipsRepository.getFriendships()
    .then((friendships) => {
      res.status(200).json(friendships);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getFriendshipById = (req, res, next) => {
  const friendshipId = req.params.friendshipId;

  FriendshipsRepository.getFriendshipById(friendshipId)
    .then((friendship) => {
      if (!friendship) {
        res
          .status(404)
          .json({ message: `Friendship with id: ${friendshipId} not found` });
      } else {
        res.status(200).json(friendship);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.createFriendship = (req, res, next) => {
  FriendshipsRepository.createFriendship(req.body)
    .then((newFriendship) => {
      res.status(201).json(newFriendship);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateFriendship = (req, res, next) => {
  const friendshipId = req.params.friendshipId;
  console.log(friendshipId);
  console.log(req.body);
  FriendshipsRepository.updateFriendship(friendshipId, req.body)
    .then((result) => {
      res
        .status(200)
        .json({ message: "friendship updated!", friendship: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteFriendship = (req, res, next) => {
  const friendshipId = req.params.friendshipId;

  FriendshipsRepository.deleteFriendship(friendshipId)
    .then((result) => {
      res
        .status(200)
        .json({ message: "Removed friendship!", friendship: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
