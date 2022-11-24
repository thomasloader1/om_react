export const clearByCountrySelected = (element, country) => {
    document.querySelectorAll(`${element}[id]`).forEach((val) => {
      // console.log({val},val.id.includes(country) , country, val.id)
      if (val.id.includes(country)) {
        val.classList.add('is-link', 'is-light', 'is-outlined');
      } else {
        val.classList.remove('is-link', 'is-light', 'is-outlined');
      }
    });
  };

export const clearByNameSelected = (element, name, id) => {
  document.querySelectorAll(`${element} > input[name='${name}']`).forEach((val) => {
    
      if (val.id === id) {
        val.parentElement.parentElement.classList.add('is-link', 'is-light', 'is-outlined');
      } else {
        val.parentElement.parentElement.classList.remove('is-link', 'is-light', 'is-outlined');
      } 
     
  });

  if(id === 'med_tarjeta' || id === 'med_link'){
    document.querySelectorAll(`${element} > input[name='mod']`).forEach((val) => {
        val.parentElement.parentElement.classList.remove('is-link', 'is-light', 'is-outlined');
  });
  }
};