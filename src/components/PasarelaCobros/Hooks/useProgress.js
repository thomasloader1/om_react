import axios from 'axios';
import { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { AppContext } from '../../PasarelaCobros/Provider/StateProvider';
import { fireToast } from './useSwal';
const {
  NODE_ENV,
  REACT_APP_OCEANO_URL,
  REACT_APP_OCEANO_PROGRESS,
  REACT_APP_OCEANO_PROGRESS_LOCAL,
} = process.env;

const PROGRESS =
  NODE_ENV === 'production'
    ? `${REACT_APP_OCEANO_URL}${REACT_APP_OCEANO_PROGRESS}`
    : `${REACT_APP_OCEANO_PROGRESS_LOCAL}`;

export const useProgress = () => {
  const {
    userInfo,
    setUserInfo,
    setOptions,
    options: optionsGlobal,
    stepNumber,
    setStepNumber,
  } = useContext(AppContext);
  const { id } = useParams();
  const { appEnv, setAppEnv, setContractData } = useContext(AppContext);
  const [fetching, setFetching] = useState(false);

  // updateSideItemStep
  const progressId = Number(id);
  const navigate = useNavigate();

  const getProgress = async () => {
    setFetching(true);
    try {
      const response = await axios.get(`${PROGRESS}/${progressId}`);
      const { data } = response;
      console.log('getProgress', { data });
      const { progress, lead, contact, contract, products } = data;

      if (Number(progress.step_number) === 5) {
        setAppEnv((prevState) => ({
          ...prevState,
          ...progress,
          lead,
          contact,
          contract,
          products,
        }));

        const [countryMatched] = optionsGlobal.countryOptions.filter(
          (cp) => progress.country === cp.value,
        );
        const [_, iso] = countryMatched.idElement.split('_');

        optionsGlobal.sideItemOptions[0].value = progress.country;
        optionsGlobal.sideItemOptions[0].status = 'completed';
        optionsGlobal.sideItemOptions[1].status = 'current';

        setOptions({ ...optionsGlobal });
        setUserInfo({
          ...userInfo,
          stepOne: {
            ...userInfo.stepOne,
            value: progress.country,
            isoRef: iso,
          },
        });



        setContractData({
          "products": [
            {
              "name": "pato traumatica etc",
              "quantity": 1,
              "id": "2712674000018624100",
              "price": 12060
            },
            {
              "name": "EcografíaClínica en Urgencias de Pediatría",
              "quantity": 1,
              "id": "2712674000018624102",
              "price": 10020
            }
          ],
          "sale": {
            "CBU1": null,
            "Organizacion": null,
            "mot": null,
            "Cuotas_Cobradas": null,
            "Certificaciones": null,
            "Razon_Social": null,
            "Importe_Cobrado": null,
            "Fecha_Creaci_n": "2023-03-06T16:18:00-03:00",
            "course_names": null,
            "Cuotas_totales": 0,
            "Status": "Contrato Pendiente",
            "Tipo_de_acuerdo": null,
            "Adjustment": 0,
            "filelist": null,
            "Informaci_n_faltante": null,
            "Tasa_de_cambio": null,
            "Estado_Pago_De_Cuotas": null,
            "retry_cronos": null,
            "Cantidad": null,
            "stripe_subscription_id": null,
            "RFC_Solo_MX": null,
            "Tel_fono_Facturacion": null,
            "Monto_de_Saldo": 22080,
            "PRE_LANZAMIENTO": false,
            "Discount": 0,
            "Caso": null,
            "Cuotas_restantes_sin_anticipo": null,
            "Cargado_ESANET": false,
            "Monto_de_cuotas_restantes": 0,
            "Banco": null,
            "email_emblue": null,
            "Account_Name": null,
            "Valor_Cuota": 0,
            "L_nea_nica_3": null,
            "Anticipo": null,
            "Bonificar": null,
            "Combos": null,
            "Sub_Total": 22080,
            "Contact_Name": {},
            "L_nea_nica_6": null,
            "SO_Number": "2712674000018624098",
            "Moneda": null,
            "Email": null,
            "Es_Ecommerce": false,
            "Tax": 0,
            "Fecha_Contrato_Efectivo": null,
            "Importe_NC": null,
            "Financiera_PY": null,
            "Medio_de_Pago": null,
            "Ticket_Rapipago": null,
            "Fecha_de_Vto": null,
            "Periodos_Pagos": null,
            "Grand_Total": 22080,
            "Bonificado_Suscri": false,
            "Fecha_Baja_Contrato_No_Cobrado": null,
            "Billing_Street": null,
            "Tipo_de_Contrato": null,
            "Cupones": null,
            "Membresia": null,
            "Numero_Socio_PY": null,
            "Pendiente_de_Aprob": false,
            "Observaciones_del_asesor": null,
            "Cliente_MX": "18624098",
            "Calculo_de_cuota_CO": null,
            "Sin_Anticipo_de_primera_cuota_EC": false,
            "Red_Habitab_1515": null,
            "Es_Suscri": false,
            "Venta_a_instituci_n": false,
            "Descuento_Plataforma_Pagos": null,
            "Pais": "México",
            "lookup": null,
            "Modalidad_de_pago_del_Anticipo": null,
            "Fecha_Baja": null,
            "Subject": "etc",
            "Acuerdo": null,
            "Tipo_IVA": null,
            "CUIT_CUIL": null,
            "Orden_de_compra_N": null,
            "Tipo_De_Pago": null,
            "Motivos": null,
            "Contrato_Efectivo_No_Cobrado": false
          },
          "contact": {
            "GCLID": null,
            "Ad_Campaign": null,
            "Parentesco2": null,
            "Telefono_infobip": "521111111111",
            "rea_donde_trabaja": "asd",
            "Ad_Network": null,
            "Lead_Scores": null,
            "Inter_s_de_Formaci_n": "asd",
            "Cost_per_Click": 0,
            "First_Visited_URL": null,
            "filelist": null,
            "AL": null,
            "Ad_Click_Date": null,
            "Last_Visited_Time": null,
            "Contrase_a": null,
            "aaa": null,
            "Description": null,
            "Ad": null,
            "Clave": null,
            "Number_Of_Chats": null,
            "Facebook_Page": null,
            "Search_Partner_Network": null,
            "Average_Time_Spent_Minutes": null,
            "Salutation": null,
            "Full_Name": "Tomas Gomez Gonzalo",
            "Record_Image": null,
            "Skype_ID": null,
            "Ad_ID": null,
            "Numero_RFC_MX": null,
            "email_emblue": null,
            "Account_Name": null,
            "Nombre_del_Congreso": [],
            "Ad_Name": null,
            "Colegio": [],
            "Keyword": null,
            "FUENTE": null,
            "prof": null,
            "Condici_n_de_convivencia": null,
            "Ad_Campaign_Name": null,
            "Sociedad_Cient_fica": null,
            "Reason_for_Conversion_Failure": null,
            "Lead_Form_ID": null,
            "Last_Enriched_Time__s": null,
            "Ad_Account_ID": null,
            "Centros_de_Saluds": null,
            "Email": "orale@juanito.com",
            "Visitor_Score": null,
            "Other_Phone": null,
            "Ad_Campaign_ID": null,
            "Especialidad_Multiple": [],
            "Tipo_de_Lead": null,
            "Unsubscribed_Mode": null,
            "Recomendador1": null,
            "Ad_Set_ID": null,
            "Conversion_Exported_On": null,
            "Horarios_de_Contactaci_n": [],
            "Reporting_To": null,
            "Lead_Form": null,
            "Enrich_Status__s": null,
            "Click_Type": null,
            "Days_Visited": null,
            "Tel_fono_1": null,
            "Tel_fono_2": null,
            "L_nea_nica_37": null,
            "AdGroup_Name": null,
            "Facebook_Page_ID": null,
            "Home_Phone": "521111111111",
            "Brand": null,
            "Fuente_del_Lead": [],
            "Diferencia_Dias": null,
            "Secondary_Email": null,
            "Nro_Matr_cula": "asd",
            "Estado_de_Contacto": null,
            "Parentesco_1": null,
            "Fecha_Asignaci_n_Contacto": null,
            "lookup_dir": null,
            "Sexo": "Masculino",
            "First_Name": "Tomas Gomez",
            "Conversion_Export_Status": null,
            "Nombre_del_Referente_1": null,
            "Tasa_de_Cambio": null,
            "Cost_per_Conversion": 0,
            "Nombre_del_Referente_2": null,
            "CBU": null,
            "Pais": "México",
            "Ad_Set": null,
            "Fuente_de_lead_manual_prueba": null,
            "temp": false,
            "Date_of_Birth": "1111-11-11",
            "Unsubscribed_Time": null,
            "Device_Type": null,
            "Ad_Account": null,
            "Lugar_de_Trabajo": null,
            "Comentarios_del_Asesor": null,
            "First_Visited_Time": null,
            "Last_Name": "Gonzalo",
            "Referrer": null,
            "Motivo_de_ca_da": null,
            "DNI": "99999991"
          },
          "status": "ok"
        })
        console.log({ stepNumber });
        setStepNumber(1);
      } else {
        throw new Error('El progreso no tiene datos suficientes para seguir con el pago.');
      }
    } catch (e) {
      console.group('getProgress(): catch', { e });
      navigate('/vp/error');
      fireToast(e.response.data);
      console.groupEnd();
    } finally {
      setFetching(false);
    }
  };

  return { fetching, progressId, appEnv, getProgress };
};
