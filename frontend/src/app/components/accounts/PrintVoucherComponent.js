import React, { Component } from "react";
import logo from "../../assets/firdouslogo.png";
import Voucher from "./VoucherPrint";
export class PrintVoucherComponent extends Component {
  render() {
    const { record, loaded } = this.props;
    if (record.id) {
      console.log(logo);
      return (
        <div>
          <Voucher
            voucher={{ ...record }}
            // invoice={{ "createdDate": "25-5-2021", "dueDate": "23-2-9892", "paidDate": "25,1,2021", "paymentMethod": "CASH", "id": "1", "description": "this is description", "items": [{ 'description': 'item1', 'amount': '25' }], "name": "Firdous REsidecy" }}
            //customer={{}}
            company={{
              name: "Firdous ERP",
              logoUrl: logo,
            }}
          />
        </div>
      );
    }
    return null;
  }
}

export default PrintVoucherComponent;
