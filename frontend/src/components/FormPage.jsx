// import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
// import API from "../api";

// function useQuery() {
//   return new URLSearchParams(useLocation().search);
// }

// export default function FormPage() {
//   const query = useQuery();
//   const email = query.get("email");
//   const token = query.get("token");

//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     department: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await API.submitForm(email, token, formData);
//       alert("Form submitted successfully!");
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       alert("Failed to submit form. Check console for details.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex justify-center items-center transition-colors duration-500">
//       <div className="bg-white/5 backdrop-blur-md shadow-xl rounded-xl p-10 w-full max-w-md border border-gray-700">
//         <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-center mb-8 drop-shadow-lg">
//           Submit Your Details
//         </h1>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="block text-sm font-semibold text-gray-300 mb-1">Name</label>
//             <input
//               type="text"
//               name="name"
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 bg-gray-900/60 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 transition"
//               placeholder="Enter your name"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-semibold text-gray-300 mb-1">Phone</label>
//             <input
//               type="text"
//               name="phone"
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 bg-gray-900/60 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 transition"
//               placeholder="Enter your phone number"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-semibold text-gray-300 mb-1">Department</label>
//             <input
//               type="text"
//               name="department"
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 bg-gray-900/60 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 transition"
//               placeholder="Enter your department"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition"
//           >
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// // }

// import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
// import API from "../api";

// // Utility for validation
// const validate = (step, formData) => {
//   const errors = {};
//   if (step === 1) {
//     if (!formData.name.trim()) errors.name = "Name is required";
//     else if (formData.name.length < 2) errors.name = "Name is too short";
//   }
//   if (step === 2) {
//     if (!formData.phone.trim()) errors.phone = "Phone is required";
//     else if (!/^\d{10}$/.test(formData.phone))
//       errors.phone = "Enter a valid 10-digit phone number";
//   }
//   if (step === 3) {
//     if (!formData.department.trim()) errors.department = "Department is required";
//   }
//   return errors;
// };

// function useQuery() {
//   return new URLSearchParams(useLocation().search);
// }

// export default function FormPage() {
//   const query = useQuery();
//   const email = query.get("email");
//   const token = query.get("token");

//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     department: "",
//   });
//   const [step, setStep] = useState(1);
//   const [errors, setErrors] = useState({});
//   const [submitting, setSubmitting] = useState(false);
//   const [submitted, setSubmitted] = useState(false); // For thank you page

//   // For accessibility: focus on first invalid field
//   const inputRefs = {
//     name: React.useRef(),
//     phone: React.useRef(),
//     department: React.useRef(),
//   };

//   // Steps for progress indicator
//   const steps = [
//     { label: "Name" },
//     { label: "Phone" },
//     { label: "Department" },
//   ];

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: undefined });
//   };

//   const handleNext = () => {
//     const stepErrors = validate(step, formData);
//     setErrors(stepErrors);
//     if (Object.keys(stepErrors).length === 0) {
//       setStep((s) => s + 1);
//     } else {
//       // Focus on the first error field
//       const firstError = Object.keys(stepErrors)[0];
//       inputRefs[firstError]?.current?.focus();
//     }
//   };

