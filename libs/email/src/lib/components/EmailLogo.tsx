import { Img } from '@react-email/components';
import * as React from 'react';
import { EMAIL_STYLES } from '../shared-styles';

export const EmailLogo = () => {
  return (
    <Img
      src="https://res.cloudinary.com/getjetstream/image/upload/v1634516631/public/jetstream-logo-200w.png"
      width="200"
      alt="Jetstream logo"
      style={EMAIL_STYLES.logo}
    />
  );
};