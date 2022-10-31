import { useEffect, useState } from 'react';
import './navbar.css';
// import Notification from '../../img/notification.svg';

const Navbar = ({ socket }) => {
   const [notifications, setNotifications] = useState([]);
   const [open, setOpen] = useState(false);

   useEffect(() => {
      socket?.on('getNotification', (data) => {
         setNotifications((prev) => [...prev, data]);
      });
   }, [socket]);

   // useeffect for sendtext
   useEffect(() => {
      socket?.on('getText', (data) => {
         setNotifications((prev) => [...prev, data]);
      });
   }, [socket]);

   const displayNotification = ({ senderName, type }) => {
      let action;

      switch (type) {
         case 1:
            action = 'liked';
            break;

         case 2:
            action = 'commented';
            break;

         case 3:
            action = 'shared';
            break;

         default:
      }

      return (
         <span className="notification">
            {senderName} {action} your post
         </span>
      );
   };

   const sendText = ({ senderName, text }) => {
      return (
         <span className="notification">
            {senderName}: {text}
         </span>
      );
   };

   const handleRead = () => {
      setNotifications([]);
      setOpen(false);
   };

   return (
      <div className="navbar">
         <div className="logo">Notif App</div>

         <div className="icons">
            <div className="icon" onClick={() => setOpen((prev) => !prev)}>
               <img src="/img/notification.svg" alt="" className="iconImg" />
               {notifications.length > 0 && (
                  <div className="counter">{notifications.length}</div>
               )}
            </div>
            <div className="icon" onClick={() => setOpen((prev) => !prev)}>
               <img src="/img/message.svg" alt="" className="iconImg" />
               <div className="counter">2</div>
            </div>
            <div className="icon" onClick={() => setOpen((prev) => !prev)}>
               <img src="/img/settings.svg" alt="" className="iconImg" />
               <div className="counter">2</div>
            </div>
         </div>

         {open && (
            <div className="notifications">
               {notifications.map((n) => displayNotification(n))}
               <button className="nButton" onClick={handleRead}>
                  Mark as read
               </button>
            </div>
         )}
      </div>
   );
};

export default Navbar;
