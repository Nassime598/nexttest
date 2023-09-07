import {useEffect, useRef, useState} from 'react';
import {isPhotoLiked, likePhoto, unlikePhoto} from "../../database/db.js";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import jwt from "jsonwebtoken";
export default function Card({
                               imageId,
  creditUrl,
  imgAlt = 'placeholder',
  imgSrc = '/placeholder.jpg',
  shotBy,
  newLimit,
  isLast,
}) {
  /**
   * Select the Card component with useRef
   */
  const cardRef = useRef();
  const [liked, setLiked] = useState(false);

  const [username,setUsername] = useState('');


  /**
   * Implement Intersection Observer to check if the last Card in the array is visible on the screen, then set a new limit
   */
  useEffect(() => {
    if (!cardRef?.current) return;
    const token = localStorage.getItem('token');
    if(token){
      const decodedToken = jwt.verify(token, 'your-secret-key');
      const username = decodedToken.username;
      setUsername(username);
      isPhotoLiked(username,imageId).then(setLiked);
    }



    const observer = new IntersectionObserver(([entry]) => {
      if (isLast && entry.isIntersecting) {
        newLimit();
        observer.unobserve(entry.target);
      }
    });

    observer.observe(cardRef.current);
  }, [isLast, imageId]);


  const toggleLike = async () => {

    if (liked) {
      await unlikePhoto(username,imageId);
    } else {
      await likePhoto(username,imageId);
    }
    setLiked(!liked);
  };
  return (
    <div className="shadow-lg rounded-xl p-2 w-full bg-white" ref={cardRef}>
      <a href={creditUrl} target="_blank">
        <div className="w-full h-96 relative overflow-hidden rounded-xl">
          <img
            src={imgSrc}
            alt={imgAlt}
            className={`w-full h-full object-cover`}
          />
        </div>



      </a>
      <div className="grid grid-cols-2 space-x-11 py-4">
        <div className="rounded-b-xl pl-4">
          Credit:<span className="font-semibold text-right"> {shotBy}</span>
        </div>

        <div className="rounded-b pl-8 " >
          <button onClick={toggleLike}>{liked ?
              <FavoriteIcon></FavoriteIcon> : <FavoriteBorderIcon></FavoriteBorderIcon>
          }</button>
        </div>
      </div>
    </div>
  );
}
