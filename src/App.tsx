
import { useState } from 'react';
import './App.css';
import axios from 'axios';

var TravelForm = () => {
  var [formData, setFormData] = useState({
    PhoneNumber: '',
    departureDate: '',
    returnDate: '',
    travelType: '',
  });


  var handleInputChange = (e: any) => {
    var { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  var handleSubmit = async (e: any) => {
    e.preventDefault();
  };

  const downloadFileAtURL = (url: any) => {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Travel_Form.xlsx');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };

  const handleUpload = () => {
    if (selectedFile) {
      // const frmData = new Blob([selectedFile], { type: selectedFile.type });
      const frmData = new FormData();
      frmData.append('frmFile', selectedFile);
      axios.post('https://localhost:44363/api/T/Uploadfile', frmData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }).then(() => {
        console.log("File uploaded");
      }).catch(err => {
        console.log("Error : ", err);
      });
    } else {
      console.warn('No file selected for upload');
    }
  };

  const Submit = () => {
    
  }

  return (
    <div className="travel-form-container">
      <div className="Excel">
        <button className="Excelbutton" onClick={() => { downloadFileAtURL("http://localhost:3000/Travel_Form.xlsx") }}> Download Excel</button>
      </div>
      <h2>Travel Form</h2>
      <form onSubmit={handleSubmit}>
        <label style={{ fontWeight: 'bold' }}>
          Phone Number:
          <input
            type="tel"
            maxLength={10}
            name="PhoneNumber"
            value={formData.PhoneNumber}
            onChange={handleInputChange}
            required
          />
        </label>

        <label style={{ fontWeight: 'bold' }}>
          Departure Date:
          <input
            type="date"
            name="departureDate"
            value={formData.departureDate}
            onChange={handleInputChange}
            required
          />
        </label>

        <label style={{ fontWeight: 'bold' }}>
          Return Date:
          <input
            type="date"
            name="returnDate"
            value={formData.returnDate}
            onChange={handleInputChange}
            required
          />
        </label>

        <label style={{ fontWeight: 'bold' }}>
          Travel Type:
          <select
            name="travelType"
            value={formData.travelType}
            onChange={handleInputChange}
            required
          >
            <option value="">Select an option</option>
            <option value="oneWay">One Way</option>
            <option value="roundTrip">Round Trip</option>
          </select>
        </label>

        <label style={{ fontWeight: 'bold' }}>
          Attachment:
          <input
            type="file"
            name="Attachment"
            onChange={handleFileChange}
          />
        </label>
        <button type='button' onClick={handleUpload}>click</button>

        <button type="submit" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default TravelForm;
