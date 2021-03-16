import React, { Component } from "react";

class Header extends Component {
    render() {
        return  (
            <div className="text-center">
            <img
              src="https://media.discordapp.net/attachments/821426521859162192/821456504875646976/teams-chaos.png?width=800&height=450"
              width="300"
              className="img-thumbnail"
              style={{ marginTop: "20px" }}
            />
            <hr />
            <h5>
              <i>DailyPlanner</i>
            </h5>
          </div>
        );
    }
}

export default Header;