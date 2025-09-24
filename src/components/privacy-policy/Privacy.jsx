import React from "react";

const Privacy = () => {
  const today = "22 Sept 2025";

  return (
    <div className="min-h-screen bg- flex justify-center py-16 px-5">
      <div className="bg-[#ffdad7] rounded-xl shadow-2xl w-full max-w-5xl px-10 md:px-16 py-12 flex flex-col space-y-10">
        <h1 className="text-4xl md:text-5xl  font-[800]  text-black text-center mb-6">
          Legal & Policy
        </h1>

        {/* Privacy Policy */}
        <section className="space-y-4">
          <h2 className="text-3xl font-extrabold text-black">Privacy Policy</h2>
          <p className="text-gray-900 font-semibold">Effective Date: {today}</p>
          <p className="text-gray-900 font-medium">
            We value your privacy. This policy explains how we collect, use, and protect information when you use the chat feature on this page.
          </p>
          <h3 className="text-xl font-bold text-red-600">Information We Collect</h3>
          <ul className="list-disc list-inside text-gray-900 space-y-2 font-medium">
            <li><strong>Anonymous Usernames:</strong> Random names are generated when Anonymous mode is enabled. They are not linked to personal information.</li>
            <li><strong>Chat Messages:</strong> Messages may be temporarily stored to display them. Not used for advertising or shared externally.</li>
            <li><strong>Technical Data:</strong> Non-personal data such as browser type, device, and IP address may be collected for analytics and performance improvements.</li>
          </ul>
          <h3 className="text-xl font-bold text-red-600">How We Use Information</h3>
          <p className="text-gray-900 font-medium">
            Information is used solely to provide chat functionality, improve user experience, and maintain security. Anonymous usernames help maintain privacy.
          </p>
        </section>

        {/* Terms of Service */}
        <section className="space-y-4">
          <h2 className="text-3xl font-extrabold text-black">Terms of Service</h2>
          <p className="text-gray-900 font-semibold">Effective Date: {today}</p>
          <p className="text-gray-900 font-medium">By using the chat feature, you agree to these terms. Please read them carefully before proceeding.</p>
          <h3 className="text-xl font-bold text-red-600">User Conduct</h3>
          <ul className="list-disc list-inside text-gray-900 space-y-2 font-medium">
            <li><strong>No Illegal Activity:</strong> Do not use the chat to engage in unlawful, harmful, or offensive behavior.</li>
            <li><strong>Respect Others:</strong> Harassment, bullying, or abusive language is strictly prohibited.</li>
            <li><strong>Accurate Information:</strong> Do not impersonate others or provide misleading details.</li>
          </ul>
          <h3 className="text-xl font-bold text-red-600">Limitation of Liability</h3>
          <p className="text-gray-900 font-medium">We are not liable for any damages arising from your use of the chat. Use is at your own risk.</p>
        </section>

        {/* Cookie Policy */}
        <section className="space-y-4">
          <h2 className="text-3xl font-extrabold text-black">Cookie Policy</h2>
          <p className="text-gray-900 font-semibold">Effective Date: {today}</p>
          <p className="text-gray-900 font-medium">This policy explains how we use cookies and similar technologies on this page.</p>
          <h3 className="text-xl font-bold text-red-600">What Are Cookies?</h3>
          <p className="text-gray-900 font-medium">Cookies are small text files stored on your device by your browser. They help us provide functionality and improve your experience.</p>
          <h3 className="text-xl font-bold text-red-600">Managing Cookies</h3>
          <p className="text-gray-900 font-medium">You can control cookie settings through your browser. Disabling cookies may affect site functionality.</p>
        </section>

        {/* Community Guidelines */}
        <section className="space-y-4">
          <h2 className="text-3xl font-extrabold text-black">Community Guidelines</h2>
          <p className="text-gray-900 font-semibold">Effective Date: {today}</p>
          <p className="text-gray-900 font-medium">To keep our chat safe and welcoming, please follow these guidelines:</p>
          <ul className="list-disc list-inside text-gray-900 space-y-2 font-medium">
            <li><strong>Be Respectful:</strong> Treat all users with kindness and respect. Discrimination, harassment, or hate speech will not be tolerated.</li>
            <li><strong>Stay Safe:</strong> Do not share personal information or encourage others to do so.</li>
            <li><strong>No Spam or Advertising:</strong> Do not post spam, advertisements, or irrelevant links in the chat.</li>
            <li><strong>Follow the Law:</strong> Do not use the chat for illegal activities or to promote harmful behavior.</li>
          </ul>
          <p className="text-gray-900 font-medium mt-2">Violations may result in removal from the chat or other actions as necessary.</p>
        </section>

        <p className="text-gray-900 font-medium mt-6">
          If you have any questions about these policies, please contact us at [Insert Contact Email].
        </p>
      </div>
    </div>
  );
};

export default Privacy;
