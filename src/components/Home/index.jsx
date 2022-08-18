import React from 'react'

function Home() {
  return (
  <section className="container is-max-widescreen">

  <article id="pasarela" className="pasarela columns mx-auto">

    <div className="is-8 column pasarela-cont">
      <div className="is-two-thirds column overlay-left invisible" >
      <h1 id="finalResume_title" className="title is-4 has-text-white invisible" style={{position: 'relative', zIndex: '5'}}>
        Resumen de datos
      </h1>
      <div id="finalResume" className="is-full column invisible">
        <div className="columns is-multiline datos-cliente">
          <div className="column is-full datos-cliente-header">
            <div id="emailCliente_resume" className="finalResume-item">
              <label htmlFor="">CORREO ELECTRÓNICO</label>
              <h4 />
            </div>
            <div id="todayDate_resume" className="finalResume-item">
              <h4 />
            </div>
          </div>
          <div id="numeroContrato_resume" className="column is-three-fifths finalResume-item">
            <label htmlFor="">Número de contrato</label>
            <h4 />
          </div>
          <div id="montoTotalContrato_resume" className="column finalResume-item">
            <label htmlFor="">MONTO TOTAL DEL CONTRATO</label>
            <h4 />
          </div>
          <div className="column is-full is-divider-dashed" />

          <div id="mesesTotales_resume" className="column is-one-third finalResume-item">
            <label htmlFor="">MESES TOTALES</label>
            <h4 />
          </div>
          <div id="montoTotalMes_resume" className="column is-one-third finalResume-item">
            <label htmlFor="">monto a pagar POR MES</label>
            <h4 />
          </div>
        </div>
        <div className="is-divider" />
        <div className="columns is-multiline datos-tarjeta">

          <h2 className="column is-full title is-size-4">Datos de la tarjeta</h2>
          <div id="tipoTarjeta_resume" className="column is-one-third finalResume-item">
            <label htmlFor="">Tipo de tarjeta</label>
            <h4 />
          </div>
          <div id="numeroTarjeta_resume" className="column is-two-thirds finalResume-item">
            <label htmlFor="">número de tarjeta</label>
            <h4 />
          </div>
          <div id="fechaVencimiento_resume" className="column is-one-third finalResume-item">
            <label htmlFor="">Fecha de vencimiento</label>
            <h4 />
          </div>
          <div id="cvv_resume" className="column is-1 finalResume-item">
            <label htmlFor="">CVV</label>
            <h4 />
          </div>
          <div id="cuotas_resume" className="column is-2 finalResume-item">
            <label htmlFor="">Cuotas</label>
            <h4 />
          </div>
          <div id="nombreTitular_resume" className="column is-half finalResume-item">
            <label htmlFor="">NOMBRE DEL TITULAR</label>
            <h4 />
          </div>
          <div id="direccionTitular_resume" className="column is-half finalResume-item">
            <label htmlFor="">Dirección</label>
            <h4 />
          </div>
          <div id="tipoNumDocumento_resume" className="column is-one-third finalResume-item">
            <label htmlFor="">Tipo Y NÚMERO DE DOC</label>
            <h4 />
          </div>
          <div id="cuilCuit_resume" className="column is-one-third finalResume-item">
            <label htmlFor="">CUIL/CUIT</label>
            <h4 />
          </div>
          <div id="razonSocial_resume" className="column is-one-third finalResume-item">
            <label htmlFor="">Razón Social</label>
            <h4 />
          </div>

        </div>
      </div>
   {/*    <!--Seleccionar rol--> */}
      <div id="seleccion_rol" className="pasarela-splash seleccion_rol animate__animated animate__fadeIn">
        <h2 className="title is-4">¡Bienvenido al flow de pagos! </h2>
        <h3 className="has-text-weight-medium">Para comenzar el proceso de generar un pago, elije tu rol correspondiente.
        </h3>

        <div className="cardAsesor-grid">

          <div id="asesorComercial" className="cardAsesor asesor-comerical">
            <div className="cardAsesor-img-overlay">
              <div className="overlay-color" />
              <picture>
                <source type="image/jpg" media="(max-width: 1920px)"
                  srcSet="{{ asset('img/asesor-comercial.jpg') }}"/>
                <img src="{{ asset('img/asesor-comercial.jpg') }}" alt="tarjeta de asesor comercial"/>
              </picture>
            </div>
            <h4 className="cardAsesor-title">Asesor comercial</h4>
            <button id="ctaAsesorComercial" className="button is-primary is-medium">Comenzar</button>
          </div>

          <div id="asesorCobranzas" className="cardAsesor cobranzas">
            <div className="cardAsesor-img-overlay">
              <div className="overlay-color" />
              <picture>
                <source type="image/jpg" media="(max-width: 1920px)"
                  srcSet="{{ asset('img/asesor-cobranzas.jpg') }}" />
                <img src="{{ asset('img/asesor-cobranzas.jpg') }}" alt="tarjeta de asesor de cobranzas" />
              </picture>
            </div>
            <h4 className="cardAsesor-title">Asesor de cobranzas</h4>
            <button type='button' id="ctaAsesorCobranzas" className="button is-primary is-medium">Comenzar</button>
          </div>

        </div>

      </div>

      {/* <!--Seleccionar pais--> */}
      <div id="seleccion_pais" className="pasarela-1 seleccion-pais invisible">
        <h2 className="title is-4"><img src="{{ asset('img/icon/paso-1.svg') }}" alt="" /> Seleccione país
        </h2>
        <div id="pais-grid" className="gridCuartos">
        {/*   {{-- EJEMPLO PAIS
             <label id="pais_arg_label" for="pais_arg" class="gridCuartos-item button is-outlined"><input id="pais_arg"
              class="paisSelect" type="radio" name="pais" value="Argentina"><img
              src="img/country-flags/argentina.svg">
            <h4 class="paisSelect_title">Argentina</h4>
          </label> --}} */}

        </div>
      </div>

{/*     <!--Seleccionar método de pago--> */ }
      <div id="seleccion_metPago" className="pasarela-2 metPago invisible">
        <h2 className="title is-4"><img src="{{ asset('img/icon/paso-2.svg') }}" alt="" />Seleccione método
          de pago</h2>
        <div id="metPago_grid" className="gridCuartos">
         {/* /*  {{-- <babel for="met_mp" class="gridCuartos-item button is-outlined">
            <input class="metPagoSelect" type="radio" name="metPago" id="met_mp" value="Mercado Pago">
            <img src="{{ asset('img/medPagos/mp.svg') }}" alt="Mercado Pago" data-target="mp">
          </label> --}} */ }


        </div>
      </div>

     {/*  <!------------------------->
      <!--Pasarela Mercado Pago-->
      <!-------------------------> */}

      <div id="pasarela-body" className="mercadopago invisible">

        {/* <!--Seleccionar medio y modo de pago--> */}
        <div id="seleccion_medModPago" className="pasarela-3 medModPago">
          <h2 className="title is-4"><img src="{{ asset('img/icon/paso-3.svg') }}" alt="" />Seleccione medio
            y modo de pago</h2>

          <div id="medPago_grid" className="gridCuartos" />

          <div className="is-divider" />

          <div id="modPago_grid" className="gridCuartos" />
        </div>

        {/* <!--Completar los datos personales--> */}
        <div id="form_datosPersonales" className="pasarela-4 form-datosPersonales invisible">
          <h2 className="title is-4 ancho-completo"><img src="{{ asset('img/icon/paso-4.svg') }}"
              alt="" />Completa
            los datos del cliente</h2>

         {/*  <!----------------------->
          <!--Tipo de suscripcion-->
          <!-----------------------> */}

          {/* <!-- Campo que se muestra al elegir como modo de pago SUSCRIPCION --> */}
          <div id="tipoSuscripcion" className="form-item field checkFields ancho-completo">
            <div className="control box is-flex align-items-center">
              <h3 className="is-uppercase">Tipo de suscripción</h3>
              <label className="radio checkFields-item">
                <input className="dataPerson_tipoSuscricion" type="radio" name="tipoSuscripcion"
                  id="tipoSuscripcion_agregar" value="Agregar" checked="checked" />
                Agregar suscripción
              </label>
              <label className="radio checkFields-item">
                <input className="dataPerson_tipoSuscricion" type="radio" name="tipoSuscripcion"
                  id="tipoSuscripcion_modificar" value="Modificar" />
                Modificar suscripción
               {/*  <!--(permite cambiar los datos de la tarjeta)--> */}
              </label>
              <label className="radio checkFields-item">
                <input className="dataPerson_tipoSuscricion" type="radio" name="tipoSuscripcion"
                  id="tipoSuscripcion_simple" value="Simple" />
                Suscripción simple
               {/*  <!--(sin datos de tarjeta)--> */}
              </label>
            </div>

          </div>

         {/*  <!--------------------->
          <!--Datos del cliente-->
          <!---------------------> */}

         {/*  <!--Nro. de contrato--> */}
          <div id="numeroContrato" className="form-item field">
            <label className="label is-uppercase">Número de Contrato</label>
            <div className="control is-flex">
              <span id="" className="is-flex is-flex-grow-1">
                <input id="numeroContrato_value" className="input form-control" type="number"
                  placeholder="Ingrese número de contrato" />
              </span>
            </div>
          </div>

         {/*  <!--% de Descuento--> */}

          <div id="porcentajeDescuento" className="form-item field">
            <label className="label is-uppercase">Porcentaje a descontar</label>
            <div className="control is-flex">
              <span id="" className="is-flex is-flex-grow-1">
                <input id="porcentajeDescuento_value" className="input form-control" type="number"
                  placeholder="Ingrese porcentaje a descontar" />
              </span>
            </div>
          </div>

          {/* <!--Correo electronico--> */}
          <div id="emailCliente" className="form-item field">
            <label className="label is-uppercase">Correo electrónico</label>
            <div className="control is-flex">
              <span id="" className="is-flex is-flex-grow-1">
                <input id="emailCliente_value" className="input form-control" type="email"
                  placeholder="Ingrese correco electrónico" />
              </span>
            </div>
          </div>

         {/*  <!--Campos de MODO SUSCRIPCIÓN - Monto total del contrato y meses totales --> */}
          <div id="montoTotal_contrato" className="form-item field">
            <label className="label is-uppercase">Monto Total Del Contrato</label>
            <div className="control is-flex">
              <span id="" className="is-flex is-flex-grow-1">
                <input id="montoTotalContrato_value" className="input form-control" type="number"
                  placeholder="Escribir valor total de pago (Ej: 100.00)" />
              </span>
            </div>
            {/* <!--p class="help has-text-weight-medium is-warning">Campo de Suscripción</p--> */}
          </div>
          <div id="mesesTotales" className="form-item field">
            <label className="label is-uppercase">Meses totales</label>
            <div className="control is-flex">
              <span id="" className="is-flex is-flex-grow-1">
                <input id="mesesTotales_value" className="input form-control" type="number" placeholder="Ej: 12"/>
              </span>
            </div>
            {/* <!--p class="help has-text-weight-medium is-warning">Campo de Suscripción</p--> */}
          </div>

         {/*  <!--Monto a pagar--> */}
          <div id="montoPagarMes" className="form-item field ancho-completo">
            <label className="label is-uppercase">Monto a pagar por mes</label>
            <div className="control is-flex">
              <span id="" className="is-flex is-flex-grow-1">
                <input id="montoTotalMes_value" className="input form-control" type="number"
                  placeholder="Escribir el valor de pago (Ej: 100.00)" />
              </span>
            </div>
          </div>

          {/* <!--Seleccionar como compartir--> */}
          <div id="compartirLinkPor" className="form-item field ancho-completo">
            <label className="label is-uppercase">Compartir link por</label>

            <div className="columns control compartirLinkPor">
              <label className="column radio compartirLinkPor-item is-active">
                <input id="compartirLinkPor_email" type="radio" name="compartirLinkPor" checked="checked" />
                Email
              </label>
              <label className="column radio compartirLinkPor-item">
                <input id="compartirLinkPor_wpp" type="radio" name="compartirLinkPor" />
                Whatsapp
              </label>
            </div>
           {/*  <!--p class="help has-text-weight-medium is-link">Campo de Compartir por Link</p-->

            <!--Campo de email--> */}
            <div id="inputCompartirLinkPorEmail" className="form-item field ancho-completo">
              <div className="control is-flex">
                <span id="" className="is-flex is-flex-grow-1">
                  <input id="campoCompartirLinkPor-email" className="input form-control" type="text"
                    placeholder="Ingrese email" />
                </span>
              </div>
            </div>
          </div>

        </div>

       {/*  <!--------------------->
        <!--Datos de tarjeta--->
        <!--------------------->
        <!---->
        <!--Completar los datos de la tarjeta--> */}
        <div id="form_datosTarjeta" className="pasarela-5 tarjeta form-datosTarjeta invisible">
          <h2 className="title is-4 ancho-completo"><img src="{{ asset('img/icon/paso-5.svg') }}" alt=""/>
            Completa los
            datos de la tarjeta</h2>
          {/* <!---->
          <!-- Seleccionar tipo de tarjeta --> */}
          <div id="tipoTarjerta" className="form-item field checkFields ancho-completo">
            <div className="control box is-flex align-items-center">
              <h3 className="is-uppercase">Tipo de tarjeta</h3>
              <label className="radio checkFields-item">
                <input className="tipoTarjeta" type="radio" name="tipoTarjeta" id="tipoTarjeta_credito"
                  value="Crédito"/>
                Crédito
              </label>

              <label className="radio checkFields-item">
                <input className="tipoTarjeta" type="radio" name="tipoTarjeta" id="tipoTarjeta_debito"
                  value="Débito" />
                Débito
              </label>
            </div>
          </div>
          {/* <!---->
          <!--Nro. de contrato--> */}
          <div id="numeroTarjeta" className="form-item field">
            <label className="label is-uppercase">Número de tarjeta</label>
            <div className="control is-flex">
              <span id="" className="is-flex is-flex-grow-1">
                <input id="numeroTarjeta_value" className="input form-control" type="text"
                  placeholder="0000 - 0000 - 0000 - 00000" />
              </span>
            </div>
          </div>
         {/*  <!---->
          <!--Fecha de vencimiento--> */}
          <div id="fechaVencimiento" className="form-item field">
            <label className="label is-uppercase">Fecha de vencimiento</label>
            <div className="is-flex is-align-items-center">
              <div className="control is-flex-grow-1">
                <span id="" className="is-flex is-flex-grow-1">
                  <input id="fechaVencimiento_mes" className="input form-control" type="number" placeholder="11" />
                </span>
              </div>
              <span className="has-text-weight-bold mx-2">/</span>
              <div className="control is-flex-grow-1">
                <span id="" className="is-flex is-flex-grow-1">
                  <input id="fechaVencimiento_ano" className="input form-control" type="number" placeholder="27" />
                </span>
              </div>
            </div>
          </div>
          {/* <!---->
          <!--CVV--> */}
          <div id="cvv" className="form-item field">
            <label className="label is-uppercase">CVV</label>
            <div className="control is-flex">
              <span id="" className="is-flex is-flex-grow-1">
                <input id="cvv_value" className="input form-control" type="number"
                  placeholder="Ingresar código de seguridad" />
              </span>
            </div>
          </div>
          {/* <!---->
          <!--Campo CRÉDITO - Cuotas --> */}
          <div id="cuotas" className="form-item field">
            <label className="label is-uppercase">Cuotas</label>
            <div className="control is-flex">
              <span className="select is-flex is-flex-grow-1">
                <select id="cuotas_value" className="form-control is-flex-grow-1">
                  <option value="0" selected="">Seleccionar cantidad de cuotas</option>
                  <option value="1">1</option>
                  <option value="3">3</option>
                  <option value="6">6</option>
                  <option value="9">9</option>
                  <option value="12">12</option>
                </select>
              </span>
            </div>
           {/*  <!--p class="help has-text-weight-medium is-success">Campo tarjeta de credito</p--> */}
          </div>
         {/*  <!---->
          <!--Nombre y apellido--> */}
          <div id="nombreTitular" className="form-item field">
            <label className="label is-uppercase">Nombre del títular</label>
            <div className="control is-flex">
              <span id="" className="is-flex is-flex-grow-1">
                <input id="nombreTitular_value" className="input form-control" type="text"
                  placeholder="Ingresar nombre del titular" />
              </span>
            </div>
          </div>
          {/* <!---->
          <!--Tipo y Número de Documento--> */}
          <div id="documento" className="form-item field">
            <label className="label is-uppercase">TIPO Y NÚMERO DE DOCUMENTO</label>
            <div className="columns is-variable is-1">
              <div className="is-3 column control is-flex">
                <span className="select">
                  <select id="tipoDocumento" className="form-control is-flex-grow-1">
                    <option value="dni">DNI</option>
                    <option value="libreta">Libreta de enrolamiento</option>
                  </select>
                </span>
              </div>

              <div className="column control is-flex is-flex-grow-1">
                <span id="" className="is-flex is-flex-grow-1">
                  <input id="numDocumento" className="input form-control" type="number"
                    placeholder="Ingresar documento" />
                </span>
              </div>

            </div>
          </div>
         {/*  <!---->
          <!--Número de cuil/Cuit--> */}
          <div id="cuilCuit" className="form-item field">
            <label className="label is-uppercase">CUIL/CUIT</label>
            {/* <!--label class="label has-text-danger">CUIL / CUIT (ARG/PER/URU) -- NIT (COL) -- RUT (CHI)</label--> */}
            <div className="control is-flex">
              <span id="" className="is-flex is-flex-grow-1">
                <input id="cuilCuit_value" className="input form-control" type="number"
                  placeholder="Ingresar número de CUIT/CUIL" />
              </span>
            </div>

          </div>
        {/*   <!---->
          <!--Razón social--> */}
          <div id="razonSocial" className="form-item field">
            <label className="label is-uppercase">Razón social</label>
            <div className="control is-flex">
              <span id="" className="is-flex is-flex-grow-1">
                <input id="razonSocial_value" className="input form-control" type="text"
                  placeholder="Ingresar razón social" />
              </span>
            </div>
          </div>
          {/* <!---->
          <!--Dirección--> */}
          <div id="direccionTitular" className="form-item field">
            <label htmlFor='' className="label is-uppercase">Dirección</label>
            <div className="control is-flex">
              <span id="" className="is-flex is-flex-grow-1">
                <input id="direccionTitular_value" className="input form-control" type="text"
                  placeholder="Ingresar la dirección del titular" />
              </span>
            </div>
          </div>

        </div>
      </div>

     {/*  <!-- Volver/Siguiente --> */}
      <div id="stepControls" className="stepControls columns invisible">
        <button type='button' id="stepControls_prev" className="column button is-primary is-outlined"> Volver </button>
        <button type='button' id="stepControls_next" className="column button is-primary"> Siguiente </button>

      </div>
      <div id="edit_stepControls" className="edit_stepControls columns invisible">
        <button type='button' id="edit_stepControls_prev" className="column button is-primary is-outlined"> Volver </button>
        <button type='button' id="edit_stepControls_next" className="column button is-primary"> Terminar </button>

      </div>
    </div>

    <div id="infoView" className="is-4 column infoView pl-6 invisible">
      <h1 className="title is-4">Resumen del pago</h1>

      <div className="infoView-body">

        {/* <!-- Paso-1 Pais seleccionado --> */}
        <div id="infoSeleccion_pais" data-target="1"
          className="infoPasarela infoPasarela-1 infoView-item card current">

          <span className="infoView-item-info">
            <div className="numstep">1</div>

            <div className="is-flex is-flex-direction-column is-align-items-flex-start">
              <h3 className="subtitle is-uppercase">País</h3>
              <h4 id="paisSeleccionado" className="title is-5">Sin seleccionar</h4>
            </div>
          </span>

          <button type='button' id="editStep_1" className="editStep infoView-item-button button is-ghost">
            <i className="mdi mdi-note-edit-outline is-size-4" />
          </button>

        </div>

        {/* <!-- Paso-2 Método de pago seleccionado --> */}
        <div id="infoSeleccion_metPago" data-target="2" className="infoPasarela infoPasarela-2 infoView-item">

          <span className="infoView-item-info">
            <div className="numstep">2</div>
            <div className="is-flex is-flex-direction-column is-align-items-flex-start">
              <h3 className="subtitle is-uppercase">Método de pago</h3>
              <h4 id="metPagoSeleccionado" className="title is-5">Sin seleccionar</h4>
            </div>
          </span>

          <button type='button' id="editStep_2" className="editStep infoView-item-button button is-ghost">
            <i className="mdi mdi-note-edit-outline is-size-4" />
          </button>

        </div>

        {/* <!-- Paso-3 Medio y modo de pago seleccionado --> */}
        <div id="infoSeleccion_medModPago" data-target="3" className="infoPasarela infoPasarela-3 infoView-item">

          <span className="infoView-item-info">
            <div className="numstep">3</div>

            <div className="is-flex is-flex-direction-column is-align-items-flex-start">
              <h3 className="subtitle is-uppercase">Medio y modo de pago</h3>
              <h4 id="medModPagoSeleccionado" className="title is-5">
                <span id="medPagoSeleccionado">Sin seleccionar</span>
                <span id="modPagoSeleccionado" />
              </h4>
            </div>
          </span>

          <button type='button' id="editStep_3" className="editStep infoView-item-button button is-ghost">
            <i className="mdi mdi-note-edit-outline is-size-4" />
          </button>

        </div>

        {/* <!-- Paso-4 Datos de cliente --> */}
        <div id="infoForm_datosPersonales" data-target="4" className="infoPasarela infoPasarela-4 infoView-item">

          <span className="infoView-item-info">
            <div className="numstep">4</div>
            <div className="is-flex is-flex-direction-column is-align-items-flex-start">
              <h3 className="subtitle is-uppercase">Datos del cliente</h3>
              <h4 className="title is-5">Sin completar</h4>
            </div>
          </span>

          <button type='button' id="editStep_4" className="editStep infoView-item-button button is-ghost">
            <i className="mdi mdi-note-edit-outline is-size-4" />
          </button>

        </div>

        {/* <!-- Paso-5 Datos de cliente --> */}
        <div id="infoForm_datosTarjeta" data-target="5" className="infoPasarela infoPasarela-5 infoView-item">

          <span className="infoView-item-info">
            <div className="numstep">5</div>

            <div className="is-flex is-flex-direction-column is-align-items-flex-start">
              <h3 className="subtitle is-uppercase">Datos de la tarjeta</h3>
              <h4 className="title is-5">Sin completar</h4>
            </div>
          </span>

          <button type='button' id="editStep_5" className="editStep infoView-item-button button is-ghost">
            <i className="mdi mdi-note-edit-outline is-size-4" />
          </button>

        </div>

       {/*  <!-- --------------------- -->
        <!-- Controles del resumen -->
        <!-- --------------------- -->
 */}
    {/*     <!-- Botón Generar pago --> */}
        <button type='button' id="buttonGenPayment" className="button bigger is-primary is-medium invisible">
          Generar pago
        </button>

        {/* <!-- Link de pago generado --> */}
        <div id="fieldLinkPago" className="field invisible">
          <p className="control has-icons-right">
            <input id="LinkPagoGenerated" className="input is-medium" type="text" value="linkdepago12364598778" readOnly />

            <span className="icon is-small is-right">
              <i className="mdi mdi-content-copy is-size-4" />
            </span>
          </p>
        </div>

        {/* <!-- Botón paso atras --> */}
        <button type='button' id="BackToFlow" className="button is-primary is-outlined invisible"> Volver </button>

        {/* <!-- Controles de reinicio del flow --> */}
        <div id="infoView-decision" className="infoView-decision invisible">
          <h3 className="subtitle is-size-4 mb-0">¿Quieres generar otro <br/>
            pago en el mismo país?</h3>

          <button type='button' id="generate_newPayment" className="button bigger is-primary is-medium">
            Generar nuevo pago
          </button>
          <button type='button' id="backTo_Country" className="button bigger is-primary is-outlined"> Volver al inicio </button>
        </div>


      </div>

    </div>
</div>
  </article>
</section>)
}

export default Home