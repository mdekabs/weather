import mongoose from "mongoose";
const { Schema } = mongoose;

const favoriteLocationSchema = new Schema({
  city: {
    type: String,
    required: true
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true
  }
});
const favoriteLocation = mongoose.model("favoriteLocation", favoriteLocationSchema);
export default favoriteLocation;
