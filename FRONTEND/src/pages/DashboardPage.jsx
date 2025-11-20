import React from 'react';
import UrlForm from '../components/UrlForm';
import UserUrl from '../components/UserUrl';

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-6">
      
      {/* Page Heading */}
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
        Dashboard
      </h1>

      {/* Main Card Container */}
      <div className="bg-white shadow-xl rounded-2xl border border-gray-200 w-full max-w-5xl p-8">
        {/* Title Inside Card */}
        <h2 className="text-2xl font-semibold text-gray-900 text-center mb-6">
          URL Shortener
        </h2>

        {/* Form Section */}
        <UrlForm />

        {/* Divider */}
        <hr className="my-6 border-gray-200" />

        {/* User URLs Table/Section */}
        <UserUrl />
      </div>
    </div>
  );
};

export default DashboardPage;
