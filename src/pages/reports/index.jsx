import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  ChevronDown,
  MoreHorizontal,
  Filter,
} from "lucide-react";
import {
  usePatientsData,
  useTestRequestsData,
  useSamplesData,
  useLabResultsData,
} from "../../services/api/route-data";

export default function Reports() {
  const [selectedDate, setSelectedDate] = useState("September 2025");
  const [activeTab, setActiveTab] = useState("Week");

  // ✅ Default to [] so .length doesn't throw
  const { patients = [] } = usePatientsData();
  const { testRequests = [] } = useTestRequestsData();
  const { samples = [] } = useSamplesData();
  const { testResults = [] } = useLabResultsData();

  // Generate chart data (placeholder distribution)
  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const chartData = weekdays.map((day, i) => ({
    name: day,
    patients: patients.length ? Math.floor(patients.length / 7) + i : 0,
    completedTests: testResults.length
      ? Math.floor(testResults.length / 7) + (6 - i)
      : 0,
  }));

  const performanceCards = [
    {
      title: "Total Patients",
      value: patients.length,
      bgColor: "bg-yellow-100",
      iconBg: "bg-yellow-200",
      icon: "👥",
    },
    {
      title: "Test Requests",
      value: testRequests.length,
      bgColor: "bg-red-100",
      iconBg: "bg-red-200",
      icon: "🧾",
    },
    {
      title: "Samples",
      value: samples.length,
      bgColor: "bg-green-100",
      iconBg: "bg-green-200",
      icon: "🧪",
    },
    {
      title: "Test Results",
      value: testResults.length,
      bgColor: "bg-blue-100",
      iconBg: "bg-blue-200",
      icon: "📊",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Performance</h3>
        </div>

        {/* Performance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {performanceCards.map((card, index) => (
            <div
              key={index}
              className={`${card.bgColor} p-6 rounded-lg relative overflow-hidden`}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`${card.iconBg} w-10 h-10 rounded-lg flex items-center justify-center text-lg`}
                >
                  {card.icon}
                </div>
                <button className="text-gray-600 hover:text-gray-800">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
              <div className="text-2xl font-bold text-gray-800 mb-1">
                {card.value}
              </div>
              <div className="text-sm text-gray-600">{card.title}</div>
            </div>
          ))}
        </div>

        {/* Patients and Tests Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-gray-800">
              Patients & Completed Tests
            </h4>
            <div className="flex gap-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span>Patients</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span>Completed Tests</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="patients" fill="#3b82f6" name="Patients" />
              <Bar
                dataKey="completedTests"
                fill="#10b981"
                name="Completed Tests"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Placeholder Calendar Section */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              📅 {selectedDate} <ChevronDown className="w-4 h-4" />
            </button>
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              {["Day", "Week", "Month"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm ${
                    activeTab === tab
                      ? "bg-red-400 text-white"
                      : "hover:bg-gray-50"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>

        <p className="text-gray-500 text-sm">
          Coming soon: scheduling and appointment data integration.
        </p>
      </div>
    </div>
  );
}
