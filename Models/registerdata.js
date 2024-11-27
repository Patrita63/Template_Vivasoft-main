export class RegisterData {
    Username;
    Email;
    Password;
    ConfirmPassword;
    Address;

    constructor(Username, Email, Password, ConfirmPassword, Address) {
        this.Username = Username;
        this.Email = Email;
        this.Password = Password;
        this.ConfirmPassword = ConfirmPassword;
        this.Address = Address;
    }

    checkPassword() {
        let isPasswordConfirmed = false;
        if(this.Password === this.ConfirmPassword)
        {
            isPasswordConfirmed = true;
        }  
        return isPasswordConfirmed
    }
    
}