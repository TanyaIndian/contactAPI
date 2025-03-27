import mongoose from "mongoose";
import { Contact } from "../Models/Contact.js";

//create new contact 
export const newContact = async (req,res)=>{

    const {name,email,phone,type} = req.body;
    if(name == '' || email =='' || phone == ''|| type== '' ) 
  return res.json({message : "All filed are required",success:false})

let saveContact = await Contact.create({
    name,email,phone,type,user :req.user
})
res.json({message:'contact saved in db',saveContact,success:true})
}

//get the contact

export const getAllContact = async(req,res)=>{

    const userContact = await Contact.find()
if(!userContact) return res.json({message:'no contact found',success:false})

res.json({message:'all contsct fetched',userContact})


}

//get contact by id

export const getContactById = async(req,res)=>{
    const id = req.params.id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid user ID", success: false });
    }
    const userContact = await Contact.findById(id);
    if(!userContact) return res.json({message:"contact not found"})
        res.json({message:"contact  found",userContact})
    }


    //update cotact by id

    export const updateContactById = async(req,res) =>{
        const id = req.params.id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid user ID", success: false });
        }
        const {name,email,phone,type} = req.body;
        let updatedContact = await Contact.findByIdAndUpdate(id,{
            name,email,phone,type
        },{new:true})

        if(!updatedContact) return res.json({message:'not contact exist',sucess:false})

            return res.json({message:'updated successfully',updatedContact})
 
    }

    //delete contact by id
     export const deleteContactById = async(req,res) =>{
        const id = req.params.id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid user ID", success: false });
        }
        const {name,email,phone,type} = req.body;
        let deleteContact = await Contact.findByIdAndDelete(id)

        if(!deleteContact) return res.json({message:'not contact exist',sucess:false})

            return res.json({message:'deleted successfully',deleteContact})
 
    }

    // get contact by user id

    export const getContactByUserId = async (req,res)=>{

        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid user ID", success: false });
        }
        const userContact = await Contact.find({user:id})
//   console.log(userContact,id)
        if(!userContact) return res.json({message:"No contact found",success:false})
    res.json({message:'user specific contact',userContact,success:true})
    
        }