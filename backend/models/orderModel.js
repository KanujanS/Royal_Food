import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
    userId:{type:String,Required:true},
    items:{type:Array,Required:true},
    amount:{type:Number,Required:true},
    address:{type:Object,Required:true},
    status:{type:String,default:"Food Processing"},
    date:{type:Date,default:Date.now()},
    payment:{type:Boolean,default:false}
})
const orderModel = mongoose.models.order || mongoose.model("order",orderSchema);
export default orderModel;