//   const handlePrev = () => setStep((s) => s - 1);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const stepErrors = validate(step, formData);
//     setErrors(stepErrors);
//     if (Object.keys(stepErrors).length > 0) {
//       // Focus on the first error field
//       const firstError = Object.keys(stepErrors)[0];
//       inputRefs[firstError]?.current?.focus();
//       return;
//     }
//     setSubmitting(true);
//     try {
//       await API.submitForm(email, token, formData);
//       setSubmitting(false);
//       setSubmitted(true); // Show thank you page
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       alert("Failed to submit form. Check console for details.");
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex justify-center items-center px-2 transition-colors duration-500">
//       <div className="bg-white/5 backdrop-blur-md shadow-xl rounded-xl p-6 sm:p-10 w-full max-w-md border border-gray-700">
//         {/* Show Thank You Page if submitted */}
//         {submitted ? (
//           <div className="flex flex-col items-center justify-center min-h-[300px]">
//             <svg
//               className="w-20 h-20 text-green-400 mb-4"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               aria-hidden="true"
//             >
//               <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M8 12l2 2l4-4"
//               />
//             </svg>
//             <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-center mb-2">
//               Thank You!
//             </h2>
//             <p className="text-gray-300 text-center mb-4">
//               Your details have been submitted successfully.<br />
//               We appreciate your response.
//             </p>
//             <div className="bg-gray-800/80 rounded-lg px-4 py-3 text-sm text-gray-400 mb-2">
//               <div><span className="font-semibold text-gray-200">Name:</span> {formData.name}</div>
//               <div><span className="font-semibold text-gray-200">Phone:</span> {formData.phone}</div>
//               <div><span className="font-semibold text-gray-200">Department:</span> {formData.department}</div>
//             </div>
//             <button
//               className="mt-4 py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
//               onClick={() => window.location.reload()}
//             >
//               Fill Another Response
//             </button>
//           </div>
//         ) : (
//           <>
//             {/* Progress Indicator */}
//             <div className="flex items-center justify-center mb-8 space-x-2 sm:space-x-4" aria-label="Progress">
//               {steps.map((s, idx) => (
//                 <React.Fragment key={s.label}>
//                   <div
//                     className={`w-8 h-8 flex items-center justify-center rounded-full border-2 
//                       ${step === idx + 1
//                         ? "bg-blue-500 border-blue-400 text-white"
//                         : step > idx + 1
//                         ? "bg-green-500 border-green-400 text-white"
//                         : "bg-gray-800 border-gray-600 text-gray-400"}
//                       transition`}
//                     aria-current={step === idx + 1 ? "step" : undefined}
//                   >
//                     {idx + 1}
//                   </div>
//                   {idx < steps.length - 1 && (
//                     <div className="h-1 w-6 sm:w-10 bg-gray-700 rounded"></div>
//                   )}
//                 </React.Fragment>
//               ))}
//             </div>
//             <form onSubmit={handleSubmit} className="space-y-6" aria-label="User details form">
//               {step === 1 && (
//                 <div>
//                   <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-1">
//                     Name <span className="text-red-400">*</span>
//                   </label>
//                   <input
//                     ref={inputRefs.name}
//                     id="name"
//                     name="name"
//                     type="text"
//                     autoComplete="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                     aria-invalid={!!errors.name}
//                     aria-describedby={errors.name ? "name-error" : undefined}
//                     className={`w-full px-4 py-2 bg-gray-900/60 border rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 transition
//                       ${errors.name ? "border-red-500" : "border-gray-700"}`}
//                     placeholder="Enter your name"
//                   />
//                   {errors.name && (
//                     <span id="name-error" className="text-red-400 text-xs mt-1 block" role="alert">
//                       {errors.name}
//                     </span>
//                   )}
//                 </div>
//               )}
//               {step === 2 && (
//                 <div>
//                   <label htmlFor="phone" className="block text-sm font-semibold text-gray-300 mb-1">
//                     Phone <span className="text-red-400">*</span>
//                   </label>
//                   <input
//                     ref={inputRefs.phone}
//                     id="phone"
//                     name="phone"
//                     type="tel"
//                     autoComplete="tel"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     required
//                     aria-invalid={!!errors.phone}
//                     aria-describedby={errors.phone ? "phone-error" : undefined}
//                     className={`w-full px-4 py-2 bg-gray-900/60 border rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 transition
//                       ${errors.phone ? "border-red-500" : "border-gray-700"}`}
//                     placeholder="Enter your 10-digit phone number"
//                     pattern="\d{10}"
//                     maxLength={10}
//                   />
//                   {errors.phone && (
//                     <span id="phone-error" className="text-red-400 text-xs mt-1 block" role="alert">
//                       {errors.phone}
//                     </span>
//                   )}
//                 </div>
//               )}
//               {step === 3 && (
//                 <div>
//                   <label htmlFor="department" className="block text-sm font-semibold text-gray-300 mb-1">
//                     Department <span className="text-red-400">*</span>
//                   </label>
//                   <input
//                     ref={inputRefs.department}
//                     id="department"
//                     name="department"
//                     type="text"
//                     autoComplete="organization"
//                     value={formData.department}
//                     onChange={handleChange}
//                     required
//                     aria-invalid={!!errors.department}
//                     aria-describedby={errors.department ? "department-error" : undefined}
//                     className={`w-full px-4 py-2 bg-gray-900/60 border rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 transition
//                       ${errors.department ? "border-red-500" : "border-gray-700"}`}
//                     placeholder="Enter your department"
//                   />
//                   {errors.department && (
//                     <span id="department-error" className="text-red-400 text-xs mt-1 block" role="alert">
//                       {errors.department}
//                     </span>
//                   )}
//                 </div>
//               )}

