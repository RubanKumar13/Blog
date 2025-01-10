import connectMango from "../../../../utils/connect";
import PostModel from "../../../../models/postModel";

export async function GET(req, 
    {params}){
    try{
        await connectMango();
        const postdata =  await PostModel.findOne({_id: params.id});
        return Response.json(postdata);
    } catch(error){
        return Response.json({message:error.message})
    }
   
}