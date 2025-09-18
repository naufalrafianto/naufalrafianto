import PortfolioHomeSectionWrapper from '@/components/layout/Portfolio';
import Retrospective from '@/components/layout/Retrospective';
import { HomePage } from '@/components/page/HomePage';

export default function Home() {
  return <>
    <HomePage />
    <Retrospective />
    {/* <TechList /> */}
    <PortfolioHomeSectionWrapper />
  </>
}
