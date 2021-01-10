import React, { useState } from 'react';
import { Button, Col, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { signup } from '../../store/userLogin/userLoginActions';
import './Signup.css';

function Signup() {
  const dispatch = useDispatch();
  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    userType: '',
    password: '',
    email: '',
    businessName: '',
    dateOfBirth: '',
    address: '',
    city: '',
    postalCode: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(signup({ ...signupData }));

    setSignupData({
      firstName: '',
      lastName: '',
      userType: '',
      password: '',
      email: '',
      businessName: '',
      dateOfBirth: '',
      address: '',
      city: '',
      postalCode: '',
    });
  };

  console.log(signupData);

  const handleChange = (e) => {
    const { value, name } = e.target;

    setSignupData({ ...signupData, [name]: value });
  };

  return (
    <div className='Signup container'>
      <Form
        as={Col}
        md={{ span: 4, offset: 2 }}
        className='Signup-form'
        onSubmit={handleSubmit}
      >
        <h1 className='Signup-form mt-5 mb-5'>Signup</h1>
        <Form.Group controlId='formBasicFirstname'>
          <Form.Control
            name='firstName'
            onChange={handleChange}
            value={signupData.firstName}
            type='text'
            placeholder='Firstname'
          />
        </Form.Group>
        <Form.Group controlId='formBasicLastname'>
          <Form.Control
            name='lastName'
            onChange={handleChange}
            value={signupData.lastName}
            type='text'
            placeholder='Lastname'
          />
        </Form.Group>
        <Form.Group controlId='formBasicSelect'>
          <Form.Control name='userType' as='select' onChange={handleChange}>
            <option value=''>User type</option>
            <option value='Chef'>Chef</option>
            <option value='Employer'>Employer</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId='formBasicPassword'>
          <Form.Control
            name='password'
            onChange={handleChange}
            value={signupData.password}
            type='password'
            placeholder='Password'
          />
        </Form.Group>
        <Form.Group controlId='formBasicBusiness'>
          <Form.Control
            name='businessName'
            onChange={handleChange}
            value={signupData.businessName}
            type='text'
            placeholder='Business name'
          />
        </Form.Group>
        <Form.Group controlId='formBasicEmail'>
          <Form.Control
            name='email'
            onChange={handleChange}
            value={signupData.email}
            type='text'
            placeholder='Email'
          />
        </Form.Group>
        <Form.Group controlId='formBasicDate'>
          <Form.Control
            name='dateOfBirth'
            onChange={handleChange}
            value={signupData.dateOfBirth}
            type='date'
          />
        </Form.Group>
        <Form.Group controlId='formBasicAddress'>
          <Form.Control
            name='address'
            onChange={handleChange}
            value={signupData.address}
            type='text'
            placeholder='address'
          />
        </Form.Group>
        <Form.Group controlId='formBasicCity'>
          <Form.Control
            name='city'
            onChange={handleChange}
            value={signupData.city}
            type='text'
            placeholder='City'
          />
        </Form.Group>
        <Form.Group controlId='formBasicPostalCode'>
          <Form.Control
            name='postalCode'
            onChange={handleChange}
            value={signupData.postalCode}
            type='text'
            placeholder='Postal Code'
          />
        </Form.Group>
        <Form.Group className='mt-4'>
          <Button onClick={handleSubmit} variant='primary' type='submit'>
            Submit
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default Signup;
