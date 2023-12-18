const { agendaHookFn } = require('../../server/plugins/smartdiet/functions')
const Appointment = require('../../server/models/Appointment')
const { MONGOOSE_OPTIONS } = require('../../server/utils/database')
const { getDatabaseUri } = require('../../config/config')
const moment = require('moment')
const lodash=require('lodash')

const mongoose = require('mongoose')

const INSERT_EVENT={"sender":"smartagenda","senderSite":"devsmartdiet","objClass":"pdo_events","objId":"1527","action":"insert","timestamp":"2023-11-10 17:20:57","data":{"obj":{"start_date":"2023-12-04 09:45:00","end_date":"2023-12-04 10:45:00","text":"","rec_type":"","event_pid":"0","event_length":"0","presta_id":"13","equipe_id":"68","ressource_id":"-1","client_id":"264","venu":"true","internet":"","client_montant":"","couleur":"145","client_nom":"AUVRAY","client_prenom":"Sébastien","client_adresse":"","client_telephone":"","client_portable":"","client_mail":"sebastien.auvray@wappizy.com","client_date_naissance":"","client_infos":"","client_sexe":"F","date_modification_date":"0000-00-00 00:00:00","date_creation":"2023-11-10 17:20:57","date_maj":"2023-11-10 17:20:57","client_code_postal":"","client_ville":"","montant_presta":"0.00","montant_produit":"0.00","c1":"","c2":"","c3":"","c4":"","c5":"","c6":"","c7":"","c8":"","c9":"","c10":"","cc1":"","cc2":"","cc3":"","cc4":"","cc5":"","cc6":"","cc7":"","cc8":"","cc9":"","cc10":"","recurrence":"","liste_attente":"N","start_date_gmt":"2023-12-04T08:45:00Z","end_date_gmt":"2023-12-04T09:45:00Z","id":"1527"}},"hash":"b828dcd8d84e907b7835263401a5f5ec79e6d39a7e327bdb8d2028e7dc3a2566"}

const UPDATE_EVENT={"sender":"smartagenda","senderSite":"devsmartdiet","objClass":"pdo_events","objId":"1527","action":"update","timestamp":"2023-11-10 17:22:13","data":{"obj":{"start_date":"2023-12-04 11:15:00","end_date":"2023-12-04 11:45:00","text":"","rec_type":"","event_pid":"0","event_length":"0","presta_id":"8","equipe_id":"68","ressource_id":"0","client_id":"264","venu":"true","internet":"","client_montant":"","couleur":"145","client_nom":"AUVRAY","client_prenom":"Sébastien","client_adresse":"","client_telephone":"","client_portable":"","client_mail":"sebastien.auvray@wappizy.com","client_date_naissance":"","client_infos":"","client_sexe":"F","date_modification_date":"2023-11-10 17:22:13","date_creation":"2023-11-10 17:20:57","date_maj":"2023-11-10 17:22:13","client_code_postal":"","client_ville":"","montant_presta":"0.00","montant_produit":"0.00","c1":"","c2":"","c3":"","c4":"","c5":"","c6":"","c7":"","c8":"","c9":"","c10":"","cc1":"","cc2":"","cc3":"","cc4":"","cc5":"","cc6":"","cc7":"","cc8":"","cc9":"","cc10":"","recurrence":"","liste_attente":"N","start_date_gmt":"2023-12-04T10:15:00Z","end_date_gmt":"2023-12-04T10:45:00Z","id":"1527"}},"hash":"697e7a281adff32b08197b75d45947b28a83923b234a0390af3adb2ba7e3c338"}

const DELETE_EVENT={"sender":"smartagenda","senderSite":"devsmartdiet","objClass":"pdo_events","objId":"1527","action":"delete","timestamp":"2023-11-10 17:22:51","data":{"obj":{"start_date":"2023-12-04 11:15:00","end_date":"2023-12-04 11:45:00","text":"","rec_type":"","event_pid":"0","event_length":"0","presta_id":"8","equipe_id":"68","ressource_id":"0","client_id":"264","venu":"true","internet":"","client_montant":"","couleur":"145","client_nom":"AUVRAY","client_prenom":"Sébastien","client_adresse":"","client_telephone":"","client_portable":"","client_mail":"sebastien.auvray@wappizy.com","client_date_naissance":"","client_infos":"","client_sexe":"F","date_modification_date":"2023-11-10 17:22:13","date_creation":"2023-11-10 17:20:57","date_maj":"2023-11-10 17:22:13","client_code_postal":"","client_ville":"","montant_presta":"0.00","montant_produit":"0.00","c1":"","c2":"","c3":"","c4":"","c5":"","c6":"","c7":"","c8":"","c9":"","c10":"","cc1":"","cc2":"","cc3":"","cc4":"","cc5":"","cc6":"","cc7":"","cc8":"","cc9":"","cc10":"","recurrence":"","liste_attente":"N","start_date_gmt":"2023-12-04T10:15:00Z","end_date_gmt":"2023-12-04T10:45:00Z","id":"1527"}},"hash":"630a2e1fc0b80c1b1fd2db5026b1fe4ba97f2a13f03f39f8b5d8b334817c2a2d"}

describe('SmartAgenda test ', () => {

  let appointments_count

  beforeAll(async () => {
    await mongoose.connect(getDatabaseUri(), MONGOOSE_OPTIONS)
    appointments_count=await Appointment.count()
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })

  it.skip('must add appointment', async() => {
    await agendaHookFn(INSERT_EVENT)
    const appointments_count_after=await Appointment.count()
    expect(appointments_count_after).toEqual(appointments_count+1)
  })

  it('must delete appointment', async() => {
    await agendaHookFn(DELETE_EVENT)
    const appointments_count_after=await Appointment.count()
    expect(appointments_count_after).toEqual(appointments_count)
  })

  it.skip('must update appointment', async() => {
    await agendaHookFn(UPDATE_EVENT)
    const appointments_count_after=await Appointment.count()
    expect(appointments_count_after).toEqual(appointments_count-1)
  })

})
