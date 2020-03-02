import isEmpty from '../../server/validation/is-empty';

const creaShopPresentation = () => {
  return false;
};

const selectService = (shop) =>{
  return shop.service == null
};

const selectPrestation = (shop) =>{
  console.log("Check prestations:"+JSON.stringify(shop, null, 2));
  if (Object.keys(shop.prestations).length===0) return "disabled";
  return !Object.values(shop.prestations)
    .every(v => {
      return !(v.price === 0 || v.billing == null || Object.keys(v.billing).length === 0);
    });
};

const settingService = (shop) =>{
  console.log("Check step settingService");
  console.log("Location is"+JSON.stringify(shop.location));
  if (shop.location==null)  return true;
  if (Object.values(shop.location).every( v => !v)) return true;
};

const assetsService = (shop) => {
  console.log("Validation assetsService");
  if ( isEmpty(shop.diplomaName) != isEmpty(shop.diplomaYear) ) return true;
  if ( isEmpty(shop.certificationName) != isEmpty(shop.certificationYear) ) return true;
  return false;
};

const settingShop = (shop) =>{
  if (shop.cancel_mode==='' || shop.cancel_mode==null) {
    return true;
  }
};

const introduceYou = (shop) =>{
  if (shop.is_particular===true) return false;
  // Pro
  if (shop.company==null) return true;
  if (Object.values(shop.company).some(v => v==null || v==='')) return true;
  if (shop.is_certified===false) return true;
};

export {creaShopPresentation, selectService, selectPrestation, settingService, assetsService, settingShop, introduceYou}
