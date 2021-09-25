const colors = require("../../models").colors;
const { colorValidator } = require("../../validator/color");

exports.getColors = async function (req, res) {
  try {
    const color = await colors.findAll();
    res.send(color);
  } catch (error) {
    res.status(400).send(`Something went Wrong: ${error}`);
  }
};

exports.createColor = async function (req, res) {
  try {
    const { error } = colorValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { name, hex_code } = req.body;

    if (
      !{
        name,
        hex_code,
      }
    ) {
      res.status(400).send("All input is required");
    }

    const color = await colors.create({
      name,
      hex_code,
    });
    res.status(201).json(color);
  } catch (error) {
    res.status(400).send(`Something went Wrong: ${error}`);
  }
};

exports.getColorById = async function (req, res) {
  const id = req.params.id;
  try {
    if (!id) res.status(400).send("ID is required!");
    const color = await colors.findOne({ where: { id: String(id) } });
    res.status(200).json(color);
  } catch (error) {
    res.status(400).send(`Something went Wrong: ${error}`);
  }
};

exports.deleteColor = async function (req, res) {
  const id = req.params.id;
  try {
    const color = await colors.destroy({
      where: {
        id: String(id),
      },
    });
    res.status(201).send(`color with ${id} deleted successfully!`);
  } catch (error) {
    res.status(400).send(`Something went Wrong: ${error}`);
  }
};

exports.updateColor = async function (req, res) {
  const id = req.params.id;
  const { name, family, phone, email, address } = req.body;

  try {
    const color = await colors.update(
      {
        name: name,
        hex_code: family,
      },
      { returning: true, where: { id: id } }
    );
    res.status(201).send(`color with ${id} updated successfully!`);
  } catch (error) {
    res.status(400).send(`Something went Wrong: ${error}`);
  }
};
