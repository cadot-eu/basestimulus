// Code: base.hover_controller
//permet de cacher un element au survol d'un autre
// par défaut c'est l'élément à cacher est dans le l'élément survoler
// sinon l'élément à cacher est dans le document
// la clsse à cacher ou affciher est d-none par défaut
//exemple

{/*
 <div class="swiper-slide" data-controller="base--hover" data-base--hover-query-value=".card">
<div class="swiper-lazy d-flex align-items-end img-bg" data-background="{{ asset(partenaire.photo)|imagine_filter('bandeaufixe') }}">
<p class="h4 text-white text-center m-2">
    {{ partenaire.nom }}
</p>
<div class="card d-none">
    <div class="card-header"> 
*/}

import { Controller } from '@hotwired/stimulus'
import { useHover } from 'stimulus-use'

export default class extends Controller {
    /* -------------------------------------------------------------------------- */
    /*                              variable and uses                             */
    /* -------------------------------------------------------------------------- */
    static values = {
        class: { type: String, default: "d-none" },
        query: { type: String, default: "" },//donne la cible
        internal: { type: Boolean, default: true },//dis si la cible est dans le controller
        loop: String
    }

    connect() {
        if (this.queryValue) {
            if (this.internalValue) this.cible = this.element.querySelector(this.queryValue)
            else
                this.cible = document.querySelector(this.queryValue)
        }
        else this.cible = this.element
        useHover(this, { element: this.element });
    }


    mouseEnter() {
        this.cible.classList.remove(this.classValue)
    }

    mouseLeave() {
        this.cible.classList.add(this.classValue)
    }
}