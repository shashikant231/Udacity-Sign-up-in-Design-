import React,{useEffect, useState} from 'react'
import 'antd/dist/antd.css';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Buttons from './Buttons';
import Link from 'next/link'
// import signinPostReq from './signinPostReq';
import axios from 'axios';

function SigninForm() {
const intialSigninData = {
    email : "",
    password : "",
};
const [signinData,setSigninData] = useState(intialSigninData);
const [signinErrors,setSigninErrors] = useState({});
const [isSubmit,setIsSubmit] = useState(false);

const handleChange = (e) => {
    const{name,value} = e.target;
    setSigninData({ ...signinData,[name]:value});
};

const handleSubmit = (e) => {
    e.preventDefault();
    setSigninErrors(validate(signinData));
    console.log(signinErrors)
    setIsSubmit(true);
    
};
useEffect(() => {
    if (Object.keys(signinErrors).length === 0 && isSubmit){
      axios.post('https://reqres.in/api/login',signinData).
        then(response => {
            console.log(response)
            if (response.error === undefined){
                alert("user is logged in")
            }
      
        }).catch(error => {
            alert("Bad Request-Request failed with status code 400")
            // console.log(error)
        }
            )
      // signinPostReq('https://reqres.in/api/login',signinData)
      // console.log(signinPostReq('https://reqres.in/api/login',signinData))
      console.log((signinData))
        
    }
            
},[signinErrors]
);

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
                    <div className="tabbed-pane-tab-unselected tabbed-pane-tab" >
                      <Link href="/">
                        <a className="text-dark text-decoration-none">
                          Sign Up
                        </a>
                      </Link>
                    </div>
                    <div className="tabbed-pane-tab-selected tabbed-pane-tab">
                      <Link href="/components/signinForm">
                        <a className="text-dark text-decoration-none">
                          Sign In
                        </a>
                      </Link>
                    </div>
                  </div>
                  </div>
        
    </Container>
     <Container className='tabbed-pane-content'  style={{width:"592px"}} >
             <h1 className='form-header-header'> Sign in to your account.</h1>
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
                              buttonText="Sign in to Google"
                            />
                          </div>
                          <div className="col-md-6 col-sm-12 ">
                            <Buttons
                              buttonImage="../facebook.png"
                              buttonText="Sign in to Facebook"
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
            <Form.Control type="email" autoComplete='off' name='email' placeholder="Email Address" 
            value={signinData.email}
            onChange={handleChange} />
        </Form.Group>
        <p>{signinErrors.email}</p>

        <Form.Group className="mb-3" >
            <Form.Control type="password" autoComplete='off' name='password' placeholder="Password"
            value={signinData.password}
            onChange={handleChange}>
            </Form.Control>
        </Form.Group>
        <p>{signinErrors.password}</p>
        <Container className='tos-blurb' >
            <span >By clicking "Sign in," you agree to our <a className='tos-blurb-a' href='https://www.udacity.com/legal/en-us/terms-of-use'>Terms of use</a> and our <a className='tos-blurb-a' href='https://www.udacity.com/legal/en-us/privacy'>Privacy Policy</a></span>
        </Container>
        <Container className="my-3 text-center">
        <button
                        type="submit"
                        className="btn btn-primary btn-xl btn-block"
                      >
                        <span className="button-content">Sign in</span>
                      </button>
        </Container>
        </Form>
        <Container className="text-center" >
            <a style={{color: "#2015ff"}} href="/reset-password-email">Forgot your password?</a>
        </Container>
        <Container className="or-separator">
                <p className='or-separator-or'>or</p>

            </Container>
        <Container className='text-center'>
            <a style={{color: "#2015ff"}} href="/sign-in/sso">Sign in with your organization.</a>
        </Container>
        
</Container>
</div>
</div>

    </>
       
  )
}

export default SigninForm