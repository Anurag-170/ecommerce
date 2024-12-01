// src/Payslip.js
import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './Payslip.css';

const Payslip = () => {
	let tp = localStorage.getItem('cartprice');
	 let pnn =localStorage.getItem('pname');
  
   let pm=localStorage.getItem('pmode');
  const employee = {
    name: 'John Doe',
    id: 'E12345',
    department: 'Engineering',
    designation: 'Software Developer',
    basicSalary: 5000,
    hra: 1000,
    otherAllowances: 500,
    grossSalary: 6500,
    taxDeductions: 1500,
    netSalary: 5000,
  };

  const printPDF = () => {
    const input = document.getElementById('payslip-content');
    html2canvas(input)
      .then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 10, 10);
        pdf.save('payslip.pdf');
      });
  };

  return (
    <div className="payslip-container">
      <center><h2>Invoice</h2></center>
      <div id="payslip-content" className="payslip-details">
        <p><strong>Product Name:</strong> {pnn}</p>
        
       
        <p><strong>Payment Mode:</strong> {pm}</p>
        <p><strong>Amount:</strong> Rs. {tp}</p>
        
      </div>
      <button style={{position:"absolute",right:"400px",bottom:"360px",backgroundColor:"#FF2E2E",borderRadius:'10px',width:'100px',color:'white'}} onClick={printPDF} className="print-button">Print PDF</button>
    </div>
  );
};

export default Payslip;
