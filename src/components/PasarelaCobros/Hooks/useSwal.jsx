import Swal from 'sweetalert2'
import React from 'react'
import withReactContent from 'sweetalert2-react-content'

const toast = withReactContent(Swal)

export default /* useSwal = */ ({content}) =>{
    toast.fire({
        title: <p>{content}</p>,
        didOpen: () => {
          // `MySwal` is a subclass of `Swal` with all the same instance & static methods
          toast.showLoading()
        },
      }).then(() => toast.fire(<p>Shorthand works too</p>))
      
}

 