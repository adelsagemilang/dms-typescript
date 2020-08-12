import { LayoutState } from 'layout';
import { RouterState } from 'connected-react-router';
import { LoginState } from './login/types';
import { SettingFilterState } from './setting-filter/types';
import { PerformanceSummaryState } from './performance-summary/types';
import { KPIState } from './kpi/types';
import { OTIFState } from './otif/types';
import { OrderDetailState } from './order-detail/types';

// The top-level state object
export interface ApplicationState {
  layout: LayoutState;
  login: LoginState;
  settingFilter: SettingFilterState;
  performanceSummary: PerformanceSummaryState;
  KPI: KPIState;
  OTIF: OTIFState;
  router: RouterState;
  orderDetail: OrderDetailState;
}
