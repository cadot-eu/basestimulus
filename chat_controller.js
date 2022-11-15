//stimulus qui renvoie de l'html donné par une url par ajax.

import { Controller } from '@hotwired/stimulus';
export default class extends Controller {
    /* -------------------------------------------------------------------------- */
    /*                              variable and use                              */
    /* -------------------------------------------------------------------------- */
    static values = {
        token: String,
        reponse: String,
        question: String,
        bonjour: String
    }
    static targets = ["destination", "message", "case", "bulle", "boutonshow", "boutonhide"]
    /* -------------------------------------------------------------------------- */
    /*                                    code                                    */
    /* -------------------------------------------------------------------------- */
    connect() {
        if (localStorage.getItem('chatbox') == 'hide')
            this.hide();
        else {
            this.show();
            this.seek()
            this.startRefreshing()
        }
    }

    startRefreshing() {
        setInterval(() => {
            this.seek();
        }, 5000)
    }


    async seek() {
        //on récupère la reponse
        const response = await fetch(`/chatGetMessages/${this.tokenValue}/`)
        let retour = '';
        const data = JSON.parse(await response.text())
        if (data.length == 0)
            retour += this.reponseValue.replace("REPONSE", this.bonjourValue).replace("DATE", 'Je suis en actuellement en ligne.')
        data.forEach(e => {
            if (e.type == 'réponse')
                retour += this.reponseValue.replace("REPONSE", e.texte).replace("DATE", e.date);
            else
                retour += this.questionValue.replace("QUESTION", e.texte).replace("DATE", e.date);
        });
        this.destinationTarget.innerHTML = retour;
    }

    async send() {
        //on récupère la reponse
        try {
            const response = await fetch(`/chatSend/${this.tokenValue}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: this.messageTarget.value,
                    type: "question"
                })
            })

        } catch (error) {
            console.log(error)
        }
        this.messageTarget.value = '';
        this.seek();
    }

    show() {
        localStorage.setItem('chatbox', "show");
        this.caseTarget.classList.remove('visually-hidden')
        this.bulleTarget.classList.add('visually-hidden')
        this.boutonshowTarget.classList.add('visually-hidden')
        this.boutonhideTarget.classList.remove('visually-hidden')

    }
    hide() {
        localStorage.setItem('chatbox', "hide");
        this.caseTarget.classList.add('visually-hidden')
        this.bulleTarget.classList.remove('visually-hidden')
        this.boutonshowTarget.classList.remove('visually-hidden')
        this.boutonhideTarget.classList.add('visually-hidden')
    }


}
