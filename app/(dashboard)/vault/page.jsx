"use client";
import React, { useEffect, useState } from "react";
import useCompleteUserDetails from "@/hooks/useCompleUserDetails";

const Vault = () => {
  const { companyDocuments, loading, error } = useCompleteUserDetails();
  const [documents, setDocuments] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

  useEffect(() => {
    if (!loading && companyDocuments) {
      setDocuments(companyDocuments);
    }
  }, [loading, companyDocuments]);

  const openModal = (documentUrl) => {
    setSelectedDocument(documentUrl);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedDocument(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Documents Vault</h2>
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && !error && (
        <table className="min-w-full bg-white dark:bg-slate-800">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-slate-200 dark:border-slate-700 text-center">
                Document Type
              </th>
              <th className="py-2 px-4 border-b border-slate-200 dark:border-slate-700 text-center">
                View Document
              </th>
            </tr>
          </thead>
          <tbody>
            {documents.map((document, index) =>
              Object.entries(document).map(
                ([key, value]) =>
                  key !== "id" &&
                  key !== "company_id" &&
                  key !== "created_at" &&
                  value && (
                    <tr key={`${index}-${key}`}>
                      <td className="py-2 px-4 border-b border-slate-200 dark:border-slate-700 capitalize text-center">
                        {key.replace(/_/g, " ")}
                      </td>
                      <td className="py-2 px-4 border-b border-slate-200 dark:border-slate-700 text-center">
                        <button
                          onClick={() => openModal(value)}
                          className="text-blue-500 hover:underline"
                        >
                          View Document
                        </button>
                      </td>
                    </tr>
                  )
              )
            )}
          </tbody>
        </table>
      )}

      {modalIsOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 mt-10">
          <div
            className="fixed inset-0 bg-black opacity-75 z-40 mt-10"
            onClick={closeModal}
          ></div>
          <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all w-3/5 h-4/5 p-6 relative z-50">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 p-2 text-gray-500 hover:text-red-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            {selectedDocument && (
              <iframe
                src={selectedDocument}
                className="w-full h-full"
                title="Document Viewer"
              ></iframe>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Vault;
