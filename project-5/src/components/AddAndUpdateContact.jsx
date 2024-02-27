import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import Modal from "./Modal";
import { ErrorMessage,Formik,Form,Field } from "formik";
import { db } from "../config/firebase";
import * as Yup from "yup";

const AddAndUpdateContact = ({isOpen,onClose, isUpdate,contact}) => {


    const contactSchemaValidation = Yup.object().shape({
        name:Yup.string().required("Name is Required"),
        email:Yup.string().email("Invalid Email").required("Email is Required"),

    })


    const addContact = async (contact)=>{
        try {
            const contactsRef = collection(db,"contacts");
            await addDoc(contactsRef,contact);
            onClose();
            toast.success("Contacts Added Successfully");

        } catch (error) {
            console.log(error);
            
        }
    }

    const updateContact = async (contact,id)=>{
        try {
            const contactsRef = doc(db,"contacts",id);
            await updateDoc(contactsRef,contact);
            onClose();
            toast.success("Contacts Updated Successfully");

        } catch (error) {
            console.log(error);
            
        }
    }
  return (
    <div>

        <Modal isOpen={isOpen} onClose={onClose}>

        <Formik

        validationSchema={contactSchemaValidation}
        
         initialValues={

            isUpdate ? {
                name:contact.name,
                email:contact.email,

            }
            :
            {
                name:"",
                email:"",
            }
        } 
        
        onSubmit={(values)=>{
            console.log(values);

            isUpdate ? updateContact(values,contact.id) : addContact(values);
        }}
        
        >
            <Form className="flex flex-col gap-4">

            <div className="flex flex-col gap-1">
                <label htmlFor="name">Name</label>
                <Field name="name" className="border h-10"/>
                <div className=" text-xs text-red-500">
                <ErrorMessage name="name" />
              </div>
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="email">Email</label>
                <Field type="email" name="email" className="border h-10"/>
                <div className=" text-xs text-red-500">
                <ErrorMessage name="email" />
              </div>
            </div>

            <button className="bg-orange px-3 py-1.5 border self-end">
                {isUpdate ? "Update":"Add"} Contact
            </button>

            </Form>
        </Formik>
      
        </Modal>
      
    </div>
  )
}

export default AddAndUpdateContact;
