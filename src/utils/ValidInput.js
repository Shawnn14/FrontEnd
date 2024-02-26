export function checkValidInput(listChech) {
    for (const value of listChech) {
        if (value == null){
            return false
        } 
    }

    return true
}