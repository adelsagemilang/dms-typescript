import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleLeft,
  faAngleRight,
  faAngleDoubleRight,
  faAngleDoubleLeft,
} from '@fortawesome/free-solid-svg-icons';

interface IProps {
  totalRecords: number;
  pageLimit: number;
  pagesToShow: number;
  initialPage: number;
  onChangePage: any;
}

interface IState {
  totalRecords: any;
  pageLimit: any;
  totalPages: any;
  currentPage: any;
  initialPage: any;
  pagesToShow: any;
}

class Pagination extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      totalRecords: '',
      pageLimit: '',
      totalPages: '',
      currentPage: '',
      initialPage: '',
      pagesToShow: '',
    };
  }

  componentDidMount() {
    this.setState({
      totalRecords: this.props.totalRecords,
      pageLimit: this.props.pageLimit || 10,
      totalPages: Math.ceil(this.props.totalRecords / this.props.pageLimit),
      pagesToShow: this.props.pagesToShow || 5,
      currentPage: this.props.initialPage || 1,
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      totalRecords: nextProps.totalRecords,
      pageLimit: nextProps.pageLimit || 10,
      totalPages: Math.ceil(nextProps.totalRecords / nextProps.pageLimit),
      pagesToShow: nextProps.pagesToShow || 5,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.totalRecords !== prevState.totalRecords ||
      this.state.pageLimit !== prevState.pageLimit
    ) {
      this.setPage(this.state.currentPage);
    }
  }

  setPage(page) {
    const { totalRecords, pageLimit, totalPages } = this.state;

    if (page < 1) {
      page = 1;
    } else if (page > totalPages) {
      page = totalPages;
    }

    this.setState({
      currentPage: page,
    });

    const startIndex = (page - 1) * pageLimit;
    const endIndex = Math.min(startIndex + pageLimit - 1, totalRecords - 1);

    this.props.onChangePage({
      pageLimit,
      totalPages,
      page,
      startIndex,
      endIndex,
    });
  }

  getPager() {
    let { pagesToShow, currentPage, totalPages } = this.state;
    const pages: any = [];
    let startFromNumber;

    if (totalPages <= pagesToShow) {
      startFromNumber = 1;
      pagesToShow = totalPages;
    } else if (currentPage <= Math.ceil(pagesToShow / 2)) {
      startFromNumber = 1;
    } else if (currentPage + Math.floor((pagesToShow - 1) / 2) >= totalPages) {
      startFromNumber = totalPages - (pagesToShow - 1);
    } else {
      startFromNumber = currentPage - Math.floor(pagesToShow / 2);
    }

    for (let i = 1; i <= pagesToShow; i++) {
      pages.push(startFromNumber++);
    }

    return {
      currentPage,
      totalPages,
      pages,
    };
  }

  render() {
    if (!this.state.totalRecords || this.state.totalPages === 1) return null;

    const pager = this.getPager();

    return (
      <ul className="paging-table">
        <li>
          <button
            disabled={pager.currentPage === 1}
            onClick={() => this.setPage(1)}
          >
            <FontAwesomeIcon icon={faAngleDoubleLeft} />
          </button>
        </li>
        <li>
          <button
            disabled={pager.currentPage === 1}
            onClick={() => this.setPage(pager.currentPage - 1)}
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
        </li>
        {pager.pages.map((page, index) => (
          <li key={index}>
            <button
              className={pager.currentPage === page ? 'active' : ''}
              onClick={() => this.setPage(page)}
            >
              {page}
            </button>
          </li>
        ))}
        <li>
          <button
            disabled={pager.currentPage === pager.totalPages}
            onClick={() => this.setPage(pager.currentPage + 1)}
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </li>
        <li>
          <button
            disabled={pager.currentPage === pager.totalPages}
            onClick={() => this.setPage(pager.totalPages)}
          >
            <FontAwesomeIcon icon={faAngleDoubleRight} />
          </button>
        </li>
      </ul>
    );
  }
}

export default Pagination;
