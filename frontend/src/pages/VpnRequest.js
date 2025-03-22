import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PDFDocument } from "pdf-lib";
import { saveAs } from "file-saver";
import pdfTemplate from "./RequestVPN.pdf"; // Asegúrate de que el archivo está en "public"
import "./VpnRequest.css";

const VpnRequest = ({ user }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: user?.name || "", // ✅ Autorrellena con el nombre del usuario autenticado
    dni: "",
    phone: "",
    email: user?.email || "", // ✅ Autorrellena con el email del usuario autenticado
    duration: "Permanent",
    expirationDate: "",
    mainGroup: "",
    researchGroup: "",
    otherGroups: "",
    wifiDevice: "",
    requestVPN: false,
    requestFor: "",
    observations: "",
  });

  // ✅ Rellenar automáticamente los campos con la información del usuario autenticado
  useEffect(() => {
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        fullName: user.name || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  // Obtener fecha actual en formato "DD/MM/YYYY"
  const getCurrentDate = () => {
    const date = new Date();
    return date.toLocaleDateString("es-ES");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // 📌 Función para generar el PDF con los campos correctos
  const fillPDF = async () => {
    try {
      const existingPdfBytes = await fetch(pdfTemplate).then((res) =>
        res.arrayBuffer()
      );
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const form = pdfDoc.getForm();

      // 📌 Rellenar los campos de texto en el PDF
      form.getTextField("Text1")?.setText(formData.fullName);
      form.getTextField("Text9")?.setText(formData.dni);
      form.getTextField("Text10")?.setText(formData.phone);
      form.getTextField("Text11")?.setText(formData.email);
      form.getTextField("Text12")?.setText(
        formData.duration === "Permanent" ? "Ilimitada" : `Hasta: ${formData.expirationDate}`
      );
      form.getTextField("Text13")?.setText(formData.mainGroup);
      form.getTextField("Text14")?.setText(formData.researchGroup);
      form.getTextField("Text15")?.setText(formData.otherGroups);
      form.getTextField("Text16")?.setText(formData.wifiDevice);
      form.getTextField("Text19")?.setText(formData.observations);

      // ✅ Nuevo: Fecha de solicitud (Text17)
      form.getTextField("Text17")?.setText(getCurrentDate());

      // ✅ Nuevo: Solicitud en nombre de (Text18)
      form.getTextField("Text18")?.setText(formData.requestFor);

      // 📌 Manejo del checkbox para VPN
      const vpnCheckbox = form.getCheckBox("Button1");
      if (vpnCheckbox) {
        formData.requestVPN ? vpnCheckbox.check() : vpnCheckbox.uncheck();
      } else {
        console.error("No se encontró el campo Button1 en el PDF");
      }

      // 📌 Guardar y descargar el PDF modificado
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      saveAs(blob, "Solicitud_VPN.pdf");
    } catch (error) {
      console.error("Error al generar el PDF:", error);
      alert("Error al generar el PDF.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fillPDF();
    alert("Formulario enviado y PDF generado.");
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
            WiFi Device:
            <input type="text" name="wifiDevice" value={formData.wifiDevice} onChange={handleChange} />
          </label>
        </div>

        <div className="form-row">
          <label>
            Requesting On Behalf Of (if applicable):
            <input type="text" name="requestFor" value={formData.requestFor} onChange={handleChange} />
          </label>
        </div>

        <label className="checkbox-label">
          Request VPN:
          <input type="checkbox" name="requestVPN" checked={formData.requestVPN} onChange={handleChange} />
        </label>

        <div className="form-row">
          <label>
            Observations:
            <textarea name="observations" value={formData.observations} onChange={handleChange} />
          </label>
        </div>

        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
};

export default VpnRequest;
