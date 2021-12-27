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
        {({values , handleChange})=>(

        
          <Form>
              <InputField
               name='username'
               label='username'
               placeholder='username'
              />
              <InputField
               name='password'
               label='password'
               placeholder='password'
               type='password'
              />
               <Button
              mt={4}
              type="submit"
            //   isLoading={isSubmitting}
              variantColor="teal"
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