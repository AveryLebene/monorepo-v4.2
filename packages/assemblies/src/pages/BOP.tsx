import React, { useState } from "react";
import { Badge } from "../components/Badge";
import { Dots } from "../components/Dots";
import { StatCard } from "../components/StatCard";
import { Th } from "../components/Th";
import { Td } from "../components/Td";
import { Empty } from "../components/Empty";
import { Button } from "@hubtel/react-ui/button";
const tabs = ["Businesses", "Transactions", "Inspectors", "Archived Businesses"];

export function BOP() {
  const [activeTab, setActiveTab] = useState("Businesses");
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div>
      {/* Breadcrumb */}
      <h2 className="text-sm font-semibold text-gray-500 mb-6">
        Business Operating Permit (BOP)
        <span className="text-gray-400 font-normal"> &rsaquo; Registered Businesses</span>
      </h2>
<Button text="Add Business" data-v5-theme="purple"/>
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard value="2,314" label="Registered Businesses" />
        <StatCard value="GHS 931,000.00" label="Total Expected Revenue" />
        <StatCard value="GHS 931,000.00" label="Total Outstanding Revenue" />
        <StatCard value="GHS 931,000.00" label="Total Revenue Collected" />
      </div>

      {/* Tabs */}
      <div className="flex gap-0 border-b border-gray-200 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px cursor-pointer transition-colors ${
              activeTab === tab
                ? "border-current text-[var(--primary)] font-semibold"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── Businesses Tab ── */}
      {activeTab === "Businesses" && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <button type="button" onClick={() => setShowFilter(!showFilter)} className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 cursor-pointer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="6" x2="20" y2="6" /><line x1="6" y1="12" x2="18" y2="12" /><line x1="8" y1="18" x2="16" y2="18" /></svg>
              {showFilter ? "Hide Filter" : "Show Filter"}
            </button>
            <div className="flex items-center gap-2">
              <button type="button" className="text-sm text-gray-600 border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-50 cursor-pointer">Send All Reminder</button>
              <a href="add-bop.html" className="text-sm font-medium text-white rounded-md px-4 py-2 inline-block" style={{ backgroundColor: "var(--primary)" }}>Add Business</a>
            </div>
          </div>

          {showFilter && (
            <div className="bg-white rounded-md border border-gray-200 p-4 mb-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Date From</label>
                  <input type="date" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Date To</label>
                  <input type="date" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Bill Status</label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white">
                    <option>Select Status</option>
                    <option>All Statuses (12,000)</option>
                    <option>Paid (12,000)</option>
                    <option>Partially Paid (2,000)</option>
                    <option>Not Paid (2,000)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Sub Metro</label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white">
                    <option>Select sub metro</option>
                    <option>All Sub Metros</option>
                    <option>Kokomlemle</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Outstanding Amount</label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white">
                    <option>Select Range</option>
                    <option>GHC 10,000.00 and above</option>
                    <option>GHS 5,000.00 and above</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Arrears</label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white">
                    <option>Select an option</option>
                    <option>With no arrears</option>
                    <option>With arrears</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Business Type</label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white">
                    <option>Select an option</option>
                    <option>All Business types</option>
                    <option>123344 - (Abatoir Private)</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
                <button type="button" className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer">Reset Filter</button>
                <button type="button" className="text-sm font-medium text-white px-4 py-2 rounded-md cursor-pointer" style={{ backgroundColor: "var(--primary)" }}>Apply Filter</button>
                <button type="button" className="text-sm text-[var(--primary)] hover:underline cursor-pointer ml-auto">Request Report</button>
              </div>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] border-collapse bg-white rounded-md overflow-hidden border border-gray-200">
              <thead>
                <tr>
                  <Th>Date Added</Th>
                  <Th>Account No</Th>
                  <Th>Business Name</Th>
                  <Th>Business Type</Th>
                  <Th>Amount Paid</Th>
                  <Th>Outstanding Balance</Th>
                  <Th>Status</Th>
                  <Th>Action</Th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <Td>29/03/2023 2:21 PM</Td>
                  <Td>AMA62591743</Td>
                  <Td>John Doe Electronics</Td>
                  <Td>Aluminium Production Retailers</Td>
                  <Td>GHS 12,000.00</Td>
                  <Td>GHS 2,000.00</Td>
                  <Td><Badge variant="failed">Failed</Badge></Td>
                  <Td><Dots /></Td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <Td>29/03/2023 2:21 PM</Td>
                  <Td>AMA62591743</Td>
                  <Td>John Doe Electronics</Td>
                  <Td>Aluminium Production Retailers</Td>
                  <Td>GHS 12,000.00</Td>
                  <Td>GHS 2,000.00</Td>
                  <Td><Badge variant="failed">Failed</Badge></Td>
                  <Td><Dots /></Td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <Td>29/03/2023 2:21 PM</Td>
                  <Td>AMA62591743</Td>
                  <Td>John Doe Electronics</Td>
                  <Td>Aluminium Production Retailers</Td>
                  <Td>GHS 12,000.00</Td>
                  <Td>GHS 2,000.00</Td>
                  <Td><Badge variant="success">Successful</Badge></Td>
                  <Td><Dots /></Td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Transactions Tab ── */}
      {activeTab === "Transactions" && (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <StatCard value="GHS 4,200.00" label="Total Amount Collected" />
            <StatCard value="GHS 4,200.00" label="Credit Balance" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] border-collapse bg-white rounded-md overflow-hidden border border-gray-200">
              <thead>
                <tr>
                  <Th>Date</Th>
                  <Th>Business Name</Th>
                  <Th>Current Year</Th>
                  <Th>Arrears</Th>
                  <Th>Amount Paid</Th>
                  <Th>Outstanding Balance</Th>
                  <Th>Status</Th>
                  <Th>Actions</Th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <Td>29/03/2023 2:21 PM</Td>
                  <Td>John Doe Electronics</Td>
                  <Td>GHS 203.00</Td>
                  <Td>GHS 203.00</Td>
                  <Td>GHS 203.00</Td>
                  <Td>GA-543-6789</Td>
                  <Td><Badge variant="failed">Failed</Badge></Td>
                  <Td><Dots /></Td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <Td>29/03/2023 2:21 PM</Td>
                  <Td>John Doe Electronics</Td>
                  <Td>GHS 203.00</Td>
                  <Td>GHS 203.00</Td>
                  <Td>GHS 203.00</Td>
                  <Td>GA-543-6789</Td>
                  <Td><Badge variant="success">Successful</Badge></Td>
                  <Td><Dots /></Td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Inspectors Tab ── */}
      {activeTab === "Inspectors" && (
        <div>
          <div className="flex items-center justify-end mb-4">
            <button type="button" className="text-sm font-medium text-white rounded-md px-4 py-2 cursor-pointer" style={{ backgroundColor: "var(--primary)" }}>Add Inspector</button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] border-collapse bg-white rounded-md overflow-hidden border border-gray-200">
              <thead>
                <tr>
                  <Th>Date Added</Th>
                  <Th>Inspector Name</Th>
                  <Th>Ghana Card Number</Th>
                  <Th>Mobile Number</Th>
                  <Th>Amount Collected</Th>
                  <Th>Actions</Th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <Td>21 Sept, 2023</Td>
                  <Td>Kofi Yeboah</Td>
                  <Td>GHA-000122241-2</Td>
                  <Td>020 123 4567</Td>
                  <Td>GHS 20,000.00</Td>
                  <Td><Dots /></Td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <Td>21 Sept, 2023</Td>
                  <Td>Kofi Yeboah</Td>
                  <Td>GHA-000122241-2</Td>
                  <Td>020 123 4567</Td>
                  <Td>GHS 20,000.00</Td>
                  <Td><Dots /></Td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <Td>21 Sept, 2023</Td>
                  <Td>Kofi Yeboah</Td>
                  <Td>GHA-000122241-2</Td>
                  <Td>020 123 4567</Td>
                  <Td>GHS 20,000.00</Td>
                  <Td><Dots /></Td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Archived Businesses Tab ── */}
      {activeTab === "Archived Businesses" && (
        <Empty />
      )}
    </div>
  );
}
