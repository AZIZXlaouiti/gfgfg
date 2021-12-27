import React from 'react';
import { Formik , Form } from 'formik'
import { FormControl, FormLabel, Input, FormErrorMessage, Button } from "@chakra-ui/react"
interface registerProps {

}

const Register: React.FC<registerProps> = ({ }) => {
    return (
        <Formik initialValues={{ username: "", password: "" }}
            onSubmit={
            (values) => { console.log(values) }
        }>
            {({values , handleChange}) => { 
            <Form> 
              <FormControl >
                  <FormLabel htmlFor='username'>First name</FormLabel>
                    <Input 
                    value={values.username} 
                    id='username' 
                    placeholder='username'
                     />
                {/* <FormErrorMessage>{form.errors.name}</FormErrorMessage> */}
              </FormControl>

            </Form> 
            }
            } 
        </Formik>
    );
}
export default Register;