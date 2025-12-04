import Modal from '@/components/common/Modal'
import ApplicationDetailContent from '@/features/application/ui/ApplicationDetailModal/ApplicationDetailContent'
import ApplicationDetailFooterActions from '@/features/application/ui/ApplicationDetailModal/ApplicationDetailFooterActions'

type Props = {
  isModalOpen: boolean
  handleCloseModal: () => void
}

export default function ApplicationDetailModal({
  isModalOpen,
  handleCloseModal,
}: Props) {
  return (
    <Modal
      className="h-[826px] max-w-6xl"
      title="스터디 구인 공고 상세 정보"
      contentClassName="p-0"
      footer={<ApplicationDetailFooterActions />}
      footerClassName="p-0"
      topCloseButton
      isOpen={isModalOpen}
      onClose={handleCloseModal}
    >
      <ApplicationDetailContent />
    </Modal>
  )
}
