import React from 'react'

const Terms = () => {
  return (
    <div>
      {" "}
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="max-w-2xl p-6 mx-auto bg-white rounded shadow-md">
          <h1 className="text-2xl font-bold mb-4">
            Kampala International University (KIU) Student Bank Slip
            Verification System
          </h1>

          <section className="mb-6">
            <h2 className="text-xl font-bold mb-2">1. Acceptance of Terms</h2>
            <p className="mb-4">
              1.1 By using the KIU Student Bank Slip Verification System ("the
              System"), you agree to comply with these terms and conditions.
            </p>
            <p className="mb-4">
              1.2 The System is provided by Kampala International University,
              and your use of the System is subject to these terms and any
              additional terms and policies provided.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-bold mb-2">2. Purpose of the System</h2>
            <p className="mb-4">
              2.1 The System is designed to verify and process bank slips
              submitted by KIU students for various academic and administrative
              purposes.
            </p>
            <p className="mb-4">
              2.2 The verification process is conducted to ensure the accuracy
              and legitimacy of the bank slips submitted by students.
            </p>
          </section>

          {/* Repeat similar sections for other points... */}

          <section className="mb-6">
            <h2 className="text-xl font-bold mb-2">9. Governing Law</h2>
            <p className="mb-4">
              9.1 These terms and conditions are governed by the laws of Uganda.
              Any disputes arising from the use of the System shall be subject
              to the exclusive jurisdiction of the courts in Uganda.
            </p>
          </section>

          <p className="text-sm text-gray-500">
            By using the KIU Student Bank Slip Verification System, you
            acknowledge that you have read, understood, and agree to abide by
            these terms and conditions.
          </p>

          <p className="text-sm text-gray-500 mt-4">Last updated: 15th December 2023</p>
        </div>
      </div>
    </div>
  );
}

export default Terms