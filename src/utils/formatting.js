import fromUnixTime from "date-fns/fromUnixTime";

export const formatCpf = (validCPF) => {
    const cpf = validCPF ? String(validCPF) : "";
    if (cpf.length === 11) {
        return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(
            6,
            9
        )}-${cpf.slice(9)}`;
    }
    return null;
};

export const formatPhoneNumber = (validPhoneNumber) => {
    const phoneNumber = validPhoneNumber ? String(validPhoneNumber) : "";
    if (phoneNumber.length === 11) {
        return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(
            2,
            7
        )}-${phoneNumber.slice(7)}`;
    }
    return null;
};

export const formatDate = (timestamp) => {
    const convertedToUnix = timestamp / 1000;
    const rawDate = String(fromUnixTime(convertedToUnix));
    return rawDate.slice(0, 25);
};
