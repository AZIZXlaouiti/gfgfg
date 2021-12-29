import React from 'react';
import { Formik , Form  } from 'formik'
import { FormControl, FormLabel, Input, FormErrorMessage, Button, Box } from "@chakra-ui/react"
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useMutation } from 'urql';
import { useLoginMutation, useRegisterMutation } from '../generated/graphql';
import { errorRec } from '../utils/errorRec';
import { useRouter } from 'next/router';
interface loginProps {

}
// using useRegister graphql codegen
// hook instead of useMutation from urql
const Login: React.FC<loginProps> = ({ }) => {
  const router = useRouter()
  const [,login] = useLoginMutation()
    return (
       <Wrapper 
        variant='small'
       >

        <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async(values , { setErrors }) => {
            const resp = await login({options:values})
            if (resp.data?.login.errors){
              setErrors(errorRec(resp.data.login.errors));
            }else if (resp.data?.login.user){
              // register successfull
              // nav to landing page 
              router.push("/")
            }
           }}
        >
        {({ isSubmitting })=>(
 
        
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
              login
            </Button>
          </Form>

        )}
      </Formik>
        </Wrapper>
    );
}
export default Login;


