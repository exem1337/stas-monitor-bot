import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MyDB = () => {
  const parap = useParams();

  useEffect(() => {}, []);
  return <div>{parap.id}</div>;
};

export default MyDB;
