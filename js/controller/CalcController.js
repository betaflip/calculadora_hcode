class CalcController {

    constructor() {
        this._operation = [];
        this._locale = 'pt-BR';
        this._currentDate;
        this._displayCalcEl = document.querySelector('#display');
        this._dateEl = document.querySelector('#data');
        this._timeEl = document.querySelector('#hora');
        this.initialize();
        this.initButtonsEvents();
    }

    initialize() {
        this.setDisplayDateTime();
        setInterval(() => {
            this.setDisplayDateTime();
        }, 1000);
    }

    addEventListenerAll(element, events, fn) {
        events.split(' ').forEach(event => {
            element.addEventListener(event, fn, false);
        })
    }

    clearAll() {
        this._operation = []
    }

    clearEntry() {
        this._operation.pop();
    }

    setError() {
        this.displayCalc = "error"
    }

    addOperator(value) {
        if(isNaN(this.getLastOperator())) {
            //String
            if(this.isOperator(value)) {
                //Trocar o operador
                this._operation[this._operation.length - 1] = value;
                
                this._operation.push( this._operation[this._operation.length - 1]);
            } else if(isNaN(value)){
                //Outra coisa
            } else {
                this._operation.push(value)
            }
        } else {
            //number
            let newValue = this.getLastOperator().toString() + value.toString();

            this._operation.push(parseInt(newValue));
            this._operation.shift();
        }
    }
    
    isOperator(value) {
        return (['+', '-', '*', '/', '%'].indexOf(value) > -1);
    }

    getLastOperator() {
        return this._operation[this._operation.length - 1];
    }

    execBtn(value) {
        switch (value) {
            case 'ac':
                this.clearAll();
                break;

            case 'ce':
                this.clearEntry();
                break;

            case 'soma':
                this.addOperator('+');
                break;

            case 'subtracao':
                this.addOperator('-');
                break;

            case 'multiplicacao':
                this.addOperator('*');
                break;

            case 'divisao':
                this.addOperator('/');
                break;

            case 'porcento':
                this.addOperator('%');
                break;

            case 'igual':
                break;
            
            case 'ponto':
                this.addOperator('.');
                break;

            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
                this.addOperator(value);
                break;

            default:
                this.setError();
                break;
        }
    }

    initButtonsEvents() {
        let buttons = document.querySelectorAll('#buttons > g, #parts > g');

        buttons.forEach((btn) => {
            this.addEventListenerAll(btn, 'click drag', e => {
                var textBtn = btn.className.baseVal.replace('btn-', '');
                this.execBtn(parseInt(textBtn));
            });

            this.addEventListenerAll(btn, 'mouseover', () => {
                btn.style.cursor = 'pointer'
            });
        });
    }

    setDisplayDateTime() {
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
        this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    }

    get displayTime() {
        return this._timeEl.innerHTML;
    }

    set displayTime(value) {
        this._timeEl.innerHTML = value
    }

    get displayDate() {
        return this._dateEl.innerHTML
    }

    set displayDate(value) {
        this._dateEl.innerHTML = value
    }

    get displayCalc() {
        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(value) {
        this._displayCalcEl.innerHTML = value;
    }

    get currentDate() {
        return new Date();
    }

    set currentDate(value) {
        this._currentDate = value;
    }
}
