import ReactRouter from "react-router";

export function useParamsMock(params) {
    jest.spyOn(ReactRouter, "useParams").mockReturnValue(params);
}
