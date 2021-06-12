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
    const rawDate = String(fromUnixTime(timestamp));
    return rawDate.slice(0, 25);
};

export const formatLinkedIn = (answerFromUser) => {
    if (answerFromUser) {
        const pathParamPattern = /^[a-z\d]{3,100}$/;
        const isPathParam = pathParamPattern.test(answerFromUser);
        const isCompleteUrl = String(answerFromUser).includes(
            "www.linkedin.com/in/"
        );

        if (isPathParam) {
            return `www.linkedin.com/in/${answerFromUser}`;
        }

        if (isCompleteUrl) {
            return answerFromUser;
        }
    }
    return null;
};
