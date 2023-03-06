# Issues de Test-VP https://oceanomedicina.net/vp/

## 4-Issue-Trae los datos cacheados
Al terminar un proceso de pago hasta el paso 5 y querer iniciar uno nuevo al ingresar la url: oceanomedicina.net/vp/#
se carga un nuevo id y como tiene datos cargador, aparentemente en cache, se ve el progreso anterior.

> Img del issue 4
    ![No se pudo cargar la imagen: 2-issue][urlIssue4]

## 5-Issue-Cada vez que se ingresa por vp se genera un nuevo progreso.

## 7-Issue-Actualizar datos de LEAD despues de realizar una conversion a contacto.

- Problema:
  Cuando haces una conversion a contacto eliminas el lead del crm y se convierte en contacto. En este caso si desde VP queres actualizar el lead, se va a generar un nuevo lead siempre. Como resultado no actualizamos lead de crm, y cuando queremos actualizar el zohoCRM `no queda claro si hay que crear un lead nuevo o actualizar el contacto de zoho donde estarian los datos del lead que se borro`

- Solucion:
  Cuando se vuelve hasta el paso de contacto se valida si ya paso por el paso de conversion a contacto, eso se puede hacer `consultando si el step es mayor al step de conversion > 3`. Hay que buscar los datos desde el crm o vp, mapearlo en el form y realizar las respectivas actualizaciones en vp y en ZOHOCRM.

## 9-Issue-Los cursos seleccionados, en el step 3, estan cacheados.
    Cuando inicias un nuevo progreso hay cursos seleccionados de algun progreso anterior.

## 10-Issue-Siempre se genera un contrato nuevo.
    Al haber generado un contrato, y volver atras se vuelve, y haber.ss

# Issues de Test-Resuelto

## 6-WARNING-Respuesta warnink status 200 de CRM ZOHO ⚠

Al ejecutarse el evento `/api/createLeadZohoCRM`, que genera el lead del CRMZOHO, se obtiene un warning 'not content' pero el result es ok.
Apesar del warning el status es 200, el lead se genera con todos los datos, porque obtenemos como response un objeto como el siguiente:

```javascript
    {
        result: "ok",
        id:"con el respoectivo id del crm",
        detail:""
    }
```


## 1-Issue-`Stepper Side` (Barra de lateral con steps):

    La barra en el paso 4 no se termina de seleccionar cuando uno pasa al paso 5.

## 2-Issue-`Paso 5 tiene un titulo erroneo en el Stepper Side` ✅

    En vez de `DATOS DE LA TARJETA` debe tener `FINALIZACION DE CONTRATO`.

> Img del issue 1 y 2

    ![No se pudo cargar la imagen: 1-issue][urlIssue1y2]

## 3-Issue-En el paso 3 me tiro error de street. ✅

    El paso tres tiro un error en street y no volvio, avanzo al paso siguiente.

## 11-Issue- Cuando avanzabas despues de seleccionar los cursos ✅

    Cuando dabas en siguiente tiva error con el 'name' en el createLeadZohoCRM.
    Despues de hacer pull no tiro mas.
    veo en el codigo de api-payments hay una linea donde dice:

    data,['contact_id']

    y este dato no esta entre las variables que utiliza.

> Img del issue 11

    ![No se pudo cargar la imagen: 11-issue][urlIssue11]

## 8-Issue-Error al generar el contacto. ✅

    Request: /api/convertLeadZohoCRM

    Controller Action: App\Http\Controllers\ZohoController@convertLead

    Status: 500

> `ErrorException
Undefined index: street
`

    - Detalles de info en base de datos:
    Esto ocurre despues de la conversion de contacto exitosa.

    Tenemos el contacto con entity_id_crm.


[urlIssue1y2]: img/1-Issue.PNG
[urlIssue4]: img/2-Issue.PNG
[urlIssue11]: img/3-Issue.PNG

