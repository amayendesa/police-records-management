
import { getTaskTimelineHistory } from "../services/task-history-service"
import { convertMsToHM } from "./date"

/**
 * @param creditScoreParameters Credit score parameters
 * @param creditScoreVariables Credit scrore variables
 * @returns The array object of the values to construct the credit scoring table
*/
export const transformCreditScoreInfo = (creditScoreParameters, creditScoreVariables) => {
    var result = []
    const creditScoreParametersKeys = Object.keys(creditScoreParameters); // 👉️ ['key1', 'key2']
    const creditScoreVariablesKeys = Object.keys(creditScoreVariables); // 👉️ ['key1', 'key2']

    for (let key of creditScoreParametersKeys) {
        if (key == 'AGE') {
            result.push({ variableType: key, value: Math.floor(creditScoreParameters[key]) ?? 'No value.', score: creditScoreVariables[key] ?? 'No score.' });
        }

        if (key == 'DEBT_TO_INCOME') {
            result.push({ variableType: key, value: Number(creditScoreParameters[key]).toFixed(2) ?? 'No value.', score: creditScoreVariables[key] ?? 'No score.' });
        }

        if (key != 'AGE' && key != 'DEBT_TO_INCOME') {
            result.push({ variableType: key, value: creditScoreParameters[key] ?? 'No value.', score: creditScoreVariables[key] ?? 'No score.' });
        }


    }

    for (let key of creditScoreVariablesKeys) {
        const rez = creditScoreParametersKeys.find((variable) => variable == key)
        // execute if block when there is no result in creditScoreParametersKeys
        if (!rez) {
            console.log(`007 New variable in credit score variables`, rez)
            result = [...result, { variableType: key, value: creditScoreVariables[key] ?? 'No value.', score: creditScoreVariables[key] ?? 'No score.' }]
        }
    }

    //
    return result;
}

export const calculateTotalIncome = (employmentDetails) => {

    console.log("Calculate the total income for the client...");

    let totalAmount = 0;

    if (employmentDetails) {
        for (let detail of employmentDetails) {
            if (detail.endDate == `PRESENT`) {
                totalAmount += detail.averageMonthlyIncome;
            }
        }
    }

    return totalAmount;
}

export const checkIfCivilServant = (employmentDetails) => {

    console.log("Check if employee is a civil servant...");

    let isGovernmentEmployee = false;

    if (employmentDetails) {
        for (let detail of employmentDetails) {
            if (detail.endDate == `PRESENT` && detail.employmentType == 'GOVERNMENT') {
                isGovernmentEmployee = true;
            }
        }
    }

    return isGovernmentEmployee;
}

export const durationAtStage = async (businessKey, taskName) => {

    console.log(`Retreiving duration for the task ${taskName} with a business key ${businessKey}`);

    let duration = null;

    const { data } = await getTaskTimelineHistory(businessKey);

    const selectedTask = data.find((data) => data.taskName === taskName)

    duration = convertMsToHM(selectedTask.duration);

    console.log(`000 duration: `, duration)

    return duration;
}