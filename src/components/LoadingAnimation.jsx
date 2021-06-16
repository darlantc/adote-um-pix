import LogoImage from "../assets/images/adote-um-pix-logo.svg";

const LoadingAnimation = () => {
    return (
        <div
            style={{
                width: "300px",
                height: "300px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
            data-testid="div-container"
        >
            <img className="load-animation" src={LogoImage} style={{ width: "150px" }} alt="Loading Animation" />
        </div>
    );
};

export default LoadingAnimation;
