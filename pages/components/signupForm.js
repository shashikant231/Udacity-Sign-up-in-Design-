import React from 'react';
import { useState,useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Buttons from './Buttons';
import Link from 'next/link'
// import signupPostReq from './signupPostReq';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

 


function SignupForm() {
const intialSignupData = {
    email : "",
    password : "",
};
const [signupData,setSignupData] = useState(intialSignupData);
const [signupErrors,setSignupErrors] = useState({});
const [isSubmit,setIsSubmit] = useState(false);

const handleChange = (e) => {
    const {name,value} = e.target;
    setSignupData({...signupData,[name]:value});

};
const handleSubmit = (e)=> {
    e.preventDefault();
    setSignupErrors(validate(signupData));
    console.log((signupErrors))
    setIsSubmit(true);
};



useEffect(() => {
    if (Object.keys(signupErrors).length === 0 && isSubmit) {
      axios.post('https://reqres.in/api/register',signupData).
        then(response => {
            console.log(response)
            if (response.error === undefined){
                alert("user is registered")
            }
      
        }).catch(error => {
            alert("Bad Request-Request failed with status code 400")
            console.log(error)}
            )
      // signupPostReq('https://reqres.in/api/register',signupData)
        
            
    }
  }, [signupErrors]);

const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email){
        errors.email = "Email is required";
    }else if (!regex.test(values.email)) {
        errors.email = "This is not a valid email format!";
    }
    if (!values.password){
        errors.password = "Password is required";
    }else if (values.password.length < 4) {
        errors.password = "Password must be more than 4 characters";
    }else if (values.password.length > 10) {
        errors.password = "Password cannot exceed more than 10 characters";
      }
    return errors;

};
  return (
<> 
<div style={{backgroundColor: "#f6f6f6"}}>
       <div className="app-content">
       <Container className="vds-loading" style={{width:"592px"}}>
       <div className="container-fluid tabbed-pane">
      <div className="tabbed-pane-tabs">
                    <div className="tabbed-pane-tab-selected tabbed-pane-tab" >
                      <Link href="/">
                        <a className="text-dark text-decoration-none">
                          Sign Up
                        </a>
                      </Link>
                    </div>
                    <div className="tabbed-pane-tab-unselected tabbed-pane-tab">
                      <Link href="/components/signinForm">
                        <a className="text-dark text-decoration-none">
                          Sign In
                        </a>
                      </Link>
                    </div>
                  </div>
                  </div>
        
    </Container>

<Container className='tabbed-pane-content'  style={{width:"592px"}}  >
        <h1 className='form-header-header'> Create Your account.</h1>
            <p className='form-header-description'>
                <span>
                Build skills for today, tomorrow, and beyond.<br/>
                Education to future-proof your career.
                </span>
            </p>
            <div>
                      <Container className=" my-4">
                        <div className="row gx-5">
                          <div  className="col-md-6 col-sm-12 ">
                            <Buttons
                              buttonImage="../google.png"
                              buttonText="Sign up to Google"
                            />
                          </div>
                          <div className="col-md-6 col-sm-12 ">
                            <Buttons
                              buttonImage="../facebook.png"
                              buttonText="Sign up to Facebook"
                            />
                          </div>
                        </div>
                      </Container>
                    </div>
            <Container className="or-separator">
                <p className='or-separator-or'>or</p>

            </Container>

    <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" >
            <Form.Control type="text" autoComplete='off'  placeholder="First Name"/>
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Control type="text" autoComplete='off'  placeholder="Last Name"/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="email" autoComplete='off' name='email' placeholder="Email Address" value={signupData.email}
            onChange={handleChange} />
        </Form.Group>
        <p>{signupErrors.email}</p>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control type="password" autoComplete='off' name='password' placeholder="Password" value={signupData.password} 
            onChange={handleChange} />
        </Form.Group>
        <p>{signupErrors.password}</p>
        <Container className='tos-blurb'>
            <span>By clicking "Sign up," you agree to our <a className='tos-blurb-a' href='https://www.udacity.com/legal/en-us/terms-of-use'>Terms of use</a><a className='tos-blurb-a' href='https://www.udacity.com/legal/en-us/privacy'>Privacy Policy</a></span>
        </Container>
        <Container className="my-3 text-center">
        <button
                        type="submit"
                        className="btn btn-primary btn-xl btn-block"
                      >
                        <span className="button-content">Sign up</span>
                      </button>
        </Container>
        </Form>
</Container>
</div>
    </div>
     

</>
  
  )
}

export default SignupForm