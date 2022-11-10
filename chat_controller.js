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
    static targets = ["destination", "message"]
    /* -------------------------------------------------------------------------- */
    /*                                    code                                    */
    /* -------------------------------------------------------------------------- */
    connect() {
        this.seek()
        this.startRefreshing()
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
            retour += this.reponseValue.replace("REPONSE", this.bonjourValue)
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

}
