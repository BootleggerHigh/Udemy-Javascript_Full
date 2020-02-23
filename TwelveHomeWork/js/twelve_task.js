class options {
    constructor(height = 200, width = 300,
                bg = "red", fontSize = 100,
                textAlign = "center") {
            this.height = height;
            this.width = width;
            this.bg = bg;
            this.fontSize = fontSize;
            this.textAlign = textAlign;
    }

    createDiv(text) {
        let element = document.createElement('div');
            element.style.cssText =
                `height : ${this.height + 'px'};
                width : ${this.width + 'px'};
                background-color : ${this.bg};
                font-size : ${this.fontSize};
                text-align : ${this.textAlign};`;
            element.textContent = text;
            document.body.appendChild(element);

        }
}

let firstObjects = new options(100,200,'pink',500,'right');
firstObjects.createDiv('FirstObject');

let secondObjects = new options(300,400,'blue',500,'center');
secondObjects.createDiv('SecondObject');

new options(300,200,'green',100,'left').createDiv('gd');
