import React from "react";

const Privacy = () => {
  const today = "22 Sept 2025";

  return (
    <div className="min-h-screen flex justify-center py-16 px-5">
      <div className="bg-[#ffdad7] rounded-xl shadow-2xl w-full max-w-5xl px-10 md:px-16 py-12 flex flex-col space-y-8">
        <h1 className="text-4xl md:text-5xl font-[800] text-black text-center mb-2">
          Privacy Policy
        </h1>

        <p className="text-center text-gray-900 font-medium">
          Effective Date: {today}
        </p>

        {/* Overview */}
        <section className="space-y-4 text-lg">
          <h2 className="text-2xl font-bold text-red-600">Overview</h2>
          <p className="text-gray-900 font-medium">
            This privacy policy explains how we collect, use, disclose, and protect information when you use the chat feature in this application. It applies to both authenticated users and visitors using anonymous mode.
          </p>

          {/* Information We Collect */}
          <h3 className="text-2xl font-bold text-red-600">Information We Collect</h3>
          <ul className="list-disc text-lg list-inside text-gray-900 space-y-2 font-medium">
            <li>
              <strong>Anonymous Usernames:</strong> When Anonymous mode is enabled we generate ephemeral display names. These identifiers are not tied to real-world identities unless you explicitly provide identifying information in a message.
            </li>
            <li>
              <strong>Chat Messages:</strong> Text and attachments you send are processed and temporarily stored to display conversation history and deliver messages to participants. Persistent storage is limited to what is necessary for service functionality.
            </li>
            <li>
              <strong>Technical & Usage Data:</strong> Non-personal metadata such as device type, browser, session identifiers, timestamps, and IP addresses may be collected for analytics, diagnostics, rate-limiting, and abuse prevention.
            </li>
            <li>
              <strong>Optional Profile Data:</strong> If you create an account or provide a display name or avatar, that information will be stored and associated with your account.
            </li>
          </ul>

          {/* How We Use Information */}
          <h3 className="text-2xl font-bold text-red-600">How We Use Information</h3>
          <p className="text-gray-900 text-lg font-medium">
            We use collected information to operate and improve the chat experience: delivering and rendering messages, moderating content, preventing abuse, diagnosing technical issues, and personalizing features if you opt in. We do not use chat content for advertising profiling.
          </p>

          {/* Data Retention */}
          <h3 className="text-2xl font-bold text-red-600">Data Retention</h3>
          <p className="text-gray-900 text-lg font-medium">
            Messages and session data are retained only as long as necessary to provide the service and comply with legal or security obligations. Anonymous identifiers and transient logs may be rotated or deleted regularly. If you request deletion of your account or data, we will remove associated personal data within a reasonable timeframe, subject to backup and legal retention requirements.
          </p>

          {/* Sharing and Third Parties */}
          <h3 className="text-2xl font-bold text-red-600">Sharing & Third Parties</h3>
          <p className="text-gray-900 text-lg font-medium">
            We do not sell personal data. We may share information with trusted service providers who assist with hosting, analytics, or moderation under contractual obligations to maintain confidentiality and security. We may also disclose information to comply with legal requests or to protect the rights and safety of users.
          </p>

          {/* Security */}
          <h3 className="text-2xl font-bold text-red-600">Security</h3>
          <p className="text-gray-900 text-lg font-medium">
            We implement reasonable technical and organizational measures to protect data from unauthorized access, alteration, or disclosure. However, no system is completely secure — please avoid sharing sensitive personal information in chat messages.
          </p>

          {/* Your Choices */}
          <h3 className="text-2xl font-bold text-red-600">Your Choices & Rights</h3>
          <p className="text-gray-900 text-lg font-medium">
            You can choose to use Anonymous mode, edit or delete messages where the UI permits, and update any profile information you provide. Depending on your jurisdiction, you may have rights to access, correct, or delete your personal data; contact us (see below) to exercise these rights.
          </p>

          {/* Cookies and Tracking */}
          <h3 className="text-2xl font-bold text-red-600">Cookies & Tracking</h3>
          <p className="text-gray-900 text-lg font-medium">
            We may use cookies and similar technologies for session management, preferences, and analytics. You can control cookie settings via your browser, but disabling cookies may affect functionality.
          </p>

          {/* Children */}
          <h3 className="text-2xl font-bold text-red-600">Children</h3>
          <p className="text-gray-900 text-lg font-medium">
            The chat feature is not intended for use by children under 13 (or a higher age where required). We do not knowingly collect personal data from children; if we learn we have, we will delete it promptly.
          </p>

          {/* Changes to Policy */}
          <h3 className="text-2xl font-bold text-red-600">Changes to This Policy</h3>
          <p className="text-gray-900 text-lg font-medium">
            We may update this policy from time to time. Significant changes will be reflected by updating the Effective Date above and, where appropriate, notifying users through the app.
          </p>

          {/* Contact */}
          <h3 className="text-2xl font-bold text-red-600">Contact Us</h3>
          <p className="text-gray-900 text-lg font-medium">
            For questions, data requests, or privacy concerns, contact: <strong>privacy@datenow.com</strong>. Include relevant details so we can respond efficiently.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Privacy;
