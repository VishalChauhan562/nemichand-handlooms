// src/components/Notifications/Notifications.tsx
import { useState, useEffect } from 'react';
import { Bell, Package, Tag, AlertCircle, X, MessageSquare } from 'lucide-react';
import './Notifications.scss';
import { useAppSelector } from '../../store/hooks';

// Define different types of notifications our system can handle
interface Notification {
  id: string;
  type: 'order' | 'promotion' | 'alert' | 'message';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  link?: string;
}

const Notifications = () => {

  const { user, isAuthenticated } = useAppSelector(state => state.auth)

  if(!user && !isAuthenticated){
    return <></>
  }

  // State to manage notifications and dropdown visibility
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'order',
      title: 'Order Shipped!',
      message: 'Your order #12345 has been shipped and will arrive by Jan 5th',
      timestamp: '2 hours ago',
      read: false,
      link: '/orders/12345'
    },
    {
      id: '2',
      type: 'promotion',
      title: 'Special Offer',
      message: 'Get 20% off on all bedsheets this weekend!',
      timestamp: '1 day ago',
      read: true,
      link: '/products/bedsheets'
    },
    {
      id: '3',
      type: 'alert',
      title: 'Price Drop Alert',
      message: 'A product in your wishlist is now on sale',
      timestamp: '2 days ago',
      read: false,
      link: '/wishlist'
    }
  ]);
  const [isOpen, setIsOpen] = useState(false);

  // Calculate number of unread notifications
  const unreadCount = notifications.filter(n => !n.read).length;

  // Handle click on a notification
  const handleNotificationClick = (notification: Notification) => {
    // Mark notification as read
    setNotifications(prev =>
      prev.map(n =>
        n.id === notification.id ? { ...n, read: true } : n
      )
    );

    // Navigate to link if provided
    if (notification.link) {
      console.log('Navigating to:', notification.link);
    }
  };

  // Function to get the appropriate icon for each notification type
  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'order':
        return <Package size={20} />;
      case 'promotion':
        return <Tag size={20} />;
      case 'alert':
        return <AlertCircle size={20} />;
      case 'message':
        return <MessageSquare size={20} />;
    }
  };

  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications([]);
    setIsOpen(false);
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.notifications')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="notifications">
      <button 
        className="notifications__bell"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell size={24} />
        {unreadCount > 0 && (
          <span className="notifications__count">{unreadCount}</span>
        )}
      </button>

      {isOpen && (
        <div className="notifications__dropdown">
          <div className="notifications__header">
            <h2>Notifications</h2>
            <div className="notifications__actions">
              {notifications.length > 0 && (
                <>
                  <button onClick={markAllAsRead}>Mark all as read</button>
                  <button onClick={clearAllNotifications}>Clear all</button>
                </>
              )}
              <button 
                className="close-btn"
                onClick={() => setIsOpen(false)}
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="notifications__list">
            {notifications.length === 0 ? (
              <div className="notifications__empty">
                <Bell size={40} />
                <p>No notifications yet</p>
              </div>
            ) : (
              notifications.map(notification => (
                <div
                  key={notification.id}
                  className={`notification-item ${!notification.read ? 'unread' : ''}`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className={`notification-icon ${notification.type}`}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="notification-content">
                    <h3>{notification.title}</h3>
                    <p>{notification.message}</p>
                    <span className="notification-time">
                      {notification.timestamp}
                    </span>
                  </div>
                  {!notification.read && (
                    <div className="unread-indicator" />
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;