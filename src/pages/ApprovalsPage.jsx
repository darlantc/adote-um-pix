import { Grid } from "@material-ui/core";

import UserRequestApprovalComponent from "../components/UserRequestApprovalComponent";
import UserPromotionSection from "../components/UserPromotionSection";

const ApprovalsPage = () => {
    return (
        <Grid container>
            <UserPromotionSection />
            <UserRequestApprovalComponent />
        </Grid>
    );
};

export default ApprovalsPage;
