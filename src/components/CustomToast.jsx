import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

import LogoImage from "../assets/images/adote-um-pix-logo.svg";

toast.configure();

const CustomToast = ({ message }) => {
    return (
        <div
            style={{
                height: "40px",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "7px",
                backgroundColor: "#FFFFFF",
                padding: "5px",
            }}
        >
            <img src={LogoImage} style={{ width: "30px" }} alt="logo" />{" "}
            <h3 style={{ marginLeft: "20px", color: "black" }}>{message}</h3>
        </div>
    );
};

export default CustomToast;

export const userRequestNotification = ({ type, message }) => {
    toast[type](<CustomToast message={message} />);
};

export const userLoginNotification = (loggedUser) => {
    if (loggedUser === null) {
        toast.error(<CustomToast message="Usuário desconectado!" />);
        return;
    }
    if (loggedUser.isAnonymous === false) {
        toast.success(<CustomToast message="Usuário conectado!" />);
    }
};
