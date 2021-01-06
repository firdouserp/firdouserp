
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import ReactToPrint from "react-to-print";

export class BookingPrint extends React.Component {
    render() {
      
        const { booking, schedule, step} = this.props;
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
          <BookingConfirm booking = {booking} schedule = {schedule} step = {3} ref={(el) => (this.componentRef = el)} />
        </div>
      );
    }
  }

export class BookingConfirm extends React.Component {
    

    

    continue = e => {
        e.preventDefault();
        //PROCESS FORM // 
        this.props.nextStep();

    }
    back = e => {
        e.preventDefault();
        this.props.prevStep();

    }


   

    render() {

        const { booking, schedule, step} = this.props;
       // const classes = useStyles();


        if (step == 3) {

            return (
                      
                <Card >
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant="h6" gutterBottom>
                                Booking Confirmation 
                                    </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h6" gutterBottom align="right">
                            {/* <BookingPrint />  */}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12} container alignContent="flex-end">
                        <Typography variant="h6" gutterBottom>
                                Booking Details
                            </Typography>
                        </Grid>
                    </Grid>
                    <div >&nbsp;</div>
                    <Grid container display = "flex" spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant="h6" gutterBottom align="left">
                                Date :{' '}  {new Date(booking.book_date).toLocaleDateString()} 
                            </Typography>
                            <Typography variant="h6" gutterBottom align="left">
                                ID { } {(booking.id)}
                            </Typography>
                            <Typography variant="h6" gutterBottom align="left">
                                Code {(booking.code)}
                            </Typography>
                             <Typography variant="h6" gutterBottom align="left">
                                Scode {(booking.scode)}
                            </Typography>
                            <Typography variant="h6" gutterBottom align="left" >
                                Title {(booking.title)} 
                            </Typography>
                           
                            <Typography variant="h6" gutterBottom align="left">
                                Unit {(booking.unit)}
                            </Typography>
                            
                            <Typography variant="h6" gutterBottom align="left">
                                Client {(booking.client)}
                            </Typography>
                           
                            <Typography variant="h6" gutterBottom align="left">
                                Project {(booking.project)}
                            </Typography>
                           
                            <Typography variant="h6" gutterBottom align="left">
                                Sale Price {(booking.sale_price)}
                            </Typography>
                            
                            <Typography variant="h6" gutterBottom align="left">
                                Discount  {(booking.discount)}
                            </Typography>
                           
                            <Typography variant="h6" gutterBottom align="left">
                                Active  {(booking.active)}
                            </Typography>
                            
                            <Typography variant="h6" gutterBottom align="left">
                                Remarks {(booking.remarks)}
                            </Typography>
                            
                            <Typography variant="h6" gutterBottom align="left">
                                Name  {(booking.name)}
                            </Typography>
                            
                            <Typography variant="h6" gutterBottom align="left">
                                Father's Name  {(booking.father_name)}
                            </Typography>
                          
                            <Typography variant="h6" gutterBottom align="left">
                                Residential Address {(booking.residential_address)}
                            </Typography>
                            
                            <Typography variant="h6" gutterBottom align="left">
                                Phone Number {(booking.phone_no)}
                            </Typography>
                            
                            <Typography variant="h6" gutterBottom align="left">
                                Occupation  {(booking.occupation)}
                            </Typography>
                         
                            <Typography variant="h6" gutterBottom align="left">
                                Nationality  {(booking.nationality)}
                            </Typography> 
                            
                            <Typography variant="h6" gutterBottom align="left">
                                CNIC  {(booking.cnic)}
                            </Typography>
                           
                            <Typography variant="h6" gutterBottom align="left">
                                Reference Of {(booking.reference_off)}
                            </Typography>
                          
                            <Typography variant="h6" gutterBottom align="left">
                                Nominee's Name {(booking.nominee_name)}
                            </Typography>
                            
                            <Typography variant="h6" gutterBottom align="left">
                                Realtion  {(booking.relation)}
                            </Typography>
                            <Typography variant="h6" gutterBottom align="left">
                                Email  {(booking.email)}
                            </Typography>

                        
                        
                            

                            
                           
                        </Grid>
                            <Grid item xs = {6}>
                            <Typography variant="h6" gutterBottom align="left">
                                Schedule Confirmation 
                                    </Typography>
                            <Typography variant="h6" gutterBottom align="left">
                                ID :  {(schedule.id)}
                            </Typography>
                            
                            <Typography variant="h6" gutterBottom align="left">
                                Name : {(schedule.name)}
                            </Typography>
                            
                            <Typography variant="h6" gutterBottom align="left">
                                Date: {" "} {new Date(schedule.date).toLocaleDateString()}
                            </Typography>
                            
                            <Typography variant="h6" gutterBottom align="left">
                                Unit :{(schedule.unit)}
                            </Typography>
                            
                            <Typography variant="h6" gutterBottom align="left">
                                Type : {(schedule.type)}
                            </Typography>
                            
                            <Typography variant="h6" gutterBottom align="left">
                                floor : {(schedule.floor)}
                            </Typography>
                            
                            <Typography variant="h6" gutterBottom align="left">
                                block : {(schedule.block)}
                            </Typography>
                            
                            <Typography variant="h6" gutterBottom align="left">
                                Contact :  {(schedule.contact)}
                            </Typography>
                            
                            <Typography variant="h6" gutterBottom align="left">
                                total Cost : {(schedule.total_cost)}
                            </Typography>
                            
                            <Typography variant="h6" gutterBottom align="left">
                                On Booking : {(schedule.on_booking)}
                            </Typography>
                            
                            <Typography variant="h6" gutterBottom align="left">
                                On Allocation: {(schedule.on_allocation)}
                            </Typography>
                           
                            <Typography variant="h6" gutterBottom align="left">
                                On Confirmation : {(schedule.on_confirmation)}
                            </Typography>
                            
                            <Typography variant="h6" gutterBottom align="left">
                                Monthly Installment :  {(schedule.monthly_installment)}
                            </Typography>
                            
                            <Typography variant="h6" gutterBottom align="left">
                                On Start : {(schedule.on_start)}
                            </Typography>
                            
                            <Typography variant="h6" gutterBottom align="left">
                                Quaterly Payment : {(schedule.quaterly_payment)}
                            </Typography>
                           
                            <Typography variant="h6" gutterBottom align="left">
                                On Excavation :  {(schedule.on_excavation)}
                            </Typography>
                           
                            <Typography variant="h6" gutterBottom align="left">
                                On Foundaiton : {(schedule.on_foundation)}
                            </Typography>
                            
                            <Typography variant="h6" gutterBottom align="left">
                                On Slab :  {(schedule.on_slab)}
                            </Typography>
                          
                            <Typography variant="h6" gutterBottom align="left">
                                On Block  : {(schedule.on_block)}
                            </Typography>
                            
                            <Typography variant="h6" gutterBottom align="left">
                                On Plaster : {(schedule.on_plaster)}
                            </Typography>
                            
                            <Typography variant="h6" gutterBottom align="left">
                                On Plumbing  :{(schedule.on_plumbing)}
                            </Typography> 
                           
                            <Typography variant="h6" gutterBottom align="left">
                                On Coloring : {(schedule.on_coloring)}
                            </Typography>
                            
                            <Typography variant="h6" gutterBottom align="left">
                                On Finishing: {(schedule.on_finishing)}
                            </Typography>
                            
                            <Typography variant="h6" gutterBottom align="left">
                                On Possesion : {(schedule.on_posession)}
                            </Typography>
                            </Grid>
                        
                        
                        
                        </Grid>
                      

                        
                  

                    
                </CardContent>
               
            </Card>

            )
    }
       else return null;
    }
}




export default BookingConfirm;


