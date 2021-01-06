import { Component, React } from "react";
import ReactToPrint from "react-to-print";
import { BookingConfirm } from "./BookingConfirm";

class BookingPrint extends Component {
  render() {
    return (
      <div>
        <ReactToPrint
          trigger={() => {
            // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
            // to the root node of the returned component as it will be overwritten.
            return <a href="#/accounts">Print this out!</a>;
          }}
          content={() => this.componentRef}
        />
        <BookingConfirm ref={(el) => (this.componentRef = el)} />
      </div>
    );
  }
}

export default BookingPrint;
