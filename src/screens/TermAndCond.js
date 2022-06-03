import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback,  useState } from 'react'
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Alert,
    SafeAreaView,
    StatusBar,
    BackHandler
} from 'react-native'
import Colors from '../constants/Colors'

const TermAndCond = ({ navigation }) => {

    useFocusEffect(
        useCallback(() => {
          const onBackPress = () => {
              onCancel();
              return true;
          };
    
          BackHandler.addEventListener('hardwareBackPress', onBackPress);
    
          return () =>
            BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [])
    );

    const onAccept = () => navigation.replace("Privacy")

    const onCancel = () => {
        Alert.alert(
            'Alerta',
            '¿Estás seguro de que desea salir del proceso de registro?',
            [
              { text: "Cancelar", style: 'cancel', onPress: () => {} },
              {
                text: "Aceptar",
                style: 'destructive',
                // If the user confirmed, then we dispatch the action we blocked earlier
                // This will continue the action that had triggered the removal of the screen
                onPress: () => navigation.replace("Login"),
              },
            ]
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar />
            <View style={styles.header}>
                <Text style={styles.headerText}>
                    Términos de servicio de la aplicación móvil
                </Text>
            </View>
            <View style={styles.innerContainer}>
                <ScrollView
                    style={styles.scrollViewStyle}>
                    <Text style={styles.heading}>
                        TÉRMINOS DE SERVICIO A LOS USUARIOS
                    </Text>
                    <Text style={styles.para}>
                        Última actualización: 9 de febrero de 2022.
                        {"\n"} {"\n"}
                        En cumplimiento de lo expuesto en el artículo 10 de la Ley 34/2002 de Servicios de la Sociedad de la Información y de Comercio Electrónico, se informa que la presente aplicación móvil (en adelante, (“APP”) y los dominios www.tipeame.com y www.tipeame.es son propiedad de [TIPEAME] con CIF: *** y domicilio en Avda Bruselas 14 – Centro Comercial The Duke Shops 38670 – (Adeje) – Santa Cruz De Tenerife, España (en adelante, “TIPEAME” o la “Empresa”).
                        {"\n"} {"\n"}
                        La utilización de esta APP móvil, incluido el mero acceso, está sujeta a los términos de servicio aquí expuestos. El hecho de acceder a la APP y utilizar los materiales contenidos en ella supone que has leído y aceptas, sin reserva alguna, los presentes términos de servicio.
                    </Text>
                    <Text style={styles.heading}>
                        1. OBJETO
                    </Text>
                    <Text style={styles.para}>
                        TIPEAME es una compañía tecnológica, cuya actividad principal consiste en el desarrollo y gestión de una plataforma tecnológica mediante la que -a través de una aplicación móvil (en adelante, la “APP”) o de una web (en adelante, la “WEB” se permite a los Usuarios pagar propinas y hacer otras donaciones por servicios a profesionales (sumilleres, taxistas, camareros, personal de cocina, músicos, artistas, peluquería, personal de hoteles etc.) en concepto de agradecimiento y valoración por sus servicios. También permite a los Usuarios entregar una cantidad de dinero conforme a los usos y costumbres sociales (regalos de boda, celebraciones, la paga semanal a los miembros más jóvenes de la familia, los gastos de estudiantes fuera de casa…). En adelante las personas que reciben el dinero se denominarán “Beneficiarios”, siempre que dichos Beneficiarios se hayan dado de alta también en la APP para recibirlo.
                        {"\n"} {"\n"}
                        En el caso de que el Beneficiario sea trabajador o colaborador de algún establecimiento (de hostelería, de transporte, de espectáculos, de peluquería, etc.), en adelante el “Establecimiento”, deberá también dicho Establecimiento estar de alta en la APP. TIPEAME actuará como plataforma de gestión de cobros de propinas por cuenta del Beneficiario. Si el Beneficiario no está dado de alta en un Establecimiento (por ejemplo, en el caso del dinero entregado conforme a costumbres sociales o porque sea un profesional autónomo), deberá marcarlo así a la hora de registrarse.
                        {"\n"} {"\n"}
                        Los servicios de TIPEAME no podrán ser utilizados para reemplazar relaciones laborales o profesionales, sustituir el pago regular de bienes o servicios, ni para actividades ilícitas o contrarias a la dignidad de las personas. Si el dinero recibido se debe a un servicio o entrega de bienes por parte del Beneficiario, y el Beneficiario no está regularmente de alta en la Seguridad Social o sistema sustitutivo válido en España, sea por cuenta propia o por cuenta ajena, ni el Usuario ni el Beneficiario pueden hacer uso de nuestra plataforma. Si el dinero recibido se debe a un servicio o entrega de bienes por parte del Beneficiario, y el Beneficiario no tiene los derechos para trabajar legalmente en España (incluyendo, en caso de ser necesario, permiso de trabajo y permiso de residencia u otra documentación administrativa en regla que le habilite para trabajar), no puede hacer uso de esta plataforma.
                        {"\n"} {"\n"}
                        Si el dinero se entrega gratuitamente siguiendo alguna costumbre social, solo puede tener un uso lícito y encontrarse dentro de los límites razonables para el tipo de evento o situación. El Usuario pagador y el Beneficiario receptor son responsables de que las cantidades entregadas sean razonables según cada circunstancia, no asumiendo TIPEAME responsabilidad alguna al respecto.
                    </Text>
                    <Text style={styles.heading}>
                        2.TÉRMINOS DE SERVICIO ONLINE DE TIPEAME
                    </Text>
                    <Text style={styles.heading}>
                        2.1 Consentimiento y su validez
                    </Text>
                    <Text style={styles.para}>
                        A continuación, se exponen los términos de servicio generales que regirán las propinas por los servicios prestados a través de la APP móvil propiedad de TIPEAME.
                        {"\n"} {"\n"}
                        La aceptación del presente documento conlleva que:
                        {"\n"} {"\n"}
                        Has leído y entiendes lo aquí expuesto.
                        {"\n"} {"\n"}
                        N.I.F.: […].
                        {"\n"} {"\n"}
                        Inscrita en el Registro Mercantil de […].
                        {"\n"} {"\n"}
                        Puedes ponerte en contacto con nosotros para consultarnos cualquier aspecto relativo a esta Política de Privacidad dirigiéndote a nuestra dirección postal o enviando un correo electrónico a […].
                        {"\n"} {"\n"}
                        Eres una persona con capacidad suficiente para contratar.
                        {"\n"} {"\n"}
                        Eres mayor de 18 años: los Usuarios menores de 18 años no pueden contratar online los productos y servicios ofertados.
                        {"\n"} {"\n"}
                        Asumes todas las obligaciones aquí expuestas.
                    </Text>
                    <Text style={styles.heading}>
                        2.2 Procedimiento de contratación
                    </Text>
                    <Text style={styles.para}>
                        El procedimiento de contratación a través de la APP cumple con la Ley 34/2002, de Servicios de la Sociedad de la Información y del Comercio Electrónico, y con la Directiva del Parlamento Europeo y el Consejo 2000/31/CE de 8 de junio relativa a determinados aspectos de la Sociedad de la información, en particular el comercio electrónico y la Directiva 2009/22/CE del Parlamento Europeo y del Consejo, de 23 de abril de 2009, relativa a las acciones de cesación en materia de protección de los intereses de los consumidores.
                    </Text>
                    <Text style={styles.heading}>
                        2.2.1. Registro en la APP
                    </Text>
                    <Text style={styles.para}>
                        Para poder iniciar el proceso de uso de nuestra APP, deberás registrarte mediante la creación de una cuenta de Usuario. Para ello, pulsa “darse de alta”, selecciona la opción persona física e introduce los datos que te sean solicitados.
                        {"\n"} {"\n"}
                        Debes facilitar una cuenta de correo electrónico que te pertenezca y crear un nombre de usuario y una contraseña, comprometiéndote a hacer un uso diligente de los mismos y no ponerlos a disposición de terceros. Asimismo, debes comunicar inmediatamente a TIPEAME la pérdida o robo o el posible acceso por un tercero no autorizado, a fin de que procedamos al bloqueo inmediato de tu cuenta. Mientras no se comuniquen tales hechos, la empresa queda eximida de cualquier responsabilidad derivada del uso indebido de identificadores o contraseñas por terceros no autorizados.
                        {"\n"} {"\n"}
                        Paso 1.- Dar una propina
                        {"\n"} {"\n"}
                        En caso de estar ya registrado, introduce tu usuario y contraseña. Si no recuerdas tu contraseña, solicita «Recordar contraseña» para que te llegue por correo electrónico. Si no recuerdas tu nombre de usuario, solicita «Recordar usuario» para que te llegue por correo electrónico. En caso de ser un Usuario que da una propina por primera vez tendrás que registrarte previamente.
                        {"\n"} {"\n"}
                        Una vez realizado estos pasos previos, se procederá a realizar el pago en la cantidad que el Usuario considere oportuna, indicándolo en la casilla correspondiente que se indicará en la APP.
                        {"\n"} {"\n"}
                        Paso 2. Seleccionar un método de pago:
                        {"\n"} {"\n"}
                        A continuación, deberás seleccionar el método de pago. Actualmente, la APP valida el pago mediante tarjeta bancaria (crédito o débito) y a través de las plataformas Stripe, Apple Pay y Paypal (en adelante, “Método de Pago”).
                        {"\n"} {"\n"}
                        Si seleccionas tarjeta bancaria como Método de Pago, se te redireccionará automáticamente al sistema de plataforma segura de pago online (TPV) de la entidad financiera correspondiente, donde te serán solicitados los datos de tu tarjeta de crédito o débito: número de tarjeta y fecha de caducidad. La plataforma de pago virtual dispone de protocolo de seguridad SSL (Secure Sockets Layer) para garantizar la integridad y confidencialidad de la información facilitada.
                        {"\n"} {"\n"}
                        En el caso de optar por la plataforma de pagos Stripe (o Apple Pay o Paypal), serás redireccionado al sistema de dicha plataforma, donde te serán solicitados los datos necesarios para realizar el pago siempre conforme a las condiciones de uso del servicio de la plataforma correspondiente.
                        {"\n"} {"\n"}
                        En el caso de optar por la plataforma de pagos Stripe (o Apple Pay o Paypal), serás redireccionado al sistema de dicha plataforma, donde te serán solicitados los datos necesarios para realizar el pago siempre conforme a las condiciones de uso del servicio de la plataforma correspondiente.
                        {"\n"} {"\n"}
                        El Usuario recibirá un mensaje de la APP para pedir su confirmación de la suscripción y finalizar el proceso de alta, así como un mensaje para confirmar que efectivamente ha realizado el pago de la propina. Es imprescindible efectuar el doble check requerido por tu banco para la confirmación de la cuenta bancaria en la que se cargará el pago de la propina por parte de la APP.
                        {"\n"} {"\n"}
                        Los datos de carácter personal que facilite el Usuario en el mensaje recibido serán incorporados a un fichero de TIPEAME con la finalidad de tramitar y gestionar su propina, así como mantenerle informado de futuras campañas de propina y demás actividades propias de la empresa por cualquier medio, en los términos previstos en la Política de Privacidad.
                        {"\n"} {"\n"}
                        En el caso de Beneficiarios que formen grupo (porque se hayan configurado como un equipo, por ejemplo, con todo el personal de un turno en un restaurante), TIPEAME declina toda responsabilidad sobre cómo se distribuyen las propinas entre los miembros del grupo.
                    </Text>
                    <Text style={styles.heading}>
                        2.2.2 Donación como invitado
                    </Text>
                    <Text style={styles.para}>
                        Esta aplicación también permite la donación a través de la funcionalidad como invitado. En esta modalidad de abono de la propina, se le solicitarán únicamente los datos imprescindibles para poder tramitar su donación. Una vez finalizado el proceso, se le ofrecerá la posibilidad de registrarse como Usuario, o bien continuar como Usuario no registrado.
                        {"\n"} {"\n"}
                        Cuando un Usuario accede como invitado a TIPEAME, puede realizar el pago y realizar un seguimiento de sus donaciones, pero no puede usar TIPEAME para hacer un seguimiento de sus actividades (tales como acceder a promociones o acumular puntos o premios).
                        {"\n"} {"\n"}
                        Cómo donar como invitado
                        {"\n"} {"\n"}
                        Cuando encuentres el beneficiario al que quieras realizar la donación, ve a la página de pago y envío para completar la transacción. A continuación, te explicamos cómo hacerlo:
                        {"\n"} {"\n"}
                        1. Selecciona el apartado “realizar pago” indicado en la APP.
                        {"\n"} {"\n"}
                        2. Pulsa Donar como invitado.
                        {"\n"} {"\n"}
                        3. Especifica el nombre, apellidos, la dirección de correo electrónico y la información de pago.
                        {"\n"} {"\n"}
                        4. Selecciona Confirmar y Donar.
                        {"\n"} {"\n"}
                        Puedes donar sin disponer de una cuenta de TIPEAME siempre que:
                        {"\n"} {"\n"}
                        1. La donación sea inferior a 1000 EUR.
                        {"\n"} {"\n"}
                        2. Dispongas de un Método de Pago a tu nombre. No te preocupes; en ningún caso compartiremos los datos de tus tarjetas.
                        {"\n"} {"\n"}
                        Correo electrónico de confirmación de donación como invitado
                        {"\n"} {"\n"}
                        Cuando dones como invitado, te enviaremos un correo electrónico de confirmación de la operación como invitado con el asunto «Operación confirmada». Este correo electrónico incluye todos los detalles de la donación.
                        {"\n"} {"\n"}
                        Necesitamos usar tus datos para identificarte como Usuario y darte acceso a los servicios y funcionalidades que ofrecemos a nuestros Usuarios registrados.
                        {"\n"} {"\n"}
                        Estaremos legitimados por la ejecución de las condiciones de uso de la aplicación.
                        {"\n"} {"\n"}
                        Tienes derecho a acceder, rectificar o suprimir tus datos.
                        {"\n"} {"\n"}
                        Para más información, consulta nuestra Política de Privacidad. En caso de conflicto entre este documento y la Política de Privacidad, prevalece esta última.
                    </Text>
                    <Text style={styles.heading}>
                        2.2.3 Formas de pago
                    </Text>
                    <Text style={styles.para}>
                        Todos los medios de pago dispuestos por TIPEAME están sujetos a comprobaciones y autorizaciones por parte de las entidades emisoras del medio de pago (emisores de tarjeta y/o emisores de cuentas de pago), de forma que, si dichas entidades no autorizasen el pago, no podrá continuarse con el proceso de propina iniciado, quedando automáticamente cancelado el pedido y entendiéndose no realizada la propina.
                    </Text>
                    <Text style={styles.heading}>
                        2.3 Mecanismo de funcionamiento
                    </Text>
                    <Text style={styles.heading}>
                        2.3.1 Mecanismo para propinas (pagos en agradecimiento de servicios o bienes)
                    </Text>
                    <Text style={styles.para}>
                        Teniendo en consideración los impuestos de aplicación a las propinas y las comisiones de servicio, sobre la cantidad abonada en concepto de propina a los Beneficiarios, la APP carga una comisión del 2,19% por el uso de la pasarela de pago, una comisión del 5% por el uso de la APP más impuestos indirectos (IVA o IGIC) por este servicio, además de hacer un descuento por la retención a cuenta del IRPF del Beneficiario. Por ejemplo, si se abona una propina de 5 euros, según las normas aplicables a la fecha de redacción de estos Términos, al Beneficiario le llegarán *** euros (la propina, menos la comisión de la pasarela de pago, menos el cargo por servicio de TIPPEAME, menos los impuestos indirectos (IVA o IGIC) sobre dicho servicio, menos un descuento en concepto de retención, que la APP entrega al empleador del Beneficiario para que el empleador lo ingrese en Hacienda a cuenta del IRPF del Beneficiario). Salvo que el Establecimiento nos indique otro porcentaje, el descuento que haremos en concepto de retención será del 15%. Tenlo en cuenta, porque la cantidad que dejes como propina al Beneficiario no va a llegarle íntegra.
                        {"\n"} {"\n"}
                        La APP no tiene ninguna obligación de practicar retenciones sobre las propinas, por lo que no asume responsabilidad sobre excesos o defectos en el importe que se descuenta, ni sobre su ingreso efectivo en Hacienda.
                        {"\n"} {"\n"}
                        También verás que puedes elegir que al Beneficiario le llegue una propina concreta con una cantidad exacta. En tal caso, te cargaremos una cantidad mayor para cubrir tanto nuestro cargo de servicio (más impuestos indirectos) como el descuento en concepto de que servirá para que el Establecimiento pueda realizar la retención fiscal. Te ponemos un ejemplo:
                        {"\n"} {"\n"}
                        La aplicación de los impuestos indirectos es compleja, de forma que se aplicará IVA o IGIC en función del lugar de localización de la prestación del servicio de la App.
                        {"\n"} {"\n"}
                        A continuación se exponen algunos ejemplos:
                        {"\n"} {"\n"}
                        1. App utilizada en el territorio de aplicación del IVA (Península y Baleares)
                        {"\n"} {"\n"}
                        Opción 1: El Usuario da una propina de 5€ (sin especificar el importe que desea que le llegue al Beneficiario)
                        {"\n"} {"\n"}
                        Propina (cargo al Usuario): 5€
                        {"\n"} {"\n"}
                        Comisión Pasarela de Pago: 0,11€ (He asumido una comisión de Stripe de 2,19%).
                        {"\n"} {"\n"}
                        Comisión Tipeame (5%): 0,25€
                        {"\n"} {"\n"}
                        IVA sobre la comisión (21%): 0,05€
                        {"\n"} {"\n"}
                        Deducción en concepto de retención (15% sobre la Propina sin tener en cuenta la comisión de Tipeame ni el IVA: 0,69€
                        {"\n"} {"\n"}
                        Propina neta que recibe el Beneficiario: 3,90€
                        {"\n"} {"\n"}
                        Opción 2: El usuario elige que le llegue al Beneficiario una propina de 5€
                        {"\n"} {"\n"}
                        Propina (cargo al Usuario): 6,41€
                        {"\n"} {"\n"}
                        Comisión Pasarela de Pago: 0,14€
                        {"\n"} {"\n"}
                        Comisión Tipeame: 0,32€
                        {"\n"} {"\n"}
                        IVA sobre la comisión (21%): 0,07€
                        {"\n"} {"\n"}
                        Deducción en concepto de retención (15% sobre la Propina sin tener en cuenta la comisión de Tipeame ni el IVA: 0,88€
                        {"\n"} {"\n"}
                        Propina neta que recibe el Beneficiario: 5€
                        {"\n"} {"\n"}
                        1. App utilizada en las Islas Canarias
                        {"\n"} {"\n"}
                        Opción 1: El Usuario da una propina de 5€ (sin especificar el importe que desea que le llegue al Beneficiario)
                        {"\n"} {"\n"}
                        Propina (cargo al Usuario): 5€
                        {"\n"} {"\n"}
                        Comisión Pasarela de Pago: 0,11€
                        {"\n"} {"\n"}
                        Comisión Tipeame: 0,25€
                        {"\n"} {"\n"}
                        IGIC sobre la comisión (7%): 0,02€
                        {"\n"} {"\n"}
                        Deducción en concepto de retención (15% sobre la Propina sin tener en cuenta la comisión de Tipeame ni el IGIC: 0,69€
                        {"\n"} {"\n"}
                        Propina neta que recibe el Beneficiario: 3,93€
                        {"\n"} {"\n"}
                        Opción 2: El usuario elige que le llegue al Beneficiario una propina de 5€
                        {"\n"} {"\n"}
                        Propina (cargo al Usuario): 6,36€
                        {"\n"} {"\n"}
                        Comisión Pasarela de Pago: 0,14€
                        {"\n"} {"\n"}
                        Comisión Tipeame: 0,32€
                        {"\n"} {"\n"}
                        IGIC sobre la comisión (7%): 0,02€
                        {"\n"} {"\n"}
                        Deducción en concepto de retención (15% sobre la Propina sin tener en cuenta la comisión de Tipeame ni el IGIC: 0,88€
                        {"\n"} {"\n"}
                        Propina neta que recibe el Beneficiario: 5€
                        {"\n"} {"\n"}
                        Desde que un Usuario pague una propina, y en tanto haya cobertura móvil en la zona, tardaremos unos segundos/unos minutos/un breve plazo de tiempo en hacerle llegar su parte al Beneficiario. PENDIENTE CAIO/MÍCHEL
                    </Text>
                    <Text style={styles.heading}>
                        2.3.2 Mecanismo para donaciones
                    </Text>
                    <Text style={styles.para}>
                        Las donaciones en España son ingresos sujetos al Impuesto sobre Sucesiones y Donaciones. La gestión del Impuesto de Sucesiones y Donaciones está cedida a las Comunidades Autónomas y su regulación varía de una a otra.
                        {"\n"} {"\n"}
                        Es obligación del Beneficiario confirmar el tratamiento fiscal de las donaciones que recibe y cumplir con las obligaciones tributarias que resulten de aplicación.
                        {"\n"} {"\n"}
                        La APP no tiene responsabilidad alguna por los impuestos que corresponden a los Beneficiarios, a los Usuarios o a los Establecimientos.
                        {"\n"} {"\n"}
                        Ten en cuenta que, sobre la cantidad abonada a los Beneficiarios, la APP carga una comisión del [***]% más impuestos indirectos (IVA o IGIC) por el servicio que presta. Por ejemplo, si un Usuario dona 5 euros, según las normas aplicables a la fecha de redacción de estos Términos, al Beneficiario le llegarán 4,39 euros (la propina menos la comisión menos el correspondiente IVA aplicable a la comisión). Tenlo en cuenta, porque la cantidad que dejes como donación al Beneficiario no va a llegarle íntegra.
                        {"\n"} {"\n"}
                        Desde que un Usuario pague una propina, y en tanto haya cobertura móvil en la zona, tardaremos unos segundos/unos minutos/un breve plazo de tiempo en hacerle llegar su parte al Beneficiario. PENDIENTE CAIO/´MÍCHEL
                    </Text>
                    <Text style={styles.heading}>
                        2.3.3 Mecanismo de aceptación
                    </Text>
                    <Text style={styles.para}>
                        Cada vez que algún Usuario quiera abonar una propina o donación, la APP le enviará un mensaje para confirmar que efectivamente ha realizado la donación. Al contestar de forma afirmativa, estarás ratificando que el Método de Pago sigue siendo de tu titularidad y que realizas la operación por cuenta propia.
                    </Text>
                    <Text style={styles.heading}>
                        2.4 Derecho de desistimiento
                    </Text>
                    <Text style={styles.para}>
                        En cumplimiento de lo dispuesto en el artículo 97 (información precontractual de los contratos a distancia y los contratos celebrados fuera del establecimiento mercantil) del texto refundido de la Ley General para la Defensa de los Consumidores y Usuarios, aprobado por Real Decreto Legislativo 1/2007, de 16 de noviembre, a los efectos de lo dispuesto en el artículo 103.a del mismo texto refundido, el Usuario reconoce que, una vez que el servicio haya sido completamente ejecutado, es consciente de que habrá perdido su derecho de desistimiento.
                        {"\n"} {"\n"}
                        Por lo así expuesto, el Usuario, al realizar la donación en la cantidad considerada y una vez procedido a la confirmación de la donación que la APP le requerirá a través del mensaje pertinente, renuncia a su derecho de desistimiento en relación con la donación ejecutada.
                        {"\n"} {"\n"}
                        No obstante, excepcionalmente podemos considerar un reembolso, en el caso de que se demuestre un uso fraudulento de tu dispositivo, siempre que medie una denuncia oficial y que el medio de pago utilizado lo permita. En este caso, por favor, escribe a XXX@tipeame.com y analizaremos individualmente tu situación”. CAIO/MÍCHEL CONFIRMAR
                    </Text>
                    <Text style={styles.heading}>
                        2.5 Obligaciones del Usuario
                    </Text>
                    <Text style={styles.para}>
                        El Usuario se obliga las siguientes condiciones:
                        {"\n"} {"\n"}
                        Facilitar información veraz sobre los datos facilitados en los formularios de registro de Usuario y a mantenerlos actualizados en todo momento.
                        {"\n"} {"\n"}
                        Aceptar todas las disposiciones y condiciones legales recogidas en las presentes condiciones generales de contratación entendiendo que recogen la mejor voluntad de servicio posible para la actividad.
                        {"\n"} {"\n"}
                        Custodiar bajo su responsabilidad con seguridad sus claves y datos de acceso a la Plataforma (en adelante, conjuntamente “Claves”).
                        {"\n"} {"\n"}
                        No compartir sus Claves, puesto que dichas Claves le corresponden personal e intransferiblemente.
                        {"\n"} {"\n"}
                        Aplicar las medidas de seguridad y de actualización de sus Claves que se le pidan desde TIPEAME.
                        {"\n"} {"\n"}
                        Comunicar a TIPEAME todos los usos no autorizados de sus Claves y/o de su cuenta en la APP, de manera inmediata tan pronto como lo haya detectado.
                        {"\n"} {"\n"}
                        Utilizar la APP con los fines lícitos establecidos más arriba
                    </Text>
                    <Text style={styles.heading}>
                        2.6 Información posterior
                    </Text>
                    <Text style={styles.para}>
                        La empresa facilitará al Usuario la confirmación de este contrato celebrado en un soporte duradero y en un plazo razonable después de la celebración del contrato a distancia, a más tardar en el momento de entrega de los bienes o antes del inicio de la ejecución del servicio. [NOTA: ¿Se mandarán confirmaciones inmediatas al correo? CONFIRMAR] El Usuario designa como soporte duradero la cuenta de correo electrónico que facilita al darse de alta en la APP.
                    </Text>
                    <Text style={styles.heading}>
                        2.7 Exoneración de responsabilidad
                    </Text>
                    <Text style={styles.heading}>
                        2.7.1 Funcionamiento
                    </Text>
                    <Text style={styles.para}>
                        El Usuario es responsable de contar con los servicios y equipos necesarios para la conexión a Internet y para acceder a la APP. En caso de cualquier incidencia o dificultad para acceder a la APP, el Usuario puede informarlo a TIPEAME a través del correo electrónico ***@***.com que procederá a analizar la incidencia y dará instrucciones al Usuario sobre cómo resolverla en el plazo más breve posible. Además, el Usuario asume toda responsabilidad derivada del uso propio de la APP, siendo el único responsable de todo efecto directo o indirecto que sobre dicha APP se derive, incluyendo todo resultado económico, técnico y/o jurídico adverso.
                        {"\n"} {"\n"}
                        TIPEAME se reserva el derecho a interrumpir el acceso a la APP en cualquier momento y sin previo aviso, ya sea por motivos técnicos, de seguridad, control, mantenimiento, por fallos de suministro eléctrico o cualquier otra causa.
                        {"\n"} {"\n"}
                        Los Usuarios son los únicos responsables de sus claves de identificación y acceso a los contenidos o servicios de TIPEAME. TIPEAME, no se hace responsable del uso indebido de las claves de acceso de los Usuarios para el acceso a los contenidos o servicios que los requieran y de las consecuencias derivadas de cualquier naturaleza del mal uso por los Usuarios, su pérdida u olvido, así como su uso indebido por terceros no autorizados.
                    </Text>
                    <Text style={styles.heading}>
                        2.7.2 Uso por el Usuario y contenidos del Usuario
                    </Text>
                    <Text style={styles.para}>
                        TIPEAME no puede asumir ni asume responsabilidad alguna sobre la correcta prestación de los servicios o la calidad de los productos que se le hayan suministrado al Usuario por los Establecimientos y/o por los Beneficiarios, ni sobre el régimen en el que los Beneficiarios se encuentran contratados por los respectivos Establecimientos o que los Beneficiarios se encuentren de alta con las correspondientes autoridades competentes. Estas cuestiones son responsabilidad de los Establecimientos en su relación con los Beneficiarios y/o de los Beneficiarios directamente, en su caso.
                        {"\n"} {"\n"}
                        Asimismo, TIPEAME no se hace responsable por la utilización que los Usuarios realicen del contenido de la APP que pueda suponer una violación de cualquier tipo de norma, nacional o internacional, de los derechos de propiedad industrial e intelectual o cualesquiera otros derechos de terceros.
                        {"\n"} {"\n"}
                        En la máxima medida que permite la ley aplicable, TIPEAME excluye cualquier responsabilidad por los daños y perjuicios de toda naturaleza que pudieran deberse a la utilización ilícita de la APP por parte de los Usuarios o que puedan deberse a la falta de veracidad, vigencia, y/o autenticidad de la información que los Usuarios proporcionan a otros Usuarios y en particular por los daños y perjuicios de toda naturaleza que puedan deberse a la suplantación de la personalidad de un tercero efectuada por un Usuario en cualquier clase de comunicación realizada a través de la APP.

                        TIPEAME se reserva la facultad de limitar, total o parcialmente el acceso a la APP a determinados Usuarios, así como de cancelar, suspender, bloquear o eliminar determinado tipo de contenidos, mediante la utilización de instrumentos tecnológicos aptos al efecto, si tuviese conocimiento efectivo de que la actividad o la información almacenada es ilícita o que lesiona los bienes o derechos de un tercero o que es de carácter fraudulento.
                    </Text>
                    <Text style={styles.heading}>
                        2.8 Duración y extinción
                    </Text>
                    <Text style={styles.para}>
                        Las presentes condiciones tendrán un período de validez indefinido y serán aplicables a todas las transacciones comerciales realizadas a través de la APP de TIPEAME. TIPEAME se reserva el derecho a modificar unilateralmente dichas condiciones, sin que ello pueda afectar a las operaciones que fueron realizadas con carácter previo a la modificación.
                    </Text>
                    <Text style={styles.heading}>
                        2.8.1 Baja a iniciativa de los Usuarios
                    </Text>
                    <Text style={styles.para}>
                        Para darse de baja, el Usuario puede dirigirse en cualquier momento a la APP o a la WEB, en el apartado Configuración del perfil, eligiendo la opción de eliminar cuenta. CONFIRMAR CON CAIO QUE ESTA FUNCIONALIDAD ESTÁ HABILITADA
                        {"\n"} {"\n"}
                        En caso de que la opción anterior no estuviera habilitada o no funcionara por cualquier motivo, puede revocar también su consentimiento en cualquier momento remitiendo un correo con el asunto “Baja de usuario” a ***@***.com, incluyendo en el cuerpo del correo electrónico el nombre de usuario y el correo electrónico utilizado al registrarse en la aplicación. La baja en la APP no afectará a las transacciones realizadas anteriormente.
                        {"\n"} {"\n"}
                        Solicitada la baja, se tramitará en un plazo de [PENDIENTE].
                    </Text>
                    <Text style={styles.heading}>
                        2.8.2 Baja a iniciativa de TIPEAME
                    </Text>
                    <Text style={styles.para}>
                        TIPEAME puede suspender o dar de baja a un Usuario (y por lo tanto optar por suspender o resolver la relación contractual) inmediatamente en caso de que el Usuario incumpla cualquier obligación estipulada por la APP, o haga un uso indebido de la APP, o uso para fines ilícitos o contrarios a la dignidad y los derechos humanos. Asimismo, puede suspender o finalizar los servicios inmediatamente en caso de que TIPEAME deje de prestar los servicios que ofrece a través de la APP, y en cualquier momento y sin necesidad de alegar causa alguna.
                        {"\n"} {"\n"}
                        El hecho de que se dé de baja a un Usuario o que el propio Usuario se dé de baja, implica la resolución contractual de los Términos de Servicio, si bien determinadas cláusulas pueden seguir desplegando efectos por razón de su naturaleza.
                        {"\n"} {"\n"}
                        En caso de resolución contractual, el Usuario se compromete a eliminar cualquier copia que tenga de la aplicación y a cesar en el empleo de la misma. Además, el acceso a la aplicación y todos sus contenidos serán desactivados y su contenido eliminado.
                    </Text>
                    <Text style={styles.heading}>
                        3. SEGURIDAD Y CONFIDENCIALIDAD
                    </Text>
                    <Text style={styles.para}>
                        TIPEAME garantiza la seguridad y confidencialidad de todas las comunicaciones con sus Beneficiarios. CONFIRMAR
                        {"\n"} {"\n"}
                        Todas las operaciones de propina on-line se realizan a través de un servidor seguro, basado en el estándar SSL que protege a los datos frente a los intentos de violación de terceros. Los datos del proceso de pago de propinas se guardan en una base de datos diseñada para tal finalidad. [confirmar]
                        {"\n"} {"\n"}
                        TIPEAME garantiza la protección y confidencialidad de los datos personales, domiciliarios, de pago y de cualquier otro tipo que nos proporcionen nuestros clientes en cumplimento del Reglamento General de Protección de Datos (Reglamento UE 2016/679) y su normativa de desarrollo (ver apartado “Política de Privacidad”). (enlace a la Política de Privacidad de la Web).
                    </Text>
                    <Text style={styles.heading}>
                        4. PROPIEDAD INTELECTUAL
                    </Text>
                    <Text style={styles.para}>
                        1. a) TIPEAME, por sí o como cesionaria, es la titular de los derechos de propiedad intelectual e industrial de los contenidos de los espacios en la red pública denominada Internet así como de todos los elementos contenidos de la APP móvil a través de la cual se procederá a realizar la donación (a título enunciativo: imágenes, sonido, audio, vídeo, software, marcas o logotipos, programas de ordenador necesarios para su funcionamiento, etc.).
                        El Usuario se compromete a respetar dichos derechos.
                        {"\n"} {"\n"}
                        1. b) La utilización o la publicación, parcial o total, con fines comerciales o uso personal, de documentos, fotografías, películas, logotipos y elementos gráficos incluidos en ella por parte de terceros está estrictamente prohibida, salvo que estos tengan autorización previa de TIPEAME. [Nota: Confirmar si los Usuarios van a poder utilizar imágenes de esta APP. En tal caso, cambiaríamos esta cláusula]
                        {"\n"}
                        2. c) Los encargados de sitios web que creen enlaces con este sitio deben informar a TIPEAME por correo electrónico a la siguiente dirección: ***@***.com
                        {"\n"} {"\n"}
                        La inclusión de dichas conexiones no implicará ningún tipo de asociación o participación con las entidades conectadas. TIPEAME se reserva el derecho a denegar dicho acceso en cualquier momento y no asume responsabilidad alguna en cuanto al contenido o uso que hagan de los datos de carácter personal.
                        {"\n"} {"\n"}
                        Los enlaces serán supervisados regularmente por la empresa. No obstante, en el caso de que cualquier Usuario o visitante entendiese que el contenido o los servicios prestados por las páginas enlazadas podrían ser ilícitos, vulnerar o lesionar bienes o derechos del propio Usuario o de un tercero, deberán comunicarlo a la dirección ***@***.com para que dé traslado al orden jurisdiccional competente.
                        {"\n"} {"\n"}
                        1. d) TIPEAME no será responsable, en caso alguno, de los daños y perjuicios de cualquier tipo que causen a terceros y se deriven de la falta de lectura de este aviso, o del incumplimiento de las obligaciones específicas para su uso que se establecen en las condiciones establecidas del mismo.
                    </Text>
                    <Text style={styles.heading}>
                        5. ACTUALIZACIÓN Y MODIFICACIÓN DE LA APP
                    </Text>
                    <Text style={styles.para}>
                        TIPEAME se reserva el derecho de modificar, en cualquier momento y sin previo aviso los presentes Términos de Servicio, la Política de Privacidad y la Política de Cookies para adaptarla a novedades legislativas o jurisprudenciales, por cambios en la configuración o por otras razones.
                        {"\n"} {"\n"}
                        En cualquier caso, la modificación de estos Términos de Servicio será notificada a los Usuarios.
                        {"\n"} {"\n"}
                        Los Usuarios deberán leer atentamente estos Términos de Servicio al acceder a la Plataforma. En cualquier caso, la aceptación de los Términos de Servicio será un paso previo e indispensable al acceso de los servicios y contenidos disponibles a través de la APP y/o WEB.
                        {"\n"} {"\n"}
                        Asimismo, TIPEAME se reserva la facultad de efectuar, en cualquier momento y sin necesidad de previo aviso, actualizaciones, modificaciones o eliminación de información contenida en su Plataforma en la configuración y presentación de ésta y de las condiciones de acceso, sin asumir responsabilidad alguna por ello.
                        {"\n"} {"\n"}
                        TIPEAME no garantiza la inexistencia de interrupciones o errores en el acceso de la Plataforma o a su contenido, ni que ésta se encuentre siempre actualizada, no obstante, TIPEAME llevará a cabo, siempre que no concurran causas que lo hagan imposible o de difícil ejecución, y tan pronto tenga noticia de los errores, desconexiones o falta de actualización en los contenidos, todas aquellas labores tendentes a subsanar los errores, restablecer la comunicación y actualizar los contenidos.
                    </Text>
                    <Text style={styles.heading}>
                        6. COMUNICACIÓN
                    </Text>
                    <Text style={styles.para}>
                        El Usuario confirma que el correo electrónico facilitado al operar con la APP le pertenece y que admite dicho correo electrónico como medio de comunicación válido entre el Usuario y TIPEAME, con los efectos legales que dicha comunicación haya de tener en cada momento.
                        {"\n"} {"\n"}
                        El Usuario, a través de la marcación de la casilla de aceptación, consiente la comunicación y el tratamiento de los datos a través de chatbots, siempre dentro de los límites estipulados en la legislación en cada momento vigente.
                    </Text>
                    <Text style={styles.heading}>
                        7. INDEPENDENCIA DE LAS CLÁUSULAS
                    </Text>
                    <Text style={styles.para}>
                        Si cualquiera de las cláusulas de los presentes Términos de Servicio fuera nula de pleno derecho o anulable, se tendrá por no puesta. Dicha declaración de nulidad no invalidará el resto del Contrato, que mantendrá su vigencia y eficacia entre las partes.
                    </Text>
                    <Text style={styles.heading}>
                        8. LEY APLICABLE Y JURISDICCIÓN COMPETENTE
                    </Text>
                    <Text style={styles.para}>
                        La relación entre TIPEAME y el Usuario se regirá e interpretará de conformidad con los Términos de Servicio que en materia de interpretación, validez y ejecución se regirán por la legislación española. Cualquier controversia se someterá a los juzgados y tribunales de Santa Cruz de Tenerife, salvo que el Usuario solicite los tribunales de su domicilio de residencia.
                    </Text>
                    <Text style={styles.headerText}>
                        TÉRMINOS DE SERVICIO A LOS BENEFICIARIOS
                        {"\n"} {"\n"}
                    </Text>

                    <Text style={styles.para}>
                        [Nota: Estas son las condiciones de la app a las que se adhieren las personas que reciben las propinas (denominados “Beneficiarios”).
                        {"\n"} {"\n"}
                        TÉRMINOS DE SERVICIO DE LA APLICACIÓN MÓVIL
                        {"\n"} {"\n"}
                        Última actualización: 10 de febrero de 2022.
                        {"\n"} {"\n"}
                        En cumplimiento de lo expuesto en el artículo 10 de la Ley 34/2002 de Servicios de la Sociedad de la Información y de Comercio Electrónico, se informa que la presente aplicación móvil (en adelante, (“APP”) y el dominio www.tipeame.com y www.tipeame.es son propiedad de [TIPEAME] con CIF: *** y domicilio en Avda Bruselas 14 – Centro Comercial The Duke Shops 38670 – (Adeje) – Santa Cruz De Tenerife, España ( en adelante, “TIPEAME” o la “Empresa”).
                        {"\n"} {"\n"}
                        La utilización de esta APP móvil, incluido el mero acceso, está sujeta a los términos de servicio aquí expuestos. El hecho de acceder a la APP y utilizar los materiales contenidos en ella supone que has leído y aceptas, sin reserva alguna, los presentes términos de servicio.
                    </Text>
                    <Text style={styles.heading}>
                        1. OBJETO
                    </Text>
                    <Text style={styles.para}>
                        TIPEAME es una compañía tecnológica, cuya actividad principal consiste en el desarrollo y gestión de una plataforma tecnológica mediante la que -a través de una aplicación móvil (en adelante, la “APP”) o de una web (en adelante, la “WEB”) se permite a los Usuarios pagar propinas y hacer otras donaciones por servicios a profesionales (sumilleres, taxistas, camareros, personal de cocina, músicos, artistas, peluquería, personal de hoteles etc.) en concepto de agradecimiento y valoración por sus servicios. También permite a los Usuarios entregar una cantidad de dinero conforme a los usos y costumbres sociales (regalos de boda, celebraciones, la paga semanal a los miembros más jóvenes de la familia, los gastos de estudiantes fuera de casa…). En adelante las personas que reciben el dinero se denominarán “Beneficiarios”, siempre que dichos Beneficiarios se hayan dado de alta también en la APP para recibirlo.
                        {"\n"} {"\n"}
                        En el caso de que el Beneficiario sea trabajador o colaborador de algún establecimiento (de hostelería, de transporte, de espectáculos, de peluquería, etc.), en adelante el “Establecimiento”, deberá también dicho Establecimiento estar de alta en la APP. TIPEAME actuará como plataforma de gestión de cobros de propinas por cuenta del Beneficiario. Si el Beneficiario no está dado de alta en un Establecimiento (por ejemplo, en el caso del dinero entregado conforme a costumbres sociales o porque sea un profesional autónomo), deberá marcarlo así a la hora de registrarse.
                        {"\n"} {"\n"}
                        Los servicios de TIPEAME no podrán ser utilizados para reemplazar relaciones laborales o profesionales, sustituir el pago regular de bienes o servicios, ni para actividades ilícitas o contrarias a la dignidad de las personas. Si el dinero recibido se debe a un servicio o entrega de bienes por parte del Beneficiario, y el Beneficiario no está regularmente de alta en la Seguridad Social o sistema sustitutivo válido en España, sea por cuenta propia o por cuenta ajena, ni el Usuario ni el Beneficiario pueden hacer uso de nuestra plataforma. Si el dinero recibido se debe a un servicio o entrega de bienes por parte del Beneficiario, y el Beneficiario no tiene los derechos para trabajar legalmente en España (incluyendo, en caso de ser necesario, permiso de trabajo y permiso de residencia u otra documentación administrativa en regla que le habilite para trabajar), no puede hacer uso de esta plataforma.
                        {"\n"} {"\n"}
                        Si el dinero se entrega gratuitamente siguiendo alguna costumbre social, solo puede tener un uso lícito y encontrarse dentro de los límites razonables para el tipo de evento o situación. El Usuario pagador y el Beneficiario receptor son responsables de que las cantidades entregadas sean razonables según cada circunstancia, no asumiendo TIPEAME responsabilidad alguna al respecto.
                    </Text>
                    <Text style={styles.heading}>
                        2.TÉRMINOS DE SERVICIO ONLINE DE TIPEAME
                    </Text>
                    <Text style={styles.heading}>
                        2.1 Consentimiento y su validez
                    </Text>
                    <Text style={styles.para}>
                        A continuación, se exponen los términos de servicio generales que regirán las propinas por los servicios prestados a través de la APP móvil propiedad de TIPEAME.
                        {"\n"} {"\n"}
                        La aceptación del presente documento conlleva que:
                        {"\n"} {"\n"}
                        Has leído y entiendes lo aquí expuesto.
                        {"\n"} {"\n"}
                        Eres una persona con capacidad suficiente para contratar.
                        {"\n"} {"\n"}
                        Eres mayor de 18 años.
                        {"\n"} {"\n"}
                        Las personas entre 16 y 18 años deberán contar con autorización de sus padres o tutores. A través de la “cuenta familia” se podrán recibir y emitir pagos, siempre y cuando se cumpla la confirmación de doble factor del tutor de la cuenta. Todo ello se realizará siempre bajo cumplimiento de la normativa bancaria y en tanto legislación aplicable lo permita.
                        {"\n"} {"\n"}
                        Asumes todas las obligaciones aquí expuestas.
                    </Text>
                    <Text style={styles.heading}>
                        2.2 Procedimiento de contratación
                    </Text>
                    <Text style={styles.para}>
                        El procedimiento de contratación a través de la APP cumple con la Ley 34/2002, de Servicios de la Sociedad de la Información y del Comercio Electrónico, y con la Directiva del Parlamento Europeo y el Consejo 2000/31/CE de 8 de junio relativa a determinados aspectos de la Sociedad de la información, en particular el comercio electrónico y la Directiva 2009/22/CE del Parlamento Europeo y del Consejo, de 23 de abril de 2009, relativa a las acciones de cesación en materia de protección de los intereses de los consumidores.
                    </Text>
                    <Text style={styles.heading}>
                        2.2.1. Registro en la APP
                    </Text>
                    <Text style={styles.para}>
                        Para poder iniciar el proceso de uso de nuestra APP, deberás registrarte mediante la creación de una cuenta de Beneficiario. Para ello, pulsa “darse de alta”, introduce los datos que te sean solicitados.
                        {"\n"} {"\n"}
                        Debes facilitar una cuenta de correo electrónico que te pertenezca y crear un nombre de usuario y una contraseña, comprometiéndote a hacer un uso diligente de los mismos y no ponerlos a disposición de terceros. Asimismo, debes comunicar inmediatamente a TIPEAME la pérdida o robo o el posible acceso por un tercero no autorizado, a fin de que procedamos al bloqueo inmediato de tu cuenta. Mientras no se comuniquen tales hechos, la empresa queda eximida de cualquier responsabilidad derivada del uso indebido de identificadores o contraseñas por terceros no autorizados.
                        {"\n"} {"\n"}
                        Paso 1.- Recibir una propina
                        {"\n"} {"\n"}
                        En caso de ser un Beneficiario que recibe la propina por primera vez tendrás que registrarte previamente.
                        {"\n"} {"\n"}
                        En caso de estar ya registrado, introduce tu usuario y contraseña. Si no recuerdas tu contraseña, solicita «Recordar contraseña» para que te llegue por correo electrónico. Si no recuerdas tu nombre de usuario, solicita «Recordar usuario» para que te llegue por correo electrónico.
                        {"\n"} {"\n"}
                        Una vez realizados estos pasos previos, se te [enviará a través de la APP / generará a través de la APP] un código QR personalizado a través del cual podrás recibir las propinas de los Usuarios (es decir, las personas que desean pagarte una cantidad de dinero utilizando la APP o Web). El código QR deberás dejarlo visible para que el Usuario lo escanee con su dispositivo y orden el pago a tu favor como Beneficiario.
                        {"\n"} {"\n"}
                        Así pues, los Beneficiarios recibirán la propina a través de la APP de TIPEAME de forma directa. Ten en cuenta que TIPEAME es un mero gestor de los cobros de propinas por cuenta del Beneficiario.
                        {"\n"} {"\n"}
                        Paso 2. Seleccionar un método de recibo de la propina:
                        {"\n"} {"\n"}
                        A continuación, el Beneficiario deberá seleccionar el método a través del cual se le hace entrega de la propina por parte del Usuario. Actualmente, la APP valida el pago mediate tarjeta bancaria (crédito o débito) y a través de las plataformas Stripe, Apple Pay, Paypal y Google Pay(en adelante, “Métodos de pago”.)
                        {"\n"} {"\n"}
                        Si seleccionas número de cuenta bancaria como método de recibo, deberás en todo momento ser titular de esa cuenta bancaria y se te redireccionará automáticamente al sistema de plataforma segura de pago online (TPV) de la entidad financiera correspondiente ESTO ESTABA EN UNA VERSIÓN ANTERIOR, PERO ES ERRÓNEO, VERDAD?. La plataforma de pago virtual dispone de protocolo de seguridad SSL (Secure Sockets Layer) para garantizar la integridad y confidencialidad de la información facilitada. [Nota: Confirmar]
                        {"\n"} {"\n"}
                        En el caso de optar por la plataforma de pagos Stripe, serás redireccionado al sistema de dicha plataforma, donde te serán solicitados los datos necesarios para recibir el pago siempre conforme a las condiciones de uso del servicio Stripe.
                        {"\n"} {"\n"}
                        Paso 3.- Confirmación propina.
                        {"\n"} {"\n"}
                        El Beneficiario recibirá un mensaje de la APP para pedir su confirmación de la suscripción y finalizar el proceso de alta, así como un mensaje para confirmar que efectivamente ha recibido la propina. Es imprescindible responder con otro mensaje con la palabra OK a este último mensaje a través de la misma APP. [Nota: Confirmar esta operativa, o explicar cómo funcionará] Si el Beneficiario no responde a este mensaje de confirmación, no habrá recibido propina alguna.
                        {"\n"} {"\n"}
                        Los datos de carácter personal que facilite el Beneficiario en el mensaje recibido serán incorporados a un fichero de TIPEAME con la finalidad de tramitar y gestionar su propina, así como mantenerle informado de futuras campañas de propias de la empresa por cualquier medio, en los términos previstos en la Política de Privacidad.
                        {"\n"} {"\n"}
                        En el caso de Beneficiarios que formen grupo (porque se hayan configurado como un equipo, por ejemplo, con todo el personal de un turno en un restaurante), TIPEAME declina toda responsabilidad sobre cómo se distribuyen las propinas entre los miembros del grupo.
                    </Text>
                    <Text style={styles.heading}>
                        2.2.2 Formas de pago
                    </Text>
                    <Text style={styles.para}>
                        Todos los medios de pago dispuestos por TIPEAME están sujetos a comprobaciones y autorizaciones por parte de las entidades emisoras del medio de pago (emisores de tarjeta y/o emisores de cuentas de pago), de forma que, si dichas entidades no autorizasen el pago, no podrá continuarse con el proceso de propina iniciado, quedando automáticamente cancelado el pedido y entendiéndose no realizada la propina.
                    </Text>
                    <Text style={styles.heading}>
                        2.3 Mecanismo de funcionamiento
                    </Text>
                    <Text style={styles.heading}>
                        2.3.1 Mecanismo para propinas (pagos en agradecimiento de servicios o bienes)
                    </Text>
                    <Text style={styles.para}>
                        Teniendo en consideración los impuestos de aplicación a las propinas y las comisiones de servicio, sobre la cantidad abonada en concepto de propina a los Beneficiarios, la APP carga una comisión del % más impuestos indirectos (IVA o IGIC) por el servicio que presta, además de hacer un descuento por la retención a cuenta del IRPF del Beneficiario. Por ejemplo, si se abona una propina de 5 euros, según las normas aplicables a la fecha de redacción de estos Términos, al Beneficiario le llegarán *** euros (la propina, menos la comisión de la pasarela de pago, menos el cargo por servicio de TIPPEAME, menos los impuestos indirectos (IVA o IGIC) sobre dicho servicio, menos un descuento en concepto de retención, que la APP entrega al empleador del Beneficiario para que el empleador lo ingrese en Hacienda a cuenta del IRPF del Beneficiario). Salvo que el Establecimiento nos indique otro porcentaje, el descuento que haremos en concepto de retención será del 15%. Tenlo en cuenta, porque la cantidad que el Usuario te diga que ha pagado como propina no va a llegarte íntegra como Beneficiario.

                        {"\n"} {"\n"}

                        [NOTA: Como hemos hablado, la factura del servicio de TIPEAME se emite al Beneficiario, que es el cliente para el cual se realiza la gestión de cobros]
                        {"\n"} {"\n"}
                        La APP no tiene ninguna obligación de practicar retenciones sobre las propinas, por lo que no asume responsabilidad sobre excesos o defectos en el importe que se descuenta, ni sobre su ingreso efectivo en Hacienda.
                        {"\n"} {"\n"}
                        También verás que los Usuarios pueden elegir que te llegue una propina concreta con una cantidad exacta. En tal caso, le cargaremos al Usuario una cantidad mayor para cubrir tanto nuestro cargo de servicio (más impuestos indirectos) como el descuento en concepto de que servirá para que el Establecimiento pueda realizar la retención fiscal. Te ponemos un ejemplo:
                        {"\n"} {"\n"}
                        La aplicación de los impuestos indirectos es compleja, de forma que se aplicará IVA o IGIC en función del lugar de localización de la prestación del servicio de la App.
                        {"\n"} {"\n"}
                        A continuación se exponen algunos ejemplos:
                        {"\n"} {"\n"}
                        App utilizada en el territorio de aplicación del IVA (Península y Baleares)
                        Opción 1: El Usuario da una propina de 5€ (sin especificar el importe que desea que le llegue al Beneficiario)
                        {"\n"} {"\n"}
                        Propina (cargo al Usuario): 5€
                        {"\n"} {"\n"}
                        Comisión Pasarela de Pago: 0,11€ (He asumido una comisión de Stripe de 2,19%).
                        {"\n"} {"\n"}
                        Comisión Tipeame (5%): 0,25€
                        {"\n"} {"\n"}
                        IVA sobre la comisión (21%): 0,05€
                        {"\n"} {"\n"}
                        Deducción en concepto de retención (15% sobre la Propina sin tener en cuenta la comisión de Tipeame ni el IVA: 0,69€
                        {"\n"} {"\n"}
                        Propina neta que recibe el Beneficiario: 3,90€
                        {"\n"} {"\n"}
                        Opción 2: El usuario elige que le llegue al Beneficiario una propina de 5€
                        {"\n"} {"\n"}
                        Propina (cargo al Usuario): 6,41€
                        {"\n"} {"\n"}
                        Comisión Pasarela de Pago: 0,14€
                        {"\n"} {"\n"}
                        Comisión Tipeame: 0,32€
                        {"\n"} {"\n"}
                        IVA sobre la comisión (21%): 0,07€
                        {"\n"} {"\n"}
                        Deducción en concepto de retención (15% sobre la Propina sin tener en cuenta la comisión de Tipeame ni el IVA: 0,88€
                        {"\n"} {"\n"}
                        Propina neta que recibe el Beneficiario: 5€
                        {"\n"} {"\n"}
                        App utilizada en las Islas Canarias
                        Opción 1: El Usuario da una propina de 5€ (sin especificar el importe que desea que le llegue al Beneficiario)
                        {"\n"} {"\n"}
                        Propina (cargo al Usuario): 5€
                        {"\n"} {"\n"}
                        Comisión Pasarela de Pago: 0,11€
                        {"\n"} {"\n"}
                        Comisión Tipeame: 0,25€
                        {"\n"} {"\n"}
                        IGIC sobre la comisión (7%): 0,02€
                        {"\n"} {"\n"}
                        Deducción en concepto de retención (15% sobre la Propina sin tener en cuenta la comisión de Tipeame ni el IGIC: 0,69€
                        {"\n"} {"\n"}
                        Propina neta que recibe el Beneficiario: 3,93€
                        {"\n"} {"\n"}
                        Opción 2: El usuario elige que le llegue al Beneficiario una propina de 5€
                        {"\n"} {"\n"}
                        Propina (cargo al Usuario): 6,36€
                        {"\n"} {"\n"}
                        Comisión Pasarela de Pago: 0,14€
                        {"\n"} {"\n"}
                        Comisión Tipeame: 0,32€
                        {"\n"} {"\n"}
                        IGIC sobre la comisión (7%): 0,02€
                        {"\n"} {"\n"}
                        Deducción en concepto de retención (15% sobre la Propina sin tener en cuenta la comisión de Tipeame ni el IGIC: 0,88€
                        {"\n"} {"\n"}
                        Propina neta que recibe el Beneficiario: 5€
                        {"\n"} {"\n"}
                        Desde que un Usuario pague una propina tardaremos [***] en hacerte llegar tu parte. Es responsabilidad de tu empresa el ingresar esa retención en Hacienda e incorporar en tu nómina las cantidades correspondientes.
                    </Text>
                    <Text style={styles.heading}>
                        2.3.2 Mecanismo para donaciones
                    </Text>
                    <Text style={styles.para}>
                        Las donaciones en España son ingresos sujetos al Impuesto sobre Sucesiones y Donaciones. La gestión del Impuesto de Sucesiones y Donaciones está cedida a las Comunidades Autónomas y su regulación varía de una a otra.
                        {"\n"} {"\n"}
                        Es obligación del Beneficiario confirmar el tratamiento fiscal de las donaciones que recibe y cumplir con las obligaciones tributarias que resulten de aplicación.
                        {"\n"} {"\n"}
                        La APP, no tiene responsabilidad algunapor los impuestos que corresponden a los Beneficiarios, a los Usuarios o a los Establecimientos.
                        {"\n"} {"\n"}
                        Ten en cuenta que, sobre la cantidad abonada por los Usuarios, la APP carga una comisión del [***]% más impuestos indirectos (IVA o IGIC) por el servicio que presta. Por ejemplo, si un Usuario dona 5 euros, según las normas aplicables a la fecha de redacción de estos Términos, te llegarán 4,39 euros (la propina menos la comisión menos el correspondiente IVA aplicable a la comisión). Tenlo en cuenta, porque la cantidad que el Usuario te diga que te ha dejado como donación no va a llegarte íntegra.
                    </Text>
                    <Text style={styles.heading}>
                        2.3.3 Mecanismo de aceptación
                    </Text>
                    <Text style={styles.para}>
                        Cada vez que algún Usuario quiera pagarte una propina o hacerte una donación, la APP te preguntará si quieres aceptarla. Al aceptar, estarás ratificando que el Método de Pago sigue siendo de tu titularidad, que sigues trabajando legalmente en España y que (si se trata de una propina para remunerar la entrega de bienes o un servicio) estás de alta en la Seguridad Social. Si, al proponerte la APP aceptar una propina, no eres titular de la cuenta bancaria, puedes solicitar cambio de cuenta bancaria a una qué sí te pertenezca. Si, al proponerte la APP aceptar una propina, no estás trabajando legalmente en España, debes rechazarla. Si, al proponerte la APP aceptar una propina no estás de alta en la Seguridad Social, debes rechazarla.
                    </Text>
                    <Text style={styles.heading}>
                        2.4 Derecho de desistimiento
                    </Text>
                    <Text style={styles.para}>
                        El Beneficiario, al recibir la donación en la cantidad considerada por el Usuario, podrá siempre que lo desee, renunciar a la donación efectuada a través de los pasos indicados en la APP de TIPEAME. [NOTA: ¿No sería mejor que el Beneficiario no pudiera echarse atrás una vez aceptada la propina?]
                        {"\n"} {"\n"}
                        A ver qué os parece esto: En el caso de que erróneamente hayas aceptado una propina o donación, excepcionalmente podemos considerar un reembolso al Usuario, en el caso de que se demuestre un uso fraudulento de tu dispositivo de Beneficiario, siempre que medie una denuncia oficial y que el medio de pago utilizado lo permita. En este caso, por favor, escribe a XXX@tipeame.com y analizaremos individualmente tu situación”. CAIO/MÍCHEL CONFIRMAR
                        {"\n"} {"\n"}
                        A ver qué os parece esto: En el caso de que erróneamente un Usuario haya ordenado una propina o donación, excepcionalmente podemos considerar un reembolso al Usuario, en el caso de que se demuestre un uso fraudulento de tu dispositivo de Beneficiario, siempre que medie una denuncia oficial y que el medio de pago utilizado lo permita. En este caso, por favor, escribe a XXX@tipeame.com y analizaremos individualmente tu situación. Esto podría suponer tener que deshacer la operación contigo como Beneficiario, todo lo cual te [consultaremos / comunicaremos] a través de la APP”. CAIO/MÍCHEL CONFIRMAR
                    </Text>
                    <Text style={styles.heading}>
                        2.4.1 Reembolso y cancelación de pagos confirmar si esto es relevante para los Beneficiarios
                    </Text>
                    <Text style={styles.para}>
                        Puede reembolsar las propinas realizadas en su cuenta, ya sea en su totalidad o en parte. Los reembolsos utilizan su saldo de Stripe disponible; esto no incluye ningún saldo pendiente. Si su saldo disponible no cubre el monto del reembolso, Stripe debita el monto restante de su cuenta bancaria.
                        {"\n"} {"\n"}
                        Si Stripe no puede debitar el monto restante de su cuenta bancaria, sus reembolsos pueden pasar a un estado pendiente hasta que agregue fondos a su saldo de Stripe. Puede ver una lista de todos sus reembolsos pendientes en el Panel de control.
                        {"\n"} {"\n"}
                        Enviamos solicitudes de reembolso al banco o emisor de la tarjeta de su Usuario. Su Usuario ve el reembolso como un crédito aproximadamente entre 5 y 10 días hábiles después, según el banco. Los reembolsos no se pueden cancelar una vez emitidos. Las disputas y las devoluciones de cargo no son posibles en los cargos de tarjetas de crédito que se reembolsan en su totalidad.
                    </Text>
                    <Text style={styles.heading}>
                        2.4.2 Destino de reembolso
                    </Text>
                    <Text style={styles.para}>
                        Los reembolsos se pueden devolver solo al método de pago original utilizado en un cargo. No es posible enviar un reembolso a un destino diferente (por ejemplo, otra tarjeta o cuenta bancaria).
                    </Text>
                    <Text style={styles.heading}>
                        2.5 Obligaciones del Beneficiario
                    </Text>
                    <Text style={styles.para}>
                        El Beneficiario se obliga a las siguientes condiciones:
                        {"\n"} {"\n"}
                        Facilitar información veraz sobre los datos facilitados en los formularios de registro de Beneficiario y a mantenerlos actualizados en todo momento.
                        {"\n"} {"\n"}
                        Si va a recibir propinas en agradecimiento de entrega de bienes o prestación de servicios, estar de alta en la Seguridad Social o en un régimen sustitutivo en España válido para realizar el trabajo por el que se le entrega la propina, disponer de los derechos para trabajar en España, incluyendo permiso de trabajo y residencia, si tal es el caso, y tener en vigor un contrato de trabajo o ser autónomo.
                        {"\n"} {"\n"}
                        Aceptar todas las disposiciones y condiciones legales recogidas en las presentes condiciones generales de contratación entendiendo que recogen la mejor voluntad de servicio posible para la actividad.
                        {"\n"} {"\n"}
                        Custodiar bajo su responsabilidad con seguridad sus claves y datos de acceso a la Plataforma (en adelante, conjuntamente “Claves”).
                        {"\n"} {"\n"}
                        No compartir sus Claves, puesto que dichas Claves le corresponden personal e intransferiblemente.
                        {"\n"} {"\n"}
                        Aplicar las medidas de seguridad y de actualización de sus Claves que se le pidan desde TIPEAME.
                        {"\n"} {"\n"}
                        Comunicar a TIPEAME todos los usos no autorizados de sus Claves y/o de su cuenta en la APP, de manera inmediata tan pronto como lo haya detectado.
                        {"\n"} {"\n"}
                        Utilizar la APP con los fines lícitos establecidos más arriba.
                        {"\n"} {"\n"}
                        2.6 Información posterior
                        {"\n"} {"\n"}
                        La empresa facilitará al Beneficiario la confirmación de este contrato celebrado en un soporte duradero y en un plazo razonable después de la celebración del contrato a distancia, a más tardar en el momento de entrega de los bienes o antes del inicio de la ejecución del servicio. El Beneficiario designa como soporte duradero la cuenta de correo electrónico que facilita al darse de alta en la APP.
                    </Text>
                    <Text style={styles.heading}>
                        2.7 Exoneración de responsabilidad
                    </Text>
                    <Text style={styles.heading}>
                        2.7.1 Funcionamiento
                    </Text>

                    <Text style={styles.para}>
                        El Beneficiario es responsable de contar con los servicios y equipos necesarios para la conexión a Internet y para acceder a la APP. En caso de cualquier incidencia o dificultad para acceder a la APP, el Beneficiario puede informarlo a TIPEAME a través del correo electrónico ***@***.com que procederá a analizar la incidencia y dará instrucciones al Beneficiario sobre cómo resolverla en el plazo más breve posible. Además, el Beneficiario asume toda responsabilidad derivada del uso propio de la APP, siendo el único responsable de todo efecto directo o indirecto que sobre dicha APP se derive, incluyendo todo resultado económico, técnico y/o jurídico adverso.
                        {"\n"} {"\n"}
                        TIPEAME se reserva el derecho a interrumpir el acceso a la APP en cualquier momento y sin previo aviso, ya sea por motivos técnicos, de seguridad, control, mantenimiento, por fallos de suministro eléctrico o cualquier otra causa.
                        {"\n"} {"\n"}
                        Los Beneficiarios son los únicos responsables de sus claves de identificación y acceso a los contenidos o servicios de TIPEAME. TIPEAME, no se hace responsable del uso indebido de las claves de acceso de los Beneficiarios para el acceso a los contenidos o servicios que los requieran y de las consecuencias derivadas de cualquier naturaleza del mal uso por los Beneficiarios, su pérdida u olvido, así como su uso indebido por terceros no autorizados.
                    </Text>
                    <Text style={styles.heading}>
                        2.7.2 Uso por el Beneficiario y contenidos del Beneficiario
                    </Text>

                    <Text style={styles.para}>
                        TIPEAME no puede asumir ni asume responsabilidad alguna sobre la correcta prestación de los servicios o la calidad de los productos que se le hayan suministrado al Usuario por los Establecimientos y/o por los Beneficiarios, ni sobre el régimen en el que los Beneficiarios se encuentran contratados por los respectivos Establecimientos o que los Beneficiarios se encuentren de alta con las correspondientes autoridades competentes. Estas cuestiones son responsabilidad de los Establecimientos en su relación con los Beneficiarios y/o de los Beneficiarios directamente, en su caso.
                        {"\n"} {"\n"}
                        Asimismo, TIPEAME no se hace responsable por la utilización que los Beneficiarios realicen del contenido de la APP que pueda suponer una violación de cualquier tipo de norma, nacional o internacional, de los derechos de propiedad industrial e intelectual o cualesquiera otros derechos de terceros.
                        {"\n"} {"\n"}
                        En la máxima medida que permite la ley aplicable, TIPEAME excluye cualquier responsabilidad por los daños y perjuicios de toda naturaleza que pudieran deberse a la utilización ilícita de la APP por parte de los Beneficiarios o que puedan deberse a la falta de veracidad, vigencia, y/o autenticidad de la información que los Beneficiarios proporcionan a otros Beneficiarios y en particular por los daños y perjuicios de toda naturaleza que puedan deberse a la suplantación de la personalidad de un tercero efectuada por un Usuario en cualquier clase de comunicación realizada a través de la APP.
                        {"\n"} {"\n"}
                        TIPEAME se reserva la facultad de limitar, total o parcialmente el acceso a la APP a determinados Beneficiarios, así como de cancelar, suspender, bloquear o eliminar determinado tipo de contenidos, mediante la utilización de instrumentos tecnológicos aptos al efecto, si tuviese conocimiento efectivo de que la actividad o la información almacenada es ilícita o que lesiona los bienes o derechos de un tercero o que es de carácter fraudulento.
                    </Text>
                    <Text style={styles.heading}>
                        2.8 Duración y extinción
                    </Text>

                    <Text style={styles.para}>
                        Las presentes condiciones tendrán un período de validez indefinido y serán aplicables a todas las transacciones comerciales realizadas a través de la APP de TIPEAME. TIPEAME se reserva el derecho a modificar unilateralmente dichas condiciones, sin que ello pueda afectar a las operaciones que fueron realizadas con carácter previo a la modificación.
                    </Text>
                    <Text style={styles.heading}>
                        2.8.1 Baja a iniciativa de los Beneficiarios
                    </Text>

                    <Text style={styles.para}>
                        Para darse de baja, el Beneficiario puede dirigirse en cualquier momento a la APP o a la WEB, en el apartado Configuración del perfil, eligiendo la opción de eliminar cuenta.
                        {"\n"} {"\n"}
                        En caso de que la opción anterior no estuviera habilitada o no funcionara por cualquier motivo, puede revocar también su consentimiento en cualquier momento remitiendo un correo con el asunto “Baja de Beneficiario” a ***@***.com, incluyendo en el cuerpo del correo electrónico el nombre de usuario y el correo electrónico utilizado al registrarse en la aplicación. La baja en la APP no afectará a las transacciones realizadas anteriormente.
                        {"\n"} {"\n"}
                        Solicitada la baja, se tramitará en un plazo de [PENDIENTE].
                    </Text>
                    <Text style={styles.heading}>
                        2.8.2 Baja a iniciativa de TIPEAME
                    </Text>

                    <Text style={styles.para}>
                        TIPEAME puede suspender o dar de baja a un Beneficiario (y por lo tanto optar por suspender o resolver la relación contractual) inmediatamente en caso de que el Beneficiario incumpla cualquier obligación estipulada por la APP, o haga un uso indebido de la APP, o uso para fines ilícitos o contrarios a la dignidad y los derechos humanos. Asimismo, puede suspender o finalizar los servicios inmediatamente en caso de que TIPEAME deje de prestar los servicios que ofrece a través de la APP, y en cualquier momento y sin necesidad de alegar causa alguna.
                        {"\n"} {"\n"}
                        El hecho de que se dé de baja a un Beneficiario o que el propio Beneficiario se dé de baja, implica la resolución contractual de los Términos de Servicio, si bien determinadas cláusulas pueden seguir desplegando efectos por razón de su naturaleza.
                        {"\n"} {"\n"}
                        En caso de resolución contractual, el Beneficiario se compromete a eliminar cualquier copia que tenga de la aplicación y a cesar en el empleo de la misma. Además, el acceso a la aplicación y todos sus contenidos serán desactivados y su contenido eliminado.
                    </Text>
                    <Text style={styles.heading}>
                        3. SEGURIDAD Y CONFIDENCIALIDAD
                    </Text>

                    <Text style={styles.para}>
                        TIPEAME garantiza la seguridad y confidencialidad de todas las comunicaciones con sus Beneficiarios.
                        {"\n"} {"\n"}
                        Todas las operaciones de propina on-line se realizan a través de un servidor seguro, basado en el estándar SSL que protege a los datos frente a los intentos de violación de terceros. Los datos del proceso de donación se guardan en una base de datos diseñada para tal finalidad. [confirmar]
                        {"\n"} {"\n"}
                        TIPEAME garantiza la protección y confidencialidad de los datos personales, domiciliarios, de pago y de cualquier otro tipo que nos proporcionen nuestros clientes en cumplimento del Reglamento General de Protección de Datos (Reglamento UE 2016/679) y su normativa de desarrollo (ver apartado “Política de Privacidad”). (enlace a la Política de Privacidad de la Web).
                    </Text>
                    <Text style={styles.heading}>
                        4. PROPIEDAD INTELECTUAL
                    </Text>

                    <Text style={styles.para}>
                        a) TIPEAME, por sí o como cesionaria, es la titular de los derechos de propiedad intelectual e industrial de los contenidos de los espacios en la red pública denominada Internet así como de todos los elementos contenidos de la APP móvil a través de la cual se procederá a realizar la donación (a título enunciativo: imágenes, sonido, audio, vídeo, software, marcas o logotipos, programas de ordenador necesarios para su funcionamiento, etc.).
                        {"\n"} {"\n"}
                        El Beneficiario se compromete a respetar dichos derechos.
                        {"\n"} {"\n"}
                        b) La utilización o la publicación, parcial o total, con fines comerciales o uso personal, de documentos, fotografías, películas, logotipos y elementos gráficos incluidos en ella por parte de terceros está estrictamente prohibida, salvo que estos tengan autorización previa de la TIPEAME. [Nota: Confirmar si los Beneficiarios van a poder utilizar imágenes de esta APP. En tal caso, cambiaríamos esta cláusula]
                        {"\n"} {"\n"}
                        c) Los encargados de sitios web que creen enlaces con este sitio deben informar a TIPEAME por correo electrónico a la siguiente dirección: ***@***.com
                        {"\n"} {"\n"}
                        La inclusión de dichas conexiones no implicará ningún tipo de asociación o participación con las entidades conectadas. TIPEAME se reserva el derecho a denegar dicho acceso en cualquier momento y no asume responsabilidad alguna en cuanto al contenido o uso que hagan de los datos de carácter personal.
                        {"\n"} {"\n"}
                        Los enlaces serán supervisados regularmente por la empresa. No obstante, en el caso de que cualquier Beneficiario o visitante entendiese que el contenido o los servicios prestados por las páginas enlazadas podrían ser ilícitos, vulnerar o lesionar bienes o derechos del propio Beneficiario o de un tercero, deberán comunicarlo a la dirección ***@***.com para que dé traslado al orden jurisdiccional competente.
                        {"\n"} {"\n"}
                        d) TIPEAME no será responsable, en caso alguno, de los daños y perjuicios de cualquier tipo que causen a terceros y se deriven de la falta de lectura de este aviso, o del incumplimiento de las obligaciones específicas para su uso que se establecen en las condiciones establecidas del mismo.
                    </Text>
                    <Text style={styles.heading}>
                        5. ACTUALIZACIÓN Y MODIFICACIÓN DE LA APP
                    </Text>

                    <Text style={styles.para}>
                        TIPEAME se reserva el derecho de modificar, en cualquier momento y sin previo aviso los presentes Términos de Servicio, la Política de Privacidad y la Política de Cookies para adaptarla a novedades legislativas o jurisprudenciales, por cambios en la configuración o por otras razones.
                        {"\n"} {"\n"}
                        En cualquier caso, la modificación de estos Términos de Servicio será notificada a los Beneficiarios.
                        {"\n"} {"\n"}
                        Los Beneficiarios deberán leer atentamente estos Términos de Servicio al acceder a la Plataforma. En cualquier caso, la aceptación de los Términos de Servicio será un paso previo e indispensable al acceso de los servicios y contenidos disponibles a través de la APP y/o WEB.
                        {"\n"} {"\n"}
                        Asimismo, TIPEAME se reserva la facultad de efectuar, en cualquier momento y sin necesidad de previo aviso, actualizaciones, modificaciones o eliminación de información contenida en su Plataforma en la configuración y presentación de ésta y de las condiciones de acceso, sin asumir responsabilidad alguna por ello.
                        {"\n"} {"\n"}
                        TIPEAME no garantiza la inexistencia de interrupciones o errores en el acceso de la Plataforma o a su contenido, ni que ésta se encuentre siempre actualizada, no obstante, TIPEAME llevará a cabo, siempre que no concurran causas que lo hagan imposible o de difícil ejecución, y tan pronto tenga noticia de los errores, desconexiones o falta de actualización en los contenidos, todas aquellas labores tendentes a subsanar los errores, restablecer la comunicación y actualizar los contenidos.
                    </Text>
                    <Text style={styles.heading}>
                        6. COMUNICACIÓN
                    </Text>

                    <Text style={styles.para}>
                        El Beneficiario confirma que el correo electrónico facilitado al operar con la APP le pertenece y que admite dicho correo electrónico como medio de comunicación válido entre el Beneficiario y TIPEAME, con los efectos legales que dicha comunicación haya de tener en cada momento.
                        {"\n"} {"\n"}
                        El Beneficiario, a través de la marcación de la casilla de aceptación, consiente la comunicación y el tratamiento de los datos a través de chatbots, siempre dentro de los límites estipulados en la legislación en cada momento vigente.
                    </Text>
                    <Text style={styles.heading}>
                        7. INDEPENDENCIA DE LAS CLÁUSULAS
                    </Text>

                    <Text style={styles.para}>
                        Si cualquiera de las cláusulas de los presentes Términos de Servicio fuera nula de pleno derecho o anulable, se tendrá por no puesta. Dicha declaración de nulidad no invalidará el resto del Contrato, que mantendrá su vigencia y eficacia entre las partes.
                    </Text>
                    <Text style={styles.heading}>
                        8. LEY APLICABLE Y JURISDICCIÓN COMPETENTE
                    </Text>

                    <Text style={styles.para}>
                        La relación entre TIPEAME y el Beneficiario se regirá e interpretará de conformidad con los Términos de Servicio que en materia de interpretación, validez y ejecución se regirán por la legislación española. Cualquier controversia se someterá a los juzgados y tribunales de Santa Cruz de Tenerife salvo que el Beneficiario solicite los tribunales de su domicilio de residencia.
                    </Text>
                </ScrollView>
                <View style={styles.footer}>
                    <TouchableOpacity
                        style={styles.btnSelect}
                        activeOpacity={0.8}
                        onPress={onCancel}>
                        <Text style={styles.btnSelectText}>
                            Cancelar
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btnNormal}
                        activeOpacity={0.8}
                        onPress={onAccept}>
                        <Text style={styles.btnTextNormal}>
                        Aceptar
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default TermAndCond

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    header: {
        height: 65,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerText: {
        fontFamily: "bold",
        color: Colors.TEXT_INFO,
        fontSize: 22,
        textAlign: 'center'
    },
    innerContainer: {
        flex: 1
    },
    scrollViewStyle: {
        padding: 15,
        marginBottom: 50,

    },
    heading: {
        fontFamily: "bold",
        color: Colors.TEXT_INFO,
        fontSize: 17,
        marginVertical: 10
    },
    para: {
        fontFamily: "normal",
        color: Colors.TEXT_INFO,
        fontSize: 15,
    },
    footer: {
        width: '100%',
        backgroundColor: 'white',
        bottom: 0,
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingVertical:10
    },
    btnNormal: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: Colors.BTN_DEFAULT_BG,
    },
    btnSelect: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        // backgroundColor: Colors.BTN_DEFAULT_BG,
        borderRadius: 10
    },
    btnSelectText: {
        fontFamily: "normal",
        color: Colors.TEXT_INFO,
        fontSize: 16,
        borderBottomColor: Colors.BTN_DEFAULT_BG,
        borderBottomWidth: 2,
    },
    btnTextNormal: {
        fontFamily: "normal",
        color: 'white',
        fontSize: 16,
    }
})