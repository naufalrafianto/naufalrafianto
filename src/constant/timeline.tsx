import { LaptopIcon, PersonIcon } from '@radix-ui/react-icons';
import { GrTest } from 'react-icons/gr';

const timelineItems = [
  {
    icon: <PersonIcon />,
    logo: '/image/logo/logosynergy.png',
    date: '2025-07-28/present',
    company: 'RSUD Syarifah Ambami Rato Ebu',
    title: 'Frontend Developer',
    type: 'Contract',
    location: 'Bangkalan, Indonesia - Remote',
    website: 'https://rsud.bangkalankab.go.id/syam_profile/',
    description:
      'Designed and developed a replica of a Hospital Information System (SIM RS), implementing core modules such as patient management, medical records, appointment scheduling, and billing. The project emphasized data integrity and role-based authentication for doctors, nurses, and admins, while strengthening my ability to deliver clean, maintainable code under tight timelines.',
  },
  {
    icon: <LaptopIcon />,
    logo: '/image/logo/gnfi.png',
    date: '2024-05-01/2024-10-31',
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
