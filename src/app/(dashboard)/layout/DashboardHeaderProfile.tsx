'use client';

import IconButton from '@/components/common/IconButton';
import ProfileIcon from '@/components/icons/common/ProfileIcon';
import useSignOut from '@/hooks/session/useSignOut';

function DashboardHeaderProfile() {
  const signOut = useSignOut();

  return (
    <IconButton variant="secondary" loading={signOut.isRunning} onClick={() => signOut.run()} title="Sair">
      <ProfileIcon className="h-5 w-5 text-indigo-500" />
    </IconButton>
  );
}

export default DashboardHeaderProfile;
