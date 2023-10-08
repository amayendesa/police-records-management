
import { getClientAccountDetails } from "./../services/br-loan-service"

const BASE64_MARKER = ";base64,";

/**
 * @param dataURI The base64 string to convert
*/
export const convertDataURIToBinary = (dataURI) => {
    const base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
    const base64 = dataURI.substring(base64Index);
    const raw = window.atob(base64);
    const rawLength = raw.length;
    const array = new Uint8Array(new ArrayBuffer(rawLength));

    for (let i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i);
    }
    return array;
};

// take br-loan accounts
// loop through them collecting more detail for each
// transform to match the format of the loans in flex-cube
/**
 * @param brLoanApplication Object of a single BR Loan Application
*/
export const processBRLoanApplicationAccount = async (brLoanApplication) => {
    let formatedLoanApplication = {}

    const { data } = await getClientAccountDetails(brLoanApplication.AccountID);

    console.log(`### BR Loan Application detail`, data)

    const formatedBrLoans = formatBrLoanSchedule(data.brLoanScheduleEntries);

    formatedLoanApplication = {
        loanAccountNumber: brLoanApplication.AccountID,
        maturityDate: brLoanApplication.MaturityDate,
        amountFinanced: brLoanApplication.LoanAmount,
        bookDate: brLoanApplication.CreatedOn,
        productCode: brLoanApplication.ProductID,
        loanRepayments: formatedBrLoans
    }
    // return restructured loan application detail
    return formatedLoanApplication;
}

/**
 * @param brLoanApplications Array of BR Loan Applications
*/
export const processBRLoanApplicationAccounts = (brLoanApplications) => {
    const formatedLoanApplications = []

    for (let loanApplication of brLoanApplications) {
        getClientAccountDetails(loanApplication.AccountID).then((res) => {
            console.log(`### BR Loan Application detail`, res.data)
            const formatedBrLoans = formatBrLoanSchedule(res.data.brLoanScheduleEntries)
            const application = {
                loanAccountNumber: loanApplication.AccountID,
                maturityDate: loanApplication.MaturityDate,
                amountFinanced: loanApplication.LoanAmount,
                bookDate: loanApplication.CreatedOn,
                productCode: loanApplication.ProductID,
                loanRepayments: formatedBrLoans
            }
            // check if the loan number has got a value before pushing
            if (application.loanAccountNumber) {
                formatedLoanApplications.push(application)
            }

        })
    }
    return formatedLoanApplications;
}

export const formatBrLoanSchedule = (brLoanSchedule) => {
    const formatedBrSchedule = []

    for (let record of brLoanSchedule) {
        const data = {
            dueDate: record.installmentDueDate,
            totalRepayment: record.installmentAmount ? record.installmentAmount : 0,
            totalSettled: record.amountPaid ? record.amountPaid : 0
        }
        formatedBrSchedule.push(data)
    }
    return formatedBrSchedule;
}