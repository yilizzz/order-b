const Services = require("../models/services");
const ServiceFR = require("../models/service-fr");
const mongoose = require("mongoose");

/** This function retrieves all services based on the requested language
 *  */
exports.getAllServices = async (req, res, next) => {
  // Extract the language from the request query
  const { language } = req.query;

  // Determine the appropriate model to use based on the language
  const Service = language === "fr" ? ServiceFR : Services;

  try {
    // Fetch all services from the determined model
    const services = await Service.find();

    // Send the fetched services as a response with status 200
    res.status(200).json(services);
  } catch (error) {
    // If an error occurs, send the error as a response with status 400
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
  const lang = req.params.lang;
  const infoObject = assembleObject(JSON.parse(req.body.info), req.file);
  const newService =
    lang === "en" ? new Services(infoObject) : ServiceFR(infoObject);

  try {
    await newService.save();
    res.status(200).json({ message: "New service added" });
  } catch (error) {
    res.status(400).json(error);
  }
};

/**
 * get a service by id
 */
exports.getServiceById = async (req, res, next) => {
  const lang = req.params.lang;
  try {
    const service =
      lang === "en"
        ? await Services.findById(req.params.id)
        : await ServiceFR.findById(req.params.id);
    res.status(200).json(service);
  } catch (error) {
    res.status(400).json(error);
  }
};
/**
 * delete a service by id
 */
exports.deleteServiceById = async (req, res, next) => {
  const lang = req.params.lang;
  const Service = lang === "en" ? Services : ServiceFR;
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Service deleted" });
  } catch (error) {
    res.status(400).json(error);
  }
};
/**
 * update a service by id
 */
exports.updateServiceById = async (req, res, next) => {
  const { lang } = req.params;
  const info = JSON.parse(req.body.info);
  const Service = lang === "en" ? Services : ServiceFR;
  const data = req.file ? assembleObject(info, req.file) : info;

  try {
    await Service.findByIdAndUpdate(req.params.id, data, { new: true });
    res.status(200).json({ message: "Service updated" });
  } catch (error) {
    console.log(
      error instanceof mongoose.Error.ValidationError
        ? "Validation Error:"
        : "Unknown Error:",
      error.message
    );
    res.status(400).json(error);
  }
};
