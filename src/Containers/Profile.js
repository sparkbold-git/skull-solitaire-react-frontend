import React from "react";
import AuthService from "./AuthService";
const Auth = new AuthService();
export default class Profile extends React.Component {
  state = {
    userStats: []
  };

  componentDidMount() {
    fetch("https://skull-solitaire-be.herokuapp.com/api/v1/games")
      .then(resp => resp.json())
      .then(stats => {
        const tempStats = stats.filter(
          stat => stat.user.id === Auth.getProfile().user_id
        );
        const userStats = tempStats.sort(function (a, b) {
          return parseInt(a.game_time) - parseInt(b.game_time);
        });
        this.setState({ userStats });
      });
  }

  render() {
    const { userStats } = this.state;
    return Auth.loggedIn() ? (
      <div id="profile">
        <div id="stats">
          <h2>Stats</h2>
          <p>
            Games Won:{" "}
            {[...userStats].filter(s => s.game_score === "win").length}
          </p>
          <p>
            Games Lost:{" "}
            {[...userStats].filter(s => s.game_score === "loss").length}
          </p>
          <p>
            Fastest Time:{" "}
            {userStats.length > 0
              ? userStats.find(s => s.game_score === "win").game_time +
              " seconds"
              : null}
          </p>
        </div>
        <img id="profileCards" src={require(`../images/cards.png`)} alt="no!" />
      </div>
    ) : null;
  }
}
