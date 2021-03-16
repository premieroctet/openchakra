import isEmpty from '../../server/validation/is-empty';

const {CESU} = require('../consts');
const {checkSocialSecurity} = require('../social_security');

const creaShopPresentation = () => {
  return true;
};

const selectService = (shop) => {
  return Boolean(shop.service)
};

const selectPrestation = (shop) => {
  if (Object.keys(shop.prestations).length === 0) {
    return false;
  }
  return Object.values(shop.prestations)
    .every(v => {
      return !(!v.price || !v.billing || isEmpty(v.label) || Object.keys(v.billing).length === 0);
    });
};

const settingService = shop => {
  if (!shop.location) {
    return false
  }
  if (Object.values(shop.location).every(v => !v)) {
    return false;
  }
  if (isNaN(shop.travel_tax)) {
    return false;
  }
  if (isNaN(shop.pick_tax)) {
    return false;
  }
  if (!shop.perimeter) {
    return false;
  }
  return true
};

const assetsService = (shop) => {
  if (isEmpty(shop.diplomaName) != isEmpty(shop.diplomaYear)) {
    return false;
  }
  if (isEmpty(shop.certificationName) != isEmpty(shop.certificationYear)) {
    return false;
  }
  return true;
};

const settingShop = (shop) => {
  if (!shop.cancel_mode) {
    return false
  }
  return true
};

const bookingPreferences = shop => {
  if (!shop) {
    return false
  }
  if (isNaN(shop.minimum_basket)) {
    return false
  }
  if (!shop.deadline_unit) {
    return false
  }
  return true
}

const introduceYou = (shop) => {
  if (shop.is_particular) {
    if (!shop.cesu) {
      return false;
    }
    if ([CESU[0], CESU[1]].includes(shop.cesu)) {
      const res = checkSocialSecurity(shop.social_security);
      if (res) {
        return false;
      }
    }
    return true;
  }
  // Pro
  if (shop.company == null) {
    return false;
  }
  if (!shop.company.siret) {
    return false;
  }
  if (!shop.is_certified) {
    return false;
  }
  if (shop.company.vat_subject && !shop.company.vat_number) {
    return false
  }
  if (!shop.particular_access && !shop.professional_access) {
    return false
  }
  return true;
};

export {creaShopPresentation, selectService, selectPrestation, settingService,
  assetsService, settingShop, introduceYou, bookingPreferences}
