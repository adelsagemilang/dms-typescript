import React from 'react';
import {
  Modal,
  ModalBackground,
  ModalCard,
  ModalCardHeader,
  ModalCardTitle,
  ModalCardBody,
  ModalCardFooter,
  NavbarItem,
  Columns,
  Column,
  Box,
  Level,
  LevelLeft,
  LevelRight,
  LevelItem,
  Button,
  Checkbox,
  Control,
} from 'bloomer';
import { connect } from 'react-redux';
import Popup from 'reactjs-popup';
import { ApplicationState } from 'store/rootState';
import {
  getDataLocation,
  getDataTransporter,
  getDataInit,
} from 'store/setting-filter/actions';
import { history } from 'utils/history';
import { LocationTransporterData } from 'store/setting-filter/types';
import { fetchFilterChild, reloadOnce } from 'utils/helper';
import { withHooksHOC } from 'components/withHooksHOC';
import { globalFilterTypeObj } from 'store/globalState';
import { setSetting as setCrypto, getSetting } from 'utils/settingFilterCrypto';

interface IProps {
  dispatch: (arg0: any) => void;
  state: globalFilterTypeObj;
  dataLocation?: LocationTransporterData[];
  dataTransporter?: LocationTransporterData[];
}

interface PropsFromDispatch {
  getDataLocation?: typeof getDataLocation;
  getDataTransporter?: typeof getDataTransporter;
  getDataInit?: typeof getDataInit;
}

const localStorageFilter = getSetting();

type AllProps = IProps & PropsFromDispatch;

class ViewSettings extends React.Component<AllProps, any> {
  buttonTrigger() {
    return (
      <span className="is-size-7 has-text-weight-bold has-text-primary pointer">
        View Settings
      </span>
    );
  }

  componentDidMount() {
    const { getDataLocation, getDataTransporter, getDataInit } = this.props;

    if (getDataLocation) {
      getDataLocation();
    }

    if (getDataTransporter) {
      getDataTransporter();
    }

    if (getDataInit && !localStorageFilter) {
      getDataInit();
      reloadOnce(1000);
    }
  }

  loopDataFilter = (dataType: string) => {
    const fieldElement: any[] = [];
    const { dataLocation, dataTransporter } = this.props;
    const data = dataType === 'transporter' ? dataTransporter : dataLocation;

    if (typeof data !== 'undefined' && data !== null && data.length !== 0) {
      data &&
        data.map(item => {
          fieldElement.push(
            <Column isSize="1/2" key={item.id}>
              <Control>
                <Checkbox
                  id={`${dataType}-${item.id}`}
                  value={item.id}
                  defaultChecked={this.checkedState(dataType, `${item.id}`)}
                >
                  <span className="is-size-7 padding-25">{item.name}</span>
                </Checkbox>
              </Control>
            </Column>,
          );
          return true;
        });
    }
    return fieldElement;
  };

  checkAll = (target: string, isUncheck?: boolean) => {
    const allCheckbox = document.querySelectorAll(
      `#${target} input[type="checkbox"]`,
    );
    allCheckbox.forEach((item: any) => {
      item.checked = !isUncheck;
    });
  };

  getItemChecked = (dataType: string) => {
    const checkedFilterGroup =
      dataType === 'transporter'
        ? document.querySelectorAll(
            '#filter-transporter input[type="checkbox"]:checked',
          )
        : document.querySelectorAll(
            '#filter-location input[type="checkbox"]:checked',
          );

    const allID: any = [];
    checkedFilterGroup.forEach(item => {
      allID.push(item.id);
    });
    return allID;
  };

  checkedState(type = 'location', filterID = '') {
    const globalFilter =
      type === 'transporter'
        ? this.props.state.globalFilter.transporters
        : this.props.state.globalFilter.locations;
    let checkedStatus = false;
    globalFilter &&
      globalFilter.map(item => {
        if (filterID === item || item === 'all') {
          checkedStatus = true;
        }
        return true;
      });

    return checkedStatus;
  }

  saveSettings() {
    this.setSettings();
    history.go(0);
  }

  setSettings() {
    const { dispatch } = this.props;

    const year = document.getElementById('settingYear') as HTMLSelectElement;
    const month = document.getElementById('settingMonth') as HTMLSelectElement;
    const location = fetchFilterChild(this.getItemChecked('location'));
    const transporter = fetchFilterChild(this.getItemChecked('transporter'));

    const globalFilterValue = {
      year: year.value,
      month: month.value,
      location,
      transporter,
    };

    // Set global filter to localStorage
    const encryptedSetting = setCrypto(globalFilterValue);
    localStorage.setItem('settingFilter', encryptedSetting);

    // Dispatch to Global state
    dispatch({
      globalFilter: globalFilterValue,
      type: 'setGlobalFilter',
    });
  }

