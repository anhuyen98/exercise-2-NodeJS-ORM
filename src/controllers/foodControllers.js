import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";

const connect = initModels(sequelize);

const getFood = async (req, res) => {
  try {
    let data = await connect.foods.findAll();
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send(`Error ${error}`);
  }
};

const getFoodById = async (req, res) => {
  try {
    let { foodId } = req.params;
    let checkFood = await connect.foods.findOne({
      where: {
        food_id: foodId,
      },
    });
    if (checkFood) {
      res.status(200).send(checkFood);
    } else {
      res.status(404).send("Food is not existed");
    }
  } catch (error) {
    res.status(404).send(`Error ${error}`);
  }
};

const createFood = async (req, res) => {
  try {
    let { food_name, image, price, description, type_id } = req.body;
    let checkFood = await connect.foods.findOne({
      where: {
        food_name,
      },
    });
    if (checkFood) {
      res.status(404).send("Food is existed");
    } else {
      let newData = { food_name, image, price, description, type_id };
      await connect.foods.create(newData);
      res.status(201).send("Create food is successful");
    }
  } catch (error) {
    res.status(404).send(`Error ${error}`);
  }
};

const updateFood = async (req, res) => {
  try {
    let { foodId } = req.params;
    let { food_name, image, price, description, type_id } = req.body;
    let checkFood = await connect.foods.findOne({
      where: {
        food_id: foodId,
      },
    });
    if (checkFood) {
      let newData = { food_name, image, price, description, type_id };
      await connect.foods.update(newData, {
        where: {
          food_id: foodId,
        },
      });
      res.status(200).send("Update food is successful");
    } else {
      res.status(404).send("Food is not existed");
    }
  } catch (error) {
    res.status(404).send(`Error ${error}`);
  }
};

const delFood = async (req, res) => {
  try {
    let { foodId } = req.params;
    let checkFood = await connect.foods.findOne({
      where: {
        food_id: foodId,
      },
    });

    if (checkFood) {
      await connect.foods.destroy({
        where: {
          food_id: foodId,
        },
      });
      res.status(200).send("Delete food is successful");
    } else {
      res.status(404).send("Food is not existed");
    }
  } catch (error) {
    res.status(404).send(`Error ${error}`);
  }
};

export { getFood, getFoodById, createFood, updateFood, delFood };
