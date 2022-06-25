import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
    static values = {
        valeurs: String
    }

    connect() {
        const proto = this.element.getAttribute('data-prototype')
        const data = JSON.parse(this.valeursValue)
        this.element.querySelectorAll('input[type=file]').forEach((element, key) => {
            if (element.accept == 'image/*') {
                const img = document.createElement("img");
                img.src = '/' + data[key]
                img.setAttribute('data-controller', 'base--bigpicture')
                img.width = 64;
                element.after(img)
            }
            else
                element.after(data[key].split('¤')[0].split('/').at(-1))
            element.setAttribute('exurl', '/' + data[key])
        });
    }



}