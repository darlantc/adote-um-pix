import {
  formatCpf,
  cpfValidation,
  emailValidation,
  phoneValidation,
  pixRandomKeyValidation,
} from "./validation";

describe("emailValidation test", () => {
  it("should return true if email is valid", () => {
    expect(emailValidation("theus.meus@gmail.com")).toBe(true);
    expect(emailValidation("abc@hotil.co")).toBe(true);
    expect(emailValidation("abc34343-kl@hstotil.com.br")).toBe(true);
  });
  it("should return false if email is invalid", () => {
    expect(emailValidation("theus.meusgmail.com")).toBe(false);
    expect(emailValidation("abc@hotil.co@")).toBe(false);
    expect(emailValidation("abc34343-k//l@hstotil.com.br")).toBe(false);
    expect(emailValidation("")).toBe(false);
    expect(emailValidation(null)).toBe(false);
  });
});

describe("cpfValidation test", () => {
  it("should return true if cpf is valid", () => {
    expect(cpfValidation("944.200.880-36")).toBe("94420088036");
    expect(cpfValidation(27782199000)).toBe("27782199000");
    expect(cpfValidation("474505780/69")).toBe("47450578069");
  });
  it("should return false if cpf is invalid", () => {
    expect(cpfValidation(52554522322)).toBe(false);
    expect(cpfValidation("34233232323232")).toBe(false);
    expect(cpfValidation("5255452")).toBe(false);
    expect(cpfValidation("")).toBe(false);
    expect(cpfValidation(null)).toBe(false);
  });
});

describe("phoneValidation test", () => {
  it("should return true if phone is valid", () => {
    expect(phoneValidation(71982154575)).toBe("71982154575");
    expect(phoneValidation("(11) 9 8852-4565")).toBe("11988524565");
    expect(phoneValidation("21978796032")).toBe("21978796032");
  });
  it("should return false if phone is invalid", () => {
    expect(phoneValidation(71982154575554515)).toBe(false);
    expect(phoneValidation("(01) 9 7752-4565")).toBe(false);
    expect(phoneValidation("21 3879-6032")).toBe(false);
    expect(phoneValidation("")).toBe(false);
    expect(phoneValidation(null)).toBe(false);
  });
});

describe("pixKeyValidation", () => {
  it("should return true if random key is valid", () => {
    expect(pixRandomKeyValidation("f9e50d7e-342e-4a16-898c-81cf2275c047")).toBe(
      true
    );
    expect(pixRandomKeyValidation("z9e42d7e452e4a16898c81cf22dfr057")).toBe(
      true
    );
  });
  it("should return false if random key is invalid", () => {
    expect(
      pixRandomKeyValidation("f9e50d7e-342e-4a16-898c-81cf2dfsdsd5ds275c047")
    ).toBe(false);
    expect(pixRandomKeyValidation("z9e42d7e452e4a16898c81cr057")).toBe(false);
    expect(pixRandomKeyValidation("")).toBe(false);
    expect(pixRandomKeyValidation(null)).toBe(false);
  });
});

describe("formatCpf", () => {
  it("should return formatted CPF if cpf is valid", () => {
    expect(formatCpf(16021334433)).toBe("160.213.344-33");
    expect(formatCpf("85214856225")).toBe("852.148.562-25");
  });
  it("should return null if cpf is invalid", () => {
    expect(formatCpf("f90!d7e-342e-4a16-898c-81cf/75c047")).toBe(null);
    expect(formatCpf("z9e42d7e452e4a16898c81cr057")).toBe(null);
    expect(formatCpf("")).toBe(null);
    expect(formatCpf(null)).toBe(null);
  });
});
