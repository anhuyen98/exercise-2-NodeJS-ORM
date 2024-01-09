import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";

const connect = initModels(sequelize);

const getRestaurant = async (req, res) => {
  try {
    let data = await connect.restaurants.findAll();
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send(`Error ${error}`);
  }
};

// Get list-like base on res-Id
const getLikeByResId = async (req, res) => {
  try {
    let { resId } = req.params;
    let data = await connect.restaurants.findOne({
      where: {
        res_id: resId,
      },
      include: ["like_res"],
    });
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send(`Error ${error}`);
  }
};

// Get list-rate base on res-Id
const getRateByResId = async (req, res) => {
  try {
    let { resId } = req.params;
    let data = await connect.restaurants.findOne({
      where: {
        res_id: resId,
      },
      include: ["rate_res"],
    });
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send(`Error ${error}`);
  }
};

const getResById = async (req, res) => {
  try {
    let { resId } = req.params;
    let checkRes = await connect.restaurants.findOne({
      where: {
        res_id: resId,
      },
    });
    if (checkRes) {
      res.status(200).send(checkRes);
    } else {
      res.status(404).send("Restaurant is not existed");
    }
  } catch (error) {
    res.status(404).send(`Error ${error}`);
  }
};

const createRes = async (req, res) => {
  try {
    let { res_name, image, description } = req.body;
    let checkRes = await connect.restaurants.findOne({
      where: {
        res_name,
      },
    });
    if (checkRes) {
      res.status(404).send("Restaurant is existed");
    } else {
      let newData = {
        res_name,
        image,
        description,
      };
      await connect.restaurants.create(newData);
      res.status(201).send("Create restaurant is successful");
    }
  } catch (error) {
    res.status(404).send(`Error ${error}`);
  }
};

const updateRes = async (req, res) => {
  try {
    let { resId } = req.params;
    let { res_name, image, description } = req.body;
    let checkRes = await connect.restaurants.findOne({
      where: {
        res_id: resId,
      },
    });
    if (checkRes) {
      let newData = {
        res_name,
        image,
        description,
      };
      await connect.restaurants.update(newData, {
        where: {
          res_id: resId,
        },
      });
      res.status(200).send("Update restaurant is successful");
    } else {
      res.status(404).send("Restaurant is not existed");
    }
  } catch (error) {
    res.status(404).send(`Error ${error}`);
  }
};

const delRes = async (req, res) => {
  try {
    let { resId } = req.params;
    let checkRes = await connect.restaurants.findOne({
      where: {
        res_id: resId,
      },
    });
    if (checkRes) {
      await connect.restaurants.destroy({
        where: {
          res_id: resId,
        },
      });
      res.status(200).send("Delete restaurant is successful");
    } else {
      res.status(404).send("Restaurant is not existed");
    }
  } catch (error) {
    res.status(404).send(`Error ${error}`);
  }
};

export {
  getRestaurant,
  getResById,
  createRes,
  updateRes,
  delRes,
  getLikeByResId,
  getRateByResId,
};
