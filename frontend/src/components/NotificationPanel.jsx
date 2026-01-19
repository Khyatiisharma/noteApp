import { useNotifications } from "../api/notificationApi";

export default function NotificationPanel() {
  const { data, isLoading, error } = useNotifications();

  if (isLoading) {
    return (
      <div className="bg-white p-4 rounded shadow mt-4">
        <p className="text-sm text-gray-500">Loading notifications...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-4 rounded shadow mt-4">
        <p className="text-sm text-red-500">Failed to load notifications</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded shadow mt-4">
      <h3 className="font-bold mb-3 flex items-center gap-2">
        🔔 Notifications
      </h3>

      {!data || data.length === 0 ? (
        <p className="text-sm text-gray-500">No notifications yet</p>
      ) : (
        <ul className="space-y-2">
          {data.map((n) => (
            <li
              key={n._id}
              className={`p-2 rounded border text-sm ${
                n.isRead
                  ? "bg-gray-50 text-gray-600"
                  : "bg-blue-50 border-blue-200 text-blue-900"
              }`}
            >
              <p>{n.message}</p>

              {/* time */}
              <p className="text-xs text-gray-400 mt-1">
                {new Date(n.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
