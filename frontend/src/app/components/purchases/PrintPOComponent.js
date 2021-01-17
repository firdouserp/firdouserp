import React, { Component } from "react";
import logo from "../../assets/firdouslogo.png";

export class PrintVoucherComponent extends Component {
  render() {
    const { record, loaded } = this.props;
    if (record.id) {
      console.log(logo);
      return (
        <div>
          here comes the print po
        </div>
      );
    }
    return null;
  }
}

export default PrintVoucherComponent;
