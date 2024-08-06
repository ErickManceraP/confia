$(document).ready(function() {
    load(1);
});

/*
    -> REGISTRO DE NUEVAS CUENTAS DE AHORRO CLIENTES
*/

$("#gestion-nuevos-usuarios").submit(function(event) {
    // VARIABLES GLOBALES -> CAMPOS DE FORMULARIO
    var $CodigoUnicoUsuarios = $('#val-usuariounico').val(); // NUMERO DE CUENTA AHORRO CLIENTES
    var $ContraseniaUsuarios = $('#val-password1').val(); // MONTO DE APERTURA CUENTA AHORRO CLIENTES 
    // VALIDACION DE CAMPOS VACIOS
    if($CodigoUnicoUsuarios === "") {
        AlertaUsuarioMostrar("Campo Incompleto", "Debe ingresar su código de usuario único", "warning");
        return false;
    }
    if($ContraseniaUsuarios === "") {
        AlertaUsuarioMostrar("Campo Incompleto", "Por favor ingrese su nueva contraseña", "warning");
        return false;
    }
    if($ContraseniaUsuarios.length < 9) {
        AlertaUsuarioMostrar("Advertencia", "Su contraseña debe contener al menos 8 carácteres", "warning");
        return false;
    }else{
        //$('#registronuevascuentas').attr("disabled", true);
        var parametros = $(this).serialize(); // TODOS LOS CAMPOS DEL FORMULARIO
        $.ajax({
            type: "POST",
            url: "../controlador/cGestionesCashman.php?cashmanhagestion=envio-datos-gestiones-nuevos-usuarios-registrados",
            data: parametros,
            // MENSAJE DE ESPERA -> PREVIO A CONFIRMACION / RECHAZO DE PETICION
            beforeSend: function(objeto) {
                $("#resultados_ajax").html('<div class="alert alert-light solid alert-dismissible fade show"><img style="width: 30px;" class="img-fluid" src="../vista/images/Hourglass.gif"><strong>¡Procesando Informaci&oacute;n!</strong> Espere un momento...</div>');
            },
            success: function(datos) {
                // SI LA PETICION ES RECHAZADA, MOSTRAR MENSAJE DE ERROR
                if(datos=="false"){
                    setTimeout(function () {
                        $("#resultados_ajax").html("<div class='alert alert-danger solid alert-dismissible fade show'><svg viewBox='0 0 24 24' width='24' height='24' stroke='currentColor' stroke-width='2' fill='none' stroke-linecap='round' stroke-linejoin='round' class='mr-2'><polygon points='7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2'></polygon><line x1='15' y1='9' x2='9' y2='15'></line><line x1='9' y1='9' x2='15' y2='15'></line></svg><strong>¡Lo Sentimos!</strong> Ha ocurrido un error al momento de procesar la información. Por favor verifica que cumplas con todas las condiciones. <button type='button' class='close h-100' data-dismiss='alert' aria-label='Close'><span><i class='mdi mdi-close'></i></span></button></div>");
                    }, 3000);  
                // SI LA PETICION ES ACEPTADA, MOSTRAR MENSAJE DE CONFIRMACION DE PETICION EXITOSA
                }else if(datos=="true"){
                    setTimeout(function () {
                        $("#resultados_ajax").html("<div class='alert alert-success solid alert-dismissible fade show'><svg viewBox='0 0 24 24' width='24' height='24' stroke='currentColor' stroke-width='2' fill='none' stroke-linecap='round' stroke-linejoin='round' class='mr-2'><polyline points='9 11 12 14 22 4'></polyline><path d='M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11'></path></svg><strong>Registro Exitoso!</strong> Por seguridad deberás iniciar sesión de nuevo... <button type='button' class='close h-100' data-dismiss='alert' aria-label='Close'><span><i class='mdi mdi-close'></i></span></button></div>");
                    }, 3000);  
                }
                // SI LA PETICION ES RECHAZADA, MOSTRAR MENSAJE DE ERROR -> MENSAJE FLOTANTE
                if(datos=="false"){
                    setTimeout(function () {
                        AlertaUsuarioToastr_ErrorRegistro("Lo sentimos, no podemos completar su solicitud de registro", "Error de Registro");
                    }, 3000);
                // SI LA PETICION ES ACEPTADA, MOSTRAR MENSAJE DE CONFIRMACION DE PETICION EXITOSA -> MENSAJE FLOTANTE
                }else if(datos=="true"){
                    setTimeout(function () {
                        AlertaUsuarioToastr_RegistroExitoso("Perfecto, los datos se actualizaron con éxito", "Registro Exitoso");
                    }, 3000);
                    // REINICIAR CAMPOS DE FORMULARIO
                    document.getElementById("gestion-nuevos-usuarios").reset();
                    setTimeout(function () {
                        location.href = "../controlador/cIniciosSesionesUsuarios.php?cashmanha=cerrarsesion";
                    }, 5500);
                }
                $('#enviodatosnuevosusuarios').attr("disabled", false);
                 // 1.5 SEGUNDOS DE RETRASO PARA MOSTRAR ALERTA Y REDIRECCIONAR
                load(1);
            }
        });
        event.preventDefault();
    }
});

// FUNCION PARA MOSTRAR ALERTAS A USUARIOS -> SWEETALERT
function AlertaUsuarioMostrar(titulo, descripcion, icono) {
    Swal.fire(
        titulo, // ENCABEZADO 
        descripcion, // CUERPO
        icono // ICONO DE ALERTA
        );
}

// FUNCIONES PARA MOSTRAR ALERTAS A USUARIOS -> TOASTR
// ERROR DE ENVIO
function AlertaUsuarioToastr_ErrorRegistro(titulo, descripcion) {
    toastr.error(titulo, descripcion, {
        positionClass: "toast-top-right",
        timeOut: 5e3,
        closeButton: !0,
        debug: !1,
        newestOnTop: !0,
        progressBar: !0,
        preventDuplicates: !0,
        onclick: null,
        showDuration: "300",
        hideDuration: "600",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
        tapToDismiss: !1
    })
}
// REGISTRO EXITOSO
function AlertaUsuarioToastr_RegistroExitoso(titulo, descripcion) {
toastr.success(titulo, descripcion, {
    positionClass: "toast-top-right",
    timeOut: 5e3,
    closeButton: !0,
    debug: !1,
    newestOnTop: !0,
    progressBar: !0,
    preventDuplicates: !0,
    onclick: null,
    showDuration: "300",
    hideDuration: "600",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
    tapToDismiss: !1
})
}
