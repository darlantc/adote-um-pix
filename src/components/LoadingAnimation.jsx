import LogoImage from "../assets/images/adote-um-pix-logo.svg";

const LoadingAnimation = () => {
    return (
        <div className="load-animation">
            <img
                src={LogoImage}
                style={{ width: "150px" }}
                alt="LoadingAnimation"
            />
        </div>
    );
};

export default LoadingAnimation;
