import React, { Component } from 'react';
import { Level, LevelLeft, LevelRight, LevelItem, Title } from 'bloomer';
import TableList from './tableList';
import OTIFFilter from './filter';
import { mapDispatchProps } from 'pages/otif-list';

type IProps = typeof mapDispatchProps;

class OTIFList extends Component<IProps> {
  constructor(props) {
    super(props);
    this.state = {};
    this.setFilter = this.setFilter.bind(this);
    this.setPage = this.setPage.bind(this);
    this.props.showBackButton(true);
    this.props.showViewSettings(true);
  }

  setFilter(key: any, value: any) {
    this.setState({
      [key]: value,
    });
  }

  setPage(pageNumber: number) {
    // this.setState({
    //   pageNumber : pageNumber
    // })
  }

  render() {
    return (
      <>
        <Level>
          <LevelLeft>
            <LevelItem>
              <Title isSize={3}>OTIF</Title>
            </LevelItem>
          </LevelLeft>
          <LevelRight>
            <OTIFFilter onChange={this.setFilter} />
          </LevelRight>
        </Level>

        <TableList onChangePage={this.setPage} onChangeFilter={this.state} />
      </>
    );
  }
}

export default OTIFList;
