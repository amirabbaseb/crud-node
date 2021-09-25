const users = require("../../models").users;
const { userValidator } = require("../../validator/user");

exports.getUsers = async function (req, res) {
  try {
    const user = await users.findAll();
    res.send(user);
  } catch (error) {
    res.status(400).send(`Something went Wrong: ${error}`);
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

    if (
      !{
        name,
        family,
        email,
        phone,
        password,
        address,
        username,
        image,
        permission_id,
      }
    ) {
      res.status(400).send("All input is required");
    }

    const user = await users.create({ ...req.body });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).send(`Something went Wrong: ${error}`);
  }
};

exports.getUserById = async function (req, res) {
  const id = req.params.id;
  try {
    if (!id) res.status(400).send("ID is required!");
    const user = await users.findOne({ where: { id: String(id) } });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).send(`Something went Wrong: ${error}`);
  }
};

exports.deleteUser = async function (req, res) {
  const id = req.params.id;
  try {
    const user = await users.destroy({
      where: {
        id: String(id),
      },
    });
    res.status(201).send(`user with ${id} deleted successfully!`);
  } catch (error) {
    res.status(400).send(`Something went Wrong: ${error}`);
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
    res.status(201).send(`user with ${id} updated successfully!`);
  } catch (error) {
    res.status(400).send(`Something went Wrong: ${error}`);
  }
};
