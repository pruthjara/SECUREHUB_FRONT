import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import "./VpnRequest.css";

const VpnRequest = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    dni: "",
    phone: "",
    email: "",
    duration: "Permanent",
    expirationDate: "",
    mainGroup: "",
    researchGroup: "",
    otherGroups: "",
    wifiDevice: "",
    requestVPN: false,
    requestFor: "Self",
    observations: "",
  });

  // Actualizar valores del formulario
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Función para generar el PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.text("VPN Access Request Form", 20, 20);

    doc.setFont("helvetica", "normal");
    doc.text(`Full Name: ${formData.fullName}`, 20, 40);
    doc.text(`DNI/Passport: ${formData.dni}`, 20, 50);
    doc.text(`Phone: ${formData.phone}`, 20, 60);
    doc.text(`Email: ${formData.email}`, 20, 70);
    doc.text(`Duration: ${formData.duration}`, 20, 80);
    if (formData.duration === "Temporary") {
      doc.text(`Expiration Date: ${formData.expirationDate}`, 20, 90);
    }
    doc.text(`Main Group: ${formData.mainGroup}`, 20, 100);
    doc.text(`Research Group: ${formData.researchGroup}`, 20, 110);
    doc.text(`Other Groups: ${formData.otherGroups}`, 20, 120);
    doc.text(`WiFi Device: ${formData.wifiDevice}`, 20, 130);
    doc.text(`VPN Requested: ${formData.requestVPN ? "Yes" : "No"}`, 20, 140);
    doc.text(`Request For: ${formData.requestFor}`, 20, 150);
    doc.text("Observations:", 20, 160);
    doc.text(formData.observations || "None", 20, 170);

    doc.save("VPN_Request.pdf");
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    generatePDF();
    alert("VPN request form submitted and PDF generated!");
    navigate("/");
  };

  return (
    <div className="vpn-request-container">
      <h2>VPN Access Request</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label>
            Full Name:
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
          </label>
          <label>
            DNI/Passport:
            <input type="text" name="dni" value={formData.dni} onChange={handleChange} required />
          </label>
        </div>

        <div className="form-row">
          <label>
            Phone:
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </label>
        </div>

        <div className="form-row">
          <label>
            Duration:
            <select name="duration" value={formData.duration} onChange={handleChange}>
              <option value="Permanent">Permanent</option>
              <option value="Temporary">Temporary</option>
            </select>
          </label>
          {formData.duration === "Temporary" && (
            <label>
              Expiration Date:
              <input type="date" name="expirationDate" value={formData.expirationDate} onChange={handleChange} />
            </label>
          )}
        </div>

        <div className="form-row">
          <label>
            Main Group:
            <input type="text" name="mainGroup" value={formData.mainGroup} onChange={handleChange} required />
          </label>
          <label>
            Research Group:
            <input type="text" name="researchGroup" value={formData.researchGroup} onChange={handleChange} />
          </label>
        </div>

        <div className="form-row">
          <label>
            Other Groups:
            <input type="text" name="otherGroups" value={formData.otherGroups} onChange={handleChange} />
          </label>
          <label>
            WiFi Device (Yes/No):
            <input type="text" name="wifiDevice" value={formData.wifiDevice} onChange={handleChange} />
          </label>
        </div>

        <div className="form-row">
          <label>
            Request VPN:
            <input type="checkbox" name="requestVPN" checked={formData.requestVPN} onChange={handleChange} />
          </label>
          <label>
            Request For:
            <select name="requestFor" value={formData.requestFor} onChange={handleChange}>
              <option value="Self">Self</option>
              <option value="Research">Research Group</option>
              <option value="Other">Other</option>
            </select>
          </label>
        </div>

        <label className="textarea-label">
          Observations:
          <textarea name="observations" value={formData.observations} onChange={handleChange} />
        </label>

        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
};

export default VpnRequest;
