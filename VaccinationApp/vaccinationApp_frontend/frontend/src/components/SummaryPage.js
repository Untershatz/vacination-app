import React, { useEffect, useState } from 'react';
import './SummaryPage.css';
import * as XLSX from 'xlsx';
import { format } from 'date-fns';



function SummaryPage() {
    const [registrationData, setRegistrationData] = useState([]);
    const [searchCity, setSearchCity] = useState('');
    const [searchDateRange, setSearchDateRange] = useState({ startDate: '', endDate: '' });
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        fetch('/users')
            .then(response => response.json())
            .then(data => {
                setRegistrationData(data);
                setFilteredData(data);
            })
            .catch(error => console.error(error));
    }, []);

    const handleCityChange = event => {
        setSearchCity(event.target.value);
    };

    const handleDateRangeChange = event => {
        const { name, value } = event.target;
        setSearchDateRange(prevRange => ({
            ...prevRange,
            [name]: value,
        }));
    };

    const filterData = () => {
        let filteredResults = registrationData;

        if (searchCity) {
            filteredResults = filteredResults.filter(
                user => user.city.toLowerCase() === searchCity.toLowerCase()
            );
        }

        if (searchDateRange.startDate && searchDateRange.endDate) {
            const startDate = new Date(searchDateRange.startDate);
            const endDate = new Date(searchDateRange.endDate);

            filteredResults = filteredResults.filter(user => {
                const userDate = new Date(user.dob);
                return (
                    userDate >= startDate &&
                    userDate <= endDate &&
                    user.city.toLowerCase() === searchCity.toLowerCase()
                );
            });
        }

        setFilteredData(filteredResults);
    };

    const exportToExcel = () => {
        const exportData = filteredData.map(user => ({
            'First Name': user.firstName,
            'Last Name': user.lastName,
            'Date of Birth': user.dob,
            Address: user.address,
            City: user.city,
            'Zip Code': user.zipCode,
            'Land Line': user.landLine,
            'Cellular Phone': user.cellPhone,
            'Infected by COVID-19': user.infectedByCovid ? 'Yes' : 'No',
            'Health Conditions': user.healthConditions,
        }));

        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(exportData);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Summary');
        const excelBuffer = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });
        const excelData = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const excelFileName = 'summary.xlsx';

        if (navigator.msSaveBlob) {
            navigator.msSaveBlob(excelData, excelFileName);
        } else {
            const excelURL = window.URL.createObjectURL(excelData);
            const link = document.createElement('a');
            link.href = excelURL;
            link.download = excelFileName;
            link.click();
            window.URL.revokeObjectURL(excelURL);
        }
    };

    return (
        <div className="summary-page">
            <h2>Summary Page</h2>

            <form onSubmit={event => event.preventDefault()}>
                <div className="search-grid">
                    <div className="search-field">
                        <label htmlFor="city">City:</label>
                        <input type="text" id="city" value={searchCity} onChange={handleCityChange} />
                    </div>

                    <div className="search-field">
                        <label htmlFor="startDate">Start Date:</label>
                        <input
                            type="date"
                            id="startDate"
                            name="startDate"
                            value={searchDateRange.startDate}
                            onChange={handleDateRangeChange}
                        />
                    </div>

                    <div className="search-field">
                        <label htmlFor="endDate">End Date:</label>
                        <input
                            type="date"
                            id="endDate"
                            name="endDate"
                            value={searchDateRange.endDate}
                            onChange={handleDateRangeChange}
                        />
                    </div>

                    <div className="search-button">
                        <button onClick={filterData}>Search</button>
                        <button onClick={exportToExcel}>Export to Excel</button>
                    </div>
                </div>
            </form>

            <table className="summary-table">
                <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Date of Birth</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>Zip Code</th>
                    <th>Land Line</th>
                    <th>Cellular Phone</th>
                    <th>Infected by COVID-19</th>
                    <th>Health Conditions</th>
                </tr>
                </thead>
                <tbody>
                {filteredData.map(user => (
                    <tr key={user.id}>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{format(new Date(user.dob), 'yyyy-MM-dd')}</td>
                        <td>{user.address}</td>
                        <td>{user.city}</td>
                        <td>{user.zipCode}</td>
                        <td>{user.landLine}</td>
                        <td>{user.cellPhone}</td>
                        <td>{user.infectedByCovid ? 'Yes' : 'No'}</td>
                        <td>{user.healthConditions}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default SummaryPage;
