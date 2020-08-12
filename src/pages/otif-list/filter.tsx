import React, { Component } from 'react';
import { LevelItem, Box, Columns, Column } from 'bloomer';

interface IProps {
  onChange?: any;
}

class OTIFFilter extends Component<IProps> {
  componentDidMount() {
    this.props.onChange('type', 'otif');
    this.props.onChange('sort_by', 'leadtime');
    this.props.onChange('sort', 'asc');
  }

  setFilterToParent(e: any) {
    this.props.onChange(e.target.name, e.target.value);
  }

  render() {
    return (
      <>
        <LevelItem>
          <Box>
            <Columns id="otif-list-options">
              <Column>
                <input
                  type="radio"
                  name="type"
                  value="otif"
                  defaultChecked
                  onChange={e => this.setFilterToParent(e)}
                />
                &nbsp;&nbsp;OTIF
              </Column>
              <Column>
                <input
                  type="radio"
                  name="type"
                  value="ot"
                  onChange={e => this.setFilterToParent(e)}
                />
                &nbsp;&nbsp;OT
              </Column>
              <Column>
                <input
                  type="radio"
                  name="type"
                  value="if"
                  onChange={e => this.setFilterToParent(e)}
                />
                &nbsp;&nbsp;IF
              </Column>
              <Column>
                <input
                  type="radio"
                  name="type"
                  value="xotif"
                  onChange={e => this.setFilterToParent(e)}
                />
                &nbsp;&nbsp;X OTIF
              </Column>
            </Columns>
          </Box>
        </LevelItem>
        <LevelItem>
          <Box className="padding-75">
            <Columns id="otif-list-sort">
              <Column className="has-separator-after">
                <span className="select-list-title">Sort By</span>
                <select
                  name="sort_by"
                  className="select-list"
                  onChange={e => this.setFilterToParent(e)}
                >
                  <option value="leadtime">Lead Time</option>
                  <option value="kpi">KPI Diff</option>
                  <option value="tickets">Tickets</option>
                </select>
              </Column>
              <Column>
                <span className="select-list-title">&nbsp;</span>
                <select
                  name="sort"
                  className="select-list"
                  onChange={e => this.setFilterToParent(e)}
                >
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </Column>
            </Columns>
          </Box>
        </LevelItem>
      </>
    );
  }
}

export default OTIFFilter;
