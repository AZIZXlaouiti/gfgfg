import React from 'react';
import { Formik , Form } from 'formik'
import { FormControl, FormLabel, Input, FormErrorMessage, Button, Box } from "@chakra-ui/react"
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useMutation } from 'urql';
interface registerProps {

}
const LOG_MUTATION = `mutation Login($username:String! , $password:String!)
{
  login(options: {username:$username , password:$password}){
    errors {
     field,
      message
    },
    user{
      _id,
      username
    }
  }
}`
const Register: React.FC<registerProps> = ({ }) => {
  const [,register] = useMutation(LOG_MUTATION)
    return (
       <Wrapper 
        variant='regular'
       >

        <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values) => {
            console.log(values);
            return register({username: values.username , password:values.password})
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