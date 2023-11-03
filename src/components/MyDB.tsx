import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";

const MyDB = ({id}) => {
   const parap  = useParams()

   useEffect(()=>{

   }, [])
    return (
        <div>
           ID = {id}
           {parap.id}
        </div>
    );
};

export default MyDB;