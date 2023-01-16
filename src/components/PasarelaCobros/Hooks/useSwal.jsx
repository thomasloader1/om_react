/* eslint-disable import/prefer-default-export */
import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const toast = withReactContent(Swal);

export function fireToast(title, icon = 'error', timer = 3000) {
  toast.fire({
    title: <p>{title}</p>,
    toast: true,
    icon,
    position: 'bottom-end',
    showConfirmButton: false,
    timer,
    timerProgressBar: true,
    didOpen: (alert) => {
      alert.addEventListener('mouseenter', Swal.stopTimer);
      alert.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });
}

export function fireAlert(title, icon = 'error', timer = 3000) {
  toast.fire({
    title: <p>{title}</p>,
    toast: false,
    icon,
    position: 'center-center',
    showConfirmButton: false,
    timer,
    timerProgressBar: true,
    didOpen: (alert) => {
      alert.addEventListener('mouseenter', Swal.stopTimer);
      alert.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });
}
