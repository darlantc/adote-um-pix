import { format, fromUnixTime } from "date-fns";

export const formatCpf = (validCPF) => {
    const cpf = validCPF ? String(validCPF) : "";
    if (cpf.length === 11) {
        return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9)}`;
    }
    return null;
};

export const formatPhoneNumber = (validPhoneNumber) => {
    const phoneNumber = validPhoneNumber ? String(validPhoneNumber) : "";
    if (phoneNumber.length === 11) {
        return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 7)}-${phoneNumber.slice(7)}`;
    }
    return null;
};

export const formatDate = (timestamp) => {
    const rawDate = String(fromUnixTime(timestamp / 1000));
    if (!timestamp || rawDate === "Invalid Date") {
        return null;
    }
    return format(new Date(rawDate), "dd/MM/yyyy");
};

export const formatLinkedIn = (input) => {
    if (!input) {
        return null;
    }
    const sanitizedInput = String(input).replace("https://", "").replace("www.", "");
    const pathParamPattern = /^[a-z\d]{3,100}$/;

    if (pathParamPattern.test(sanitizedInput)) {
        return `linkedin.com/in/${sanitizedInput}`;
    }
    if (sanitizedInput.includes("linkedin.com/in/")) {
        return sanitizedInput;
    }
    if (sanitizedInput.includes("linkedin.com/in/")) {
        return sanitizedInput.replace("linkedin.", "linkedin.");
    }
    return null;
};
