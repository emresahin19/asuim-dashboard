'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Icon } from '@/components/ui';
import BellIcon from '@/components/ui/icon/icons/Bell';
import BellDotIcon from '@/components/ui/icon/icons/BellDot';
import CheckIcon from '@/components/ui/icon/icons/Check';
import CheckCheckIcon from '@/components/ui/icon/icons/CheckCheck';
import { useClickOutside } from '@/hooks/useClickOutside';
import { clsx } from '@/utils';
import { requestFCMToken, listenForegroundMessages } from '@/utils/firebase';
import styles from './notifications.module.scss';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const DUMMY_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: 'New User Registration',
    message: 'A new user has registered for your RPG Quest application.',
    time: '2 minutes ago',
    read: false,
  },
  {
    id: '2',
    title: 'Provider Error',
    message: 'A problem was detected with the Google OAuth connection for Space Arena.',
    time: '1 hour ago',
    read: false,
  },
  {
    id: '3',
    title: 'Plan Limit Approaching',
    message: 'You are about to reach the 10 user limit on your free plan.',
    time: '3 hours ago',
    read: false,
  },
  {
    id: '4',
    title: 'Session Revoked',
    message: 'A user session was terminated in your RPG Quest application.',
    time: 'Yesterday',
    read: true,
  },
  {
    id: '5',
    title: 'New Application Created',
    message: 'Your Space Arena application has been successfully created.',
    time: '2 days ago',
    read: true,
  },
];

const FCM_TOKEN_KEY = 'oathwall_fcm_registered';

export function NotificationsButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(DUMMY_NOTIFICATIONS);
  const [fcmStatus, setFcmStatus] = useState<'idle' | 'requesting' | 'granted' | 'denied'>('idle');
  const rootRef = useRef<HTMLDivElement>(null);

  useClickOutside(rootRef as React.RefObject<HTMLDivElement>, () => setIsOpen(false));

  const unreadCount = notifications.filter(n => !n.read).length;
  const hasUnread = unreadCount > 0;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const registered = localStorage.getItem(FCM_TOKEN_KEY);
    if (registered) {
      setFcmStatus('granted');
      listenForegroundMessages();
    } else if (typeof Notification !== 'undefined' && Notification.permission === 'denied') {
      setFcmStatus('denied');
    }
  }, []);

  const requestNotificationPermission = useCallback(async () => {
    if (fcmStatus === 'requesting' || fcmStatus === 'granted') return;
    setFcmStatus('requesting');

    try {
      const token = await requestFCMToken();
      if (token) {
        // await notificationService.registerDeviceToken({ token, platform: 'web' });
        localStorage.setItem(FCM_TOKEN_KEY, '1');
        setFcmStatus('granted');
        listenForegroundMessages();
      } else {
        setFcmStatus(Notification.permission === 'denied' ? 'denied' : 'idle');
      }
    } catch {
      setFcmStatus('idle');
    }
  }, [fcmStatus]);

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <div ref={rootRef} className={styles.container}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setIsOpen(prev => !prev)}
        aria-label={hasUnread ? `${unreadCount} unread notifications` : 'Notifications'}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <Icon icon={hasUnread ? BellDotIcon : BellIcon} size={20} decorative />
        {hasUnread && (
          <span className={styles.badge} aria-hidden="true">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className={styles.panel} role="dialog" aria-label="Notifications">
          <div className={styles.panelHeader}>
            <span className={styles.panelTitle}>Notifications</span>
            {hasUnread && (
              <button
                type="button"
                className={styles.markAllBtn}
                onClick={markAllAsRead}
                aria-label="Mark all as read"
              >
                <Icon icon={CheckCheckIcon} size={14} decorative />
                Mark all read
              </button>
            )}
          </div>

          {fcmStatus !== 'granted' && fcmStatus !== 'denied' && (
            <div className={styles.enableBanner}>
              <button
                type="button"
                className={styles.enableBtn}
                onClick={requestNotificationPermission}
                disabled={fcmStatus === 'requesting'}
              >
                <Icon icon={BellIcon} size={16} decorative />
                {fcmStatus === 'requesting' ? 'Requesting permission...' : 'Enable notifications'}
              </button>
            </div>
          )}

          <ul className={styles.list} role="list">
            {notifications.map(notification => (
              <li key={notification.id} className={clsx(styles.item, !notification.read && styles.unread)}>
                <div className={styles.itemContent}>
                  <div className={styles.itemDot} aria-hidden="true" />
                  <div className={styles.itemBody}>
                    <span className={styles.itemTitle}>{notification.title}</span>
                    <span className={styles.itemMessage}>{notification.message}</span>
                    <span className={styles.itemTime}>{notification.time}</span>
                  </div>
                  {!notification.read && (
                    <button
                      type="button"
                      className={styles.readBtn}
                      onClick={() => markAsRead(notification.id)}
                      aria-label="Mark as read"
                    >
                      <Icon icon={CheckIcon} size={13} decorative />
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>

          {notifications.every(n => n.read) && (
            <p className={styles.empty}>All notifications read</p>
          )}
        </div>
      )}
    </div>
  );
}
