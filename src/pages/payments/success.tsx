import * as React from 'react';
import { useCallback } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { PaymentMixersSuccess } from '@mojito-inc/claim-management';

const SuccessPage: NextPage = () => {
  const router = useRouter();

  const onClickGoToMarketPlace = useCallback(() => {
    router.replace('/');
  }, [router]);

  return (
    <PaymentMixersSuccess
      onClickGoToMarketPlace={ onClickGoToMarketPlace } />
  );
};

export default SuccessPage;
