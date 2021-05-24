import { Typography, Box, Button } from "@material-ui/core";
import { observer } from "mobx-react";

import { useMainStoreContext } from "../contexts/mainStoreContext";
import LoginStatus from "../models/LoginStatus";
import EmailRedirectButton from "./EmailRedirectButton";
import Google from "../assets/images/Gmail.jpg";
import Outlook from "../assets/images/Outlook.jpg";
import Yahoo from "../assets/images/Yahoo.jpg";

const EmailRedirectOptions = observer(() => {
  const { authStore } = useMainStoreContext();
  const { setLoginStatus } = authStore;

  return (
    <div>
      <Typography variant="h6" align="center">
        Obrigado! Agora por favor abra o link que enviamos para seu e-mail.
      </Typography>
      <Typography variant="h6" color="primary" align="center" gutterbottom>
        {window.localStorage.getItem("emailForSignIn")}
      </Typography>

      <Box m={2} display="flex" flexDirection="column" justifyContent="center">
        <EmailRedirectButton
          href="https://mail.google.com/mail/"
          src={Google}
          alt="Google"
        />
        <EmailRedirectButton
          href="https://outlook.live.com/"
          src={Outlook}
          alt="Outlook"
        />
        <EmailRedirectButton
          href="https://mail.yahoo.com/"
          src={Yahoo}
          alt="Yahoo"
        />
      </Box>

      <Typography variant="h6" align="center">
        Não é esse email?
      </Typography>
      <Box m={1} display="flex" justifyContent="center">
        <Button
          variant="outlined"
          size="medium"
          onClick={() => setLoginStatus(LoginStatus.offline)}
        >
          Voltar
        </Button>
      </Box>
    </div>
  );
});

export default EmailRedirectOptions;
