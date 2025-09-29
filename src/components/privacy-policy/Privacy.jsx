import React from "react";

const Privacy = () => {
  const today = "22 Sept 2025";

  return (
    <div className="min-h-screen flex justify-center py-16 px-5">
      <div className="bg-[#ffdad7] rounded-xl shadow-2xl w-full max-w-5xl px-10 md:px-16 py-12 flex flex-col space-y-10">
        <h1 className="text-4xl md:text-5xl  font-[800]  text-black text-center mb-6">
          Privacy Policy
        </h1>

        {/* Privacy Policy */}
        <section className="space-y-4 text-lg">
          <p className="text-gray-900 font-semibold">Effective Date: {today}</p>
          <p className="text-gray-900 font-medium">
            We value your privacy. This policy explains how we collect, use, and protect information when you use the chat feature on this page.
          </p>
          <h3 className="text-4xl font-bold text-red-600">Information We Collect</h3>
          <ul className="list-disc text-lg list-inside text-gray-900 space-y-2 font-medium">
            <li><strong>Anonymous Usernames:</strong> Random names are generated when Anonymous mode is enabled. They are not linked to personal information.</li>
            <li><strong>Chat Messages:</strong> Messages may be temporarily stored to display them. Not used for advertising or shared externally.</li>
            <li><strong>Technical Data:</strong> Non-personal data such as browser type, device, and IP address may be collected for analytics and performance improvements.</li>
          </ul>
          <h3 className="text-4xl font-bold text-red-600">How We Use Information</h3>
          <p className="text-gray-900 text-lg font-medium">
            Information is used solely to provide chat functionality, improve user experience, and maintain security. Anonymous usernames help maintain privacy.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Privacy;
