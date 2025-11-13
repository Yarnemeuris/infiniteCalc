document.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;

    calculate(document.querySelector("#input").value)
})

function calculate(formula) {
    if (formula == "") return "0.";

    formula = formula.replaceAll(/\s/g, "");

    if (formula.indexOf("(") != -1) {
        var indecies = [formula.indexOf("("), formula.lastIndexOf(")")];
        var parts = [formula.slice(0, indecies[0]), formula.slice(indecies[0] + 1, indecies[1]), formula.slice(indecies[1] + 1)];

        parts[1] = calculate(parts[1])
        formula = parts.join("")
    }

    formula = formula.split(/([\+\-\*\/])/)

    formula.forEach((value, index) => {
        if (value.indexOf(".") != -1) return;
        if (value.match(/[\+\-\*\/]/) != null) return;

        formula[index] = value + "."
    })

    loop: {
        while (true) {
            for (var i = 1; ; i++) {
                if (formula[i] == undefined) break loop;
                if (formula[i].match(/[\+\-]/) == null) continue;
                if (formula[i - 1] == undefined) continue;
                if (formula[i + 1] == undefined) continue;

                var num1 = formula[i] == "-" ? "-" + formula[i + 1] : formula[i + 1];
                var num2 = formula[i - 2] == "-" ? "-" + formula[i - 1] : formula[i - 1];

                var result = add(num1, num2);
                formula.splice(i - 1 - (formula[i - 2] == "-"), 3 + (formula[i - 2] == "-"), result);
                console.log(result)
                break;
            }
        }
    }

    console.log(formula)
}

function digitsBeforePoint(number) {
    return number.split(".")[0].toString().length
}

function digitsAfterPoint(number) {
    return number.split(".")[1].toString().length
}

function maxAbs(a, b) {
    a = a.replace("-", "");
    b = b.replace("-", "");

    if (digitsBeforePoint(a) != digitsBeforePoint(b)) return digitsBeforePoint(a) > digitsBeforePoint(b) ? a : b;

    for (var i = 0; i < digitsBeforePoint(a); i++) {
        if (a[i] == b[i]) continue

        return a[i] > b[i] ? a : b
    }
}

function add(a, b) {
    var signA = a[0] != "-" ? 1 : -1;
    var signB = b[0] != "-" ? 1 : -1;

    a = a.replace("-", "");
    b = b.replace("-", "");

    var switchSign = false;
    if ((signA != signB && ((maxAbs(a, b) == a && signA == -1) || (maxAbs(a, b) == b && signB == -1))) || (signA == -1 && signB == -1)) { signA *= -1; signB *= -1; switchSign = true; };

    var maxDigitsBeforePoint = Math.max(digitsBeforePoint(a), digitsBeforePoint(b));
    a = "0".repeat(maxDigitsBeforePoint - digitsBeforePoint(a)) + a
    b = "0".repeat(maxDigitsBeforePoint - digitsBeforePoint(b)) + b

    var maxDigitsAfterPoint = Math.max(digitsAfterPoint(a), digitsAfterPoint(b));
    a += "0".repeat(maxDigitsAfterPoint - digitsAfterPoint(a))
    b += "0".repeat(maxDigitsAfterPoint - digitsAfterPoint(b))

    var result = ""
    var carry = 0
    for (var i = a.length - 1; i >= 0; i--) {
        if (a[i] == ".") {
            result = "." + result;
            continue;
        }

        var digit = (a[i] / signA + b[i] / signB + carry);

        if (i == 0) {
            result = digit + result;
            continue;
        }

        result = signA != signB && digit >= 0 ? (digit % 10 + result).replace("-", "") : (10 + digit % 10) % 10 + result;
        carry = digit >= 10 ? Math.floor(digit / 10) : digit < 0 ? -1 : 0;
    }

    if (switchSign) {
        if (result[0] == "-") result = result.replace("-");
        else result = "-" + result;
    }
    return result;
}