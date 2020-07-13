//inisiasi nilai tampilan awal
const calculator = {
    displayNumber: '0',
    operator: null,
    firstNumber: null,
    waitSecondNumber: false
};

//fungsi utk update nilai
function updateDisplay() {
    document.querySelector("#displayNumber").innerText = calculator.displayNumber;
}

//fungsi utk membersihkan tampilan
function clearDisplay() {
    calculator.displayNumber = '0';
    calculator.operator = null;
    calculator.firstNumber = null;
    calculator.waitSecondNumber = false;
}

//fungsi ketika diberi nilai
function inputDigit(digit) {
    if(calculator.waitSecondNumber && calculator.firstNumber === calculator.displayNumber) {
        calculator.displayNumber = digit;
    } else {
        if(calculator.displayNumber === '0') {
            calculator.displayNumber = digit;
        } else {
            calculator.displayNumber += digit;
        }
    }
}

// fungsi untuk bilangan negatif/positif
function inverseNumber() {
    if(calculator.displayNumber === '0') {
        return;
    }
    calculator.displayNumber = calculator.displayNumber * -1;
}

//fungsi untuk menerapkan operator
function handleOperator(operator) {
    if(!calculator.waitSecondNumber) {
        calculator.operator = operator;
        calculator.waitSecondNumber = true;
        calculator.firstNumber = calculator.displayNumber;
    } else {
        alert('selesaikan dulu perhitungan ini')
    }
}

// fungsi utk menjalankan perhitungan
function performCalculation() {
    if(calculator.firstNumber == null || calculator.operator == null) {
        alert('nilai awal atau operator belum diterapkan');
        return;
    }

    let result = 0;
    // fungsi untuk operator penjumlahan dan pengurangan, harus diubah dulu menjadi integer
    if(calculator.operator === "+") {
        result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
    } else if (calculator.operator === "X") {
        result = parseInt(calculator.firstNumber) * parseInt(calculator.displayNumber);
    } else if (calculator.operator === ":") {
        result = parseInt(calculator.firstNumber) / parseInt(calculator.displayNumber);
    } else {
        result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber);
    }
    calculator.displayNumber = result;
}

const buttons = document.querySelectorAll(".button");
for (let button of buttons) {
    button.addEventListener('click', function(event) {
        const target = event.target;

        // menghubungkan button dg fungsi yg sudah kita buat
        // fungsi clear display
        if(target.classList.contains('clear')) {
            clearDisplay();
            updateDisplay();
            return;
        }
        // fungsi negatif
        if(target.classList.contains('negative')) {
            inverseNumber();
            updateDisplay();
            return;
        }
        // fungsi =
        if(target.classList.contains('equals')) {
            performCalculation();
            updateDisplay();
            return;
        }
        // fungsi operator bilangan
        if(target.classList.contains('operator')) {
            handleOperator(target.innerText);
            updateDisplay()
            return;
        }

        inputDigit(target.innerText);
        updateDisplay();
    });
}