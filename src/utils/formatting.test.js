import { formatCpf, formatDate } from "./formatting";

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

describe("formatDate", () => {
  it("should return formatted date if timestamp is valid", () => {
    expect(formatDate(1620276521252)).toBe("Mon Jul 09 53314 08:27:32");
    expect(formatDate("1620299923252")).toBe("Sat Apr 06 53315 05:00:52");
    expect(formatDate("")).toBe("Wed Dec 31 1969 21:00:00 ");
  });
  it("should return null if timestamp is invalid", () => {
    expect(formatDate("s1sds6d205212fgf52")).toBe("Invalid Date");
    expect(formatDate(null)).toBe("Invalid Date");
  });
});
