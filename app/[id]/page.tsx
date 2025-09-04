import OperatingAgreement from './../../components/OperatingAgreementTool/OperatingAgreement';

interface AgreementPageProps {
  params: Promise<{
    id: string;
  }>;
}

const AgreementPage = async ({ params }: AgreementPageProps) => {
  const { id } = await params;
  return <OperatingAgreement />;
};

export default AgreementPage;