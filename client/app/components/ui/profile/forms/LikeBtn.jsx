"use client";
import { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { GrView } from "react-icons/gr";
function LikeBtn({ views, likes }) {
  const [isLiked, setLike] = useState(false);
  const [likesNumber, setLikesNumber] = useState(likes);
  return (
    <>
      <div className="flex justify-center items-center gap-2 cursor-pointer">
        {isLiked ? (
          <span
            className="hover:text-muted duration-150"
            onClick={() => {
              setLike(false);
              likesNumber <= 0
                ? setLikesNumber(0)
                : setLikesNumber(likesNumber - 1);
            }}
          >
            <AiFillHeart size={20} />
          </span>
        ) : (
          <span
            className="hover:text-muted duration-150"
            onClick={() => {
              setLike(true);
              likesNumber >= 0
                ? setLikesNumber(likesNumber + 1)
                : setLikesNumber(0);
            }}
          >
            <AiOutlineHeart size={20} />
          </span>
        )}
        <span>{likesNumber}</span>
      </div>
      <div className="flex justify-center items-center gap-2">
        <GrView size={20} />
        <span>{views}</span>
      </div>
    </>
  );
}

export default LikeBtn;
