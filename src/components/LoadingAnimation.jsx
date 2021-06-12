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
        >
            <div className="load-animation">
                <img
                    src={LogoImage}
                    style={{ width: "150px" }}
                    alt="LoadingAnimation"
                />
            </div>
        </div>
    );
};

export default LoadingAnimation;
