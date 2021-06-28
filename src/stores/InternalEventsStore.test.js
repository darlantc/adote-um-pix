import InternalEventsStore, { InternalEvents } from "./InternalEventsStore";

describe("InternalEventsStore", () => {
    it("start sut", () => {
        const sut = makeSUT();
        expect(sut instanceof InternalEventsStore).toBe(true);
    });

    it("don't allow to subscribe without a callback", () => {
        const sut = makeSUT();

        sut.subscribeTo({
            event: InternalEvents.login,
            observer: "A class",
        });
        expect(sut.subscribers[InternalEvents.login].find(({ observer }) => observer === "A class")).toBeFalsy();
    });

    it.each(["A class", "Another class"])("should allow to subscribe and unsubscribe '%s'", (expected) => {
        const sut = makeSUT();

        sut.subscribeTo({
            event: InternalEvents.login,
            observer: expected,
            callback: () => {},
        });
        expect(sut.subscribers[InternalEvents.login].find(({ observer }) => observer === expected)).toBeTruthy();

        sut.unsubscribe(InternalEvents.login, expected);
        expect(sut.subscribers[InternalEvents.login].find(({ observer }) => observer === expected)).toBeFalsy();
    });

    describe("notify", () => {
        it("should allow to notify", () => {
            const callback1 = jest.fn();
            const callback2 = jest.fn();

            const sut = makeSUT();
            sut.subscribeTo({
                event: InternalEvents.login,
                observer: "The class",
                callback: callback1,
            });

            sut.subscribeTo({
                event: InternalEvents.login,
                observer: "Another class",
                callback: callback2,
            });
            expect(callback1).not.toBeCalled();
            expect(callback2).not.toBeCalled();

            sut.notify({ event: InternalEvents.login });
            sut.notify({ event: InternalEvents.login });
            expect(callback1).toBeCalledTimes(2);
            expect(callback2).toBeCalledTimes(2);
        });

        // TODO: escrever teste que garante o envio / recebimento de params
    });
});

function makeSUT() {
    return new InternalEventsStore();
}
