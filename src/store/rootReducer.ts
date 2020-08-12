import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

import LayoutReducer from 'layout/reducer';

// pages reducer
import LoginReducer from './login/reducer';
import { settingFilterReducer } from './setting-filter/reducer';
import { reducer as settingFilterValues } from './globalState';
import SummaryReducer from './summary/reducer';
import QuantityReducer from './quantity/reducer';
import FinancialReducer from './financial/reducer';
import KpiProgressReducer from './kpi-progress/reducer';
import { performanceSummaryReducer } from './performance-summary/reducer';
import { KPIReducer } from './kpi/reducer';
import { OTIFReducer } from './otif/reducer';
import { OrderDetailReducer } from './order-detail/reducer';

export const rootReducer = (history: History) =>
  combineReducers({
    layout: LayoutReducer,
    login: LoginReducer,
    settingFilter: settingFilterReducer,
    settingFilterValues,
    summary: SummaryReducer,
    quantity: QuantityReducer,
    financial: FinancialReducer,
    kpiProgress: KpiProgressReducer,
    performanceSummary: performanceSummaryReducer,
    KPI: KPIReducer,
    OTIF: OTIFReducer,
    orderDetail: OrderDetailReducer,
    router: connectRouter(history),
  });
