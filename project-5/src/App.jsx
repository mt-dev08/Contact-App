import Navbar from "./components/Navbar";
import {FiSearch} from "react-icons/fi";
import {AiFillPlusCircle} from "react-icons/ai";
import ContactCard from "./components/ContactCard";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import AddAndUpdateContact from "./components/AddAndUpdateContact";
import useDisclouse from "./hooks/useDisclouse";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFoundContact from "./components/NotFoundContacts";

const App = () => {

  const [contact,setContacts] = useState([]);
  const {onClose,onOpen,isOpen} = useDisclouse();


  useEffect(()=>{

    const getContacts = async ()=>{
      try {

        const contactsRef = collection(db,"contacts");


        onSnapshot(contactsRef,(snapshot)=>{

          const contactLists = snapshot.docs.map((docs)=>{
            return {
              id:docs.id,
              ...docs.data(),
            }
          })
  
          setContacts(contactLists);

          return contactLists;
  


        })


        
      } catch (error) {

        console.log(error);
        
      }
    }

    getContacts();

  },[])


  
  const filterContacts = (e) => {
    const value = e.target.value;

    const contactsRef = collection(db, "contacts");

    onSnapshot(contactsRef, (snapshot) => {
      const contactLists = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      const filteredContacts = contactLists.filter((contact) =>
        contact.name.toLowerCase().includes(value.toLowerCase())
      );

      setContacts(filteredContacts);

      return filteredContacts;
    });
  };






  return (

    <>
    <div className="mx-auto max-w-[370px] px-4">

    <Navbar/>
    
    <div className="flex gap-2">
      <div className="relative flex flex-grow items-center">
        <FiSearch className="text-3xl text-white absolute ml-1" />
        <input onChange={filterContacts} type="text" className=" flex-grow h-10 rounded-md border bg-transparent border-white text-white pl-9" />
      </div>
      <div>
      <AiFillPlusCircle onClick={onOpen} className="text-5xl text-white cursor-pointer"/>
      </div>
    </div>


    <div className="mt-4 gap-3 flex flex-col">
      {contact.length<=0? (<NotFoundContact/>):(
        contact.map((contacts)=>(
          <ContactCard contacts={contacts} key={contacts.id}/>

          

        )))
      }
    </div>
    </div>


    <AddAndUpdateContact onClose={onClose} isOpen={isOpen}/>
    <ToastContainer position="bottom-center"/>

    </>



  )
}

export default App;
