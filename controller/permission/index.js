const permissions = require("../../models").permissions;
const { permissionValidator } = require("../../validator/permission");

exports.getPermissions = async function (req, res) {
  try {
    const permission = await permissions.findAll();
    res.send(permission);
  } catch (error) {
    res.status(400).send(`Something went Wrong: ${error}`);
  }
};

exports.createPermission = async function (req, res) {
  try {
    const { error } = permissionValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { name, image } = req.body;

    if (!{ name, image }) {
      res.status(400).send("All input is required");
    }

    const permission = await permissions.create({ name, image });
    res.status(201).json(permission);
  } catch (error) {
    res.status(400).send(`Something went Wrong: ${error}`);
  }
};

exports.getPermissionById = async function (req, res) {
  const id = req.params.id;
  try {
    if (!id) res.status(400).send("ID is required!");
    const permission = await permissions.findOne({ where: { id: String(id) } });
    res.status(200).json(permission);
  } catch (error) {
    res.status(400).send(`Something went Wrong: ${error}`);
  }
};

exports.deletePermission = async function (req, res) {
  const id = req.params.id;
  try {
    const permission = await permissions.destroy({
      where: {
        id: String(id),
      },
    });
    res.status(201).send(`permission with ${id} deleted successfully!`);
  } catch (error) {
    res.status(400).send(`Something went Wrong: ${error}`);
  }
};

exports.updatePermission = async function (req, res) {
  const id = req.params.id;
  const { name, family, phone, email, address } = req.body;

  try {
    const permission = await permissions.update(
      {
        name: name,
      },
      { returning: true, where: { id: id } }
    );
    res.status(201).send(`permission with ${id} updated successfully!`);
  } catch (error) {
    res.status(400).send(`Something went Wrong: ${error}`);
  }
};
