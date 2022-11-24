import countryReducer from "./countryReducer";

describe("countryReducer", ()=>{
    test("Devuelve un nuevo estado despues de la accion de seleccionar un pais", ()=>{
        const state = { country: "" }
        const action = {
            type: "@country/select",
            payload: { country: "Argentina"}
        }

        const newState = countryReducer(state, action)

        expect(newState).toEqual(action.payload)
    })
})