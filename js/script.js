let startTime;
let intervalId;
$(document).ready(function() {
    $("#cargarImagenBtn").click(function() {
        $("#tiempo").text("0.000s");
        // Realizar la solicitud AJAX para obtener la imagen
        $.ajax({
            url: "assets/imagen.png",
            method: "GET",
            async: true,
            xhrFields: {
                responseType: "blob"
            },
            beforeSend: function() {
                startTime = new Date().getTime();
                intervalId = setInterval(actualizarCronometro, 1); 
            },
            success: function(response) {
                // Detener el cronómetro al cargar la imagen
                clearInterval(intervalId);
                let url = URL.createObjectURL(response);
                $("#imagenContainer").html(`<img src="${url}" alt="Imagen" />`);
            },
            error: function() {
                clearInterval(intervalId);
            }
        });
    });
});

function actualizarCronometro() {
    let currentTime = new Date().getTime();
    let elapsedTime = (currentTime - startTime) / 1000;
    $("#tiempo").text(`${elapsedTime.toFixed(3)} s`);
}