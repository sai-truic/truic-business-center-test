import React from 'react';
import useInputState from '../useInputState';

/*
This is how you can use the Avatar component:

 <Avatar id="user1" src="/path/to/image.jpg" alt="User 1" size="md" />
 <Avatar id="user2" src="/path/to/another-image.jpg" alt="User 2" size="lg" />
*/

export const Avatar = ({ id, src, alt, size = 'md', className = '' }) => {
  const { getState, updateState } = useInputState();

  const { src: storedSrc = src, alt: storedAlt = alt, size: storedSize = size } = getState('avatar', id) || {};

  React.useEffect(() => {
    if (src !== storedSrc || alt !== storedAlt || size !== storedSize) {
      updateState('avatar', id, { src, alt, size });
    }
  }, [id, src, alt, size, storedSrc, storedAlt, storedSize, updateState]);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <div className={`relative rounded-full overflow-hidden ${sizeClasses[storedSize]} ${className}`}>
      <img
        src={storedSrc}
        alt={storedAlt}
        className="object-cover w-full h-full"
      />
    </div>
  );
};
