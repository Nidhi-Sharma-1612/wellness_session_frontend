import { Pencil } from "lucide-react";

const SessionList = ({ sessions, onEdit }) => {
  if (sessions.length === 0) {
    return <p className="text-gray-500 italic">No sessions found.</p>;
  }

  return (
    <div className="max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
      <ul className="space-y-3">
        {sessions.map((s) => (
          <li
            key={s._id}
            className={`border p-4 rounded shadow-sm flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 ${
              s.status === "published"
                ? "bg-green-50 border-green-400"
                : "bg-yellow-50 border-yellow-400"
            }`}
          >
            <div className="text-center sm:text-left">
              <p className="text-lg font-semibold text-gray-800">{s.title}</p>
              <p className="text-sm text-gray-500 capitalize">{s.status}</p>
            </div>

            <button
              onClick={() => onEdit(s)}
              className="flex items-center justify-center gap-2 text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              <Pencil className="w-4 h-4" />
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SessionList;
