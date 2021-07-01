import LogoImage from "../assets/images/adote-um-pix-logo.svg";

const LoadingAnimation = () => {
    return (
        <div
            style={{
                width: 300,
                height: 300,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <img className="load-animation" src={LogoImage} style={{ width: "150px" }} alt="Animação de Carregamento" />
        </div>
    );
};

export default LoadingAnimation;
