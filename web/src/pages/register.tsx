import React from 'react';
import { Formik , Form } from 'formik'
import { FormControl, FormLabel, Input, FormErrorMessage, Button, Box } from "@chakra-ui/react"
import { Wrapper } from '../components/Wrapper';
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
        {({ isSubmitting }) => (
            <Form>
           
            <Box mt={4}>
             <Input
             id='username'
             placeholder='username'
             />
            </Box>
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
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