const fs = require("fs");
var IoReader = require("../io/io-reader.js").IoReader;
var reload = require('require-nocache')(module);
const readline = require('readline');

// function formatOutput

function runSample(wd, options) {
    console.log("==== Running");
    let ioType = reload(`${wd}/io-type`);
    let solvePerCase = reload(`${wd}/solve-per-case`);

    let expectedOutputs = IoReader.readOut(`${wd}/io/sample.out`);

    let anyError = false;
    IoReader.readIn(
        `${wd}/io/sample.in`,
        (caseInput, caseIndex) => {
            let solveOutput = solvePerCase(caseInput);

            let expected = expectedOutputs[caseIndex];
            let actualOutput = ioType.formatOutput(solveOutput);
            let correct = expected == actualOutput;


            if (!correct) {
                anyError = true;
                console.error(`Wrong sample output in case #${caseIndex + 1}\n`
                    + `   Expected: ${expected}\n`
                    + `   Actual  : ${actualOutput}\n`
                    + `   Input   : ${caseInput}\n`
                );
                if (options.fastFail) {
                    return true;
                }
            }
        },
        () => {
            if (!anyError) {
                console.log("All cases run correctly");
            }
        }
    );

}

function runInput(wd, inputName) {
    console.log(`==== Running input ${inputName}`);
    let ioType = reload(`${wd}/io-type`);
    let solvePerCase = reload(`${wd}/solve-per-case`);

    // let anyError = false;
    let outputs = [];
    IoReader.readIn(
        `${wd}/io/${inputName}.in`,
        (caseInput, caseIndex) => {
            let solveOutput = solvePerCase(caseInput);

            // let expected = expectedOutputs[caseIndex];
            let actualOutput = ioType.formatOutput(solveOutput);
            // let correct = expected == actualOutput;

            outputs.push(actualOutput);

            // if (!correct) {
            //     anyError = true;
            //     console.error(`Wrong sample output in case #${caseIndex + 1}\n`
            //         + `   Expected: ${expected}\n`
            //         + `   Actual  : ${actualOutput}\n`
            //         + `   Input   : ${caseInput}\n`
            //     );
            // }
        },
        () => {
            let resultString = outputs.map((output, index) => `Case #${index+1}: ${output}`).join("\n") + "\n";
            console.log(resultString);
            fs.writeFile(`${wd}/io/${inputName}.out`, resultString);
        }
    );

}

const ProblemRunner = {
    runSample,
    runInput,
};

exports.ProblemRunner = ProblemRunner;