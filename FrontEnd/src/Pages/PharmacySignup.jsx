
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Upload, MapPin, Plus, Trash2, X } from "lucide-react";
import api from "../services/api";

function PharmacyRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    pharmacy_name: ""
  });

  const [branches, setBranches] = useState([
    {
      branch_name: "Main Branch",
      city: "",
      address: "",
      phone: "",
      latitude: "",
      longitude: ""
    }
  ]);

  const [hasMultipleBranches, setHasMultipleBranches] = useState(false);
  const [licenseFile, setLicenseFile] = useState(null);
  const [licensePreview, setLicensePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [locatingIndex, setLocatingIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

    setErrors({
      ...errors,
      [name]: ""
    });
  };

  const handleBranchChange = (index, e) => {
    const { name, value } = e.target;

    const updatedBranches = [...branches];
    updatedBranches[index][name] = value;

    setBranches(updatedBranches);

    setErrors({
      ...errors,
      [`branch_${index}_${name}`]: ""
    });
  };

  const handleMultipleBranches = (value) => {
    setHasMultipleBranches(value);

    if (!value) {
      setBranches([branches[0]]);
    } else if (branches.length < 2) {
      setBranches([
        ...branches,
        {
          branch_name: "Branch 2",
          city: "",
          address: "",
          phone: "",
          latitude: "",
          longitude: ""
        }
      ]);
    }
  };

  const addBranch = () => {
    if (branches.length >= 20) return;

    setBranches([
      ...branches,
      {
        branch_name: `Branch ${branches.length + 1}`,
        city: "",
        address: "",
        phone: "",
        latitude: "",
        longitude: ""
      }
    ]);
  };

  const removeBranch = (index) => {
    if (branches.length <= 2) return;

    setBranches(branches.filter((_, i) => i !== index));
  };

  const handleBranchCountChange = (e) => {
    const count = Math.max(2, Math.min(20, Number(e.target.value) || 2));

    if (count > branches.length) {
      const newBranches = [...branches];

      for (let i = branches.length; i < count; i++) {
        newBranches.push({
          branch_name: `Branch ${i + 1}`,
          city: "",
          address: "",
          phone: "",
          latitude: "",
          longitude: ""
        });
      }

      setBranches(newBranches);
    } else {
      setBranches(branches.slice(0, count));
    }
  };

  const handleGetLocation = (index) => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    setLocatingIndex(index);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const updatedBranches = [...branches];

        updatedBranches[index].latitude =
          position.coords.latitude.toFixed(6);

        updatedBranches[index].longitude =
          position.coords.longitude.toFixed(6);

        setBranches(updatedBranches);
        setLocatingIndex(null);
      },
      () => {
        setError("Could not detect location. Enter coordinates manually.");
        setLocatingIndex(null);
      }
    );
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "application/pdf"
    ];

    if (!allowedTypes.includes(file.type)) {
      setErrors({
        ...errors,
        license: "Upload a JPG, PNG, WebP or PDF file"
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors({
        ...errors,
        license: "File must be under 5MB"
      });
      return;
    }

    setLicenseFile(file);
    setErrors({
      ...errors,
      license: ""
    });

    if (file.type.startsWith("image/")) {
      setLicensePreview(URL.createObjectURL(file));
    } else {
      setLicensePreview(null);
    }
  };

  const clearFile = () => {
    setLicenseFile(null);
    setLicensePreview(null);
  };

  const validate = () => {
    const newErrors = {};

    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{2,50}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const coordinateRegex = /^-?\d+(\.\d+)?$/;

    if (!formData.first_name.trim()) {
      newErrors.first_name = "First name is required";
    } else if (!nameRegex.test(formData.first_name.trim())) {
      newErrors.first_name = "Enter a valid first name";
    }

    if (!formData.last_name.trim()) {
      newErrors.last_name = "Last name is required";
    } else if (!nameRegex.test(formData.last_name.trim())) {
      newErrors.last_name = "Enter a valid last name";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Minimum 8 characters";
    }

    if (!formData.pharmacy_name.trim()) {
      newErrors.pharmacy_name = "Pharmacy name is required";
    }

    if (!licenseFile) {
      newErrors.license = "Pharmacy license is required";
    }

    branches.forEach((branch, index) => {
      if (hasMultipleBranches && !branch.branch_name.trim()) {
        newErrors[`branch_${index}_branch_name`] = "Branch name is required";
      }

      if (!branch.city.trim()) {
        newErrors[`branch_${index}_city`] = "City is required";
      }

      if (!branch.address.trim()) {
        newErrors[`branch_${index}_address`] = "Address is required";
      }

      if (
        branch.latitude &&
        !coordinateRegex.test(branch.latitude)
      ) {
        newErrors[`branch_${index}_latitude`] = "Invalid latitude";
      } else if (
        branch.latitude &&
        (Number(branch.latitude) < -90 || Number(branch.latitude) > 90)
      ) {
        newErrors[`branch_${index}_latitude`] = "Latitude must be between -90 and 90";
      }

      if (
        branch.longitude &&
        !coordinateRegex.test(branch.longitude)
      ) {
        newErrors[`branch_${index}_longitude`] = "Invalid longitude";
      } else if (
        branch.longitude &&
        (Number(branch.longitude) < -180 || Number(branch.longitude) > 180)
      ) {
        newErrors[`branch_${index}_longitude`] = "Longitude must be between -180 and 180";
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validate()) return;

    try {
      setLoading(true);

      const formattedBranches = branches.map((branch) => ({
        branch_name: branch.branch_name.trim() || "Main Branch",
        city: branch.city.trim(),
        address: branch.address.trim(),
        phone: branch.phone.trim() || null,
        latitude: branch.latitude ? Number(branch.latitude) : null,
        longitude: branch.longitude ? Number(branch.longitude) : null
      }));

      const payload = new FormData();

      payload.append("first_name", formData.first_name.trim());
      payload.append("last_name", formData.last_name.trim());
      payload.append("email", formData.email.trim().toLowerCase());
      payload.append("password", formData.password);
      payload.append("pharmacy_name", formData.pharmacy_name.trim());
      payload.append("license_document", licenseFile);
      payload.append("branches", JSON.stringify(formattedBranches));

      await api.post("/pharmacies/register", payload, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      navigate("/pharmacy-login");
    } catch (err) {
      setError(
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field) =>
    `w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-800 bg-white outline-none ${
      errors[field]
        ? "border-red-400"
        : "border-slate-300 focus:border-teal-600"
    }`;

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 sm:p-8 w-full max-w-2xl"
      >
        <h1 className="text-xl font-semibold text-slate-900 mb-1">
          Register a Pharmacy
        </h1>

        <p className="text-sm text-slate-500 mb-6">
          Create an owner account and register your pharmacy locations.
        </p>

        <p className="text-xs font-semibold uppercase text-slate-400 mb-3">
          Account Owner
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">First name</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className={inputClass("first_name")}
              placeholder="First name"
            />
            {errors.first_name && (
              <p className="text-red-500 text-xs mt-1">{errors.first_name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Last name</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className={inputClass("last_name")}
              placeholder="Last name"
            />
            {errors.last_name && (
              <p className="text-red-500 text-xs mt-1">{errors.last_name}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-1">Work email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={inputClass("email")}
              placeholder="pharmacy@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>

            <div className="flex items-center border border-slate-300 rounded-lg">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 text-sm outline-none rounded-lg"
                placeholder="Minimum 8 characters"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="px-3 text-slate-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>
        </div>

        <div className="border-t border-slate-100 pt-4">
          <p className="text-xs font-semibold uppercase text-slate-400 mb-3">
            Pharmacy Information
          </p>

          <label className="block text-sm font-medium mb-1">
            Pharmacy name
          </label>
          <input
            type="text"
            name="pharmacy_name"
            value={formData.pharmacy_name}
            onChange={handleChange}
            className={inputClass("pharmacy_name")}
            placeholder="Pharmacy name"
          />
          {errors.pharmacy_name && (
            <p className="text-red-500 text-xs mt-1">{errors.pharmacy_name}</p>
          )}

          <div className="mt-5 mb-6">
            <label className="block text-sm font-medium mb-2">
              Pharmacy license
            </label>

            {!licenseFile ? (
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-lg p-5 cursor-pointer hover:border-teal-600">
                <Upload size={20} className="text-slate-400 mb-2" />
                <span className="text-sm font-medium text-slate-700">
                  Click to upload license
                </span>
                <span className="text-xs text-slate-400 mt-1">
                  JPG, PNG, WebP or PDF (max 5MB)
                </span>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="flex items-center justify-between p-3 border rounded-lg bg-slate-50">
                <div className="flex items-center gap-3 min-w-0">
                  {licensePreview ? (
                    <img
                      src={licensePreview}
                      alt="License preview"
                      className="w-12 h-12 rounded object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 flex items-center justify-center bg-teal-50 text-teal-700 rounded">
                      PDF
                    </div>
                  )}

                  <div className="truncate">
                    <p className="text-sm font-medium truncate">
                      {licenseFile.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {(licenseFile.size / 1024).toFixed(0)} KB
                    </p>
                  </div>
                </div>

                <button type="button" onClick={clearFile}>
                  <X size={18} />
                </button>
              </div>
            )}

            {errors.license && (
              <p className="text-red-500 text-xs mt-1">{errors.license}</p>
            )}
          </div>
        </div>

        <div className="border-t border-slate-100 pt-4 mb-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium">Do you have multiple branches?</p>
              <p className="text-xs text-slate-500">
                Register all pharmacy locations.
              </p>
            </div>

            <div className="flex border rounded-lg p-1 bg-slate-50">
              <button
                type="button"
                onClick={() => handleMultipleBranches(false)}
                className={`px-3 py-1.5 text-xs rounded-md ${
                  !hasMultipleBranches ? "bg-white shadow-sm" : "text-slate-500"
                }`}
              >
                No
              </button>

              <button
                type="button"
                onClick={() => handleMultipleBranches(true)}
                className={`px-3 py-1.5 text-xs rounded-md ${
                  hasMultipleBranches ? "bg-white shadow-sm" : "text-slate-500"
                }`}
              >
                Yes
              </button>
            </div>
          </div>

          {hasMultipleBranches && (
            <div className="mt-4 flex items-center gap-3">
              <label className="text-sm">Number of branches:</label>
              <input
                type="number"
                min="2"
                max="20"
                value={branches.length}
                onChange={handleBranchCountChange}
                className="w-20 px-3 py-1.5 border rounded-lg text-sm"
              />
            </div>
          )}
        </div>

        <div className="space-y-4 mb-6">
          {branches.map((branch, index) => (
            <div key={index} className="p-4 rounded-lg border bg-slate-50">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold uppercase text-slate-500">
                  {hasMultipleBranches ? `Branch #${index + 1}` : "Location Details"}
                </p>

                {hasMultipleBranches && branches.length > 2 && (
                  <button
                    type="button"
                    onClick={() => removeBranch(index)}
                    className="flex items-center gap-1 text-xs text-red-500"
                  >
                    <Trash2 size={14} />
                    Remove
                  </button>
                )}
              </div>

              {hasMultipleBranches && (
                <div className="mb-3">
                  <label className="block text-xs font-medium mb-1">
                    Branch name
                  </label>
                  <input
                    name="branch_name"
                    value={branch.branch_name}
                    onChange={(e) => handleBranchChange(index, e)}
                    className={inputClass(`branch_${index}_branch_name`)}
                    placeholder="Branch name"
                  />
                  {errors[`branch_${index}_branch_name`] && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors[`branch_${index}_branch_name`]}
                    </p>
                  )}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-xs font-medium mb-1">City</label>
                  <input
                    name="city"
                    value={branch.city}
                    onChange={(e) => handleBranchChange(index, e)}
                    className={inputClass(`branch_${index}_city`)}
                    placeholder="City"
                  />
                  {errors[`branch_${index}_city`] && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors[`branch_${index}_city`]}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1">
                    Phone (optional)
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    value={branch.phone}
                    onChange={(e) => handleBranchChange(index, e)}
                    className={inputClass(`branch_${index}_phone`)}
                    placeholder="+383 44 000 000"
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="block text-xs font-medium mb-1">
                  Street address
                </label>
                <input
                  name="address"
                  value={branch.address}
                  onChange={(e) => handleBranchChange(index, e)}
                  className={inputClass(`branch_${index}_address`)}
                  placeholder="Street name and number"
                />
                {errors[`branch_${index}_address`] && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors[`branch_${index}_address`]}
                  </p>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-medium">Coordinates</label>

                  <button
                    type="button"
                    onClick={() => handleGetLocation(index)}
                    disabled={locatingIndex === index}
                    className="flex items-center gap-1 text-xs text-teal-700"
                  >
                    <MapPin size={13} />
                    {locatingIndex === index ? "Detecting..." : "Use current location"}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <input
                      name="latitude"
                      value={branch.latitude}
                      onChange={(e) => handleBranchChange(index, e)}
                      className={inputClass(`branch_${index}_latitude`)}
                      placeholder="Latitude"
                    />
                    {errors[`branch_${index}_latitude`] && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors[`branch_${index}_latitude`]}
                      </p>
                    )}
                  </div>

                  <div>
                    <input
                      name="longitude"
                      value={branch.longitude}
                      onChange={(e) => handleBranchChange(index, e)}
                      className={inputClass(`branch_${index}_longitude`)}
                      placeholder="Longitude"
                    />
                    {errors[`branch_${index}_longitude`] && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors[`branch_${index}_longitude`]}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {hasMultipleBranches && branches.length < 20 && (
            <button
              type="button"
              onClick={addBranch}
              className="flex items-center gap-1 text-sm text-teal-700 font-medium"
            >
              <Plus size={16} />
              Add another branch
            </button>
          )}
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium py-2.5 rounded-lg disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Create pharmacy account"}
        </button>

        <div className="mt-6 pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-slate-500">
          <span>
            Already registered?{" "}
            <Link to="/pharmacy-login" className="text-teal-700 font-medium">
              Pharmacy sign in
            </Link>
          </span>

          <Link to="/register" className="hover:text-slate-700">
            Register as a patient
          </Link>
        </div>
      </form>
    </div>
  );
}

export default PharmacyRegister;
