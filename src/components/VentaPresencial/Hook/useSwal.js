/* eslint-disable import/prefer-default-export */
import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const toast = withReactContent(Swal);

export const useSwal = () => {
  const fireErrorToast = (title) => {
    toast.fire({
      title: <p>{title}</p>,
      toast: true,
      icon: 'error',
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (alert) => {
        alert.addEventListener('mouseenter', Swal.stopTimer);
        alert.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });
  };

  return { fireErrorToast };
};
