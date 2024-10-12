import { LaptopIcon, PersonIcon } from '@radix-ui/react-icons';
import { GrTest } from 'react-icons/gr';

const timelineItems = [
  {
    icon: <PersonIcon />,
    date: '2023-07-01/present',
    title: 'Fullstack Developer',
    type: 'Freelance',
    location: 'Surabaya, Indonesia - Remote',
    description:
      'As a Fullstack Developer, I specialize in designing and developing scalable web applications. My responsibilities include building and maintaining both the frontend and backend of projects using modern frameworks such as Next.js, implementing responsive UI/UX designs, optimizing performance, and ensuring seamless functionality across all devices. Additionally, I manage testing, debugging, and deployment, along with maintaining comprehensive documentation.',
  },
  {
    icon: <LaptopIcon />,
    logo: '/image/logo/gnfi.png',
    date: '2024-05-01/present',
    title: 'Frontend Developer',
    company: 'Good News From Indonesia',
    type: 'Internship',
    location: 'Jakarta, Indonesia - Remote',
    website: 'https://www.goodnewsfromindonesia.id/',
    description:
      'As a Frontend Developer Intern at Good News From Indonesia, the main tasks include developing and redesign UI for Good News From Indonesia websites . The intern will translate designs into Next.js framework with the Storybook for components template, ensure functionality across various devices and browsers, and be involved in testing, debugging, and documentation.',
  },
  {
    icon: <GrTest />,
    logo: '/image/logo/mandiri.png',
    date: '2024-02-01/2024-07-31',
    title: 'Performance Test Engineer',
    company: 'PT Bank Mandiri (Persero) Tbk.',
    type: 'Internship',
    location: 'Jakarta, Indonesia - On site',
    website: 'https://bankmandiri.co.id/',
    description:
      'As part of the SDLC, the role involves participating in performance testing, including coordination meetings, testing processes, and documentation. The intern is also responsible for compiling historical performance test data using Jira. Performance tests are conducted using tools such as Load Runner and JMeter, and effective communication with relevant stakeholders is maintained throughout the execution of these tests.',
  },
];

export { timelineItems };
