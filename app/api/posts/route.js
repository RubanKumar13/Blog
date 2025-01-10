import connectMango from "../../../utils/connect";
import PostModel from "../../../models/postModel";

export async function GET(req){
    const query =  req.nextUrl.searchParams.get('q')
    try{
        await connectMango();
        let postdata;
        if(query){
             postdata =  await PostModel.find({
                $or : [
                    {title: new RegExp(query,'i')},
                    {description: new RegExp(query,'i')}
                ]
            });
            
        } else{

             postdata =  await PostModel.find({});
        }
        return Response.json(postdata);
    } catch(error){
        return Response.json({message:error.message})
    }
   
}