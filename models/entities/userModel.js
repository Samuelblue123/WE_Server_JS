import mongoose, { Schema } from "mongoose";
const userSchema = new Schema({
    uuid: { type: String, required: true },
    worldevents: { type: [String], required: false, default: null },
}, {
    collation: { locale: "en", strength: 2 },
});
const UserModel = mongoose.model("User", userSchema);
userSchema.methods.getWorldEvent = function (value) {
    return this.worldevents.indexOf(value);
};
export default UserModel;
//# sourceMappingURL=userModel.js.map