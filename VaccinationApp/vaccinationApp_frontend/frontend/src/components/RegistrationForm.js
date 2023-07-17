import React, { useState } from 'react';
import './RegistrationForm.css';
import ThankYouPage from './thankYouPage';

function RegistrationForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dob: '',
        address: '',
        city: '',
        zipCode: '',
        landLine: '',
        cellPhone: '',
        infectedByCovid: false,
        conditions: [],
        otherCondition: '',
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        const fieldValue = type === 'checkbox' ? checked : value;

        if (name === 'conditions') {
            const updatedConditions = fieldValue
                ? [...formData.conditions, value]
                : formData.conditions.filter((condition) => condition !== value);
            setFormData((prevData) => ({
                ...prevData,
                conditions: updatedConditions,
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: fieldValue,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create an object with the form data
        const formData = {
            firstName: e.target.firstName.value,
            lastName: e.target.lastName.value,
            dob: e.target.dob.value,
            address: e.target.address.value,
            city: e.target.city.value,
            zipCode: e.target.zipCode.value,
            landLine: e.target.landLine.value,
            cellPhone: e.target.cellPhone.value,
            infectedByCovid: e.target.infectedByCovid.checked,
            healthConditions: Array.from(
                e.target.querySelectorAll('input[name="conditions"]:checked')
            )
                .map((checkbox) => checkbox.value)
                .join(','),
        };

        // Make the API request to the backend
        await fetch('/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => {
                console.log(response.data); // Log the response for debugging
                // TODO: Handle success message or any other logic
                setSubmitted(true); // Set submitted state to true after successful form submission
            })
            .catch((error) => {
                console.error(error); // Log the error for debugging
                // TODO: Handle error message or any other error handling logic
            });
    };

    // Render ThankYouPage if the form has been submitted
    if (submitted) {
        return <ThankYouPage />;
    }

    return (
        <div className="registration-form">
            <h2 className="form-heading">Registration Page</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Repeat the above pattern for each form field */}

                <div className="form-group">
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="dob">Date of Birth:</label>
                    <input
                        type="date"
                        id="dob"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="city">City:</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="zipCode">Zip Code:</label>
                    <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="landLine">Land Line:</label>
                    <input
                        type="text"
                        id="landLine"
                        name="landLine"
                        value={formData.landLine}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="cellPhone">Cellular Phone:</label>
                    <input
                        type="text"
                        id="cellPhone"
                        name="cellPhone"
                        value={formData.cellPhone}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            name="infectedByCovid"
                            checked={formData.infectedByCovid}
                            onChange={handleChange}
                        />
                        Infected by COVID-19 before
                    </label>
                </div>

                <div className="form-group">
                    <label className="checkbox-label">Previous Conditions:</label>
                    <div className="checkbox-options">
                        <label>
                            <input
                                type="checkbox"
                                name="conditions"
                                value="diabetes"
                                checked={formData.conditions.includes('diabetes')}
                                onChange={handleChange}
                            />
                            Diabetes
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="conditions"
                                value="cardio"
                                checked={formData.conditions.includes('cardio')}
                                onChange={handleChange}
                            />
                            Cardio-Vascular Problems
                        </label>
                        {/* Add more checkboxes for other conditions */}
                        <label>
                            <input
                                type="checkbox"
                                name="conditions"
                                value="other"
                                checked={formData.conditions.includes('other')}
                                onChange={handleChange}
                            />
                            Other:
                            <input
                                type="text"
                                name="otherCondition"
                                value={formData.otherCondition}
                                onChange={handleChange}
                                readOnly={!formData.conditions.includes('other')}
                            />
                        </label>
                    </div>
                </div>

                <div className="form-group">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default RegistrationForm;
