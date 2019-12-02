import React from 'react';
import {loadCldr, L10n} from '@syncfusion/ej2-base';
import {  ScheduleComponent, RecurrenceEditorComponent, ViewsDirective, ViewDirective, Month, Inject, Day, Week} from '@syncfusion/ej2-react-schedule';
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import '../../static/i18n/FR'
import './Schedule.css';


//todo :fix thix
import "../../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
import "../../node_modules/@syncfusion/ej2-calendars/styles/material.css";
import "../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
import "../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
import "../../node_modules/@syncfusion/ej2-lists/styles/material.css";
import "../../node_modules/@syncfusion/ej2-navigations/styles/material.css";
import "../../node_modules/@syncfusion/ej2-popups/styles/material.css";
import "../../node_modules/@syncfusion/ej2-react-schedule/styles/material.css";
//

loadCldr(
  require('../../node_modules/cldr-data/supplemental/numberingSystems.json'),
  require('../../node_modules/cldr-data/main/fr-CH/ca-gregorian.json'),
  require('../../node_modules/cldr-data/main/fr-CH/currencies.json'),
  require('../../node_modules/cldr-data/main/fr-CH/numbers.json'),
  require('../../node_modules/cldr-data/main/fr-CH/timeZoneNames.json')
);

L10n.load({
  "fr-CH": {
    "schedule": {
      "day": "Journée",
      "week": "La Semaine",
      "workWeek": "Work Week",
      "month": "Mois",
      "agenda": "Agenda",
      "weekAgenda": "Week Agenda",
      "workWeekAgenda": "Work Week Agenda",
      "monthAgenda": "Month Agenda",
      "today": "Aujourd'hui",
      "noEvents": "Aucun évenement",
      "emptyContainer": "Il n'y a pas d'évenement pour ce jour.",
      "allDay": "Toute la journée",
      "start": "Début",
      "end": "Fin",
      "more": "plus",
      "close": "Fermer",
      "cancel": "Annuler",
      "noTitle": "(No Title)",
      "delete": "Supprimer",
      "deleteEvent": "Supprimer",
      "deleteMultipleEvent": "Delete Multiple Events",
      "selectedItems": "Items selected",
      "deleteSeries": "Delete Series",
      "edit": "Modifier",
      "editSeries": "Edit Series",
      "editEvent": "Modifier événement",
      "createEvent": "Créer",
      "subject": "Subject",
      "addTitle": "Ajouter une nouvelle disponibilité",
      "moreDetails": "Plus de détails",
      "save": "Ajouter",
      "editContent": "Do you want to edit only this event or entire series?",
      "deleteRecurrenceContent": "Do you want to delete only this event or entire series?",
      "deleteContent": "Etes vous sûr de vouloir supprimer cette dispo ?",
      "deleteMultipleContent": "Are you sure you want to delete the selected events?",
      "newEvent": "Ajouter une nouvelle disponibilité",
      "title": "Titre",
      "location": "Location",
      "description": "Description",
      "timezone": "Timezone",
      "startTimezone": "Start Timezone",
      "endTimezone": "End Timezone",
      "repeat": "Répéter",
      "saveButton": "Ajouter",
      "cancelButton": "Annuler",
      "deleteButton": "Supprimer",
      "recurrence": "Récurrence",
      "wrongPattern": "The recurrence pattern is not valid.",
      "seriesChangeAlert": "The changes made to specific instances of this series will be cancelled and those events will match the series again.",
      "createError": "The duration of the event must be shorter than how frequently it occurs. Shorten the duration, or change the recurrence pattern in the recurrence event editor.",
      "recurrenceDateValidation": "Some months have fewer than the selected date. For these months, the occurrence will fall on the last date of the month.",
      "sameDayAlert": "Two occurrences of the same event cannot occur on the same day.",
      "editRecurrence": "Edit Recurrence",
      "repeats": "Répéter",
      "alert": "Alert",
      "startEndError": "The selected end date occurs before the start date.",
      "invalidDateError": "The entered date value is invalid.",
      "ok": "Ok",
      "occurrence": "Occurrence",
      "series": "Series",
      "previous": "Précédent",
      "next": "Suivant",
      "timelineDay": "Timeline Day",
      "timelineWeek": "Timeline Week",
      "timelineWorkWeek": "Timeline Work Week",
      "timelineMonth": "Timeline Month"
    },
    "recurrenceeditor": {
      "none": "None",
      "daily": "Journée",
      "weekly": "La semaine",
      "monthly": "Mois",
      "month": "Mois",
      "yearly": "Yearly",
      "never": "Jamais",
      "until": "Jusqu'au",
      "count": "Pendant",
      "first": "First",
      "second": "Deuxième",
      "third": "troisème",
      "fourth": "Fourth",
      "last": "Dernier",
      "repeat": "Répéter",
      "repeatEvery": "Répéter tous les",
      "on": "Répéter sur",
      "end": "Fin",
      "onDay": "Jour",
      "days": "Jour(s)",
      "weeks": "Week(s)",
      "months": "Month(s)",
      "years": "Year(s)",
      "every": "every",
      "summaryTimes": "time(s)",
      "summaryOn": "on",
      "summaryUntil": "jusqu'au",
      "summaryRepeat": "Répéter",
      "summaryDay": "Jours(s)",
      "summaryWeek": "week(s)",
      "summaryMonth": "month(s)",
      "summaryYear": "year(s)"
    }
  }
});

