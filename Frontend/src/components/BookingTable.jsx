import { useState } from "react";
{/*import { Check, X, Eye } from "lucide-react"; ไอคอน */} 
import { Dialog } from "@headlessui/react";

const bookings = [
  {
    time: "06:00",
    group: "Jack German",
    team: "",
    players: 4,
    status: "หลักฐานการจอง",
    verify: true,
    refund: false,
    color: "bg-orange-200",
  },
  {
    time: "06:30",
    group: "อภิชาติ วรากุล",
    team: "Blue Birdies",
    players: 2,
    status: "หลักฐานการจอง",
    verify: true,
    refund: false,
    color: "bg-orange-200",
  },
  {
    time: "06:45",
    group: "กิตติพงศ์ นามะชัย",
    team: "Red Falcons",
    players: 4,
    status: "คืนเงิน",
    verify: false,
    refund: true,
    color: "bg-green-200",
  },
  {
    time: "07:15",
    group: "วิเชษฐ แสงทอง",
    team: "Green Swing",
    players: 3,
    status: "คืนเงิน",
    verify: false,
    refund: true,
    color: "bg-green-200",
  },
];

export default function BookingTable() {
  const [selected, setSelected] = useState(null);

  const handleRowClick = (booking) => {
    setSelected(booking);
  };

  return (
    <div className="p-4 bg-white shadow rounded-xl overflow-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="space-x-2">
          <button className="bg-gray-200 px-4 py-2 rounded-lg font-semibold">ยกเลิก</button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold">บันทึก</button>
        </div>
        <span className="text-sm text-gray-500 cursor-pointer hover:underline">ออกจากระบบ</span>
      </div>

      <table className="min-w-full text-sm text-center">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2">คิว</th>
            <th>แคดดี้</th>
            <th>เวลา</th>
            <th>ชื่อกลุ่ม</th>
            <th>จำนวนผู้เล่น</th>
            <th>ชื่อผู้จอง</th>
            <th>สถานะ</th>
            <th>การตรวจสอบ</th>
            <th>การคืนเงิน</th>
            {/*<th>ดู</th>*/}
          </tr>
        </thead>
        <tbody>
            {Array.from({ length: 10 }).map((_, i) => {
                const row = bookings.find((b) => b.time === formatTime(i));
                return (
                <tr
                    key={i}
                    className={`border-t ${row ? "hover:bg-gray-100 cursor-pointer" : ""}`}
                    onClick={() => row && handleRowClick(row)}
                >
                    <td className="py-2 font-semibold">{Math.floor(i / 1) + 1}</td>

        {/* แคดดี้ */ }
        <td>
            {(formatTime(i) === "06:45" || formatTime(i) === "07:15") ? (
                <span className="w-5 h-5 inline-block bg-black rounded-full" />
            ) : (
                ""
            )}
        </td>
        <td className="font-mono text-orange-600">{formatTime(i)}</td>
        <td colSpan={row ? 1 : 6}>
          {row ? (
            <div className={`flex justify-center items-center ${row.color} rounded-full px-2 py-1 w-full font-semibold`}>
              {row.team || "-"}
            </div>
          ) : (
            ""
          )}
        </td>
        {row && (
          <>
            <td>{row.players}</td>
            <td>{row.group}</td>

            {/* สถานะเป็นปุ่มวงกลมสี */}
            <td>
              <button
                className={`w-6 h-6 rounded-full border-2 border-transparent
                  ${
                    row.status === "คืนเงิน"
                      ? "bg-green-600"
                      : row.status === "หลักฐานการจอง"
                      ? "bg-orange-500"
                      : "bg-gray-400"
                  }
                `}
                aria-label={`สถานะ: ${row.status}`}
                title={row.status}
              />
            </td>

            {/* การตรวจสอบ เป็นปุ่ม "หลักฐานการจอง" หรือว่าง */}
            <td className="text-center">
              {row.verify ? (
                <button className="bg-gray-500 text-white text-xs px-3 py-1 rounded-full font-semibold hover:bg-orange-600 transition">
                  หลักฐานการจอง
                </button>
              ) : (
                <span className="block h-6" />
              )}
            </td>

            <td>
              <span
                className={`px-3 py-1 rounded-full text-xs text-white ${
                  row.refund ? "bg-emerald-500" : "bg-gray-300"
                }`}
              >
                {row.refund ? "คืนเงิน" : "-"}
              </span>
            </td>
            {/*<td><Eye size={18} className="text-blue-500 inline-block" /></td>*/}
          </>
        )}
      </tr>
    );
  })}
</tbody>

      </table>

      {/* Popup */}
      <Dialog open={!!selected} onClose={() => setSelected(null)} className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="bg-black bg-opacity-30 fixed inset-0" aria-hidden="true" />
        <div className="relative bg-white rounded-lg shadow-xl w-[90%] max-w-md p-6 z-50">
          <Dialog.Title className="text-lg font-bold mb-2">รายละเอียดการจอง</Dialog.Title>
          {selected && (
            <div className="text-sm space-y-2">
              <p>
                <strong>ชื่อผู้จอง:</strong> {selected.group}
              </p>
              <p>
                <strong>ชื่อกลุ่ม:</strong> {selected.team || "-"}
              </p>
              <p>
                <strong>เวลา:</strong> {selected.time}
              </p>
              <p>
                <strong>จำนวนผู้เล่น:</strong> {selected.players}
              </p>
              <p>
                <strong>สถานะ:</strong> {selected.status}
              </p>
              <p>
                <strong>ตรวจสอบ:</strong> {selected.verify ? "ผ่านแล้ว" : "ยังไม่ตรวจสอบ"}
              </p>
              <p>
                <strong>คืนเงิน:</strong> {selected.refund ? "คืนแล้ว" : "ยังไม่คืน"}
              </p>
            </div>
          )}
          <div className="mt-4 text-right">
            <button
              onClick={() => setSelected(null)}
              className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-blue-700"
            >
              ปิดหน้าต่าง
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

function formatTime(index) {
  const hour = Math.floor(index / 4) + 6;
  const min = (index % 4) * 15;
  return `${hour.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}`;
}
