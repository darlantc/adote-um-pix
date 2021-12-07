import { Typography } from "@material-ui/core";

const SingularPluralTypography = ({ singular, plural, zero, amount, variant }) => {
    let message = "";

    if (amount === 0) {
        message = zero;
    } else if (amount === 1) {
        message = singular;
    } else {
        message = plural;
    }

    return <Typography variant={variant}>{message}</Typography>;
};

export default SingularPluralTypography;
