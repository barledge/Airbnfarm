import React from 'react';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import Moment from 'react-moment';
import moment from 'moment';

class SpotFormAvailability extends React.Component {

  constructor(props){
    super(props);

    let startAvailabilityDate;
    let endAvailabilityDate;
    if(props.startAvailabilityDate && props.endAvailabilityDate){
      startAvailabilityDate = moment(props.startAvailabilityDate);
      endAvailabilityDate = moment(props.endAvailabilityDate);
    } else {
      startAvailabilityDate = null;
      endAvailabilityDate = null;
    }

    this.state = {
      focusedInput: 'startDate',
      startDate: startAvailabilityDate,
      endDate: endAvailabilityDate,
    };

    this.onDatesChange = this.onDatesChange.bind(this);
    this.startAvailabilityDate = this.startAvailabilityDate.bind(this);
    this.endAvailabilityDate = this.endAvailabilityDate.bind(this);
  }

  componentWillReceiveProps(newProps){

    const parentStartAvailabilityDate = newProps.startAvailabilityDate;
    if((this.startAvailabilityDate() !== parentStartAvailabilityDate)){
      this.setState({startDate: moment(parentStartAvailabilityDate)});
    }

    const parentEndAvailabilityDate = newProps.endAvailabilityDate;
    if((this.endAvailabilityDate() !== parentEndAvailabilityDate)){
      this.setState({endDate: moment(parentEndAvailabilityDate)});
    }

  }

  startAvailabilityDate(){
    if(this.state.startDate){
      return this.state.startDate._d;
    }
    return null;
  }

  endAvailabilityDate(){
    if(this.state.endDate){
      return this.state.endDate._d;
    }
    return null;
  }


  onDatesChange({ startDate, endDate }){
    this.setState({ startDate, endDate },
      () => this.props.receiveAvailabilityDates(this.startAvailabilityDate(), this.endAvailabilityDate())
    );
  }

  render(){

    return (

      <div className='spot-form-availability-main-container spot-form-main-container'>
        <h1>Tell us about the availability of your place.</h1>

        <DateRangePicker
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onDatesChange={this.onDatesChange}
          focusedInput={this.state.focusedInput}
          onFocusChange={focusedInput => this.setState({ focusedInput })}
        />

        <div className='nav-buttons-div clearfix'>
          <button className='spot-form-back-button' onClick={this.props.switchForm('details')}>
            Back
          </button>

          <button className='spot-form-next-button' onClick={this.props.handleSubmit}>
            Finish
          </button >
        </div>

      </div>

    );
  }

}

export default SpotFormAvailability;
