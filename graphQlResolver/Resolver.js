const Product = require("../Modal/ProductSchema");
const User = require("../Modal/Userschema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const formatErrors = async (err) => {
  const errors = { path: "", message: "" };
  if (err._message === "User validation failed") {
    Object.values(err.errors).map(({ properties }) => {
      (errors.path = properties.path), (errors.message = properties.message);
    });
  }
  if (err.code === 11000) {
    (errors.path = "email"),
      (errors.message = "This email is already attached to a user");
  }
  if (err.code === 11000 && err.keyPattern.phoneNum === 1) {
    (errors.path = "Phone Number"),
      (errors.message = "This number is already attached to a user");
  }

  return [errors];
};

const loginFormatErrors = async (err) => {
  const errors = { path: "", message: "" };
  if (err.message === "Incorrect password") {
    (errors.path = "password"), (errors.message = "Incorrect password");
  }
  if (err.message === "wrong email") {
    (errors.path = "email"),
      (errors.message = "User with this email not found");
  }

  return [errors];
};

const resolver = {
  getProducts: async () => {
    const getAllProducts = await Product.find({ category: "Groceries" });
    return getAllProducts.map((product) => {
      return {
        id: product._id,
        ...product._doc,
      };
    });
  },
  getProductCategory: async (args) => {
    const getSingleCategory = await Product.find(args);
    return getSingleCategory.map((product) => {
      return {
        id: product._id,
        ...product._doc,
      };
    });
  },
  getSkincare: async () => {
    const getAllProducts = await Product.find({ category: "Skincare" });
    return getAllProducts.map((product) => {
      return {
        id: product._id,
        ...product._doc,
      };
    });
  },


  getSingleProduct: async (args) => {
    const { id } = args;
    const singleProduct = await Product.findById(id);
    return {
      id: singleProduct.id,
      ...singleProduct._doc,
    };
  },

  createProduct: async (args) => {
    const newProducts = new Product({
      name: args.input.name,
      description: args.input.description,
      shortDescription: args.input.shortDescription,
      price: args.input.price,
      discount: args.input.discount,
      image_url: args.input.image_url,
      category: args.input.category,
      stock_available: args.input.stock_available,
      data_created: args.input.data_created,
    });
    const result = await newProducts.save();
    return {
      id: result._id,
      ...result._doc,
    };
  },
  createUser: async (args) => {
    try {
      const newUser = new User({
        name: args.input.name,
        email: args.input.email,
        phoneNum: args.input.phoneNum,
        password: args.input.password,
      });
      const user = await newUser.save();
      if (user) {
        const token = await jwt.sign({ user: user._id }, "helloWorld", {
          expiresIn: "7d",
        });
        return {
          ok: true,
          user: {
            userId: user._id,
            isAdmin: user.isAdmin,
            userName: user.name,
            token,
          },
        };
      }
    } catch (err) {
      return {
        ok: false,
        errors: formatErrors(err),
      };
    }
  },
  login: async ({ email, password }) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("wrong email");
      }
      const passwordCheck = await bcrypt.compare(password, user.password);
      if (!passwordCheck) {
        throw new Error("Incorrect password");
      }
      const token = await jwt.sign({ user: user._id }, "helloWorld", {
        expiresIn: "7d",
      });
      return {
        ok: true,
        user: {
          userId: user._id,
          userName: user.name,
          isAdmin: user.isAdmin,
          token,
          tokenExpiration: 3,
        },
      };
    } catch (err) {
      return {
        ok: false,
        errors: loginFormatErrors(err),
      };
    }
  },
};

module.exports = resolver;
