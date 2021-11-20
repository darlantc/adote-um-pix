import LogoImage from "../assets/images/adote-um-pix-logo.svg";

const LoadingAnimation = () => {
    return (
        <div
            data-testid="LoadingAnimation"
            style={{
                width: "100%",
                height: 300,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "15px",
                backgroundColor: "rgba(255, 255, 255, 0.5)",
            }}
        >
            <img className="load-animation" src={LogoImage} style={{ width: "150px" }} alt="Animação de Carregamento" />
        </div>
    );
};

export default LoadingAnimation;
