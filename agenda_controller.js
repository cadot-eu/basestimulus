//exemple d'utilisation
//pas obligé de mettre header ni initialview car il y a des valeurs par défaut
//<div data-controller="base--agenda" data-base--agenda-header-value='{ "left": "prev,next today", "center": "title", "right": "dayGridMonth,timeGridWeek,listWeek"}' data-base--agenda-initialview-value="dayGridMonth"></div>


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
export default class extends Controller {

    static values = {
        header: Object,
        initialview: String
    }
    static targets = ["cible"]
    async connect() {
        const header = this.headerValue
        const initvue = this.initialviewValue
        calendar = new Calendar(this.cibleTarget, {
            locales: allLocales,
            locale: 'fr',
            plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
            initialView: initvue,
            headerToolbar: header,
            dateClick: function (info) {
                // change the day's background color just for fun
                info.dayEl.style.backgroundColor = 'red';
            }

        });
        calendar.render();
    }
    suivant(e) {
        //afficher le mois suivant dans le calendrier
        calendar.next()
    }

}
