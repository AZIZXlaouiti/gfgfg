import { FormControl, FormLabel, FormErrorMessage, usePinInputField } from '@chakra-ui/react';
import React, { InputHTMLAttributes } from 'react'
import{ useField } from  'formik'
type InputProps  = InputHTMLAttributes<HTMLInputElement> & {
    name: string // name is required with this type declaration
    label?: string 
    placeholder: string
}

export const Input: React.FC<InputProps> = (props) => {
    const [field , meta , helpers] = useField(props)
        return (
            <FormControl isInvalid={!!meta.error}>
            <FormLabel htmlFor={field.name}>{props.label}</FormLabel>
            <Input {...field} id={field.name} placeholder={props.placeholder} />
           {meta.error ?<FormErrorMessage>{meta.error}</FormErrorMessage>: null } 
          </FormControl>
        );
}