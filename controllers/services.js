const Services = require("../models/services");
const mongoose = require("mongoose");

exports.getAllServices = async (req, res, next) => {
  try {
    const services = await Services.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(400).json(error);
  }
};
/**
 * Combine service's data and it's image, if there is an image, then it will be the url of the image,
 * if there is no image, then it will be an empty string.
 * @param {object,file}
 * */
const assembleObject = (object, file) => {
  let url = "";
  file
    ? (url = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.filename}`)
    : (url = "");
  return {
    ...object,
    image: url,
  };
};
/**
 * restful API, add a new service after verified user's token
 * */
exports.addService = async (req, res, next) => {
  const infoObject = assembleObject(JSON.parse(req.body.info), req.file);
  const newService = new Services(infoObject);
  try {
    newService.save();
    res.status(200).json({ message: "New service added" });
  } catch (error) {
    res.status(400).json(error);
  }
};
/**
 * get a service by id
 */
exports.getServiceById = async (req, res, next) => {
  try {
    const service = await Services.findById(req.params.id);
    res.status(200).json(service);
  } catch (error) {
    res.status(400).json(error);
  }
};
/**
 * delete a service by id
 */
exports.deleteServiceById = async (req, res, next) => {
  try {
    await Services.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Service deleted" });
  } catch (error) {
    res.status(400).json(error);
  }
};
/**
 * update a service by id
 */
exports.updateServiceById = async (req, res, next) => {
  const info = JSON.parse(req.body.info);
  try {
    if (req.file) {
      const infoFullObject = assembleObject(info, req.file);
      await Services.findByIdAndUpdate(req.params.id, infoFullObject, {
        new: true,
      });
    } else {
      await Services.findByIdAndUpdate(req.params.id, info, { new: true });
    }
    res.status(200).json({
      message: "Service updated",
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      console.log("Validation Error:", error.message);
    } else {
      console.log("Unknown Error:", error);
    }
    res.status(400).json(error);
  }
};
