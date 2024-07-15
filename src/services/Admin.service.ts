import User from "../models/User"

const UnActiveUser = async (userId:string)=>{
    try {
      return await User.findByIdAndUpdate(
        userId,
        {
          isActive:false
        },
        {
            upsert: true,
            new: true
        }
    )
    } catch (error:any) {
      // await ErrorHandler(error)
    }
  }
  export default {UnActiveUser};
