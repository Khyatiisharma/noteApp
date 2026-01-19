import Notification from "../models/notification_model.js.js";

export const getNotifications = async (req, res) => {
  const notifications = await Notification.find({
    userId: req.user.id,
  }).sort({ createdAt: -1 });

  res.json(notifications);
};
