import React from 'react';

import getIconType from '../../utils/getIconType';

const Icon = props => {
   const {
      type,
      name,
      size,
      color,
      iconStyle,
      reverse,
      reverseColor,
      onPress,
      style,
   } = props;

   const IconComponent = getIconType(type);

   return (
      <IconComponent
         testID="iconIcon"
         style={[iconStyle]}
         size={size}
         name={name}
         color={reverse ? reverseColor : color}
         onPress={onPress}
         style={style}
      />
   );
};

export { Icon };
