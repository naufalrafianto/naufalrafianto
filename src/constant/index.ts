import {
  EnvelopeOpenIcon,
  GitHubLogoIcon,
  IdCardIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
} from '@radix-ui/react-icons';
import { toast } from 'react-hot-toast';

const icons = [
  {
    href: 'https://github.com/mnauff',
    icon: GitHubLogoIcon,
    ariaLabel: 'GitHub',
    title: 'GitHub',
  },
  {
    href: 'https://www.linkedin.com/in/naufal-rafianto-4159a8206/',
    icon: LinkedInLogoIcon,
    ariaLabel: 'LinkedIn',
    title: 'LinkedIn',
  },
  {
    href: '#',
    icon: EnvelopeOpenIcon,
    ariaLabel: 'Email',
    title: 'Email',
    onClick: () => {
      const text = 'developer.naufal@gmail.com';
      navigator.clipboard.writeText(text);
      toast.success('Email is copied to clipboard');
    },
  },
  {
    href: 'https://www.instagram.com/mrnaufalllll',
    icon: InstagramLogoIcon,
    ariaLabel: 'Instagram',
    title: 'Visit my Instagram',
  },
  {
    href: '/cv.pdf',
    icon: IdCardIcon,
    ariaLabel: 'Download CV',
    title: 'Download my CV',
    download: 'cv.pdf',
  },
];

export { icons };
