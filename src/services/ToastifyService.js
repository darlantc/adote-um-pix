import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

import UserNotification from "../components/UserNotification";

toast.configure();

export const displayToastNotification = ({ type, message }) => {
    toast[type](<UserNotification message={message} />);
};

export const userLoginNotification = (loggedUser) => {
    if (loggedUser === null) {
        toast.error(<UserNotification message="Usuário desconectado!" />);
    } else if (!loggedUser.isAnonymous) {
        toast.success(<UserNotification message="Usuário conectado!" />);
    }
};
