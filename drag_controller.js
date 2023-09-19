//controller de confimation d'action
import { Controller } from '@hotwired/stimulus'
import Swal from 'sweetalert2'
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
const notyf = new Notyf();

import Sortable from 'sortable-draggable-js/minified.js';
import { ajax } from 'jquery';

export default class extends Controller {
    static values = {
        query: { default: 'div', type: String },
        entity: String
    }

    connect() {
        const entity = this.entityValue
        this.element.querySelectorAll(this.queryValue).forEach((item) => {
            const sortable = new Sortable(item, {
                itemClass: 'drag-item', // class applies to every sortable element
                draggingClass: 'drag-dragging', // class will apply when dragging start
                disabledClass: 'drag-disabled', // class will apply if sorting is disable
                zoom: 1, // it is viewport zoom value (if have css zoom property)
                containers: 'drag-container', // comma seperated appendable boxes classes
                fallBackElement: item.classList.contains('fallback') // it is not sortable, it just append this fallback html
                    ? `<div class="fallback-element">
                       <span>I am fallback</span>
                       </div>`
                    : null,
                fallBackClone: false, // if will drop a clone of fallback element
                onStart: (details) => {
                    // it will trigger when you start sorting
                    console.log('start:' + details);
                },
                onDrop: (details) => {
                    // it will trigger after dropped even it is sorted or not
                    console.log('drop:' + details);
                },
                onSort: (details) => {
                    //on lance le change sur l'entity
                    const input = (details.startedFrom.element.querySelector('input'))
                    const label = (details.startedFrom.element.querySelector('label'))
                    const url = '/admin/changeordre/' + entity + '/' + label.innerText + '/' + details.endedOn.index;
                    console.log(url);
                    //on lance un ajax et on vérifie que l'on a true et on affiche un message sinon on on affiche une erreur
                    ajax({
                        url: url,
                        method: 'get',
                        success: (data) => {
                            //notyf.success('ordre enregistré');
                            //on réactualise la page
                            window.location.reload();
                        },
                        error: (data) => {
                            Swal.fire({
                                icon: 'error',
                                title: 'Erreur',
                                text: data
                            })
                        }

                    })
                }
            });
        });
    }
}

