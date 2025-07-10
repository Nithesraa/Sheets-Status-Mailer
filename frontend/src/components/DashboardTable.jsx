import React, { useEffect, useState } from "react";
import API from "../api";

// Mock authentication (for demo)
const USER = { name: "Nithesraa", role: "admin" }; // or "viewer"

// Helper for sorting
const sortBy = (data, key, asc) => {
  return [...data].sort((a, b) => {
    if (a[key] < b[key]) return asc ? -1 : 1;
    if (a[key] > b[key]) return asc ? 1 : -1;
    return 0;
  });
};

export default function DashboardTable() {
  const [emails, setEmails] = useState([]);
  const [joining_date, setjoining_date] = useState([]);
  const [end_date, setend_date] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selected, setSelected] = useState([]);
  const [sort, setSort] = useState({ key: "email", asc: true });
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState({ open: false, data: null });

  // Pagination
  const PAGE_SIZE = 5;

  useEffect(() => {
    API.getEmails()
      .then((res) => setEmails(res.data))
      .catch((err) => console.error(err));
      
  }, []);

  // Filtered and sorted data
  const filtered = emails
    .filter(
      (row) =>
        (!search ||
          row.email.toLowerCase().includes(search.toLowerCase())) &&
        (!statusFilter || row.status === statusFilter)
    );
  const sorted = sortBy(filtered, sort.key, sort.asc);

  // Pagination logic
  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const paginated = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Analytics
  const total = emails.length;
  const submitted = emails.filter((e) => e.status === "Submitted").length;
  // const pending = emails.filter((e) => e.status === "Pending").length;
  const notSubmitted = emails.filter((e) => e.status === "Not Submitted").length;
  const failed = emails.filter((e) => e.status === "Failed").length;

  // Bulk actions
  // const toggleSelect = (email) =>
  //   setSelected((sel) =>
  //     sel.includes(email) ? sel.filter((e) => e !== email) : [...sel, email]
  //   );
  const toggleSelect = (email) => {
  const emailObj = paginated.find((row) => row.email === email);
  if (emailObj.status === "Submitted") return; // Prevent selection
  setSelected((sel) =>
    sel.includes(email) ? sel.filter((e) => e !== email) : [...sel, email]
  );
};
  // const selectAll = () =>
  //   setSelected(paginated.map((row) => row.email));
  const selectAll = () =>
  setSelected(
    paginated
      .filter((row) => row.status !== "Submitted")
      .map((row) => row.email)
  );

  const clearAll = () => setSelected([]);

  const sendMail = (email) => {
    API.sendMail(email)
      .then(() => alert(`Mail sent to ${email}`))
      .catch((err) => console.error(err));
  };




  const sendBulk = () => {
    Promise.all(selected.map((email) => API.sendMail(email)))
      .then(() => alert(`Bulk mail sent to ${selected.length} emails`))
      .catch((err) => console.error(err));
    clearAll();
  };

  // Sorting logic
  const handleSort = (key) => {
    setSort((s) => ({
      key,
      asc: s.key === key ? !s.asc : true,
    }));
  };


  const openModal = (row) =>
  setModal({
    open: true,
    data: {
      ...row,
      history: [
        { date: row.joining_date, status: "Joined" },
        { date: row.end_date, status: "Ended" }
      ]
    },
  });

  const closeModal = () => setModal({ open: false, data: null });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center p-10 transition-colors duration-500">
      {/* User Info and Role */}
      <div className="flex justify-between items-center w-full max-w-4xl mb-4">
        <div>
          <span className="text-gray-300 font-semibold">
       
          </span>
        </div>

      </div>

      {/* Analytics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl mb-6">
        <StatCard label="Total" value={total} color="from-blue-500 to-blue-700" />
        <StatCard label="Submitted" value={submitted} color="from-green-500 to-green-700" />
        {/* <StatCard label="Pending" value={pending} color="from-yellow-500 to-yellow-700" /> */}
        <StatCard label="Not Submitted" value={notSubmitted} color="from-yellow-500 to-yellow-700" />
        <StatCard label="Failed" value={failed} color="from-red-500 to-red-700" />
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 w-full max-w-4xl mb-4">
        <input
          type="text"
          placeholder="Search email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-gray-900/60 border border-gray-700 rounded-lg px-4 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 w-full md:w-1/2 transition"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-gray-900/60 border border-gray-700 rounded-lg px-4 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-1/4 transition"
        >
          <option value="">All Statuses</option>
          <option value="Submitted">Submitted</option>
          {/* <option value="Pending">Pending</option> */}
          <option value="Not Submitted">Not Submitted</option>
          <option value="Failed">Failed</option>
        </select>
      </div>

      {/* Bulk Actions */}
      {USER.role === "admin" && (
        <div className="flex items-center gap-2 w-full max-w-4xl mb-2">
          <button
            className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700"
            onClick={selectAll}
          >
            Select Page
          </button>
          <button
            className="px-3 py-1 bg-gray-600 text-white text-sm font-medium rounded hover:bg-gray-700"
            onClick={clearAll}
          >
            Clear Selection
          </button>
          <button
            className="px-3 py-1 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700"
            onClick={sendBulk}
            disabled={selected.length === 0}
          >
            Send Bulk Mail ({selected.length})
          </button>
        </div>
      )}

      {/* Table */}
      <div className="w-full max-w-4xl bg-white/5 backdrop-blur-md shadow-xl rounded-xl p-6 border border-gray-700">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-800/80">
            <tr>
              {USER.role === "admin" && (
                <th className="px-2 py-3"></th>
              )}
              <th
                className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider cursor-pointer select-none"
                onClick={() => handleSort("email")}
              >
                Email {sort.key === "email" ? (sort.asc ? "▲" : "▼") : ""}
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider cursor-pointer select-none"
                onClick={() => handleSort("status")}
              >
                Status {sort.key === "status" ? (sort.asc ? "▲" : "▼") : ""}
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-900/70 divide-y divide-gray-800">
            {paginated.map((row, index) => (
              <tr key={index} className="hover:bg-gray-800/60 transition-colors">
                {USER.role === "admin" && (
                  <td className="px-2 py-4 whitespace-nowrap">
                    {/* <input
                      type="checkbox"
                      checked={selected.includes(row.email)}
                      onChange={() => toggleSelect(row.email)}
                    /> */}
                    <input
  type="checkbox"
  checked={selected.includes(row.email)}
  onChange={() => toggleSelect(row.email)}
  disabled={row.status === "Submitted"}
  title={row.status === "Submitted" ? "Already submitted" : "Select for bulk mail"}
/>

                  </td>
                )}
                <td
                  className="px-6 py-4 whitespace-nowrap text-blue-300 underline cursor-pointer"
                  onClick={() => openModal(row)}
                  title="View history"
                >
                  {row.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 inline-flex text-xs font-bold rounded-full shadow ${
                      row.status === "Submitted"
                        ? "bg-green-600/20 text-green-300 border border-green-400"
                        : row.status === "Not Submitted"
                        ? "bg-yellow-600/20 text-yellow-300 border border-yellow-400"
                        : "bg-red-600/20 text-red-300 border border-red-400"
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {/* {USER.role === "admin" && (
                    <button
                      className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium rounded-lg shadow hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition"
                      onClick={() => sendMail(row.email)}
                    >
                      Send Mail
                    </button>
                  )} */}
                  {USER.role === "admin" && (
  <button
    className={`inline-flex items-center px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium rounded-lg shadow
      ${row.status === "Submitted" ? "opacity-50 cursor-not-allowed" : "hover:from-blue-600 hover:to-purple-700"}
      focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition`}
    onClick={() => sendMail(row.email)}
    disabled={row.status === "Submitted"}
    title={row.status === "Submitted" ? "Already submitted" : "Send Mail"}
  >
    Send Mail
  </button>
)}

                </td>
              </tr>
            ))}
            {paginated.length === 0 && (
              <tr>
                <td
                  colSpan={USER.role === "admin" ? 4 : 3}
                  className="text-center text-gray-400 py-6 italic"
                >
                  No emails found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          <button
            className="px-3 py-1 bg-gray-700 text-gray-200 rounded hover:bg-gray-600"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="text-gray-400">
            Page {page} of {totalPages}
          </span>
          <button
            className="px-3 py-1 bg-gray-700 text-gray-200 rounded hover:bg-gray-600"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {/* Email History Modal */}
      {modal.open && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-8 rounded-xl shadow-xl border border-gray-700 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-red-400"
              onClick={closeModal}
            >
              ×
            </button>
            <h2 className="text-xl font-bold text-blue-400 mb-4">
              Email History
            </h2>
            <div className="mb-2 text-gray-300">
              <strong>Email:</strong> {modal.data.email}
            </div>
            <ul className="space-y-2">
              {modal.data.history.map((h, i) => (
                <li
                  key={i}
                  className="flex justify-between items-center bg-gray-800 rounded px-4 py-2"
                >
                  <span>{h.date}</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-bold ${
                      h.status === "Submitted"
                        ? "bg-green-600/30 text-green-300"
                        : h.status === "Pending"
                        ? "bg-yellow-600/30 text-yellow-300"
                        : "bg-red-600/30 text-red-300"
                    }`}
                  >
                    {h.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

// Analytics Card Component
function StatCard({ label, value, color }) {
  return (
    <div
      className={`rounded-xl p-4 shadow bg-gradient-to-br ${color} text-white flex flex-col items-center`}
    >
      <span className="text-lg font-semibold">{label}</span>
      <span className="text-2xl font-extrabold">{value}</span>
    </div>
  );
}
