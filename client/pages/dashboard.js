import { useState, useEffect } from "react";
import 'tailwindcss/tailwind.css';

export default function Dashboard() {
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [data, setData] = useState([]);

  const fetchData = async (date) => {
    try {
      const res = await fetch(
        `http://localhost:5000/issuance/outstanding?date=${date}`,
        {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
          },
        },
      );
      const json = await res.json();
      setData(json);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData(selectedDate);
  }, [selectedDate]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-lg p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Pending Book Returns Dashboard
        </h1>
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
          <div className="w-full sm:w-1/3 text-black">
            <label
              htmlFor="date"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Select Date:
            </label>
            <input
              type="date"
              id="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                  Member Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                  Book Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                  Issued Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                  Target Return Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                  Issued By
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data && data.length > 0 ? (
                data.map((item) => (
                  <tr key={item.issuance_id}>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                      {item.member.mem_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                      {item.book.book_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                      {new Date(item.issuance_date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                      {new Date(item.target_return_date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                      {item.issued_by}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    className="px-6 py-4 whitespace-nowrap text-center text-gray-500"
                    colSpan="5"
                  >
                    No pending book returns for this date.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
