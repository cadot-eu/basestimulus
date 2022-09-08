import { Controller } from '@hotwired/stimulus'

export default class extends Controller {

    /* -------------------------------------------------------------------------- */
    /*                                  variable                                  */
    /* -------------------------------------------------------------------------- */

    static values = {
        entitie: String,
        fields: String,
        affichage: String,
        champs: String,
        copy: String,
        copyurl: String,
        id: {
            type: String, default: 'id'
        }
        ,
        limit: { type: String, default: '10' }
    }
    connect() {
        let that = this;
        var toolbarfixed = document.createElement('div')
        toolbarfixed.classList.add('SelectAndCopyform', 'row')
        document.body.classList.add('pb-5')
        // label
        var label = document.createElement('label')
        label.innerText = 'Recherche'
        label.classList.add('col-sm-10', 'col-form-label')
        toolbarfixed.appendChild(label)
        //input
        var input = document.createElement('div')
        input.classList.add('col-sm-10')
        var inputsearch = document.createElement('input')
        input.setAttribute('type', 'text')
        input.appendChild(inputsearch)
        toolbarfixed.appendChild(input)
        //select
        var select = document.createElement('select')
        select.style.display = 'none'
        select.setAttribute('size', this.limitValue)
        toolbarfixed.appendChild(select)
        select.addEventListener('change', function (e) {
            console.log(this.value)

        })
        toolbarfixed.appendChild(select)
        //Titre
        var titre = document.createElement('h3')
        titre.innerText = 'Recherche'
        titre.classList.add('col-sm-12')
        toolbarfixed.appendChild(titre)
        //toolbar
        toolbarfixed.classList.add('mt-5', 'fixed-top', 'w-25', 'me-auto')
        document.getElementsByTagName('form')[0].appendChild(toolbarfixed)
        input.addEventListener('input', function (e) {
            //suppression des anciennes valeurs
            for (var i = 0; i < select.querySelectorAll('option').length; i++) {
                select.remove(i);
            }
            // $entitie, $champs, $recherche, $affichage, $copy, $limit
            $.ajax({
                url: '/Admin/SelectAndCopy/' + that.entitieValue + '/' + that.champsValue + '/' + e.target.value + '/' + that.affichageValue + '/' + that.copyValue + '/' + that.limitValue,
                dataType: "json",
                type: "Post",
                async: true,
                data: {},
                success: function (data) {
                    //ajout des valeurs
                    for (var i = 0; i <= data.length - 1; i++) {
                        var opt = document.createElement('option');
                        opt.value = data[i]['copy'].toString();
                        opt.innerHTML = data[i]['affichage'];
                        opt.classList.add('clipboard')
                        opt.setAttribute('data-clipboard-text', that.copyurlValue + data[i]['copy'].toString())
                        select.appendChild(opt);
                    }
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
        })

        // var sub = document.createElement('button')
        // sub.type = "submit"
        // sub.classList.add('btn', 'btn-primary', 'mt-5', 'fixed-top', 'w-25', 'me-auto')
        // sub.textContent = "Select"
        // document.getElementsByTagName('form')[0].appendChild(sub)





    }

    disconnect() {

    }
}





