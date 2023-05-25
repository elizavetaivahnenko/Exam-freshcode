import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import styles from "./Header.module.sass";
import CONSTANTS from "../../constants";
import {
  getUserAction,
  clearUserStore,
  headerRequest,
} from "../../actions/actionCreator";
import Logo from "../Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import classnames from "classnames";

class Header extends React.Component {
  constructor() {
    super();
    this.state = { isClickedBurger: false };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    if (!this.props.data) {
      this.props.getUser();
    }
  }

  handleClick = () => {
    this.setState((prevState) => ({
      isClickedBurger: !prevState.isClickedBurger,
    }));
  };

  logOut = () => {
    localStorage.clear();
    this.props.clearUserStore();
    this.props.history.replace("/login");
  };

  startContests = () => {
    this.props.history.push("/startContest");
  };

  renderLoginButtons = () => {
    if (this.props.data) {
      return (
        <>
          <div className={styles.userInfo}>
            <img
              src={
                this.props.data.avatar === "anon.png"
                  ? CONSTANTS.ANONYM_IMAGE_PATH
                  : `${CONSTANTS.publicURL}${this.props.data.avatar}`
              }
              alt="user"
            />
            <span>{`Hi, ${this.props.data.displayName}`}</span>
            <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
              alt="menu"
            />
            {this.props.data.role === CONSTANTS.MODERATOR ? (
              <ul>
                <li>
                  <Link to="/dashboard" style={{ textDecoration: "none" }}>
                    <span>View Offers</span>
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <span onClick={this.logOut}>Logout</span>
                  </Link>
                </li>
              </ul>
            ) : (
              <ul>
                <li>
                  <Link to="/events" style={{ textDecoration: "none" }}>
                    <span>Events</span>
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" style={{ textDecoration: "none" }}>
                    <span>View Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link to="/account" style={{ textDecoration: "none" }}>
                    <span>My Account</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="http:/www.google.com"
                    style={{ textDecoration: "none" }}
                  >
                    <span>Messages</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="http:/www.google.com"
                    style={{ textDecoration: "none" }}
                  >
                    <span>Affiliate Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <span onClick={this.logOut}>Logout</span>
                  </Link>
                </li>
              </ul>
            )}
          </div>
          <img
            src={`${CONSTANTS.STATIC_IMAGES_PATH}email.png`}
            className={styles.emailIcon}
            alt="email"
          />
        </>
      );
    }
    return (
      <>
        <Link to="/login" style={{ textDecoration: "none" }}>
          <span className={styles.btn}>LOGIN</span>
        </Link>
        <Link to="/registration" style={{ textDecoration: "none" }}>
          <span className={styles.btn}>SIGN UP</span>
        </Link>
      </>
    );
  };

