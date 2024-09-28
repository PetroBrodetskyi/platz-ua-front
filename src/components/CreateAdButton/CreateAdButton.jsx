import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import scss from "./CreateAdButton.module.scss";

const CreateAdButton = () => {
  const navigate = useNavigate();

  const navigateToCreateAd = () => {
    navigate("/create");
  };

  return (
    <button className={scss.createAdButton} onClick={navigateToCreateAd}>
      <AiOutlinePlus className={scss.icon} />
    </button>
  );
};

export default CreateAdButton;
