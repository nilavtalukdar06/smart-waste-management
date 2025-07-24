import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    match: [
      /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/\S*)?$/,
      "image url is not valid",
    ],
  },
  reportId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Waste",
    required: true,
  },
  collectorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Collection =
  mongoose.models?.Collection || mongoose.model("Collection", collectionSchema);

export default Collection;
