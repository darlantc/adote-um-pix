import { formatCpf, formatDate, formatPhoneNumber, formatLinkedIn } from "./formatting";

describe("formatCpf", () => {
    it("should return formatted CPF if cpf is valid", () => {
        expect(formatCpf(16021334433)).toBe("160.213.344-33");
        expect(formatCpf("85214856225")).toBe("852.148.562-25");
    });
    it("should return null if cpf is invalid", () => {
        expect(formatCpf("f90!d7e-342e-4a16-898c-81cf/75c047")).toBeNull();
        expect(formatCpf("z9e42d7e452e4a16898c81cr057")).toBeNull();
        expect(formatCpf("")).toBeNull();
        expect(formatCpf(null)).toBeNull();
    });
});

describe("formatPhoneNumber", () => {
    it("should return formatted phone number if number is valid", () => {
        expect(formatPhoneNumber(71982792521)).toBe("(71) 98279-2521");
        expect(formatPhoneNumber("11975486225")).toBe("(11) 97548-6225");
    });
    it("should return null if cpf is invalid", () => {
        expect(formatPhoneNumber("f90!d7e-342e-4a16-898c-81cf/75c047")).toBeNull();
        expect(formatPhoneNumber("z9e42d7e452e4a16898c81cr057")).toBeNull();
        expect(formatPhoneNumber("")).toBeNull();
        expect(formatPhoneNumber(null)).toBeNull();
    });
});

describe("formatDate", () => {
    it.each([
        [1620276521252, "Mon Jul 09 53314 08:27:32"],
        ["1620299923252", "Sat Apr 06 53315 05:00:52"],
    ])("with input '%s' should return formatted date '%s'", (input, expected) => {
        expect(formatDate(input)).toBe(expected);
    });

    it.each(["", "s1sds6d205212fgf52", null])("with input '%s' should return null", (input) => {
        expect(formatDate(input)).toBeNull();
    });
});

describe("formatLinkedIn", () => {
    it.each([
        ["mateus", "linkedin.com/in/mateus"],
        ["https://linkedin.com/in/amelia", "linkedin.com/in/amelia"],
        ["https://www.linkedin.com/in/douglas", "linkedin.com/in/douglas"],
        ["www.linkedin.com/in/suzan", "linkedin.com/in/suzan"],
        [54321, "linkedin.com/in/54321"],
    ])("with input='%s' should return '%s'", (input, expected) => {
        expect(formatLinkedIn(input)).toBe(expected);
    });

    it.each(["", "z9e42d7e452e//898c8-cr057", 0, null])("with invalid input '%s' should return null", (input) => {
        expect(formatLinkedIn(input)).toBeNull();
    });
});
