//controller de confimation d'action
import { Controller } from '@hotwired/stimulus'
import Swal from 'sweetalert2'
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
const notyf = new Notyf();

// Complete SortableJS (with all plugins)
import Sortable from 'sortablejs/modular/sortable.complete.esm.js';
import { ajax } from 'jquery';

export default class extends Controller {
    static values = {
        query: { default: 'div', type: String },
        entity: String
    }

    connect() {
        const entity = this.entityValue
        var sortable = new Sortable(this.element, {
            draggable: this.queryValue,  // Specifies which items inside the element should be draggable

            setData: function (/** DataTransfer */dataTransfer, /** HTMLElement*/dragEl) {
                dataTransfer.setData('Text', dragEl.textContent); // `dataTransfer` object of HTML5 DragEvent
            },
            // Element dragging ended
            onEnd: function (/**Event*/evt) {
                var itemEl = evt.item;  // dragged HTMLElement
                evt.to;    // target list
                evt.from;  // previous list
                evt.oldIndex;  // element's old index within old parent
                evt.newIndex;  // element's new index within new parent
                evt.oldDraggableIndex; // element's old index within old parent, only counting draggable elements
                evt.newDraggableIndex; // element's new index within new parent, only counting draggable elements
                evt.clone // the clone element
                evt.pullMode;  // when item is in another sortable: `"clone"` if cloning, `true` if moving
            },

            // Called by any change to the list (add / update / remove)
            onSort: function (/**Event*/evt) {
                const url = '/admin/changeordre/' + entity + '/' + evt.item.getAttribute('data-num') + '/' + evt.newIndex;
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

            },
        });

    }
}

