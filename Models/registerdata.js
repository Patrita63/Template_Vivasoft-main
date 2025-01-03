export class RegisterData {
    Name;
    Surname;
    Email;
    Password;
    ConfirmPassword;
    Address;

    constructor(Name, Surname, Email, Password, ConfirmPassword, Address) {
        this.Name = Name;
        this.Surname = Surname;
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