//               {/* Navigation Buttons */}
//               <div className="flex justify-between items-center gap-2">
//                 {step > 1 && (
//                   <button
//                     type="button"
//                     onClick={handlePrev}
//                     className="py-2 px-4 bg-gray-700 text-gray-200 font-semibold rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                   >
//                     Previous
//                   </button>
//                 )}
//                 {step < 3 && (
//                   <button
//                     type="button"
//                     onClick={handleNext}
//                     className="ml-auto py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                   >
//                     Next
//                   </button>
//                 )}
//                 {step === 3 && (
//                   <button
//                     type="submit"
//                     disabled={submitting}
//                     className="ml-auto py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
//                   >
//                     {submitting ? "Submitting..." : "Submit"}
//                   </button>
//                 )}
//               </div>
//             </form>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }
import React, { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import API from "../api";

// Simple validation for feedback
const validate = (formData) => {
  const errors = {};
  if (!formData.feedback.trim()) errors.feedback = "Feedback is required";
  else if (formData.feedback.length < 5) errors.feedback = "Feedback is too short";
  return errors;
};

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function FormPage() {
  const query = useQuery();
  const email = query.get("email");
  const token = query.get("token");

  const [formData, setFormData] = useState({
    feedback: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const feedbackRef = useRef();

  const handleChange = (e) => {
    setFormData({ ...formData, feedback: e.target.value });
    setErrors({ ...errors, feedback: undefined });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const stepErrors = validate(formData);
    setErrors(stepErrors);
    if (Object.keys(stepErrors).length > 0) {
      feedbackRef.current?.focus();
      return;
    }
    setSubmitting(true);
    try {
      await API.submitForm(email, token, formData);
      setSubmitting(false);
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form. Check console for details.");
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex justify-center items-center px-2 transition-colors duration-500">
      <div className="bg-white/5 backdrop-blur-md shadow-xl rounded-xl p-6 sm:p-10 w-full max-w-md border border-gray-700">
        {submitted ? (
          <div className="flex flex-col items-center justify-center min-h-[300px]">
            <svg
              className="w-20 h-20 text-green-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 12l2 2l4-4"
              />
            </svg>
            <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-center mb-2">
              Thank You!
            </h2>
            <p className="text-gray-300 text-center mb-4">
              Your feedback has been submitted successfully.<br />
              We appreciate your response.
            </p>
            <div className="bg-gray-800/80 rounded-lg px-4 py-3 text-sm text-gray-400 mb-2">
              <div>
                <span className="font-semibold text-gray-200">Feedback:</span> {formData.feedback}
              </div>
            </div>
            <button
              className="mt-4 py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={() => window.location.reload()}
            >
              Submit Another Feedback
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6" aria-label="Feedback form">
            <div>
              <label htmlFor="feedback" className="block text-sm font-semibold text-gray-300 mb-1">
                Feedback <span className="text-red-400">*</span>
              </label>
              <textarea
                ref={feedbackRef}
                id="feedback"
                name="feedback"
                rows={5}
                value={formData.feedback}
                onChange={handleChange}
                required
                aria-invalid={!!errors.feedback}
                aria-describedby={errors.feedback ? "feedback-error" : undefined}
                className={`w-full px-4 py-2 bg-gray-900/60 border rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 transition
                  ${errors.feedback ? "border-red-500" : "border-gray-700"}`}
                placeholder="Enter your feedback"
              />
              {errors.feedback && (
                <span id="feedback-error" className="text-red-400 text-xs mt-1 block" role="alert">
                  {errors.feedback}
                </span>
              )}
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            >
              {submitting ? "Submitting..." : "Submit Feedback"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
