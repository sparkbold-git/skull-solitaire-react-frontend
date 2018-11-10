import React from "react";

export default class PlayerDeck extends React.Component {
  render() {
    const { deck } = this.props;
    return (
      <div id='playerDeck' className="card">
        {deck[0] ? <img src={deck[0].image} alt="oh!no" /> : null}
      </div>
    );
  }
}
