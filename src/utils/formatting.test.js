import { formatCpf, formatDate, formatPhoneNumber, formatLinkedIn } from "./formatting";

describe("formatCpf", () => {
    it.each([
        [16021334433, "160.213.344-33"],
        ["85214856225", "852.148.562-25"],
    ])("should return formatted CPF if cpf is valid", (input, expected) => {
        expect(formatCpf(input)).toBe(expected);
    });
    it.each(["f90!d7e-342e-4a16-898c-81cf/75c047", "z9e42d7e452e4a16898c81cr057", "", null])(
        "should return null if cpf is invalid",
        (input) => {
            expect(formatPhoneNumber(input)).toBeNull();
        }
    );
});

describe("formatPhoneNumber", () => {
    it.each([
        [71982792521, "(71) 98279-2521"],
        ["11975486225", "(11) 97548-6225"],
    ])("should return formatted phone number if number is valid", (input, expected) => {
        expect(formatPhoneNumber(input)).toBe(expected);
    });
    it.each(["f90!d7e-342e-4a16-898c-81cf/75c047", "z9e42d7e452e4a16898c81cr057", "", null])(
        "should return null if cpf is invalid",
        (input) => {
            expect(formatPhoneNumber(input)).toBeNull();
        }
    );
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
