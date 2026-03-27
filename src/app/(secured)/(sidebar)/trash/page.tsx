import TrashPageTable from '@/components/pages/trash-page/trash-table/trash-page-table';
import TrashPageWarningCard from '@/components/pages/trash-page/trash-warning-card/trash-page-warning-card';

export default function TrashPage() {
  return (
    <>
      <TrashPageWarningCard className='my-6' />
      <TrashPageTable className='mt-12' />
    </>
  );
}
