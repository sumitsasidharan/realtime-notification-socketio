import { useState } from 'react';
import './card.css';

const Card = ({ post}) => {
   const [liked, setLiked] = useState(false);

   const handleNotification = () => {
      setLiked(true);
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
              <img src="/img/heart.svg" alt="" className="cardIcon" onClick={handleNotification} />
           )}

           <img src="/img/comment.svg" alt="" className="cardIcon" />
           <img src="/img/share.svg" alt="" className="cardIcon" />
           <img src="/img/info.svg" alt="" className="cardIcon infoIcon" />
        </div>
     </div>
  );
}

export default Card