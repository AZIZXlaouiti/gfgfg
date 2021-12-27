import { FormControl, FormLabel, FormErrorMessage, usePinInputField  , Input } from '@chakra-ui/react';
import React, { InputHTMLAttributes } from 'react'
import{ useField } from  'formik'
type InputProps  = InputHTMLAttributes<HTMLInputElement> & {
    name: string // name is required with this type declaration
    label: string 
    type?:string
}

export const InputField: React.FC<InputProps> = ({label , ...props}) => {
    const [field , {error} ] = useField(props)
        return (
            <FormControl isInvalid={!!error}>
            <FormLabel htmlFor={field.name}>{label}</FormLabel>
            <Input {...field} id={field.name} placeholder={props.placeholder} type={props.type} />
           {error ?<FormErrorMessage>{error}</FormErrorMessage>: null } 
          </FormControl>
        );
}