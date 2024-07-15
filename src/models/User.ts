import validator from "validator";
import bcrypt from "bcryptjs";
import * as crypto from "crypto";
import { IUserDocument } from "../interfaces/user.interface";
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    username: {
        type: String,
        required: [true, 'Please Provide Your Name!'],
    },
    email: {
        type: String,
        lowercase: true,
        required: [true, 'Please Provide Your Email!'],
        validate: [validator.isEmail, 'invalid email']
    },
    wishlist: [
      {
        type: Schema.Types.ObjectId,
        ref: "Attraction",
      },
    ],
    imageProfile: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "user", "supervisor"],
      default: "user",
    },
    password: {
      type: String,
      required: [true, "Please Provide Password!"],
      minLength: 8,
      select: false, // to prevent the return of password in any response
    },
    isVerified: {
      type: Boolean,
      default: false,
      // select: false
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    image: {
      type: String,
    },
    image_key: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["Male", "female"],
    },
    birthdate: {
      type: String,
    },
    country: {
      type: String,
    },
    address: {
      type: String,
    },
    method:{
        type:String,
        default:"web",
        enum:["web","google","facebook"]
    }
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id: false,
  }
);
userSchema.virtual("cart", {
  ref: "Cart",
  foreignField: "userId",
  localField: "_id",
});
// these middleware only works on save() and create() not on findandupdate()  find(Set)
// So any password updating we need to use user.save() not findByIdAndUpdate()
// userSchema.pre('save', async function(next) {
// const currentDocument:any = this;
//     // this middleware only workds on save(), create() not findAndUpdate()
//     //only run this password i fthe password is modified
//     if (!currentDocument.isModified('password')) return next();
//     //we hash the password with cost of 12 (salt Round)
//     currentDocument.password = await bcrypt.hash(currentDocument.password, 12);
//     // delete password confirmation field
//     next();
// });
userSchema.pre("save", async function (this: IUserDocument, next: any) {
  if (this.isModified("passwordConfirmation")) delete this.passwordConfirmation;
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hashSync(this.password, salt);
  this.password = hash;
  return next();
});
// userSchema.pre('save', async function(next) {
//     // this middleware only workds on save(), create() not findAndUpdate()
//     const currentDocument:any = this;
//     //only run this password i fthe password is modified and the document is not new
//     if (!currentDocument.isModified('password') || currentDocument.isNew) return next();
//     //we update the passwordchangeat
//     currentDocument.passwordChangedAt = Date.now() - 1000;
//     // we substract 1 sec from the passwordChangedAt because we wanna avoid the jwt creating the token before the passwordChangeAt Date
//     // so  substract 1 sec we make sure that the token is always created after the password has been changed
//     next();
// });
/******************  2) Query Middleware ****************/
// userSchema.pre(/^find/, function(next) {
//     const currentDocument:any = this;
//     //^find > any query that has find (find, findOne,findOneAndUpdate....)
//     /* This Refer to current Query */
//     currentDocument.find({ active: { $ne: false } }); // we say active:ne:false instead of active:true because if some users don't have the active part and they are active we wanna include them
//     next();
// });
// userSchema.methods.correctPassword = async function(
//     candidatePassword,
//     userPassword
// ) {
//     return await bcrypt.compare(candidatePassword, userPassword);
// };
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as IUserDocument;
  return bcrypt
    .compare(candidatePassword, user.password)
    .catch((err: any) => false);
};
userSchema.methods.changedPasswordAfter = function (jwtTimestamp) {
  const currentDocument: any = this;
  if (currentDocument.passwordChangedAt) {
    const passwordChangedAT: Date = currentDocument.passwordChangedAt;
    const changedTimeStamp = parseInt(
      (passwordChangedAT.getTime() / 1000).toString(),
      10
    );
    return jwtTimestamp < changedTimeStamp;
  }
  return false;
};
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  const currentDocument: any = this;
  // this token is what we will send to the user (it's like a reset password that user can use to create new real password)
  // we should never store a plain reset token in the database, (because if hacker get access to our database account he can reset password) , so we should hash it using crypto.hash(and then save it in the DB)
  currentDocument.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  console.log(
    { resetToken },
    { passwordResetToken: currentDocument.passwordResetToken }
  );
  currentDocument.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};
// userSchema.virtual("attractions", {
//     ref: "Attraction",
//     foreignField: "User",
//     localField: "_id",
//   });
const User = mongoose.model("User", userSchema);

export default mongoose.model<IUserDocument>("User", userSchema);
