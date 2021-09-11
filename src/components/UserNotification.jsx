import LogoImage from "../assets/images/adote-um-pix-logo.svg";

const UserNotification = ({ message }) => {
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
            <img src={LogoImage} style={{ width: "30px" }} alt="logo" />
            <h3 style={{ marginLeft: "20px", color: "black" }}>{message}</h3>
        </div>
    );
};

export default UserNotification;
