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
        var navbartools = document.getElementById('menutools');
        //creation du li
        var li = document.createElement('li');
        li.classList.add('nav-item', 'input-group');
        //span
        var inputspan = document.createElement('span');
        inputspan.classList.add('input-group-text');
        inputspan.innerText = 'Recherche';
        li.appendChild(inputspan);
        //input
        var inputsearch = document.createElement('input')
        inputsearch.setAttribute('type', 'text')
        inputsearch.classList.add('form-control')
        inputsearch.placeholder = 'Recherche d\'articles'
        li.appendChild(inputsearch)
        navbartools.appendChild(li)
        //_____________select
        //creation du modal
        document.body.insertAdjacentHTML('beforeend', makeModal());
        var select = document.createElement('select');
        select.classList.add('form-control');
        select.setAttribute('size', 20)
        document.getElementById('modal-body').appendChild(select);
        select.addEventListener('click', function (e) {
            document.getElementById('modal').style.display = 'none'
        })
        //toolbar
        inputsearch.addEventListener('input', function (e) {
            select.style.display = 'block'
            //suppression des anciennes valeurs
            for (var i = 0; i < select.querySelectorAll('option').length; i++) {
                select.remove(i);
            }
            // $entitie, $champs, $recherche, $affichage, $copy, $limit
            $.ajax({
                url: '/admin/SelectAndCopy/' + that.entitieValue + '/' + that.champsValue + '/' + e.target.value + '/' + that.affichageValue + '/' + that.copyValue + '/' + that.limitValue,
                dataType: "json",
                type: "Post",
                async: true,
                data: {},
                success: function (data) {
                    document.getElementById('modal').style.display = 'block'
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

function makeModal() {
    return `<div class="modal " tabindex="-1" id="modal" style="display: none;width: 50%;max-height: 50%;margin-left: 25%;overflow:visible;" >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Recherche</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onclick="this.parentNode.parentNode.parentNode.parentNode.style.display = 'none'"></button>
        </div>
        <div class="modal-body" id="modal-body">
        </div>
        <div class="modal-footer">
         <p>Cliquer sur un titre d'article pour le copier dans le presse papier</p>
        </div>
      </div>
    </div>
  </div>`;
}