class Schedule extends React.Component{
  constructor(props){
    super(props)
  }
  editorTemplate(props) {
    return (props !== undefined ?
        <div className={"editorTemplate"}>
          <div className={"editorTemplateContent"}>
            <span className="e-textlabel">Je suis disponible pour :</span>
            <div style={{ colspan: '4' }}>
              <DropDownListComponent
                id="EventType"
                placeholder='Service(s)'
                data-name="Subject"
                className="e-field"
                style={{ width: '100%' }}
                dataSource={['Tous', 'Service A', 'Service B']}
                value={props.EventType || null}
              />
            </div>
          </div>
          <div className={"editorTemplateContent"}>
            <span className="e-textlabel">Du</span>
            <div style={{ colspan: '4' }}>
              <DateTimePickerComponent
                locale="fr-CH"
                id="StartTime"
                data-name="StartTime"
                value={new Date(props.startTime || props.StartTime)}
                className="e-field"
              />
            </div>
          </div>
          <div className={"editorTemplateContent"}>
            <span className="e-textlabel">Au</span>
            <div style={{ colspan: '4' }}>
              <DateTimePickerComponent
                locale="fr-CH"
                id="EndTime"
                data-name="EndTime"
                value={new Date(props.endTime || props.EndTime)}
                className="e-field"
              />
            </div>
          </div>
          <div className={"editorTemplateContent"}>
            <span className="e-textlabel">Récurrence :</span>
            <div style={{ colspan: '4', marginTop:'3%' }}>
              <RecurrenceEditorComponent
                locale='fr-CH'
                ref={recurrObject => this.recurrObject = recurrObject}
                id='RecurrenceEditor'
                style={{ width: '100%' }}
                firstDayOfWeek={1}
                frequencies={['none', 'daily', 'weekly']}
              />
            </div>
          </div>
        </div>:<div></div>
    );
  }

  render() {
    return(
      <ScheduleComponent
        ref={schedule => this.scheduleObj = schedule}
        locale='fr-CH'
        width='100%'
        height='550px'
        firstDayOfWeek={1}
        editorTemplate={this.editorTemplate.bind(this)}
      >
        <ViewsDirective locale='fr-CH'>
          <ViewDirective option='Day'/>
          <ViewDirective option='Week'/>
          <ViewDirective option='Month'/>
        </ViewsDirective>
        <Inject locale='fr-CH' services={[Day, Week, Month]}/>
      </ScheduleComponent>
    )
  }
}

export default Schedule;