  render() {
    const { year, month } = this.props.state.globalFilter;
    return (
      <NavbarItem>
        <Popup
          trigger={this.buttonTrigger}
          modal
          closeOnDocumentClick
          onClose={this.saveSettings.bind(this)}
        >
          {close => (
            <Modal id="setting-modal" className="setting-modal" isActive>
              <ModalBackground />
              <ModalCard>
                <ModalCardHeader>
                  <Columns
                    isGapless
                    isVCentered
                    className="modal-columns-fullwidth"
                  >
                    <Column isSize={4} className="is-offset-4">
                      <ModalCardTitle className="is-size-3 has-text-weight-semibold has-text-grey-dark">
                        View Settings
                      </ModalCardTitle>
                    </Column>
                    <Column isSize={5} />
                    <Column isSize={3}>
                      <Box className="padding-75">
                        <Columns id="otif-list-sort">
                          <Column className="has-separator-after">
                            <span className="select-list-title">Year</span>
                            <select
                              className="select-list"
                              id="settingYear"
                              defaultValue={year}
                            >
                              <option value="2020">2020</option>
                              <option value="2019">2019</option>
                            </select>
                          </Column>
                          <Column>
                            <span className="select-list-title">Month</span>
                            <select
                              className="select-list"
                              id="settingMonth"
                              defaultValue={month}
                            >
                              <option value="all">All</option>
                              <option value="1">January</option>
                              <option value="2">February</option>
                              <option value="3">March</option>
                              <option value="4">April</option>
                              <option value="5">May</option>
                              <option value="6">June</option>
                              <option value="7">July</option>
                              <option value="8">August</option>
                              <option value="9">September</option>
                              <option value="10">October</option>
                              <option value="11">November</option>
                              <option value="12">December</option>
                            </select>
                          </Column>
                        </Columns>
                      </Box>
                    </Column>
                  </Columns>
                </ModalCardHeader>
                <ModalCardBody>
                  <Columns>
                    <Column>
                      <Level>
                        <LevelLeft>
                          <LevelItem>
                            <span className="is-size-5 has-text-weight-semibold">
                              Location
                            </span>
                          </LevelItem>
                        </LevelLeft>
                        <LevelRight>
                          <LevelItem>
                            <Button
                              className="is-primary is-small"
                              onClick={() => this.checkAll('filter-location')}
                            >
                              Select All
                            </Button>
                            <Button
                              className="is-primary is-small m-l-10"
                              onClick={() =>
                                this.checkAll('filter-location', true)
                              }
                            >
                              Unselect All
                            </Button>
                          </LevelItem>
                        </LevelRight>
                      </Level>
                      <Box
                        id="filter-location"
                        className="outline-grey has-text-black box-settings-checks"
                      >
                        <Columns isMultiline>
                          {this.loopDataFilter('location')}
                        </Columns>
                      </Box>
                    </Column>
                    <Column>
                      <Level>
                        <LevelLeft>
                          <LevelItem>
                            <span className="is-size-5 has-text-weight-semibold">
                              Transporter
                            </span>
                          </LevelItem>
                        </LevelLeft>
                        <LevelRight>
                          <LevelItem>
                            <Button
                              className="is-primary is-small"
                              onClick={() =>
                                this.checkAll('filter-transporter')
                              }
                            >
                              Select All
                            </Button>
                            <Button
                              className="is-primary is-small m-l-10"
                              onClick={() =>
                                this.checkAll('filter-transporter', true)
                              }
                            >
                              Unselect All
                            </Button>
                          </LevelItem>
                        </LevelRight>
                      </Level>
                      <Box
                        id="filter-transporter"
                        className="outline-grey has-text-black box-settings-checks"
                      >
                        <Columns isMultiline>
                          {this.loopDataFilter('transporter')}
                        </Columns>
                      </Box>
                    </Column>
                  </Columns>
                </ModalCardBody>
                <ModalCardFooter className="modal-footer">
                  <Button isColor="primary" className="pointer" onClick={close}>
                    Save
                  </Button>
                </ModalCardFooter>
              </ModalCard>
            </Modal>
          )}
        </Popup>
      </NavbarItem>
    );
  }
}

const mapStateToProps = ({ settingFilter }: ApplicationState) => ({
  loading: settingFilter.loading,
  errors: settingFilter.errors,
  dataLocation: settingFilter.dataLocation,
  dataTransporter: settingFilter.dataTransporter,
});

const mapDispatchToProps: PropsFromDispatch = {
  getDataLocation,
  getDataTransporter,
  getDataInit,
};

export default withHooksHOC(
  connect(mapStateToProps, mapDispatchToProps)(ViewSettings),
);
