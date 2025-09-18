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
    href: 'https://github.com/naufalrafianto',
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
    href: 'mailto:developer.naufal@gmail.com',
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
    href: 'https://www.instagram.com/naufallrafianto',
    icon: InstagramLogoIcon,
    ariaLabel: 'Instagram',
    title: 'Visit my Instagram',
  },
  {
    href: 'https://drive.google.com/file/d/1YBbXUZ2gVjMRk3LmSJDTxeb89yWD2rHy/view?usp=sharing',
    icon: IdCardIcon,
    ariaLabel: 'See CV',
    title: 'See my CV',
  },
];

const client_id = process.env.SPOTIFY_CLIENT_ID!;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET!;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN!;

const token = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`;
const TECH_STACK = [
  {
    id: 'react',
    label: 'ReactJS',
  },
  {
    id: 'nextjs',
    label: 'Next JS',
  },

  {
    id: 'prisma',
    label: 'Prisma ORM',
  },
  {
    id: 'node',
    label: 'NodeJS',
  },
  {
    id: 'typescript',
    label: 'TypeScript',
  },
  {
    id: 'expressjs',
    label: 'ExpressJS',
  },
  {
    id: 'nestjs',
    label: 'NestJS',
  },
  {
    id: 'tailwind',
    label: 'Tailwind',
  },
  {
    id: 'golang',
    label: 'Golang',
  },
  {
    id: 'php',
    label: 'PHP',
  },
  {
    id: 'laravel',
    label: 'Laravel',
  },
  {
    id: 'mysql',
    label: 'MySQL',
  },
  {
    id: 'postgres',
    label: 'PostgreSQL',
  },
  {
    id: 'mongodb',
    label: 'MongoDB',
  },
];
export {
  icons,
  client_id,
  client_secret,
  refresh_token,
  token,
  NOW_PLAYING_ENDPOINT,
  TOKEN_ENDPOINT,
  TOP_TRACKS_ENDPOINT,
  TECH_STACK,
};
