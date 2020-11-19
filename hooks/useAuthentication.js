import React, { useEffect, useState } from 'react';
import firebase from "../firebase";

function useAuthentication() {
    const [userAuthentication, setUserAuthentication] = useState(null);

    useEffect(() => {
       const unSuscribe = firebase.auth.onAuthStateChanged( user =>{
           if (user) {
               setUserAuthentication(user);
           }else{
               setUserAuthentication(false);
           }
       });
       return () => unSuscribe();
    }, [])

    
    return userAuthentication;
}

export default useAuthentication;