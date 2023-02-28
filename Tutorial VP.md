# Tutorial Venta Presencial

Este es un documento donde se explican las dudas sobre la implementacion y funcionamiento de la Venta Presencial

## Antes de comenzar

La Venta Presencial funciona y comunica diversos datos mediante una configuracion previa situada en `src/config/config.js`

Donde las variables mas relevantes del proyecto son `countryOptions`,  `paymentOptions`, `sideItemOptionsVP`

Esta configuracion se comparte mediante un Provider que usa el hook de react `useContext`
