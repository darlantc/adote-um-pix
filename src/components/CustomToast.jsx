import LogoImage from "../assets/images/adote-um-pix-logo.svg"

const CustomToast = ({message}) => {
    return (
        <div style={{ height: "40px", display: "flex", alignItems: "center"}}>
            <img src={LogoImage} style={{ width:"30px", margin: "5px" }} alt="logo" /> <h3 style={{ marginLeft: "20px", color: "black" }}>{message}</h3>
        </div>
    )
}

export default CustomToast