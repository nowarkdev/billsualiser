import React from "react";
import DisplayCallCharges from "./DisplayCallCharges.jsx";
import DisplayRentals from "./DisplayRentals.jsx";
import Anchor from "./Anchor.jsx"

export default class Overview extends React.Component {

  formatFloat (n) {
    return parseFloat(Math.round(n * 100) / 100).toFixed(2);
  }

  getTvTitle() {
    return this.props.data.package.subscriptions.map(function (subscription) {
      if (subscription.type === "tv")
        return subscription.name;
    });
  };

  getBroadbandTitle() {
    return this.props.data.package.subscriptions.map(function (subscription) {
      if (subscription.type === "broadband")
        return subscription.name;
    });
  };

  getTalkTitle() {
    return this.props.data.package.subscriptions.map(function (subscription) {
      if (subscription.type === "talk")
        return subscription.name;
    });
  };

  getTotalCostFor (type) {
    let cost = 0;
    this.props.data.package.subscriptions.map(function (subscription) {
      if (subscription.type === type)
        cost = subscription.cost;
    });
    return this.formatFloat(cost);
  };

  getTalkTotalCost () {
    let talkCost = parseFloat(this.getTotalCostFor('talk'));
    return this.formatFloat(talkCost + this.props.data.callCharges.total);
  }

  addUpTotalCostsFor (property) {
    let total = 0;
    let items = this.props.data.skyStore[property];

    items.map(function (item) {
      total += item.cost;
    });
    return total;
  }

  render () {
    return <div className="panel panel-info">
      <div className="panel-heading">
        <h3 className="panel-title">Packages & Charges <small id="period">{this.props.data.statement.period.from} - {this.props.data.statement.period.to}</small></h3>
      </div>

      <a id="tv_title" className="list-group-item" data-toggle="collapse" data-target="#tv" href="#tv"><span className="glyphicon glyphicon-chevron-right"></span> Sky TV {this.getTvTitle()} <span className="badge">£ {this.getTotalCostFor('tv')}</span></a>
        <div id="tv" className="panel-collapse collapse">
          <a href="#more-tv-channels">Want to add more TV Channels?</a><br />
          <a href="#help">Help</a>
        </div>

      <a id="broadband_title" className="list-group-item" data-toggle="collapse" data-target="#broadband" href="#broadband"><span className="glyphicon glyphicon-chevron-right"></span> Sky Broadband {this.getBroadbandTitle()} <span className="badge">£ {this.getTotalCostFor('broadband')}</span></a>
        <div id="broadband" className="panel-collapse collapse">
          <a href="#change-bb-plan">Change broadband speed</a><br />
          <a href="#help">Help</a>
        </div>


        <Anchor id="talk_title"  target="talk" title={this.getTalkTitle()} totalCost={this.getTalkTotalCost()} />
        <DisplayCallCharges id="talk" callCharges={this.props.data.callCharges.calls} />

        <Anchor id="rentals_title"  target="rentals" title="Rentals" totalCost={this.addUpTotalCostsFor('rentals')} />
        <DisplayRentals rentals={this.props.data.skyStore.rentals} />

        <a id="buy_and_keep_title" className="list-group-item" data-toggle="collapse" data-target="#buyAndKeep" href="#buyAndKeep"><span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span> Buy & Keep <span className="badge">£ {this.addUpTotalCostsFor('buyAndKeep')}</span></a>
        <div id="buyAndKeep" className="panel-collapse collapse">
          <table className="table">
            <thead>
              <th></th>
              <th>Title</th>
              <th>Cost</th>
            </thead>

            <tbody>
              <th></th>
              <th>Shades</th>
              <th>20.0</th>
            </tbody>
          </table>
      </div>
    </div>;
  };
};
