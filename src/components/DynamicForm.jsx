import { useState } from "react";
import "./DynamicForm.css"; // optional styling

const formFields = [
  { label: "Name", name: "name", type: "text", required: true },
  { label: "Email", name: "email", type: "email", required: true },
  { label: "Age", name: "age", type: "number", required: false },
];

export default function DynamicForm() {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    formFields.forEach((field) => {
      if (field.required && !formData[field.name]?.trim()) {
        newErrors[field.name] = `${field.label} is required`;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert("✅ Form submitted!");
      console.log(formData);
      setFormData({});
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Dynamic Form</h2>
      {formFields.map((field) => (
        <div key={field.name} className="form-field">
          <label>{field.label}</label>
          <input
            type={field.type}
            name={field.name}
            value={formData[field.name] || ""}
            onChange={handleChange}
          />
          {errors[field.name] && (
            <p className="error">{errors[field.name]}</p>
          )}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}
