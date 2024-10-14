"use client"
import { React, useState, useEffect, createContext } from "react";
import axios from "axios";
import jsPDF from 'jspdf';

const PdfPage = () => {
  const [data, setData] = useState(null);
  const InsurerCode = 13;

  useEffect(() => {

      axios
      .get(
        process.env.NEXT_PUBLIC_URL_PD +
          process.env.NEXT_PUBLIC_URL_IllnessType +
          InsurerCode
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });


  }, []);

  useEffect(() => {
    if (data) {
      const doc = new jsPDF();
      doc.text(`Insurance Benefits List\n\nType: ${data.type}\nPolicyNo: ${data.policyNo}\nPlanName: ${data.planName}\nMessageTh: ${data.messageTh}\nCheck eligible: ${data.checkEligible}`, 10, 10);
      doc.save('output.pdf');
    }
  }, [data]);

  return (
    <div>
    {data ? <p>PDF is being generated...</p> : <p>Loading data...</p>}
  </div>
  );
};

export default PdfPage;