  render() {
    if (this.props.isFetching) {
      return null;
    }
    return (
      <div className={styles.headerContainer}>
        <div className={styles.fixedHeader}>
          <span className={styles.info}>
            Squadhelp recognized as one of the Most Innovative Companies by Inc
            Magazine.
          </span>
          <a href="http://www.google.com">Read Announcement</a>
        </div>
        <div className={styles.loginSignnUpHeaders}>
          <div className={styles.numberContainer}>
            <img src={`${CONSTANTS.STATIC_IMAGES_PATH}phone.png`} alt="phone" />
            <span>
              <a
                style={{ textDecoration: "none" }}
                href={`tel: ${CONSTANTS.PHONE}`}
              >{`${CONSTANTS.PHONE}`}</a>
            </span>
          </div>
          <div className={styles.userButtonsContainer}>
            {this.renderLoginButtons()}
          </div>
        </div>
        <div className={styles.navContainer}>
          <Logo className={styles.logo} />
          <FontAwesomeIcon
            className={styles.burger}
            icon={this.state.isClickedBurger ? faXmark : faBars}
            onClick={this.handleClick}
          />
          <div
            className={classnames(styles.leftNav, {
              [styles.leftNav_active]: this.state.isClickedBurger,
            })}
          >
            <div className={styles.nav}>
              <ul>
                <li
                  className={classnames({
                    [styles.navItem]: this.state.isClickedBurger,
                  })}
                >
                  <span>NAME IDEAS</span>
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                    alt="menu"
                  />
                  <ul
                    className={classnames({
                      [styles.menu]: this.state.isClickedBurger,
                    })}
                  >
                    <li>
                      <a href="http://www.google.com">Beauty</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">Consulting</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">E-Commerce</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">Fashion & Clothing</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">Finance</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">Real Estate</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">Tech</a>
                    </li>
                    <li className={styles.last}>
                      <a href="http://www.google.com">More Categories</a>
                    </li>
                  </ul>
                </li>
                <li
                  className={classnames({
                    [styles.navItem]: this.state.isClickedBurger,
                  })}
                >
                  <span>CONTESTS</span>
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                    alt="menu"
                  />
                  <ul
                    className={classnames({
                      [styles.menu]: this.state.isClickedBurger,
                    })}
                  >
                    <li>
                      <Link to="/howItWorks">HOW IT WORKS</Link>
                    </li>
                    <li>
                      <a href="http://www.google.com">PRICING</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">AGENCY SERVICE</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">ACTIVE CONTESTS</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">WINNERS</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">LEADERBOARD</a>
                    </li>
                    <li className={styles.last}>
                      <a href="http://www.google.com">BECOME A CREATIVE</a>
                    </li>
                  </ul>
                </li>
                <li
                  className={classnames({
                    [styles.navItem]: this.state.isClickedBurger,
                  })}
                >
                  <span>Our Work</span>
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                    alt="menu"
                  />
                  <ul
                    className={classnames({
                      [styles.menu]: this.state.isClickedBurger,
                    })}
                  >
                    <li>
                      <a href="http://www.google.com">NAMES</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">TAGLINES</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">LOGOS</a>
                    </li>
                    <li className={styles.last}>
                      <a href="http://www.google.com">TESTIMONIALS</a>
                    </li>
                  </ul>
                </li>
                <li
                  className={classnames({
                    [styles.navItem]: this.state.isClickedBurger,
                  })}
                >
                  <span>Names For Sale</span>
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                    alt="menu"
                  />
                  <ul
                    className={classnames({
                      [styles.menu]: this.state.isClickedBurger,
                    })}
                  >
                    <li>
                      <a href="http://www.google.com">POPULAR NAMES</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">SHORT NAMES</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">INTRIGUING NAMES</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">NAMES BY CATEGORY</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">VISUAL NAME SEARCH</a>
                    </li>
                    <li className={styles.last}>
                      <a href="http://www.google.com">SELL YOUR DOMAINS</a>
                    </li>
                  </ul>
                </li>
                <li
                  className={classnames({
                    [styles.navItem]: this.state.isClickedBurger,
                  })}
                >
                  <span>Blog</span>
                  <img
                    src={`${CONSTANTS.STATIC_IMAGES_PATH}menu-down.png`}
                    alt="menu"
                  />
                  <ul
                    className={classnames({
                      [styles.menu]: this.state.isClickedBurger,
                    })}
                  >
                    <li>
                      <a href="http://www.google.com">ULTIMATE NAMING GUIDE</a>
                    </li>
                    <li>
                      <a href="http://www.google.com">
                        POETIC DEVICES IN BUSINESS NAMING
                      </a>
                    </li>
                    <li>
                      <a href="http://www.google.com">CROWDED BAR THEORY</a>
                    </li>
                    <li className={styles.last}>
                      <a href="http://www.google.com">ALL ARTICLES</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            {this.props.data &&
              this.props.data.role !== CONSTANTS.CREATOR &&
              this.props.data.role !== CONSTANTS.MODERATOR && (
                <div
                  className={styles.startContestBtn}
                  onClick={this.startContests}
                >
                  START CONTEST
                </div>
              )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => state.userStore;
const mapDispatchToProps = (dispatch) => ({
  getUser: () => dispatch(headerRequest()),
  clearUserStore: () => dispatch(clearUserStore()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
