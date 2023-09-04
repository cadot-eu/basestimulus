import { Controller } from '@hotwired/stimulus'
import suneditor from 'suneditor'
import plugins from 'suneditor/src/plugins'
import fr from 'suneditor/src/lang/fr.js'
import CharPlugins from "../../js/suneditor/characteres_plugins.js";
import plugin_dialog from "../../js/suneditor/plugin_dialog.js";
const { filetemplates } = require('/assets/jssite/suneditor/templates.js').default;
let templates = JSON.parse(filetemplates);

//utilisation
//<textarea data-controller="base--suneditor" data-action="base--suneditor#update" data-base--suneditor-toolbar-value="full" data-base--suneditor-init-value='{"buttonList": [["undo", "redo", "removeFormat"]]}'>
//dans une entity
// /**
//  * normal
//  * ATTR:{"data-base--suneditor-height-value":"100"}
// */


/* ---------------- transformation des textareas en fckeditor --------------- */

export default class extends Controller {

    /* -------------------------------------------------------------------------- */
    /*                                  variable                                  */
    /* -------------------------------------------------------------------------- */
    // for choice template of toolbar

    static values = {
        toolbar: String,
        upload: { type: String, default: 'simpleimage' },
        init: { type: String, default: '{}' },
        height: { type: String, default: '600' }
    }


    connect() {
        /* ----------------------------- initialistaion ----------------------------- */
        const e = this.element;
        let editor;

        //merge t et initValue
        /* -------------------------- création des plugins -------------------------- */

        /* ------------------------- initialisation globale ------------------------- */
        let tempinit = {
            lang: fr,
            height: this.heightValue,
            iframeCSSFileName: "/build/app.css",
            plugins: { ...plugins, CharPlugins, plugin_dialog },
            imageUploadUrl: "/simplegallery/" + this.uploadValue,
            imageUploadSizeLimit: "30000000",
            imageUploadHeader: null,
            imageAccept: ".jpg, .png, .jpeg, .gif, .bmp, .webp",
            templates: templates,
        };
        const init = suneditor.init({ ...tempinit, ...JSON.parse(this.initValue) });

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
                        ['table',
                            {
                                name: 'pickerColor',
                                dataDisplay: 'dialog',
                                title: 'Custom link',
                                buttonClass: '',
                                innerHTML: '<svg viewBox="0 0 24 24"><path d="M10.59,13.41C11,13.8 11,14.44 10.59,14.83C10.2,15.22 9.56,15.22 9.17,14.83C7.22,12.88 7.22,9.71 9.17,7.76V7.76L12.71,4.22C14.66,2.27 17.83,2.27 19.78,4.22C21.73,6.17 21.73,9.34 19.78,11.29L18.29,12.78C18.3,11.96 18.17,11.14 17.89,10.36L18.36,9.88C19.54,8.71 19.54,6.81 18.36,5.64C17.19,4.46 15.29,4.46 14.12,5.64L10.59,9.17C9.41,10.34 9.41,12.24 10.59,13.41M13.41,9.17C13.8,8.78 14.44,8.78 14.83,9.17C16.78,11.12 16.78,14.29 14.83,16.24V16.24L11.29,19.78C9.34,21.73 6.17,21.73 4.22,19.78C2.27,17.83 2.27,14.66 4.22,12.71L5.71,11.22C5.7,12.04 5.83,12.86 6.11,13.65L5.64,14.12C4.46,15.29 4.46,17.19 5.64,18.36C6.81,19.54 8.71,19.54 9.88,18.36L13.41,14.83C14.59,13.66 14.59,11.76 13.41,10.59C13,10.2 13,9.56 13.41,9.17Z" /></svg>'
                            }
                            , 'link', 'image', 'video', 'audio' /** ,'math' */], // You must add the 'katex' library at options to use the 'math' plugin.
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
            //on cache le bouton code sauf pour superadmin
            editor.onload = function () {
                if (document.getElementById('rolesp').value != true)
                    document.querySelector('.se-code-view-enabled').remove();
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
        else if (this.toolbarValue == 'image')
            editor = init.create(this.element.id,
                {
                    buttonList: [
                        ['undo', 'redo', 'image'],
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
                    ,

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


