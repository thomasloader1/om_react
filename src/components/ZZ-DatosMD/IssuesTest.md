# Issues de Test-VP https://oceanomedicina.net/vp/

## 1-Issue-`Stepper Side` (Barra de lateral con steps):

    La barra en el paso 4 no se termina de seleccionar cuando uno pasa al paso 5.

## 2-Issue-`Paso 5 tiene un titulo erroneo en el Stepper Side`

    En vez de `DATOS DE LA TARJETA` debe tener `FINALIZACION DE CONTRATO`.

> Img del issue 1 y 2
    ![No se pudo cargar la imagen: 1-issue][urlIssue1y2]

## 3-Issue-En el paso 3 me tiro error de street.
    El paso tres tiro un error en street y no volvio, avanzo al paso siguiente.



## 4-Issue-Trae los datos cacheados
Al terminar un proceso de pago hasta el paso 5 y querer iniciar uno nuevo al ingresar la url: oceanomedicina.net/vp/#
se carga un nuevo id y como tiene datos cargador, aparentemente en cache, se ve el progreso anterior.

> Img del issue 4
    ![No se pudo cargar la imagen: 2-issue][urlIssue4]




[urlIssue1y2]: img/1-Issue.PNG
[urlIssue4]: img/2-Issue.PNG
