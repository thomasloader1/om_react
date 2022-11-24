const initialState = ""
const countryReducer = (state = initialState, action) => {
    const {type, payload} = action
    
    switch(type){
      case "@country/select":
        return { ...payload }
      default:
        return state
    }
  }

  export default countryReducer