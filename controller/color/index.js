const colors = require("../../models").colors;
const { colorValidator } = require("../../validator/color");
const { Op } = require("sequelize");

exports.getColors = async function (req, res) {
  const { limit, page, name } = req.body;

  try {
    if (!name) {
      const color = await colors.findAll();
      res.status(200).send(color);
    } else {
      const color = await colors.findAndCountAll({
        limit: limit ? limit : 5,
        where: { name: { [Op.like]: `%${name}%` } },
        offset: page ? page : 0,
      });
      res.send(color);
    }
  } catch (error) {
    res.status(500).send(`Something went Wrong: ${error}`);
  }
};

exports.createColor = async function (req, res) {
  try {
    const { error } = colorValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { name, hex_code } = req.body;

    const color = await colors.create({
      name,
      hex_code,
    });
    res.status(201).json(color);
  } catch (error) {
    res.status(500).send(`Something went Wrong: ${error}`);
  }
};

exports.getColorById = async function (req, res) {
  const id = req.params.id;
  try {
    if (!id) res.status(400).send("ID is required!");
    const color = await colors.findOne({ where: { id: id } });
    res.status(200).json(color);
  } catch (error) {
    res.status(500).send(`Something went Wrong: ${error}`);
  }
};

exports.deleteColor = async function (req, res) {
  const id = req.params.id;
  try {
    const oldColor = await colors.findOne({ where: { id: id } });

    if (oldColor) {
      const color = await colors.destroy({
        where: {
          id: id,
        },
      });
      res.status(202).send(`color with ${id} deleted successfully!`);
      console.log("ID", oldColor);
    } else {
      res
        .status(400)
        .send(`color with ${id} didnt find! please send available ID`);
    }
  } catch (error) {
    res.status(500).send(`Something went Wrong: ${error}`);
  }
};

exports.updateColor = async function (req, res) {
  const id = req.params.id;
  const { name, hex_code } = req.body;

  try {
    const color = await colors.update(
      {
        name: name,
        hex_code: family,
      },
      { returning: true, where: { id: id } }
    );
    res.status(200).send(`color with ${id} updated successfully!`);
  } catch (error) {
    res.status(500).send(`Something went Wrong: ${error}`);
  }
};
