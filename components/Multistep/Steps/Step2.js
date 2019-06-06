import MyCalendar from "../../Calendar/calendar";

function Step2(props) {
    if (props.currentStep !== 2) {
      return null
    } 
    return(
      <div className="form-group">
        <MyCalendar/>
      </div>
    );
  }

  export default Step2;