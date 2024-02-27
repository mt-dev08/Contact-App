import { doc,deleteDoc } from "firebase/firestore";
import { HiOutlineUserCircle } from "react-icons/hi";
import { IoMdTrash } from "react-icons/io";
import { RiEditCircleLine } from "react-icons/ri";
import { db } from "../config/firebase";
import AddAndUpdateContact from "./AddAndUpdateContact";
import useDisclouse from "../hooks/useDisclouse";
import { toast } from "react-toastify";


const ContactCard = ({contacts}) => {

  const {onClose,onOpen,isOpen} = useDisclouse();


    const deleteContact = async(id)=>{
        try {
            await deleteDoc(doc(db,"contacts",id));
            toast.success("Contacts Deleted Successfully");
            
        } catch (error) {
            console.log(error);
            
        }
    }
  return (

    <>
        <div className=" flex justify-between items-center bg-yellow p-2 rounded-lg" key={contacts.id} >

        <div className="flex gap-1">
            <HiOutlineUserCircle className="text-orange text-4xl" />
            <div className="text-black">
                <h2 className="font-medium">{contacts.name}</h2>
                <p className="text-sm">{contacts.email}</p>
            </div>
        </div>

        <div className="flex text-3xl">
            <RiEditCircleLine onClick={onOpen} className="cursor-pointer"/>
            <IoMdTrash onClick={()=>deleteContact(contacts.id)} className="text-orange cursor-pointer"/>

            </div>

        </div>
        <AddAndUpdateContact isOpen={isOpen} onClose={onClose} isUpdate contact={contacts}/>
    </>
    
  )
}


export default ContactCard;

