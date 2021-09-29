const brands = require("../../models").brands;
const { brandValidator } = require("../../validator/brand");
const { Op } = require("sequelize");

exports.getBrands = async function (req, res) {
  const { limit, page, name } = req.body;

  try {
    if (!name) {
      const brand = await brands.findAll();
      res.status(200).send(brand);
    } else {
      const brand = await brands.findAndCountAll({
        limit: limit ? limit : 5,
        where: { name: { [Op.like]: `%${name}%` } },
        offset: page ? page : 0,
      });
      res.send(brand);
    }
  } catch (error) {
    res.status(400).send(`Something went Wrong: ${error}`);
  }
};

exports.createBrands = async function (req, res) {
  try {
    const { error } = brandValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { name, image } = req.body;

    const brand = await brands.create({ name, image });
    res.status(201).json(brand);
  } catch (error) {
    res.status(400).send(`Something went Wrong: ${error}`);
  }
};

exports.getBrandsById = async function (req, res) {
  const id = req.params.id;
  try {
    if (!id) res.status(400).send("ID is required!");
    const brand = await brands.findOne({ where: { id: id } });
    res.status(200).json(brand);
  } catch (error) {
    res.status(400).send(`Something went Wrong: ${error}`);
  }
};

exports.deleteBrands = async function (req, res) {
  const id = req.params.id;
  try {
    const oldBrand = await brands.findOne({ where: { id: id } });

    if (oldBrand) {
      const brand = await brands.destroy({
        where: {
          id: String(id),
        },
      });
      res.status(200).send(`brand with ${id} deleted successfully!`);
      console.log("ID", oldBrand);
    } else {
      res
        .status(400)
        .send(`brand with ${id} didnt find! please send available ID`);
    }
  } catch (error) {
    res.status(400).send(`Something went Wrong: ${error}`);
  }
};

exports.updateBrands = async function (req, res) {
  const id = req.params.id;
  const { name, family, phone, email, address } = req.body;

  try {
    const brand = await brands.update(
      {
        name: name,
      },
      { returning: true, where: { id: id } }
    );
    res.status(201).send(`brand with ${id} updated successfully!`);
  } catch (error) {
    res.status(400).send(`Something went Wrong: ${error}`);
  }
};
