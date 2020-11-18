import React, { useEffect, useState } from 'react'


const useValidated = (stateInitial,validate,fn) => {

    const [items, setItems ] = useState(stateInitial);
    const  [errors, setErrors] = useState({});
    const [submitForm, setSubmitForm] = useState(false);

    useEffect(() => {
      if (submitForm) {
          const noErrors = Object.keys(errors).length === 0;

          if (noErrors) {
              fn(); //function
          }
          setSubmitForm(false);
      }
    }, [errors]);

    // this function is run when the uset type something in the input
    const handleChange  = (e) =>{
        setItems({
            ...items,
            [e.target.name]:e.target.value
        })
    }
    // this function running when the user do submit
    const handleSumbit = (e) =>{
        e.preventDefault();
        const errorsValidated = validate(items);
        setErrors(errorsValidated);
        setSubmitForm(true);
    }

    //when event blur happens
    const handleBlur = () =>{
        const errorsValidated = validate(items);
        setErrors(errorsValidated);
    }
    return {
        items,
        errors,
        handleBlur,
        handleSumbit,
        handleChange
    };
}
 
export default useValidated;