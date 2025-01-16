export class RegisterData {
    Id;
    Nome;
    Cognome;
    Email;
    Phone;
    DataRegistrazione;
    IdTipoUtente;
    Password;
    Code;

    constructor(Id, Nome, Cognome, Email, Phone, DataRegistrazione, IdTipoUtente, Password, Code) {
        this.Id = Id;
        this.Nome = Nome;
        this.Cognome = Cognome;
        this.Email = Email;
        this.Phone = Phone;
        this.DataRegistrazione = DataRegistrazione;
        this.IdTipoUtente = IdTipoUtente;
        this.Password = Password;
        this.Code = Code;
    }

    checkPassword(ConfirmPassword) {
        let isPasswordConfirmed = false;
        if(this.Password === ConfirmPassword)
        {
            isPasswordConfirmed = true;
        }  
        return isPasswordConfirmed
    }

    // This function generate a code of 8 characters with this rules: 4 characters in lowercase and 4 numbers in a shuffled order
    // (to mix letters and numbers randomly). 
    // The generated code will have four lowercase letters and four numbers in a shuffled order.
    generateCode() {
        const letters = 'abcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        
        let codeArray = [];
        
        // Generate 4 random lowercase letters
        for (let i = 0; i < 4; i++) {
            codeArray.push(letters.charAt(Math.floor(Math.random() * letters.length)));
        }
        
        // Generate 4 random numbers
        for (let i = 0; i < 4; i++) {
            codeArray.push(numbers.charAt(Math.floor(Math.random() * numbers.length)));
        }
        
        // Shuffle the array to mix letters and numbers
        codeArray = codeArray.sort(() => Math.random() - 0.5);
        
        return codeArray.join('');
    }
}