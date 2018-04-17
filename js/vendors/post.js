var tableDates = firebase.database().ref('chat');
var tableImages = firebase.database().ref('Imagenes');

tableDates.on('value', function (snapshot) { // leer la base de datos
    $(".chat").html(""); //Limpiamos todo el contenido del chat o registro
    snapshot.forEach(function (e) {
        var objeto = e.val(); //asignar todos los valores a un objeto

        //validar datos nulos y agregar contenido en forma de lista etiqueta <li>
        if ((objeto.Mensaje != null) && (objeto.Nombre != null)) {
            //Copia el contenido al template y luego lo inserta al contenedor de HTML
            $('#plantilla').clone().prependTo('.chat');
            $('.chat #plantilla').show(10);
            $('.chat #plantilla .nombre').html(objeto.Nombre);
            $('.chat #plantilla .mensaje').html(objeto.Mensaje);
            $('.chat #plantilla .tiempo').html(objeto.Fecha);
            $('.chat #plantilla').attr("id", "");
        }
    });
})

var name = prompt("Ingresa tu NiCkNaMe:"); // Ingresa nombre elusuario
$('#btnEnviar').click(function () {
    var formatoFecha = new Date();
    var day = formatoFecha.getUTCDate();
    var month = formatoFecha.getMonth();
    var year = formatoFecha.getFullYear();
    var hour = formatoFecha.getHours();
    var min = formatoFecha.getMinutes();

    fecha = day + "/" + month + "/" + year + " " + hour + ":" + min;

    /* ++++++++++++ Agrega informacion del usuario a la BD +++++++++++++++ */
    tableDates.push({
        Nombre: name,
        Mensaje: $('#mensaje').val(),
        Fecha: fecha
    });

})

$('#upload-file-selector').change(function () {
    if (this.file && this.file[0]) {
        var archivo = new FileReader();
        archivo.onload = function (e) {
            tableImages.push({
                urlLarge: e.target.result,
            });
            $('#img').attr('src');
        };
        archivo.readAsDataURL(this.files[0]);
    }
})