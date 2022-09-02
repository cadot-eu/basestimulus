import { Controller } from '@hotwired/stimulus'

export default class extends Controller {

    /* -------------------------------------------------------------------------- */
    /*                                  variable                                  */
    /* -------------------------------------------------------------------------- */

    static values = {
        entitie: String,
        affichage: String,
        id: {
            type: String, default: 'id'
        }
    }
    connect() {
        $.ajax({
            url: '/Admin/SelectAndCopy/' + this.entitieValue + '/' + this.affichageValue + '/' + this.idValue + '/5',
            dataType: "json",
            type: "Post",
            async: true,
            data: {},
            success: function (data) {
                var toolbarfixed = document.createElement('div')
                toolbarfixed.classList.add('SelectAndCopy')
                document.body.appendChild(toolbarfixed)
                document.body.classList.add('pb-5')
                var sub = document.createElement('button')
                sub.type = "submit"
                sub.classList.add('btn', 'btn-primary', 'mt-5', 'fixed-top', 'w-25', 'me-auto')
                sub.textContent = "Select"
                document.getElementsByTagName('form')[0].appendChild(sub)
            },
            error: function (xhr, exception) {
                var msg = "";
                if (xhr.status === 0) {
                    msg = "Not connect.\n Verify Network." + xhr.responseText;
                } else if (xhr.status == 404) {
                    msg = "Requested page not found. [404]" + xhr.responseText;
                } else if (xhr.status == 500) {
                    msg = "Internal Server Error [500]." + xhr.responseText;
                } else if (exception === "parsererror") {
                    msg = "Requested JSON parse failed.";
                } else if (exception === "timeout") {
                    msg = "Time out error." + xhr.responseText;
                } else if (exception === "abort") {
                    msg = "Ajax request aborted.";
                } else {
                    msg = "Error:" + xhr.status + " " + xhr.responseText;
                }

            }
        });



    }

    disconnect() {

    }
}





