import { Schema, model, models } from "mongoose";

const postSchema = new Schema({
    title:String,
    description:String,
    image:String,
    created_at:String
},{toJSON:{virtuals:true}});

postSchema.virtual('short_description').get(function(){
    return this.description.substr(0,150)+'...'
});
postSchema.virtual('created_at_formatted').get(function(){
    return changeD(this.created_at)
});

function changeD(date_str){
    const date = new Date(date_str);
    const months = ["Janauary","FEBRAURY","MARCH","APRIL","MAY","JUNE","JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"];

    return `${months[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`;
}

const PostModel = models.Post || model('Post',postSchema);

export default PostModel;