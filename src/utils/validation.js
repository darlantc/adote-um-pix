export const cpfValidation = (raw) => {
  const num = String(raw).replace(/\D/g, "");

  if (num.length === 11) {
    let sum1 = 0;

    for (let i = 0; i <= 8; i++) {
      let multiplication1 = Number(num[i]) * (10 - i);
      sum1 += multiplication1;
    }

    let result1 = (sum1 * 10) % 11;
    if (result1 >= 10) {
      result1 = 0;
    }

    if (result1 === Number(num[9])) {
      let sum2 = 0;

      for (let u = 0; u <= 9; u++) {
        let multiplication2 = Number(num[u]) * (11 - u);
        sum2 += multiplication2;
      }

      let result2 = (sum2 * 10) % 11;
      if (result2 >= 10) {
        result2 = 0;
      }

      if (result2 === Number(num[10])) {
        return num;
      }
    }
  }

  return null;
};

export const phoneValidation = (raw) => {
  const num = String(raw).replace(/\D/g, "");

  const numDDD = Number(`${num[0]}${num[1]}`);

  const ddds = [
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    21,
    22,
    24,
    27,
    28,
    31,
    32,
    33,
    34,
    35,
    37,
    38,
    41,
    42,
    43,
    44,
    45,
    46,
    47,
    48,
    49,
    51,
    53,
    54,
    55,
    61,
    62,
    63,
    64,
    65,
    66,
    67,
    68,
    69,
    71,
    73,
    74,
    75,
    77,
    79,
    81,
    82,
    83,
    84,
    85,
    86,
    87,
    88,
    89,
    91,
    92,
    93,
    94,
    95,
    96,
    97,
    98,
    99,
  ];

  if (num.length === 11 && ddds.includes(numDDD)) {
    return num;
  }
  return null;
};

export const emailValidation = (raw) => {
  const pattern = /^([a-z\d.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;

  return pattern.test(raw);
};

export const pixRandomKeyValidation = (raw) => {
  const keyValue = raw ? raw.trim().replace(/-/g, "") : "";

  if (keyValue.length === 32) {
    const pattern = /^[a-zA-Z0-9]*$/;
    const valid = pattern.test(keyValue);
    if (valid) {
      return true;
    }
  }

  return null;
};

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
