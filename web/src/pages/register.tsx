import React from 'react';
import { Formik , Form } from 'formik'
import { FormControl, FormLabel, Input, FormErrorMessage, Button, Box } from "@chakra-ui/react"
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
interface registerProps {

}

const Register: React.FC<registerProps> = ({ }) => {
    return (
       <Wrapper 
        variant='regular'
       >

        <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values) => {
            console.log(values);
        }}
        >
        {({values , handleChange , isSubmitting})=>(

        
          <Form>
              <InputField
               name='username'
               label='username'
               placeholder='username'
              />
              <Box mt={4}>

              <InputField
               name='password'
               label='password'
               placeholder='password'
               type='password'
               />
               </Box>
               <Button
                mt={4}
                type="submit"
                isLoading={isSubmitting}
                variantcolor="teal"
            >
              register
            </Button>
          </Form>

        )}
      </Formik>
        </Wrapper>
    );
}
export default Register;