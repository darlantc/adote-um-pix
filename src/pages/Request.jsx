import { Typography } from "@material-ui/core";

import UserRequestForm from "../components/forms/UserRequestForm";

const Request = () => {
    return (
        <>
            <Typography variant="h3" gutterBottom>
                Solicite
            </Typography>
            <UserRequestForm />
        </>
    );
};

export default Request;
