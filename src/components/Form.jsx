import { useState } from "react";
import "./Form.css";     // ← external styles

export default function Form() {
  const initialState = {
    name: "",
    email: "",
    password: "",
    country: "",
    agree: false,
  };
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors]        = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const err = {};
    if (!formData.name.trim()) err.name = "Name is required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) err.email = "Email is invalid";
    if (formData.password.length < 6) err.password = "Password ≥ 6 chars";
    if (!formData.country) err.country = "Select a country";
    if (!formData.agree) err.agree = "Accept the terms";
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);

    if (Object.keys(found).length === 0) {
      alert("✅ Form submitted!");
      console.log(formData);
      setFormData(initialState);          // ← clear all fields
    }
  };

  return (
    <form className="form-wrapper" onSubmit={handleSubmit}>
      <h2>React Full Form</h2>

      <label>Name</label>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      {errors.name && <p className="err">{errors.name}</p>}

      <label>Email</label>
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
      />
      {errors.email && <p className="err">{errors.email}</p>}

      <label>Password</label>
      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
      />
      {errors.password && <p className="err">{errors.password}</p>}

      <label>Country</label>
      <select
        name="country"
        value={formData.country}
        onChange={handleChange}
      >
        <option value="">-- Select Country --</option>
        <option>India</option>
        <option>USA</option>
        <option>UK</option>
      </select>
      {errors.country && <p className="err">{errors.country}</p>}

      <label className="checkbox-row">
        <input
          type="checkbox"
          name="agree"
          checked={formData.agree}
          onChange={handleChange}
        />
        I agree to the terms
      </label>
      {errors.agree && <p className="err">{errors.agree}</p>}

      <button type="submit">Submit</button>
    </form>
  );
}
