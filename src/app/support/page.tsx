"use client";
import React from "react";

export default function SupportPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black py-12 px-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Support</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 text-center max-w-xl">
        Need help or have questions? Our support team is here for you. Please reach out using the contact form or email below.
      </p>
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 w-full max-w-md shadow">
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
            <input type="email" id="email" name="email" required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-sm focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Message</label>
            <textarea id="message" name="message" rows={4} required className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-sm focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <button type="submit" className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow">Send</button>
        </form>
        <div className="mt-6 text-sm text-gray-600 dark:text-gray-400 text-center">
          Or email us at <a href="mailto:support@athleteai.com" className="text-blue-600 dark:text-blue-400 underline">support@athleteai.com</a>
        </div>
      </div>
    </div>
  );
}