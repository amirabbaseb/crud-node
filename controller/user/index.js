const users = require("../../models").users;
const { userValidator } = require("../../validator/user");
const { Op } = require("sequelize");

exports.getUsers = async function (req, res) {
  const { limit, page, name } = req.body;

  try {
    if (!name) {
      const user = await users.findAll();
      res.status(200).send(user);
    } else {
      const user = await users.findAndCountAll({
        limit: limit ? limit : 5,
        where: { name: { [Op.like]: `%${name}%` } },
        offset: page ? page : 0,
      });
      res.send(user);
    }
  } catch (error) {
    res.status(500).send(`Something went Wrong: ${error}`);
  }
};

exports.createUser = async function (req, res) {
  try {
    const { error } = userValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const {
      name,
      family,
      email,
      phone,
      address,
      username,
      password,
      image,
      permission_id,
    } = req.body;

    const user = await users.create({
      name,
      family,
      email,
      phone,
      address,
      username,
      password,
      image,
      permission_id,
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).send(`Something went Wrong: ${error}`);
  }
};

exports.getUserById = async function (req, res) {
  const id = req.params.id;

  try {
    if (!id) res.status(400).send("ID is required!");
    const user = await users.findByPk(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(`Something went Wrong: ${error}`);
  }
};

exports.deleteUser = async function (req, res) {
  const id = req.params.id;
  try {
    const oldUser = await users.findOne({ where: { id: id } });

    if (oldUser) {
      const user = await users.destroy({
        where: {
          id: id,
        },
      });
      res.status(202).send(`user with ${id} deleted successfully!`);
      console.log("ID", oldUser);
    } else {
      res
        .status(400)
        .send(`user with ${id} didnt find! please send available ID`);
    }
  } catch (error) {
    res.status(500).send(`Something went Wrong: ${error}`);
  }
};

exports.updateUser = async function (req, res) {
  const id = req.params.id;
  const { name, family, phone, email, address } = req.body;

  try {
    const user = await users.update(
      {
        name: name,
        family: family,
        phone: phone,
        email: email,
        address: address,
      },
      { returning: true, where: { id: id } }
    );
    res.status(200).send(`user with ${id} updated successfully!`);
  } catch (error) {
    res.status(500).send(`Something went Wrong: ${error}`);
  }
};
