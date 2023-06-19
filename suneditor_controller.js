import { Controller } from '@hotwired/stimulus'
import suneditor from 'suneditor'
import plugins from 'suneditor/src/plugins'
import fr from 'suneditor/src/lang/fr.js'
import CharPlugins from "../../js/suneditor/characteres_plugins.js";
const { filetemplates } = require('/assets/jssite/suneditor/templates.js').default;
let templates = JSON.parse(filetemplates);
/* ---------------- transformation des textareas en fckeditor --------------- */

export default class extends Controller {

    /* -------------------------------------------------------------------------- */
    /*                                  variable                                  */
    /* -------------------------------------------------------------------------- */
    // for choice template of toolbar

    static values = {
        toolbar: String,
        upload: { type: String, default: 'simpleimage' }
    }


    connect() {
        /* ----------------------------- initialistaion ----------------------------- */
        const e = this.element;
        let editor;

        /* -------------------------- création des plugins -------------------------- */

        /* ------------------------- initialisation globale ------------------------- */
        const init = suneditor.init({
            lang: fr,
            height: 600,
            iframeCSSFileName: "/build/app.css",
            plugins: { ...plugins, CharPlugins },
            imageUploadUrl: "/simplegallery/" + this.uploadValue,
            imageUploadSizeLimit: "30000000",
            imageUploadHeader: null,
            imageAccept: ".jpg, .png, .jpeg, .gif, .bmp, .webp",
            templates: templates,
        })

        /* ------------------------ les différentes tollbars ------------------------ */
        if (this.toolbarValue == 'full')
            editor = init.create(this.element.id)
        else if (this.toolbarValue == 'simplelanguage')
            editor = init.create(this.element.id,
                {
                    height: '2rem',
                    buttonList: [
                        ['undo', 'redo', 'textStyle'],
                        ['removeFormat'],
                    ]
                },

            )
        else if (this.toolbarValue == 'normal') {
            editor = init.create(this.element.id,
                {
                    buttonList: [
                        ['undo', 'redo', 'codeView'],
                        ['formatBlock', 'textStyle'],
                        ['paragraphStyle', 'blockquote', {
                            name: 'CharPlugins',
                            dataCommand: 'CharPlugins',
                            buttonClass: '',
                            title: 'Charactères spéciaux',
                            dataDisplay: 'submenu',
                            innerHTML: '<i class="bi bi-translate"></i>',
                        }],

                        ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                        ['removeFormat'],
                        // '/', // Line break
                        ['outdent', 'indent'],
                        ['align', 'horizontalRule', 'list', 'lineHeight'],
                        ['table', 'link', 'image', 'video', 'audio' /** ,'math' */], // You must add the 'katex' library at options to use the 'math' plugin.
                        /** ['imageGallery'] */ // You must add the "imageGalleryUrl".
                        ['fullScreen'],//, 'codeView', 'showBlocks'],//, 'showBlocks', 'codeView'
                        ['template'],//'preview',
                        /** ['dir', 'dir_ltr', 'dir_rtl'] */ // "dir": Toggle text direction, "dir_ltr": Right to Left, "dir_rtl": Left to Right
                    ],
                    formats: ['p', 'div', 'blockquote', 'pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', {
                        tag: 'div', // Tag name
                        name: 'page_break' || null, // default: tag name
                        command: 'replace' || 'range' || 'free', // default: "replace"
                        class: '__se__format__replace_page_break' || '__se__format__range_page_break' || '__se__format__free_page_break' || '__se__format__free__closure_page_break',
                        style: 'page-break-after: always;' || null
                    }]
                }

            )
            //<div class="page-break"

            let emt = this.element
            editor.onChange = function (contents, core) {
                emt.value = contents
                //add class at table
                let tables = document.querySelectorAll('table')
                tables.forEach(table => {
                    table.classList.add('table', 'table-striped', 'table-bordered', 'align-middle', 'text-center')
                }
                )
                let figures = document.querySelectorAll('figure')
            }





        }
        else if (this.toolbarValue == 'annonce') {
            editor = init.create(this.element.id,
                {
                    buttonList: [
                        ['undo', 'redo',],
                        ['formatBlock', 'textStyle'],
                        ['paragraphStyle', 'blockquote', {
                            name: 'CharPlugins',
                            dataCommand: 'CharPlugins',
                            buttonClass: '',
                            title: 'Charactères spéciaux',
                            dataDisplay: 'submenu',
                            innerHTML: '<i class="bi bi-translate"></i>',
                        }],

                        ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                        ['removeFormat'],
                        // '/', // Line break
                        ['outdent', 'indent'],
                        ['align', 'horizontalRule', 'list', 'lineHeight'],
                        ['table', 'link', 'image', 'video', 'audio' /** ,'math' */], // You must add the 'katex' library at options to use the 'math' plugin.
                        /** ['imageGallery'] */ // You must add the "imageGalleryUrl".
                        ['fullScreen'],//, 'codeView', 'showBlocks'],//, 'showBlocks', 'codeView'
                        //['template'],//'preview',
                        /** ['dir', 'dir_ltr', 'dir_rtl'] */ // "dir": Toggle text direction, "dir_ltr": Right to Left, "dir_rtl": Left to Right
                    ],
                    formats: ['p', 'div', 'blockquote', 'pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', {
                        tag: 'div', // Tag name
                        name: 'page_break' || null, // default: tag name
                        command: 'replace' || 'range' || 'free', // default: "replace"
                        class: '__se__format__replace_page_break' || '__se__format__range_page_break' || '__se__format__free_page_break' || '__se__format__free__closure_page_break',
                        style: 'page-break-after: always;' || null
                    }]
                }

            )
            //<div class="page-break"

            let emt = this.element
            editor.onChange = function (contents, core) {
                emt.value = contents
                //add class at table
                let tables = document.querySelectorAll('table')
                tables.forEach(table => {
                    table.classList.add('table', 'table-striped', 'table-bordered', 'align-middle', 'text-center')
                }
                )
                let figures = document.querySelectorAll('figure')
            }




        }
        else if (this.toolbarValue == 'simple')
            editor = suneditor.create(this.element.id,
                {
                    buttonList: [
                        ['undo', 'redo', 'textStyle'],
                        ['removeFormat'],
                    ]
                }

            )
        else if (this.toolbarValue == 'string') { // on ne crée pas d'éditor, on laisse le textarea
        }
        else
            editor = suneditor.create(this.element.id,
                {
                    buttonList: [
                        ['undo', 'redo', 'removeFormat']
                    ]
                }

            )
        if (this.toolbarValue != 'string') {
            editor.onChange = function (contents, core) {
                e.value = contents
            }
        }
    }

    disconnect() {

    }
}

