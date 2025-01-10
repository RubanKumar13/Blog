// import connectMango from "../../../utils/connect";
// import PostModel from "../../../models/postModel";

// export async function GET(req){
//     const query =  req.nextUrl.searchParams.get('q')
//     try{
//         await connectMango();
//         let postdata;
//         if(query){
//              postdata =  await PostModel.find({
//                 $or : [
//                     {title: new RegExp(query,'i')},
//                     {description: new RegExp(query,'i')}
//                 ]
//             });
            
//         } else{

//              postdata =  await PostModel.find({});
//         }
//         return Response.json(postdata);
//     } catch(error){
//         return Response.json({message:error.message})
//     }
   
// }
import connectMango from "../../../utils/connect";
import PostModel from "../../../models/postModel";

export async function GET(req) {
    const query = req.nextUrl.searchParams.get('q');

    try {
        // Connect to the MongoDB database
        await connectMango();

        // Fetch post data based on query
        let postdata;
        if (query) {
            postdata = await PostModel.find({
                $or: [
                    { title: new RegExp(query, 'i') },
                    { description: new RegExp(query, 'i') }
                ]
            });
        } else {
            postdata = await PostModel.find({});
        }

        // Return success response
        return new Response(JSON.stringify(postdata), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        // Return error response
        return new Response(JSON.stringify({ message: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
