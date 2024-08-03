const mongoose=require('mongoose');

const productSchema=new mongoose.Schema({
    image:String,
    name:String,
    price:Number,
    discount:{
        type:Decimal128,
        default:0
    },
    bgcolor:String,
    panelcolor:String,
    textcolor:String
});
     
const Product=mongoose.model('Product',productSchema);

module.exports={Product};
