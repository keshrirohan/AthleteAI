"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    username: "",
    age: "",
    gender: "",
    dob: "",
    country: "", // ✅ Added
    state: "",
    district: "", // ✅ Added
    documentType: "Aadhaar",
    documentNumber: "",
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch countries
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch(
          "https://countriesnow.space/api/v0.1/countries/positions"
        );
        const json = await res.json();
        const list = Array.isArray(json?.data) ? json.data : [];
        setCountries(list);
      } catch (err) {
        console.error("fetchCountries error:", err);
        setCountries([]);
      }
    };
    fetchCountries();
  }, []);

  // Fetch states when country changes
  useEffect(() => {
    if (!formData.country) {
      setStates([]);
      setCities([]);
      return;
    }

    const fetchStates = async () => {
      try {
        const res = await fetch(
          "https://countriesnow.space/api/v0.1/countries/states",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ country: formData.country }),
          }
        );
        const json = await res.json();
        const list = Array.isArray(json?.data?.states) ? json.data.states : [];
        setStates(list);
        setFormData((prev) => ({ ...prev, state: "", district: "" }));
        setCities([]);
      } catch (err) {
        console.error("fetchStates error:", err);
        setStates([]);
        setCities([]);
      }
    };

    fetchStates();
  }, [formData.country]);

  // Fetch cities when state changes
  useEffect(() => {
    if (!formData.country || !formData.state) {
      setCities([]);
      return;
    }

    const fetchCities = async () => {
      try {
        const res = await fetch(
          "https://countriesnow.space/api/v0.1/countries/state/cities",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              country: formData.country,
              state: formData.state,
            }),
          }
        );
        const json = await res.json();
        const list = Array.isArray(json?.data) ? json.data : [];
        setCities(list);
        setFormData((prev) => ({ ...prev, district: "" }));
      } catch (err) {
        console.error("fetchCities error:", err);
        setCities([]);
      }
    };

    fetchCities();
  }, [formData.state, formData.country]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validate form before submit
  const validateForm = () => {
    const required = [
      "firstName",
      "lastName",
      "email",
      "password",
      "username",
      "age",
      "gender",
      "dob",
      "country",
      "state",
      "district",
      "documentType",
      "documentNumber",
    ];

    console.log("Validating formData:", formData);

    for (const key of required) {
      const val = String(formData[key] ?? "").trim();
      if (!val) {
        console.error(`Error: ${key} is missing`);
        alert(`${key} is required`);
        return { ok: false, message: `${key} is required` };
      }
    }

    console.log("Validation Passed ✅");
    return { ok: true };
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const check = validateForm();
    if (!check.ok) return;

    console.log("Sending to backend:", formData);

    setLoading(true);
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("Server Response:", data);

      if (res.status === 201) {
        alert("Signup successful! Please login.");
        router.push(`/dashboard/${data.user.username}`);
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (err) {
      console.error("Network Error:", err);
      alert("Something went wrong, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    
      <div className="max-w-2xl mx-auto mt-8 bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Signup</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          {/* First & Last Name */}
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            type="text"
            placeholder="First Name"
            className="border p-2 rounded"
            required
          />
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            type="text"
            placeholder="Last Name"
            className="border p-2 rounded"
            required
          />

          {/* Email */}
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            placeholder="Email"
            className="border p-2 rounded col-span-2"
            required
          />

          {/* Password */}
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            placeholder="Password"
            className="border p-2 rounded col-span-2"
            required
          />

          {/* Username */}
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            type="text"
            placeholder="Username"
            className="border p-2 rounded col-span-2"
            required
          />

          {/* Age & Gender */}
          <input
            name="age"
            value={formData.age}
            onChange={handleChange}
            type="number"
            placeholder="Age"
            className="border p-2 rounded"
            required
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          {/* Date of Birth */}
          <input
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            type="date"
            className="border p-2 rounded col-span-2"
            required
          />

          {/* Country */}
          <select
            name="country"
            value={formData.country}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                country: e.target.value,
                state: "",
                district: "",
              }))
            }
            className="border p-2 rounded col-span-2"
            required
          >
            <option value="">Select Country</option>
            {countries.map((c, idx) => (
              <option key={idx} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>

          {/* State */}
          {states.length > 0 && (
            <select
              name="state"
              value={formData.state}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  state: e.target.value,
                  district: "",
                }))
              }
              className="border p-2 rounded col-span-2"
              required
            >
              <option value="">Select State</option>
              {states.map((s, idx) => (
                <option key={idx} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
          )}

          {/* District */}
          {cities.length > 0 && (
            <select
              name="district"
              value={formData.district}
              onChange={handleChange}
              className="border p-2 rounded col-span-2"
              required
            >
              <option value="">Select District</option>
              {cities.map((district, idx) => (
                <option key={idx} value={district}>
                  {district}
                </option>
              ))}
            </select>
          )}

          {/* Document Type */}
          <select
            name="documentType"
            value={formData.documentType}
            onChange={handleChange}
            className="border p-2 rounded col-span-2"
            required
          >
            <option value="Aadhaar">Aadhaar</option>
            <option value="Passport">Passport</option>
            <option value="Driving License">Driving License</option>
          </select>

          {/* Document Number */}
          <input
            name="documentNumber"
            value={formData.documentNumber}
            onChange={handleChange}
            type="text"
            placeholder="Document Number"
            className="border p-2 rounded col-span-2"
            required
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="col-span-2 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Signup"}
          </button>
        </form>
      </div>{" "}
    
  );
}
