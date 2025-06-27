import AdComponent from '@/components/AdComponent';
import Main from '@/features/Main';
import { store } from '@/redux/store';

export default function Home() {
  const user = store.getState().user?.userInfo;
  const membership = user?.userMembershipStatus?.membershipName;
  const isPremium = membership === 'premium';
  return (
    <>
      <Main />
      {isPremium || <AdComponent />}
    </>
  );
}
