import React from 'react';
import moment from 'moment'

const {CREASHOP_MODE}=require('../../utils/consts.js')

import CreaShopPresentation from '../../components/CreaShop/CreaShopPresentation/CreaShopPresentation';
import SelectService from '../../components/CreaShop/SelectService/SelectService';
import SelectPrestation from '../../components/CreaShop/SelectPrestation/SelectPrestation';
import SettingService from '../../components/CreaShop/SettingService/SettingService';
import BookingPreference from '../../components/CreaShop/BookingPreference/BookingPreference';
import AssetsService from '../../components/CreaShop/AssetsService/AssetsService';
import BookingConditions from '../../components/CreaShop/BookingConditions/BookingConditions';
import IntroduceYou from '../../components/CreaShop/IntroduceYou/IntroduceYou';
import { assetsService,
    creaShopPresentation,
  introduceYou,
  selectPrestation,
  selectService,
  settingService,
  settingShop,
  bookingPreferences,
} from '../../utils/validationSteps/validationSteps';

const WELCOME = {
  menu : 'Bienvenue',
  is_valid : parent => creaShopPresentation(),
  component: parent => <CreaShopPresentation user={parent.state.currentUser}/>,
}
const INTRODUCE = {
  menu : 'Création',
  is_valid : parent => introduceYou(parent.state.shop),
  component: parent => <IntroduceYou
                      key={moment()}
                      {...parent.state.shop}
                      mode={parent.state.mode}
                      onChange={parent.introduceChanged}
                     />
}

const SERVICE = {
  menu : 'Services/Ajouter/Configurer',
  is_valid : parent => selectService(parent.state.shop),
  component: parent => <SelectService
                        {...parent.state.shop}
                        creation={true}
                        creationBoutique={true}
                        excluded_services={parent.state.excluded_services}
                        onChange={parent.onServiceChanged}
                      />,
}

const PRESTATIONS = {
  menu : 'Prestations',
  is_valid : parent => selectPrestation(parent.state.shop),
  component : parent => <SelectPrestation {...parent.state.shop}  onChange={parent.onPrestaChanged} />
}

const PARAMETERS = {
  menu : 'Paramétrage',
  is_valid : parent => settingService(parent.state.shop),
  component : parent => <SettingService {...parent.state.shop} onChange={parent.settingsChanged}/>
}

const PREFERENCES = {
  menu : 'Préférences',
  is_valid : parent => bookingPreferences(parent.state.shop),
  component : parent => <BookingPreference  {...parent.state.shop} onChange={parent.preferencesChanged} />
}

const ATOUTS = {
  menu : 'Atouts',
  is_valid : parent => true,
  component : parent => <AssetsService  {...parent.state.shop}  onChange={parent.assetsChanged} />
}

const SCHEDULE = {
  menu : 'Disponibilités',
  is_valid : parent => !(this.scheduleDrawer.current && this.scheduleDrawer.current.isDirty()),
  component : parent => <DrawerAndSchedule
                          availabilities={parent.state.availabilities}
                          title={I18N.SCHEDULE_TITLE}
                          subtitle={I18N.SCHEDULE_SUBTITLE}
                          nbSchedule={3}
                          availabilityUpdate={parent.availabilityUpdate}
                          availabilityCreated={parent.availabilityCreated}
                          onAvailabilityChanged={parent.loadAvailabilities}
                          onDateSelectionCleared={parent.onDateSelectionCleared}
                          selectable={true}
                          ref={parent.scheduleDrawer}
                        />
}

const CONDITIONS = {
  menu : 'Conditions',
  is_valid : parent => true,
  component : parent =>  <BookingConditions
                            key={moment()} {...parent.state.shop}
                            onChangeLastPart={parent.shopSettingsChanged}
                            onChange={parent.conditionsChanged}/>
}


const STEPS={
  [CREASHOP_MODE.CREATION] : [ WELCOME, INTRODUCE, SERVICE, PRESTATIONS, PARAMETERS, PREFERENCES, ATOUTS, SCHEDULE, CONDITIONS],
  [CREASHOP_MODE.SERVICE_ADD] : {
    menus : ['Ajouter', 'Prestations', 'Paramétrage', 'Préférences', 'Atouts'],
  },
  [CREASHOP_MODE.SERVICE_UPDATE] : {
    menus: ['Configurer', 'Prestations', 'Paramétrage', 'Préférences', 'Atouts']
  }
}

module.exports={STEPS}
