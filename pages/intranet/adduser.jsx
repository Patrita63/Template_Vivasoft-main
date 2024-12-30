import { FormControl, FormGroup, InputLabel, Input, Typography, Button, styled, FormHelperText, Autocomplete, TextField } from "@mui/material";
import React, {useState, useEffect } from "react";

// Validation - npm install react-hook-form
import { useForm, Controller } from 'react-hook-form';

// PATRIZIO import { addUser, getRoles, checkUserByEmailExists } from "../service/api";

const UserContainer = styled(FormGroup)`
    width: 50%;
    margin: 5% auto 0 auto;
    background-color: white;
`
// Validation
const initialValues = {
    nome: '',
    cognome: '',
    email: '',
    datadinascita: '',
    idtipoutente: 0,
    tipoutente: ''
};


const AddUser = () => {

    /* const [listRoles, setListRoles] = useState([]);

    useEffect(() => {
        getUserRoles();
    }, []);

    const getUserRoles = async () => {
        let response = await getRoles();
        console.log(response);
        // Prima far vedere la response da Developers tools
        setListRoles(response.data);
    }; */

    // Validation
    const { handleSubmit, control, watch, formState: { errors } } = useForm({
        defaultValues: initialValues
    });

    // Validation
    const onSubmit = async (data) => {
        // debugger;
        console.log('Form Data:', data);
        const alreadyExist = await checkUserByEmailExists(data.email);
        if(!alreadyExist) {
            AddUserData(data);
        }
        else
        {
            alert("Already exists a user with mail " + data.email);
        }
    };

        // Validation
    const watchAllFields = watch(); // Watch all fields for enabling the button.
    // Validation
    const isFormValid = () => {
        const isValid = watchAllFields.nome &&
        watchAllFields.cognome &&
        watchAllFields.email &&
        // watchAllFields.phone &&
        // !errors.role && // No errors on role
        !errors.nome && // No errors on name
        !errors.cognome && // No errors on username
        !errors.email && // No errors on email
        // !errors.phone && // No errors on phone
        Object.keys(errors).length === 0;
        // console.log('errors.role: ' + errors.role);
        // console.log('isValid: ' + isValid);
        return (
            isValid
        );
    };

    const AddUserData = async (user) => {
        // await addUser(user);
        // Redirect to home page intranet
        router.push("/intranet/");
    }

    return (
        <UserContainer>
            <Typography variant="h4">Add User</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller 
                    name="nome"
                    control={control}
                    rules={{ required: 'Name is required' }}
                    render={({ field }) => (
                        <FormControl fullWidth error={!!errors.name}>
                            <InputLabel htmlFor="nome">Nome</InputLabel>
                            <Input {...field} id="nome" />
                            <FormHelperText>{errors.nome?.message}</FormHelperText>
                        </FormControl>
                    )}
                />
                <Controller
                    name="cognome"
                    control={control}
                    rules={{ required: 'Username is required' }}
                    render={({ field }) => (
                        <FormControl fullWidth error={!!errors.username}>
                        <InputLabel htmlFor="cognome">Cognome</InputLabel>
                        <Input {...field} id="cognome" />
                        <FormHelperText>{errors.cognome?.message}</FormHelperText>
                        </FormControl>
                    )}
                />
                <Controller
                    name="email"
                    control={control}
                    rules={{
                        required: 'Email is required',
                        pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Enter a valid email address',
                        },
                    }}
                    render={({ field }) => (
                        <FormControl fullWidth error={!!errors.email}>
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input {...field} id="email" />
                        <FormHelperText>{errors.email?.message}</FormHelperText>
                        </FormControl>
                    )}
                />
                {/* <Controller
                name="phone"
                control={control}
                rules={{
                    required: 'Phone is required',
                    pattern: {
                    value: /^[0-9]+$/,
                    message: 'Enter a valid phone number',
                    },
                }}
                render={({ field }) => (
                    <FormControl fullWidth error={!!errors.phone}>
                    <InputLabel htmlFor="phone">Phone</InputLabel>
                    <Input {...field} id="phone" />
                    <FormHelperText>{errors.phone?.message}</FormHelperText>
                    </FormControl>
                )}
                /> */}
                {/* <Controller
                    name="role"
                    control={control}
                    rules={{
                    required: 'Role is required',
                    }}
                    render={({ field }) => (
                    <FormControl fullWidth error={!!errors.role}>
                        <Autocomplete
                        id="role"
                        options={listRoles}
                        getOptionLabel={(option) => option?.name || ''}
                        isOptionEqualToValue={(option, value) => option.value === value?.value}
                        value={field.value || null}
                        onChange={(event, newValue) => field.onChange(newValue)}
                        renderInput={(params) => (
                            <TextField {...params} label="Select a role" />
                        )}
                        />
                        <FormHelperText>{errors.role?.message}</FormHelperText>
                    </FormControl>
                    )}
                /> */}
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    disabled={!isFormValid()} // Button is disabled if the form is invalid
                    >
                    Add User
                </Button>
            </form>
        </UserContainer>
    );
}

export default AddUser;