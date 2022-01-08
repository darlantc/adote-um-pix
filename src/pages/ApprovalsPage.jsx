import { Box } from "@material-ui/core";

import UserRequestApprovalSection from "../components/UserRequestApprovalSection";
import UserPromotionSection from "../components/UserPromotionSection";

const ApprovalsPage = () => {
    return (
        <Box display="flex">
            <Box width="70%" display="flex" alignItems="center" justifyContent="center">
                <UserRequestApprovalSection />
            </Box>
            <Box width="30%" display="flex" alignItems="center" justifyContent="center" flexDirection="column">
                <UserPromotionSection />
            </Box>
        </Box>
    );
};

export default ApprovalsPage;
