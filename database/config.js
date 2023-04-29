const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
    });

    console.log(
      "Successfully Connected to DB called =====> 'CALENDAR' <======."
    );
  } catch (error) {
    console.log(error);
    throw new Error(
      "Error connecting to DB called 'CALENDAR', please check your connection."
    );
  }
};
module.exports = { dbConnection };
