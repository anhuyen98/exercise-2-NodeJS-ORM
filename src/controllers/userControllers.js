import sequelize from "../models/connect.js";
import initModels from "../models/init-models.js";

const connect = initModels(sequelize);

const getUser = async (req, res) => {
  try {
    let data = await connect.users.findAll();
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send(`Error ${error}`);
  }
};

// Get list-like base on User-Id
const getLikeByUserId = async (req, res) => {
  try {
    let { userId } = req.params;
    let data = await connect.users.findOne({
      where: {
        user_id: userId,
      },
      include: ["like_res"],
    });
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send(`Error ${error}`);
  }
};

// Get list-rate base on User-Id
const getRateByUserId = async (req, res) => {
  try {
    let { userId } = req.params;
    let data = await connect.users.findOne({
      where: {
        user_id: userId,
      },
      include: ["rate_res"],
    });
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send(`Error ${error}`);
  }
};

const getUserById = async (req, res) => {
  try {
    let { userId } = req.params;
    let checkUser = await connect.users.findOne({
      where: {
        user_id: userId,
      },
    });
    if (checkUser) {
      res.status(200).send(checkUser);
    } else {
      res.status(404).send("User is not existed");
    }
  } catch (error) {
    res.status(404).send(`Error ${error}`);
  }
};

const createUser = async (req, res) => {
  try {
    let { full_name, email, password } = req.body;
    let checkUser = await connect.users.findOne({
      where: {
        email,
      },
    });
    if (checkUser) {
      res.status(404).send("User is existed");
    } else {
      let newData = {
        full_name,
        email,
        password,
      };
      await connect.users.create(newData);
      res.status(201).send("Create user is successful!!!");
    }
  } catch (error) {
    res.status(404).send(`Error ${error}`);
  }
};

const updateUser = async (req, res) => {
  try {
    let { full_name, email, password } = req.body;
    let { userId } = req.params;
    let checkUser = await connect.users.findOne({
      where: {
        user_id: userId,
      },
    });
    if (checkUser) {
      let newData = {
        full_name,
        email,
        password,
      };
      await connect.users.update(newData, {
        where: {
          user_id: userId,
        },
      });
      res.status(200).send("Update successful");
    } else {
      res.status(404).send("User is not existed");
    }
  } catch (error) {
    res.status(404).send(`Error ${error}`);
  }
};

const delUser = async (req, res) => {
  try {
    let { userId } = req.params;
    let checkUser = await connect.users.findOne({
      where: {
        user_id: userId,
      },
    });
    if (checkUser) {
      await connect.users.destroy({
        where: {
          user_id: userId,
        },
      });
      res.status(200).send("Delete successful!!");
    } else {
      res.status(404).send("User is not existed");
    }
  } catch (error) {
    res.status(404).send(`Error ${error}`);
  }
};

// Handle "LIKE"
const handleLike = async (req, res) => {
  try {
    let { userId, resId } = req.query;
    let data = await connect.like_res.findOne({
      where: {
        user_id: userId,
        res_id: resId,
      },
      // include: ["user", "re"],
    });
    if (data) {
      res.status(404).send(data);
    } else {
      let newData = { user_id: userId, res_id: resId, date_like: Date.now() };
      await connect.like_res.create(newData);
      res.status(201).send("LIKE successful");
    }
  } catch (error) {
    console.log(`Error ${error}`);
  }
};

// Handle "UNLIKE"
const handleUnlike = async (req, res) => {
  try {
    let { userId, resId } = req.query;
    let data = await connect.like_res.findOne({
      where: {
        user_id: userId,
        res_id: resId,
      },
      // include: ["user", "re"],
    });
    if (data) {
      await connect.like_res.destroy({
        where: {
          user_id: userId,
          res_id: resId,
        },
        // include: ["user", "re"]
      });
      res.status(201).send("DISLIKE successful");
    } else {
      res.status(404).send("NOT FOUND");
    }
  } catch (error) {
    res.status(404).send(`Error ${error}`);
  }
};

// Handle "Order"
const handleOrder = async (req, res) => {
  try {
    let { userId, foodId, amount, code, arrSubId } = req.query;
    let checkUser = await connect.users.findOne({
      where: {
        user_id: userId,
      },
    });
    if (checkUser) {
      let newData = {
        user_id: userId,
        food_id: foodId,
        amount,
        code,
        arr_sub_id: arrSubId
      };
      await connect.orders.create(newData);
      res.status(201).send("Create-rate Successful!!!");
    } else {
      res.status(404).send("Not Found User");
    }
  } catch (error) {
    res.status(404).send(`Error ${error}`);
  }
};
// Handle "Create-rate"
const createRateByUserId = async (req, res) => {
  try {
    let { userId, resId, amount } = req.query;
    let checkUser = await connect.users.findOne({
      where: {
        user_id: userId,
      },
    });
    if (checkUser) {
      let newData = {
        user_id: userId,
        res_id: resId,
        amount,
        date_res: Date.now(),
      };
      await connect.rate_res.create(newData);
      res.status(201).send("Create-rate Successful!!!");
    } else {
      res.status(404).send("Not Found User");
    }
  } catch (error) {
    res.status(404).send(`Error ${error}`);
  }
};

export {
  getUser,
  getUserById,
  createUser,
  updateUser,
  delUser,
  getLikeByUserId,
  getRateByUserId,
  handleLike,
  handleUnlike,
  createRateByUserId,
  handleOrder
};
