import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaUserShield } from "react-icons/fa";
import { fetchCurrentUser } from "../../redux/features/authSlice";
import scss from "./Footer.module.scss";

const Footer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, token]);

  const handleNavigateToHowItWorks = () => {
    navigate("/how-it-works");
  };

  return (
    <footer className={scss.footer}>
      <div className={scss.container}>
        <div className={scss.title}>
          <p>&copy; {new Date().getFullYear()} PlatzUA</p>
        </div>
        <div className={scss.linksContainer}>
          <button
            className={scss.linkButton}
            onClick={handleNavigateToHowItWorks}
          >
            Покупцям та продавцям
          </button>
        </div>
        <div className={scss.adminButton}>
          {!loading && user && user.subscription === "admin" && (
            <button onClick={() => navigate("/admin")}>
              <FaUserShield className={scss.icon} />
            </button>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
