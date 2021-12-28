import React from 'react';
import { Formik , Form } from 'formik'
import { FormControl, FormLabel, Input, FormErrorMessage, Button, Box } from "@chakra-ui/react"
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useMutation } from 'urql';
import { useRegisterMutation } from '../generated/graphql';
interface registerProps {

}
// using useRegister graphql codegen
// hook instead of useMutation from urql
const Register: React.FC<registerProps> = ({ }) => {
  const [,register] = useRegisterMutation()
    return (
       <Wrapper 
        variant='regular'
       >

        <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async(values) => {
            console.log(values);
            const resp = await register({username: values.username , password:values.password})
            resp.data.register?.user?.username
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