import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";

interface RatingProps {
  value: number;
  text?: string;
  iconColor?: string;
}

const makeStars = (value: number, color: string) => {
  const solidStars = Math.floor(value);
  const lastStar = value - solidStars;
  let lastStarIcon;
  if (lastStar >= 1) {
    lastStarIcon = faStar;
  } else if (lastStar >= 0.5) {
    lastStarIcon = faStarHalfAlt;
  } else {
    lastStarIcon = farStar;
  }
  const regularStars = 5 - 1 - solidStars;

  return (
    <>
      {Array.from({ length: solidStars }).map((_, ind) => (
        <FontAwesomeIcon key={`solid_${ind}`} icon={faStar} style={{ color }} />
      ))}
      {lastStarIcon && (
        <FontAwesomeIcon icon={lastStarIcon} style={{ color }} />
      )}
      {Array.from({ length: regularStars }).map((_, ind) => (
        <FontAwesomeIcon
          key={`regular_${ind}`}
          icon={farStar}
          style={{ color }}
        />
      ))}
    </>
  );
};

const Rating = ({ value, text, iconColor = "gold" }: RatingProps) => {
  return (
    <div className="py-2 d-flex">
      <span>{makeStars(value, iconColor)}</span>
      <span>{text}</span>
    </div>
  );
};

export default Rating;
