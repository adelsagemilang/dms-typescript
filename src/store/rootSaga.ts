import { all, fork } from 'redux-saga/effects';

import LoginSaga from './login/sagas';
import settingFilterSaga from './setting-filter/sagas';
import SummarySaga from './summary/sagas';
import QuantitySaga from './quantity/sagas';
import FinancialSaga from './financial/sagas';
import KpiProgressSaga from './kpi-progress/sagas';
import performanceSummarySaga from './performance-summary/sagas';
import KPISaga from './kpi/sagas';
import OTIFSaga from './otif/sagas';
import OrderDetailSaga from './order-detail/sagas';

export function* rootSaga() {
  yield all([
    fork(LoginSaga),
    fork(SummarySaga),
    fork(QuantitySaga),
    fork(FinancialSaga),
    fork(KpiProgressSaga),
    fork(settingFilterSaga),
    fork(settingFilterSaga),
    fork(performanceSummarySaga),
    fork(KPISaga),
    fork(OTIFSaga),
    fork(OrderDetailSaga),
  ]);
}
