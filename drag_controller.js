//controller de confimation d'action
import { Controller } from '@hotwired/stimulus'
import Swal from 'sweetalert2'
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
const notyf = new Notyf();

// Complete SortableJS (with all plugins)
import Sortable from 'sortablejs/modular/sortable.complete.esm.js';

let num;
export default class extends Controller {
    static values = {
        query: { default: 'div', type: String },
        queryid: { default: '', type: String }, //défini le queryselector à aller chercher et l'attribut à prendre ex:input.id, si pas défini prend la valeur de data-id
        entity: String,
        ajax: { default: true, type: Boolean }, //pour envoyer ou pas l'ajax
        champ: { default: "", type: String }

    }

    connect() {
        let queryid = this.queryidValue
        const entity = this.entityValue
        const ajax = this.ajaxValue
        const query = this.queryValue
        const champ = this.champValue
        var sortable = new Sortable(this.element, {
            draggable: this.queryValue,  // Specifies which items inside the element should be draggable
            setData: function (/** DataTransfer */dataTransfer, /** HTMLElement*/dragEl) {
                dataTransfer.setData('Text', dragEl.textContent); // `dataTransfer` object of HTML5 DragEvent
            },
            onSort: function (/**Event*/evt) {
                if (queryid != "") {
                    //on regarde si on a un point dans le query comme input.value, value retourne l'attribut
                    let query = evt.item.querySelector(queryid.split(".")[0]);
                    num = query.getAttribute(queryid.split(".")[1]);

                }
                else
                    num = evt.item.getAttribute('data-id');
                let url = '/admin/changeordre/' + entity + '/' + num + '/' + evt.newIndex;
                if (champ != "") url += '/' + champ
                if (ajax) {
                    //on lance un ajax et on vérifie que l'on a true et on affiche un message sinon on on affiche une erreur
                    fetch(url)
                        .then(response => {
                            notyf.success('L\'ordre a bien été modifié');
                        })
                        .catch(error => {
                            Swal.fire({
                                icon: 'error',
                                title: 'Erreur',
                                text: error
                            })
                            return null;
                        });
                }
                //on ajoute ou modifie le data-order
                let ordrehidden;
                let counter = 0;
                document.querySelectorAll(query).forEach(element => {
                    ordrehidden = element.querySelector('input[type="hidden"][id*="_ordre"]');
                    if (ordrehidden) {
                        ordrehidden.value = counter;
                    }
                    counter++
                });
            },
        });

    }
}

