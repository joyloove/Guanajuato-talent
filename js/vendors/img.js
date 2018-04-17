var fichero = document.getElementById('fichero');
fichero.addEventListener("change", subirImagen, false);

var storageRef = firebase.storage().ref().child("imagenes"); // hace referencia a la raiz imagenes de storage
var imagenesRef = firebase.database().ref().child("imagenesFM"); //referencia a la base de firebase

mostrarImagen();

/* ++++++++++++ Funcion para mostrar imagen ++++++++ */
function mostrarImagen() {
    imagenesRef.on("value", function (snapshot) {
        var datos = snapshot.val();
        var result = "";
        for (var key in datos) {
            result += '<img width="250" class="img-thumbnail" src ="' + datos[key].url + '"/>';
        }
        document.getElementById('img-firebase').innerHTML = result;
    })
}


/* ++++++++++++ Funcion para subir imagen ++++++++ */

function subirImagen() {
    var imagenSubir = fichero.files[0]; // aqui se selecciona las imagenes
    var uploadTask = storageRef.child('imagenes/' + imagenSubir.name).put(imagenSubir); //sube la imagen


    uploadTask.on('state_changed',
        function (snapshot) {

            /*--- se muestra el progreso de la sbida de la imagen ---*/
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        },
        function (error) {
            // gestiona el error
        },
        function () {
            //cuando se sube la imagen exitosamente
            var downloadURL = uploadTask.snapshot.downloadURL;
            createNodoEnFirebase(imagenSubir.name, downloadURL);
        });
}
/* ++++++++++++ Funcion para agregar a la Base de Firebase ++++++++ */
function createNodoEnFirebase(nombreImagen, downloadURL) {
    imagenesRef.push({
        nombre: nombreImagen,
        url: downloadURL
    });
}