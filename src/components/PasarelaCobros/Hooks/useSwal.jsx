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

export function fireAlert(title, text = '', icon = 'error', timer = 3000) {
  toast.fire({
    title: <p>{title}</p>,
    toast: false,
    text,
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

export function fireModalAlert(title, html = '', icon = 'error', state = null) {
  toast.fire({
    title: <p>{title}</p>,
    toast: false,
    html,
    icon,
    position: 'center-center',
    showConfirmButton: true,
    preConfirm: () => {
      // Verificar si estamos en la ruta /checkout/ptp
      if (window.location.hash.includes('/checkout/ptp')) {
        // Redireccionar a la página de inicio
        window.location.href = '/';
      }

      if (state?.redirect) {
        window.location.href = '/status/ptp/' + state.redirectSuffix;
      }
    },
  });
}

export async function fireModalAlertRedirect(title, html = '', payment) {
  const toast = withReactContent(Swal);

  const result = await toast.fire({
    title: <p>{title}</p>,
    toast: false,
    html,
    icon: 'warning',
    position: 'center-center',
    showConfirmButton: true,
    confirmButtonText: 'Ver el estado del pago',
  });

  if (result.isConfirmed) {
    window.location.href = `#/status/${payment.id}`;
  } else {
    window.location.href = `#/status/${payment.id}`;
  }
}
