import { useState } from 'react';
import './card.css';

const Card = ({ post, socket, user }) => {
   const [liked, setLiked] = useState(false);

   const handleNotification = (type) => {
      type === 1 && setLiked(true);

      socket.emit('sendNotification', {
         senderName: user,
         receiverName: post.username,
         type
      })
   }

   const handleText = (type) => {
      setLiked(true);

      socket.emit('sendText', {
         senderName: user,
         receiverName: post.username,
         text: 'hello this is chat message'
      })
   }

  return (
     <div className="card">
        <div className="info">
           <img src={post.userImg} alt="" className="userImg" />
           <span>{post.fullname}</span>
        </div>

        <img src={post.postImg} alt="" className="postImg" />

        <div className="interaction">
           {liked ? (
              <img src="/img/heartFilled.svg" alt="" className="cardIcon" onClick={() => setLiked(false)} />
           ) : (
              <img src="/img/heart.svg" alt="" className="cardIcon" onClick={() => handleNotification(1)} />
           )}

           <img src="/img/comment.svg" alt="" className="cardIcon" onClick={() => handleNotification(2)} />
           <img src="/img/share.svg" alt="" className="cardIcon" onClick={() => handleNotification(3)} />
           <img src="/img/info.svg" alt="" className="cardIcon infoIcon" />
        </div>
     </div>
  );
}

export default Card