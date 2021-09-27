const items = require("../../models").items;
const { itemValidator } = require("../../validator/item");
const { Op } = require("sequelize");

exports.getItems = async function (req, res) {
  const { limit, page, name } = req.body;

  try {
    if (!name) {
      res.status(400).send("Please pass name in your body request");
    } else {
      const item = await items.findAndCountAll({
        limit: limit,
        where: { name: { [Op.like]: `%${name}%` } },
      });
      res.send(item);
    }
  } catch (error) {
    res.status(400).send(`Something went Wrong: ${error}`);
  }
};

exports.createItem = async function (req, res) {
  try {
    const { error } = itemValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { name, image } = req.body;

    const item = await items.create({ name, image });
    res.status(201).json(item);
  } catch (error) {
    res.status(400).send(`Something went Wrong: ${error}`);
  }
};

exports.getItemById = async function (req, res) {
  const id = req.params.id;
  try {
    if (!id) res.status(400).send("ID is required!");
    const item = await items.findOne({ where: { id: id } });
    res.status(200).json(item);
  } catch (error) {
    res.status(400).send(`Something went Wrong: ${error}`);
  }
};

exports.deleteItem = async function (req, res) {
  const id = req.params.id;
  try {
    const oldItem = await items.findOne({ where: { id: id } });

    if (oldItem) {
      const item = await items.destroy({
        where: {
          id: String(id),
        },
      });
      res.status(200).send(`item with ${id} deleted successfully!`);
      console.log("ID", oldItem);
    } else {
      res
        .status(400)
        .send(`item with ${id} didnt find! please send available ID`);
    }
  } catch (error) {
    res.status(400).send(`Something went Wrong: ${error}`);
  }
};

exports.updateItem = async function (req, res) {
  const id = req.params.id;
  const { name, brand_id, color_id, subtitle } = req.body;

  try {
    const item = await items.update(
      {
        name,
        brand_id,
        color_id,
        subtitle,
      },
      { returning: true, where: { id: id } }
    );
    res.status(201).send(`item with ${id} updated successfully!`);
  } catch (error) {
    res.status(400).send(`Something went Wrong: ${error}`);
  }
};
