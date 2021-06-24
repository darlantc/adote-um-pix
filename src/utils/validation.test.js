import { cpfValidation, emailValidation, phoneValidation, pixRandomKeyValidation } from "./validation";

describe("emailValidation test", () => {
    it.each(["theus.meus@gmail.com", "abc@hotil.co", "abc34343-kl@hstotil.com.br"])(
        "should return true if email is valid",
        (entry) => {
            expect(emailValidation(entry)).toBeTruthy();
        }
    );
    it.each([
        "theus.meusgmail.com",
        "abc@hotil.co@",
        "abc@hotil.co@",
        "abc34343-k//l@hstotil.com.br",
        "abc34343-k//l@hstotil.com.br",
        null,
    ])("should return false if email is invalid", (entry) => {
        expect(emailValidation(entry)).toBeFalsy();
    });
});

describe("cpfValidation test", () => {
    it.each([
        ["944.200.880-36", "94420088036"],
        [27782199000, "27782199000"],
        ["474505780/69", "47450578069"],
    ])("should return raw cpf number if cpf is valid", (entry, answer) => {
        expect(cpfValidation(entry)).toBe(answer);
    });
    it.each([52554522322, "34233232323232", "5255452", "", null])("should return null if cpf is invalid", (entry) => {
        expect(cpfValidation(entry)).toBeNull();
    });
});

describe("phoneValidation test", () => {
    it.each([
        [71982154575, "71982154575"],
        ["(11) 9 8852-4565", "11988524565"],
        ["21978796032", "21978796032"],
    ])("should return raw phone number if phone is valid", (entry, answer) => {
        expect(phoneValidation(entry)).toBe(answer);
    });
    it.each([71982154575554515, "(01) 9 7752-4565", "21 3879-6032", "", null])(
        "should return null if phone is invalid",
        (entry) => {
            expect(phoneValidation(entry)).toBeNull();
        }
    );
});

describe("pixKeyValidation", () => {
    it.each([
        ["f9e50d7e-342e-4a16-898c-81cf2275c047", true],
        ["z9e42d7e452e4a16898c81cf22dfr057", true],
    ])("should return true if random key is valid", (entry, answer) => {
        expect(pixRandomKeyValidation(entry)).toBe(answer);
    });

    it.each(["f9e50d7e-342e-4a16-898c-81cf2df5ds275c047", "z9e42d7e452e4a16898c81cr057", "", null])(
        "should return false if random key is invalid",
        (entry) => {
            expect(pixRandomKeyValidation(entry)).toBeNull();
        }
    );
});
