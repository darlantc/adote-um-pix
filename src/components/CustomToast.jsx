import LogoImage from "../assets/images/adote-um-pix-logo.svg"

const CustomToast = ({message}) => {
    return (
        <div style={{ height: "40px", display: "flex", alignItems: "center"}}>
            <img src={LogoImage} style={{ width:"60px", margin: "-10px" }} alt="logo" /> <h3 style={{ marginLeft: "20px" }}>{message}</h3>
        </div>
    )
}

export default CustomToast