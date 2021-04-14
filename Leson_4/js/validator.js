class Validator {
    constructor(form) {
        this.patterns = {
            name: /^[a-zа-яё]+$/i,
            phone: /^\+7\(\d{3}\)\d{3}-\d{4}$/,
            email: /^[\w._-]+@\w+\.[a-z]{2,4}$/i
        };
        this.errors = {
            name: 'Имя содержит только буквы',
            phone: 'Телефон подчиняется шаблону +7(000)000-0000',
            email: 'E-mail выглядит как mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru'
        };
        this.errorClass = 'error-msg';
        this.form = form;
        this.valid = false;
        this._validateForm();
    }
    validate(regexp, value){
        regexp.test(value)
    }
    
    _validateForm(){
        let errors = [...document.getElementById(this.form).querySelectorAll(`.${this.errorClass}`)];
        for (let error of errors){
            error.remove();
        }
        let formFields = [...document.getElementById(this.form).getElementsByTagName('input')];
        for (let field of formFields){
            this._validate(field);
        }
        if(![...document.getElementById(this.form).querySelectorAll('.invalid')].length){
           this.valid = true;
        }
    }
    _validate(field){
        if(this.patterns[field.name]){
            if(!this.patterns[field.name].test(field.value)){
               field.classList.add('invalid');
               this._addErrorMsg(field);
               this._watchField(field);
            }
        }
    }
    _addErrorMsg(field){
        let error = `<div class="${this.errorClass}">${this.errors[field.name]}</div> `;
        field.parentNode.insertAdjacentHTML('beforeend', error);
    }
    _watchField(field){
        field.addEventListener('input', () => {
            let error = field.parentNode.querySelector(`.${this.errorClass}`);
            if(this.patterns[field.name].test(field.value)){
                field.classList.remove('invalid');
                field.classList.add('valid');
                if(error){
                    error.remove();
                }
            } else {
                field.classList.remove('valid');
                field.classList.add('invalid');
                if(!error){
                    this._addErrorMsg(field);
                }
            }
        })
    }
    // todo
    //  _setCursorPosition(pos, e) {
    //     e.focus();
    //     if (e.setSelectionRange) e.setSelectionRange(pos, pos);
    //     else if (e.createTextRange) {
    //         var range = e.createTextRange();
    //         range.collapse(true);
    //         range.moveEnd("character", pos);
    //         range.moveStart("character", pos);
    //         range.select()
    //     }
    //
    //todo
    // _mask(e) {
    //     var matrix = this.placeholder,// .defaultValue
    //         i = 0,
    //         def = matrix.replace(/\D/g, ""),
    //         val = this.value.replace(/\D/g, "");
    //     def.length >= val.length && (val = def);
    //     matrix = matrix.replace(/[_\d]/g, function(a) {
    //         return val.charAt(i++) || "_"
    //     });
    //     this.value = matrix;
    //     i = matrix.lastIndexOf(val.substr(-1));
    //     i < matrix.length && matrix != this.placeholder ? i++ : i = matrix.indexOf("_");
    //     setCursorPosition(i, this)
    //      }
}

// todo
//  window.addEventListener("DOMContentLoaded", function() {
//     let input = document.querySelector("#phone");
//     input.addEventListener("input", mask, false);
//     input.focus();
//     setCursorPosition(3, input);
//   })








