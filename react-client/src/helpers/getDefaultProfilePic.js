import { DEFAULT1 } from '../components/images/toketalk_default_profile/toketalk1.ico';
import { DEFAULT2 } from '../components/images/toketalk_default_profile/toketalk2.ico';
import { DEFAULT3 } from '../components/images/toketalk_default_profile/toketalk3.ico';
import { DEFAULT4 } from '../components/images/toketalk_default_profile/toketalk4.ico';
import { DEFAULT5 } from '../components/images/toketalk_default_profile/toketalk5.ico';
import { DEFAULT6 } from '../components/images/toketalk_default_profile/toketalk6.ico';
import { DEFAULT7 } from '../components/images/toketalk_default_profile/toketalk7.ico';
import { DEFAULT8 } from '../components/images/toketalk_default_profile/toketalk8.ico';
import { DEFAULT9 } from '../components/images/toketalk_default_profile/toketalk9.ico';
import { DEFAULT10 } from '../components/images/toketalk_default_profile/toketalk10.ico';
import { DEFAULT11 } from '../components/images/toketalk_default_profile/toketalk11.ico';
import { DEFAULT12 } from '../components/images/toketalk_default_profile/toketalk12.ico';

export const getDefaultProfilePic = () => {
  const num = Math.floor((Math.random() * 12) + 1);
  console.log("item " + DEFAULT1);
  switch(num){
    case 1:
      return DEFAULT1;
    case 2:
      return DEFAULT2;
    case 3:
      return DEFAULT3;
    case 4:
      return DEFAULT4;
    case 5:
      return DEFAULT5;
    case 6:
      return DEFAULT6;
    case 7:
      return DEFAULT7;
    case 8:
      return DEFAULT8;
    case 9:
      return DEFAULT9;
    case 10:
      return DEFAULT10;
    case 11:
      return DEFAULT11;
    case 12:
      return DEFAULT12;
    default:
      return DEFAULT1;
  };
};