import fromUnixTime from "date-fns/fromUnixTime";

export const formatCpf = (raw) => {
  const cpf = raw ? String(raw) : "";
  if (cpf.length === 11) {
    return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(
      6,
      9
    )}-${cpf.slice(9)}`;
  }
  return null;
};

export const formatDate = (timestamp) => {
  const rawDate = String(fromUnixTime(timestamp));
  return rawDate.slice(0, 25);
};
