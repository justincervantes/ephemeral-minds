const mongoose = require("mongoose");
const moment = require("moment");

const weightSchema = new mongoose.Schema({
  uid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: { type: Date, default: Date.now, required: true },
  weight: {
    type: Number,
    required: true,
    min: 0,
    max: 1000,
  },
});

const Weight = mongoose.model("Weight", weightSchema);

function validateWeight(weight) {
  const schema = Joi.object({
    uid: Joi.string().min(2).max(50).required(),
    date: Joi.date().required(),
    weight: Joi.number().min(0).max(1000).required(),
  });

  const options = {
    errors: {
      wrap: {
        label: "",
      },
    },
  };

  return schema.validate(weight, options);
}

exports.Weight = Weight;
exports.validate = validateWeight;
