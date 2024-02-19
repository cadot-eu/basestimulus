//exemple d'utilisation
//pas obligé de mettre header ni initialview car il y a des valeurs par défaut
//<div data-controller="base--agenda" data-base--agenda-header-value='{ "left": "prev,next today", "center": "title", "right": "dayGridMonth,timeGridWeek,listWeek"}' data-base--agenda-initialview-value="dayGridMonth"></div>

//<div data-controller="base--agenda" data-base--agenda-target="cible"></div>


import { Controller } from '@hotwired/stimulus'
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import bootstrap5Plugin from '@fullcalendar/bootstrap5'
import allLocales from '@fullcalendar/core/locales-all';
import interactionPlugin from '@fullcalendar/interaction';

// import bootstrap stylesheets directly from your JS
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css' // needs additional webpack config!



/* -------------------------------------------------------------------------- */
/*                                  variables                                 */
/* -------------------------------------------------------------------------- */
// data-chart-data-value=...
let calendar;
/* stimulusFetch: 'lazy' */
export default class extends Controller {

    static values = {
        header: Object,
        initialview: String,
        events: Array
    }
    static targets = ["cible"]
    async connect() {
        const header = this.headerValue
        const initvue = this.initialviewValue
        const events = this.eventsValue
        calendar = new Calendar(this.cibleTarget, {
            locales: allLocales,
            events: events,
            locale: 'fr',
            plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
            initialView: initvue,
            headerToolbar: header,
            dateClick: function (info) {
                // change the day's background color just for fun
                //  info.dayEl.style.backgroundColor = 'red';
            }
            ,
            eventClick: function (info) {
                //on ouvre un modal pour modifier l'évent
                //on récupère l'id de l'évent
                let id = info.event.id
                let title = info.event.title == "null" ? '' : info.event.title
                console.log(title)
                let start = info.event.start
                let end = info.event.end == null ? info.event.start : info.event.end
                let startDate = start ? start.toLocaleDateString('fr', { year: 'numeric', month: '2-digit', day: '2-digit' }) : '';
                let dateParts = startDate.split('/');
                let formattedStartDate = dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0];
                let startTime = start.toLocaleTimeString('fr', { hour: '2-digit', minute: '2-digit' })
                let endDate = end.toLocaleDateString('fr');
                let endParts = endDate.split('/');
                let formattedEndDate = endParts[2] + '-' + endParts[1] + '-' + endParts[0];
                let endTime = end.toLocaleTimeString('fr', { hour: '2-digit', minute: '2-digit' });

                //on créé un code html pour l'afficher
                //on ajoute un form
                let form = document.createElement('form')
                form.setAttribute('method', 'post')
                form.classList.add('form')
                form.setAttribute('data-turbo', false)

                let modal = document.createElement('div')
                modal.classList.add('modal')
                modal.classList.add('fade')
                modal.setAttribute('id', 'modal')
                modal.setAttribute('tabindex', '-1')
                modal.setAttribute('aria-labelledby', 'exampleModalLabel')
                modal.setAttribute('aria-hidden', 'true')
                let modalDialog = document.createElement('div')
                modalDialog.classList.add('modal-dialog')
                let modalContent = document.createElement('div')
                modalContent.classList.add('modal-content')
                let modalHeader = document.createElement('div')
                modalHeader.classList.add('modal-header')
                let modalTitle = document.createElement('h5')
                modalTitle.classList.add('modal-title')
                modalTitle.innerText = title
                let modalBody = document.createElement('div')
                modalBody.classList.add('modal-body')
                let champid = document.createElement('input')
                champid.setAttribute('type', 'hidden')
                champid.name = 'id'
                champid.value = id
                modalBody.appendChild(champid)
                let champdatestart = document.createElement('input')
                champdatestart.setAttribute('type', 'date')
                champdatestart.name = 'datestart'
                champdatestart.value = formattedStartDate
                champdatestart.classList.add('form-control')
                modalBody.appendChild(champdatestart)
                let champheurestart = document.createElement('input')
                champheurestart.setAttribute('type', 'time')
                champheurestart.name = 'heurestart'
                champheurestart.value = startTime
                champheurestart.classList.add('form-control')
                modalBody.appendChild(champheurestart)
                let champdateend = document.createElement('input')
                champdateend.setAttribute('type', 'date')
                champdateend.name = 'dateend'
                champdateend.value = formattedEndDate
                champdateend.classList.add('form-control')
                modalBody.appendChild(champdateend)
                let champheureend = document.createElement('input')
                champheureend.setAttribute('type', 'time')
                champheureend.name = 'heureend'
                champheureend.value = endTime
                champheureend.classList.add('form-control')
                modalBody.appendChild(champheureend)
                let champdescription = document.createElement('input')
                champdescription.setAttribute('type', 'text')
                champdescription.name = 'description'
                champdescription.value = title
                champdescription.classList.add('form-control')
                modalBody.appendChild(champdescription)
                let modalFooter = document.createElement('div')
                modalFooter.classList.add('modal-footer')
                let modalButton = document.createElement('button')
                modalButton.setAttribute('type', 'submit')
                modalButton.classList.add('btn')
                modalButton.classList.add('btn-primary')
                modalButton.innerText = 'Mettre à jour'
                modalButton.setAttribute('data-bs-dismiss', 'modal')
                modalButton.setAttribute('aria-label', 'Close')
                modalButton.addEventListener('click', function (e) {
                    modal.style.display = 'none'
                })
                let ButtonSupprimer = document.createElement('button')
                ButtonSupprimer.classList.add('btn')
                ButtonSupprimer.classList.add('btn-danger')
                ButtonSupprimer.innerText = 'Supprimer'
                ButtonSupprimer.name = 'supprimer'
                modalFooter.appendChild(ButtonSupprimer)

                let ButtonClose = document.createElement('button')
                ButtonClose.classList.add('btn')
                ButtonClose.classList.add('btn-secondary')
                ButtonClose.innerText = 'Fermer'
                modalFooter.appendChild(modalButton)
                modalFooter.appendChild(ButtonClose)
                modalHeader.appendChild(modalTitle)
                modalContent.appendChild(modalHeader)
                modalContent.appendChild(modalBody)
                modalContent.appendChild(modalFooter)
                modalDialog.appendChild(modalContent)
                modal.appendChild(modalDialog)
                form.appendChild(modal)
                //on affiche le modal
                modal.style.display = 'block'
                modal.classList.add('show')
                modal.setAttribute('aria-modal', 'true')
                modal.setAttribute('role', 'dialog')
                modal.addEventListener('click', function (e) {
                    if (e.target.classList.contains('modal')) {
                        modal.style.display = 'none'
                    }
                })
                ButtonClose.addEventListener('click', function (e) {
                    modal.style.display = 'none'
                }
                )
                document.body.append(form)





            }


        });
        calendar.render();
    }
    suivant(e) {
        //afficher le mois suivant dans le calendrier
        calendar.next()
    }

}
