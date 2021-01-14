import CircularProgress from "@material-ui/core/CircularProgress";
import { useShowController } from "react-admin";
import Voucher from "./VoucherPrint";

const VoucherShow = (props) => {
  const {
    basePath, // deduced from the location, useful for action buttons
    defaultTitle, // the translated title based on the resource, e.g. 'Post #123'
    loaded, // boolean that is false until the record is available
    loading, // boolean that is true on mount, and false once the record was fetched
    record, // record fetched via dataProvider.getOne() based on the id from the location
    resource, // the resource name, deduced from the location. e.g. 'posts'
    version, // integer used by the refresh feature
  } = useShowController(props);
  console.log(record);
  if (!loaded) {
    return <CircularProgress />;
  }
  return (
    <Voucher
      voucher={{ ...record }}
      // invoice={{ "createdDate": "25-5-2021", "dueDate": "23-2-9892", "paidDate": "25,1,2021", "paymentMethod": "CASH", "id": "1", "description": "this is description", "items": [{ 'description': 'item1', 'amount': '25' }], "name": "Firdous REsidecy" }}
      //customer={{}}
      company={{ name: "Firdous ERP", logoUrl: "%PUBLIC_URL%/firdouslogo.png" }}
      notes={"Here comes the Remarks"}
    />
  );
};

export default VoucherShow;
