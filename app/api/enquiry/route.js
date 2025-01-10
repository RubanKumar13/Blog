import connectMango from "../../../utils/connect";
import EnquiryModel from "../../../models/enquiryModel";


export async function POST(req){
    try{

        const {names,email,message} =  await req.json();
        const enquiry = {names,email,message}
        await connectMango()
        await EnquiryModel.create(enquiry)
        return Response.json({message:"Our team Will Contacting you soon"})
    } catch (error){
        return Response.json({message:error._message})
    }
}