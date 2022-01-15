const UsersRepository = require('../repository/sequelize/UserRepository');

exports.getUsers = (req, res, next) => {
    UsersRepository.getUsers()
        .then((users) => {
            res.status(200).json(users);
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getUserById = (req, res, next) => {
    const userId = req.params.userId;

    UsersRepository.getUserById(userId)
        .then((user) => {
            if (!user) {
                res.status(404).json({ message: `User with id: ${userId} not found` });
            } else {
                res.status(200).json(user);
            }
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.createUser = async (req, res, next) => {
    const newUser = { ...req.body };
    const userWithSameEmail = await UsersRepository.getByEmail(newUser.email);

    if (userWithSameEmail.length) {
        res.status(400).send({
            message: 'This is email is already taken!',
        });
        return;
    }
    UsersRepository.createUser(req.body)
        .then((newUser) => {
            res.status(201).json(newUser);
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateUser = async (req, res, next) => {
    const userId = req.params.userId;
    const newUser = req.body;
    const userWithSameEmail = await UsersRepository.getByEmail(newUser.email);

    if (userWithSameEmail.length && userWithSameEmail[0]._id.toString() !== userId.toString()) {
        console.log(userWithSameEmail[0]._id);
        console.log(userId);

        res.status(400).send({
            message: 'This is email is already taken!',
        });
        return;
    }

    UsersRepository.updateUser(userId, req.body)
        .then((result) => {
            res.status(200).json({ message: 'user updated!', user: result });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.deleteUser = (req, res, next) => {
    const userId = req.params.userId;

    UsersRepository.deleteUser(userId)
        .then((result) => {
            res.status(200).json({ message: 'Removed user!', user: result });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};
