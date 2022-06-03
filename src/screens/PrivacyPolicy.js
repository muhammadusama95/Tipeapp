import React, { useCallback } from 'react'
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    Alert,
    BackHandler
} from 'react-native'
import Colors from '../constants/Colors'
import { useFocusEffect } from '@react-navigation/native';

const PrivacyPolicy = ({ navigation }) => {
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

    const onAccept = () => navigation.replace("Signup")

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
                    POLÍTICA DE PRIVACIDAD
                </Text>
            </View>
            <View style={styles.innerContainer}>
                <ScrollView
                    style={styles.scrollViewStyle}>
                    <Text style={styles.heading}>
                        INTRODUCCIÓN
                    </Text>
                    <Text style={styles.para}>
                        La presente Política de Privacidad será de aplicación a los usuarios (en adelante, los “Usuarios” e, individualmente, el “Usuario”) de la página web o de la aplicación móvil (en adelante, indistintamente, la «Plataforma«) que TIPEAME, S.L. (“TIPEAME”), pone a su disposición para la prestación de los servicios ofrecidos a los Usuarios a través de la Plataforma en cada momento (en adelante, los «Servicios«).
                        {"\n"} {"\n"}
                        En particular, cada vez que el Usuario acceda a la Plataforma, facilite a TIPEAME, o sea necesario que ésta acceda a cualquier tipo de información que por sus características nos permita identificarle, ya sea para navegar por la WEB o hacer uso de la APP, contratar o hacer uso de nuestros Servicios, o entablar relaciones comerciales o profesionales con TIPEAME, le será de aplicación al Usuario esta Política de Privacidad, junto con las condiciones generales y términos de servicio alojados en la Plataforma, y otros documentos referenciados en los anteriores, vigentes en cada momento.
                        {"\n"} {"\n"}
                        Esta Política de Privacidad podrá ser objeto de modificación. Por favor, léela periódicamente, pues resultará aplicable aquélla que se encuentre alojada en la Plataforma en cada momento. Si en ella se introdujeran cambios significativos, lo notificaremos al Usuario a través de alguno de los medios disponibles, en función de los datos que nos haya facilitado. En todo caso, si el Usuario hace uso del Servicio tras haber tenido lugar una actualización, consideraremos que acepta la política actualizada.
                        {"\n"} {"\n"}
                        Los términos en mayúscula no expresamente definidos en esta Política de Privacidad tendrán el significado previsto en las condiciones generales y términos de servicio aplicables a los Servicios en cada momento.
                    </Text>
                    <Text style={styles.heading}>
                        RESPONSABLE DEL TRATAMIENTO
                    </Text>
                    <Text style={styles.para}>
                        El responsable del tratamiento de datos es:
                        {"\n"} {"\n"}
                        TIPEAME, S.L.
                        {"\n"} {"\n"}
                        Domicilio: Avenida Bruselas, 14 – Centro Comercial The Duke Shops, Local 25 PS1, Adeje (Santa Cruz de Tenerife).
                        {"\n"} {"\n"}
                        N.I.F.: […].
                        {"\n"} {"\n"}
                        Inscrita en el Registro Mercantil de […].
                        {"\n"} {"\n"}
                        Puedes ponerte en contacto con nosotros para consultarnos cualquier aspecto relativo a esta Política de Privacidad dirigiéndote a nuestra dirección postal o enviando un correo electrónico a […].
                    </Text>
                    <Text style={styles.heading}>
                        FINALIDAD DEL TRATAMIENTO DE LOS DATOS
                    </Text>
                    <Text style={styles.para}>
                        A continuación, se informa al Usuario de las finalidades del tratamiento a que van a ser sometidos sus datos personales:
                        {"\n"} {"\n"}
                        1. Gestionar tu registro y permitirte acceder como Usuario de la Plataforma.
                        {"\n"} {"\n"}
                        2. Prestar los Servicios a los Usuarios.
                        {"\n"} {"\n"}
                        3. Gestionar la relación comercial con los Usuarios derivada de la contratación y uso de los Servicios.
                        {"\n"} {"\n"}
                        4. Liquidar y facturar los importes que corresponda en ejecución de los Servicios.
                        {"\n"} {"\n"}
                        5. Prestar soporte a los Usuarios, con la finalidad de mejorar la experiencia del Usuario en la recepción de los Servicios.
                        {"\n"} {"\n"}
                        6. Intermediar en los pagos y cobros que se produzcan entre los Usuarios en la ejecución y desarrollo de los Servicios.
                        {"\n"} {"\n"}
                        7. Informar a los Usuarios de las operaciones realizadas en la ejecución y desarrollo de los Servicios.
                        {"\n"} {"\n"}
                        8. Enviar comunicaciones informativas a los Usuarios relativas a los Servicios prestados o a cuestiones técnicas de la Plataforma;
                        {"\n"} {"\n"}
                        9. Enviar comunicaciones comerciales y de marketing al Usuario sobre TIPEAME y su negocio, o de terceros colaboradores con TIPEAME en la prestación de los Servicios.
                        {"\n"} {"\n"}
                        10. Cumplir con todas las obligaciones legales que afectan a TIPEAME.
                    </Text>
                    <Text style={styles.heading}>
                        DATOS TRATADOS Y FUENTES DE LAS QUE PROCEDEN
                    </Text>
                    <Text style={styles.para}>
                        Los datos que TIPEAME trata como consecuencia de las interacciones realizadas por el Usuario provienen de las siguientes fuentes:
                        {"\n"} {"\n"}
                        1. Datos proporcionados por el Usuario.
                        {"\n"} {"\n"}
                        2. Datos generados como consecuencia del desarrollo, gestión y mantenimiento de la relación contractual entablada entre el Usuario y TIPEAME.
                        {"\n"} {"\n"}
                        TIPEAME podrá tratar datos personales de las siguientes tipologías:
                        {"\n"} {"\n"}
                        1. Datos identificativos necesarios para la prestación de los Servicios y el envío de comunicaciones informativas relacionadas con éstos, o para el cumplimiento de las obligaciones legales de TIPEAME (nombre y apellidos, edad y/o fecha de nacimiento, número de documento de identidad, dirección de correo electrónico, dirección postal, número de teléfono, nombre de usuario, contraseña, [puesto de trabajo, empleador,] etc., según el caso).
                        {"\n"} {"\n"}
                        2. Imagen de los Usuarios (fotografía facilitada, en su caso, por el propio Usuario para una más fácil identificación del Usuario en el uso de la Plataforma);
                        {"\n"} {"\n"}
                        3. Datos financieros y transaccionales (por ejemplo, información acerca de las operaciones que has realizado en la Plataforma).
                        {"\n"} {"\n"}
                        En otros casos, podemos obtener información de forma pasiva al utilizar herramientas de rastreo, como las cookies de los navegadores u otras tecnologías similares de nuestra Plataforma o de las comunicaciones que te enviamos. Para más información puedes consultar nuestra Política de Cookies.
                        {"\n"} {"\n"}
                        Cuando los datos personales sean recabados a través de un formulario puesto a disposición del Usuario a través de la Plataforma u otros canales habilitados, será necesario que el Usuario aporte, al menos, aquellos datos marcados con un asterisco (*) o cuya obligatoriedad se indique de cualquier otra forma. La no aportación por parte del Usuario de todos los datos que se identifican como obligatorios puede impedir la contratación de todos o alguno de los Servicios o el disfrute de alguna de las prestaciones de la Plataforma.
                    </Text>
                    <Text style={styles.heading}>
                        LEGITIMACIÓN DEL TRATAMIENTO DE LOS DATOS
                    </Text>
                    <Text style={styles.para}>
                        TIPEAME trata los datos de carácter personal facilitados por el Usuario de acuerdo con las siguientes bases legitimadoras, en función de la tipología de datos tratados.
                        {"\n"} {"\n"}
                        Con carácter general, y salvo que otra cosa se establezca expresamente a continuación, la base legal del tratamiento de los datos personales del Usuario se encuentra en el desarrollo y ejecución de la relación contractual entre el Usuario y TIPEAME.
                        {"\n"} {"\n"}
                        En los casos en que el tratamiento de los datos tiene como finalidad cumplir con las obligaciones legales que vinculan a TIPEAME, la base legal del tratamiento es que éste es necesario para cumplir con una obligación legal de TIPEAME. Ejemplos de ello son la fecha de nacimiento del Usuario (con la finalidad de asegurar que éste tiene la edad mínima establecida legalmente), o el número de documento de identidad (con la finalidad de emitir las facturas que legal y contractualmente correspondan).
                        {"\n"} {"\n"}
                        Por su parte, el tratamiento que se refiere al envío, por cualquier medio, de comunicaciones comerciales y de marketing al Usuario sobre TIPEAME y su negocio o de terceros colaboradores con TIPEAME en la prestación de los Servicios, está basado en el consentimiento, que podrá ser revocado por el Usuario en cualquier momento.
                    </Text>
                    <Text style={styles.heading}>
                        PERIODO DE CONSERVACIÓN DE LOS DATOS
                    </Text>
                    <Text style={styles.para}>
                        TIPEAME conservará tus datos personales durante el tiempo necesario para la prestación del servicio solicitado o para alcanzar la finalidad de tratamiento perseguida. Posteriormente, sus datos serán conservados durante los plazos legales que en cada caso resulten de aplicación, teniendo en cuenta la tipología de datos, así como la finalidad del tratamiento.
                        {"\n"} {"\n"}
                        Los datos tratados para la gestión de tu registro y para permitirte acceder como Usuario en la Plataforma serán tratados durante el tiempo en que mantengas la condición de Usuario registrado (es decir, hasta que decidas darte de baja de la Plataforma).
                        {"\n"} {"\n"}
                        Los datos tratados para la prestación de los Servicios a los Usuarios, la gestión de la relación comercial, la información a los Usuarios de las operaciones realizadas en la ejecución de los Servicios, la liquidación y facturación de los importes que corresponda en ejecución de los Servicios, o la prestación de soporte a los Usuarios, serán tratados durante el tiempo necesario para la ejecución y gestión posterior de los Servicios que hayas adquirido, incluyendo las prestaciones post-venta y las posibles reclamaciones asociadas a la prestación del Servicio.
                        {"\n"} {"\n"}
                        Los datos tratados para poder enviarte comunicaciones comerciales y de marketing lo serán hasta que te des de baja o revoques tu consentimiento a este tipo de tratamiento. Si participas en acciones promocionales conservaremos tus datos por un plazo de [seis (6) meses] desde que finalice la acción.
                        {"\n"} {"\n"}
                        Si en algún momento deseas darte de baja en la Plataforma, podrás hacerlo a través de ésta mediante tu cuenta de usuario en TIPEAME, o dirigiéndote a nosotros en la forma descrita en la sección 10 posterior.
                        {"\n"} {"\n"}
                        Independientemente de que tratemos tus datos durante el tiempo estrictamente necesario para cumplir con la finalidad correspondiente, los conservaremos posteriormente debidamente guardados y protegidos durante el tiempo en que pudieran surgir responsabilidades derivadas del tratamiento, en cumplimiento con la normativa vigente en cada momento. Una vez prescriban las posibles acciones en cada caso, procederemos a la supresión de los datos personales.
                    </Text>
                    <Text style={styles.heading}>
                        DESTINATARIOS Y CESIÓN DE DATOS A TERCEROS
                    </Text>
                    <Text style={styles.para}>
                        Para cumplir las finalidades indicadas en la presente Política de Privacidad, es necesario que demos acceso a tus datos personales a terceros que prestan apoyo a TIPEA en los Servicios que te ofrecemos, incluyendo:
                        {"\n"} {"\n"}
                        1. entidades financieras,
                        {"\n"} {"\n"}
                        2. proveedores de servicios tecnológicos y de soporte al Usuario,
                        {"\n"} {"\n"}
                        3. proveedores y colaboradores de servicios relacionados con marketing y publicidad,
                        {"\n"} {"\n"}
                        4. otros proveedores que sean necesarios para la prestación de los Servicios ofrecidos por TIPEAME, o
                        {"\n"} {"\n"}
                        5. plataformas de procesamiento de pagos.
                        {"\n"} {"\n"}
                        Como plataforma de procesamiento de pagos, TIPEAME tiene vigente un acuerdo con STRIPE PAYMENTS EUROPE LTD (“STRIPE”), sociedad irlandesa, con domicilio social en C/O A&L Goodbody, IFSC, North Wall Quay, Dublin 1, en virtud del cual STRIPE actúa como proveedor de servicios de pago necesarios para la prestación de los Servicios por TIPEAME. En virtud de ello, TIPEAME cederá a STRIPE los datos personales de los Usuarios necesarios con el fin de que ésta pueda procesar los pagos.
                        {"\n"} {"\n"}
                        Para la ejecución de los pagos, STRIPE necesita utilizar ciertos datos financieros de los Usuarios (datos de su tarjeta de débito o crédito o de su cuenta Apple Pay o Google Pay, o datos de su cuenta bancaria, información fiscal actual u otros datos de carácter personal) para poder verificar su identidad, prestarle los servicios de pago y cumplir la legislación vigente (entre otras, las normas de prevención de blanqueo de capitales).
                        {"\n"} {"\n"}
                        TIPEAME no tiene acceso ni tratará los datos financieros que el Usuario proporcione a STRIPE. Su tratamiento y seguridad se regirán por la política de privacidad de STRIPE, que te recomendamos consultes a través de su web o aplicación.
                        {"\n"} {"\n"}
                        Por otra parte, con la finalidad de ejecutar los Servicios, TIPEAME comunicará a los Usuarios que quieran enviar un pago a un Beneficiario, únicamente el nombre de usuario del destinatario del pago. Esa comunicación se realizará bien al facilitar el nombre de Usuario y […], bien al escanear el código QR que el propio Beneficiario ofrecerá al Usuario pagador para que éste pueda efectuar el pago, según el caso.
                        {"\n"} {"\n"}
                        Si el Usuario pagador ha otorgado su consentimiento previo, y en tanto éste no haya sido revocado, TIPEAME comunicará al Beneficiario el nombre de usuario del Usuario pagador una vez efectuado el pago.
                        {"\n"} {"\n"}
                        TIPEAME únicamente comunicará tus datos cuando sea necesario para el desarrollo, cumplimiento y control de la relación contractual establecida con el Usuario de los Servicios, así como para el cumplimiento de obligaciones legalmente establecidas. Cualquier otra comunicación o cesión de datos a terceros se realizará previa obtención del consentimiento explícito del interesado.
                        {"\n"} {"\n"}
                        El tratamiento de los datos se realiza, en todo caso, por prestadores de servicios ubicados dentro del Espacio Económico Europeo o en países que han sido declarados con un nivel adecuado de protección. Si en el futuro realizáramos, por eficiencia del servicio, transferencias de datos personales a prestadores de servicios situados fuera de ese ámbito territorial, te informaríamos y utilizaríamos las garantías adecuadas para mantener en todo momento la seguridad de tus datos, conforme a lo exigido legalmente.
                    </Text>
                    <Text style={styles.heading}>
                        GARANTÍA DE LOS DATOS APORTADOS
                    </Text>
                    <Text style={styles.para}>
                        El Usuario declara y garantiza que los datos que aporte son verdaderos, exactos, completos y se encuentran actualizados, siendo aquél responsable de cualquier daño o perjuicio, directo o indirecto, que pudiera ocasionarse a TIPEAME o a terceros como consecuencia de la falsedad o inexactitud incumplimiento de tal declaración. El Usuario se compromete y obliga a comunicar de forma inmediata a TIPEAME cualquier modificación de sus datos introducidos en la Plataforma a fin de que la información de que disponga TIPEAME esté en todo momento actualizada y no contenga errores.
                    </Text>
                    <Text style={styles.heading}>
                        MEDIDAS ADOPTADAS PARA PROTEGER TUS DATOS
                    </Text>
                    <Text style={styles.para}>
                        Con el fin de garantizar la seguridad y confidencialidad de los datos, TIPEAME se compromete a tratar de forma absolutamente confidencial los datos de carácter personal del Usuario, haciendo uso de los mismos exclusivamente para las finalidades indicadas en esta Política.
                        {"\n"} {"\n"}
                        TIPEAME ha adoptado las medidas adecuadas en materia de protección de datos y tiene implantadas las medidas necesarias que protejan los derechos y libertades de los interesados, y eviten su alteración, pérdida, tratamiento o acceso no autorizado, habida cuenta del estado de la técnica, los costes de aplicación, la naturaleza, el alcance, el contexto y los fines del tratamiento.
                    </Text>
                    <Text style={styles.heading}>
                        DERECHOS SOBRE SUS DATOS PERSONALES
                    </Text>
                    <Text style={styles.para}>
                        En materia de protección de datos, el Usuario tiene los siguientes derechos:
                        {"\n"} {"\n"}
                        1. Derecho de acceso a sus datos personales para saber cuáles están siendo objeto de tratamiento y las operaciones de tratamiento llevadas a cabo con ellos, así como a solicitar una copia de los mismos.
                        {"\n"} {"\n"}
                        2. Derecho de rectificación de cualquier dato personal inexacto.
                        {"\n"} {"\n"}
                        3. Derecho de supresión de sus datos personales, en la medida en que ya no sean necesarios para la finalidad para la que TIPEAME los venía tratando conforme a esta Política de Privacidad, o en la medida en que TIPEAME no se encuentre legitimada para hacerlo.
                        {"\n"} {"\n"}
                        4. Derecho a solicitar, en determinadas circunstancias legalmente previstas, la limitación del tratamiento de sus datos personales.
                        {"\n"} {"\n"}
                        5. Derecho a la oposición al tratamiento de datos personales, en los casos legalmente previstos.
                        {"\n"} {"\n"}
                        6. Derecho a la portabilidad de los datos personales, cuando la legitimación de TIPEAME para el tratamiento de sus datos sea el consentimiento del Usuario o la ejecución del contrato, según se ha indicado en esta Política de Privacidad.
                        {"\n"} {"\n"}
                        7. Derecho a no ser objeto de decisiones basadas únicamente en el tratamiento automatizado de sus datos, cuando proceda.
                        {"\n"} {"\n"}
                        8. Cualquier otro derecho legalmente reconocido en materia de protección de datos.
                        {"\n"} {"\n"}
                        Si nos has proporcionado tu consentimiento para el tratamiento de tus datos para cualquier finalidad, también tienes derecho a retirarlo en cualquier momento. La retirada del consentimiento no afectará a la licitud del tratamiento basada en el consentimiento previo a su retirada.
                        {"\n"} {"\n"}
                        Para el ejercicio de cualquiera de estos derechos el Usuario o su representante legal o voluntario, según el caso, podrá dirigirse a TIPEAME a través de los siguientes canales:
                        {"\n"} {"\n"}
                        1. Mediante la remisión de un escrito al domicilio de TIPEAME indicado en la sección 2 anterior, o,
                        {"\n"} {"\n"}
                        2. Mediante correo electrónico a la dirección de correo electrónico indicada en la sección 2 anterior.
                        {"\n"} {"\n"}
                        En ambos casos deberá indicarse la referencia “Protección de Datos”, debiendo acompañar una copia de DNI, NIE, Pasaporte o documento equivalente, por las dos caras con el fin de acreditar la identidad del Usuario. En tu comunicación deberás indicar el motivo de tu solicitud y el derecho que quieres ejercitar.
                        {"\n"} {"\n"}
                        TIPEAME te informa, asimismo, de tu derecho a presentar reclamación, cuando proceda, ante la Autoridad de Control competente en materia de protección de datos, que en España es la Agencia Española de Protección de Datos.
                    </Text>
                    <Text style={styles.heading}>
                        INFORMACIÓN SOBRE COOKIES
                    </Text>
                    <Text style={styles.para}>
                        Utilizamos cookies y dispositivos similares para facilitar tu navegación en la Plataforma, y conocer cómo interactúas con TIPEAME. Por favor, lee nuestra Política de Cookies para conocer con mayor detalle las cookies y dispositivos similares que usamos, su finalidad y cómo gestionar tus preferencias, así como otra información de interés.
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

export default PrivacyPolicy

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
        fontSize: 20,
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