module.exports = {
  "authentication_oauth" : [ "/${apiVersion}/oauth/token", "POST" ],

  "responses_get" : [ "/${apiVersion}/${clientId}/responses/${id}", "GET"],

  "events_all" : [ "/${apiVersion}/${clientId}/events", "GET" ],

  "hooks_create" : [ "/${apiVersion}/${clientId}/hooks", "POST" ],
  "hooks_all" : [ "/${apiVersion}/${clientId}/hooks", "GET" ],
  "hooks_get" : [ "/${apiVersion}/${clientId}/hooks/${id}", "GET" ],
  "hooks_save" : [ "/${apiVersion}/${clientId}/hooks/${id}", "PUT" ],

  "cardregistration_create" : [ "/${apiVersion}/${clientId}/cardregistrations", "POST" ],
  "cardregistration_get" : [ "/${apiVersion}/${clientId}/cardregistrations/${id}", "GET" ],
  "cardregistration_save" : [ "/${apiVersion}/${clientId}/cardregistrations/${id}", "PUT" ],

  "preauthorization_create" : [ "/${apiVersion}/${clientId}/preauthorizations/card/direct", "POST" ],
  "preauthorization_get" : [ "/${apiVersion}/${clientId}/preauthorizations/${id}", "GET" ],
  "preauthorization_save" : [ "/${apiVersion}/${clientId}/preauthorizations/${id}", "PUT" ],
  "preauthorizations_get_for_user" : [ "/${apiVersion}/${clientId}/users/${id}/preauthorizations", "GET"],
  "preauthorization_transactions_get" : [ "/${apiVersion}/${clientId}/preauthorizations/${id}/transactions", "GET" ],

  "card_get" : [ "/${apiVersion}/${clientId}/cards/${id}", "GET" ],
  "cards_get_by_fingerprint" : [ "/${apiVersion}/${clientId}/cards/fingerprints/${fingerprint}", "GET"],
  "card_save" : [ "/${apiVersion}/${clientId}/cards/${id}", "PUT" ],
  "card_get_preauthorizations" : [ "/${apiVersion}/${clientId}/cards/${id}/preauthorizations", "GET" ],
  "card_validate" : [ "/${apiVersion}/${clientId}/cards/${id}/validate", "POST" ],

  // pay ins URLs
  "payins_card-web_create" : [ "/${apiVersion}/${clientId}/payins/card/web/", "POST" ],
  "payins_card-direct_create" : [ "/${apiVersion}/${clientId}/payins/card/direct/", "POST" ],
  "payins_preauthorized-direct_create" : [ "/${apiVersion}/${clientId}/payins/preauthorized/direct/", "POST" ],
  "payins_bankwire-direct_create" : [ "/${apiVersion}/${clientId}/payins/bankwire/direct/", "POST" ],
  "payins_directdebit-web_create" : [ "/${apiVersion}/${clientId}/payins/directdebit/web", "POST" ],
  "payins_directdebit-direct_create" : [ "/${apiVersion}/${clientId}/payins/directdebit/direct", "POST" ],
  "payins_paypal-web_create" : [ "/${apiVersion}/${clientId}/payins/paypal/web", "POST" ],
  "payins_get" : [ "/${apiVersion}/${clientId}/payins/${id}", "GET" ],
  "payins_createrefunds" : [ "/${apiVersion}/${clientId}/payins/${id}/refunds", "POST" ],
  "payins_applepay-direct_create": ["/${apiVersion}/${clientId}/payins/applepay/direct", "POST"],
  "payins_googlepay-direct_create": ["/${apiVersion}/${clientId}/payins/googlepay/direct", "POST"],

  "payouts_bankwire_create" : [ "/${apiVersion}/${clientId}/payouts/bankwire/", "POST" ],
  "payouts_get" : [ "/${apiVersion}/${clientId}/payouts/${id}", "GET" ],

  "refunds_get" : [ "/${apiVersion}/${clientId}/refunds/${id}", "GET" ],
  "refunds_get_for_repudiation" : [ "/${apiVersion}/${clientId}/repudiations/${id}/refunds", "GET" ],
  "refunds_get_for_transfer" : [ "/${apiVersion}/${clientId}/transfers/${id}/refunds", "GET" ],
  "refunds_get_for_payin" : [ "/${apiVersion}/${clientId}/payins/${id}/refunds", "GET" ],
  "refunds_get_for_payout" : [ "/${apiVersion}/${clientId}/payouts/${id}/refunds", "GET" ],

  "transfers_create" : [ "/${apiVersion}/${clientId}/transfers", "POST" ],
  "transfers_get" : [ "/${apiVersion}/${clientId}/transfers/${id}", "GET" ],
  "transfers_createrefunds" : [ "/${apiVersion}/${clientId}/transfers/${id}/refunds", "POST" ],

  "users_createnaturals" : [ "/${apiVersion}/${clientId}/users/natural", "POST" ],
  "users_createlegals" : [ "/${apiVersion}/${clientId}/users/legal", "POST" ],

  "users_createbankaccounts_iban" : [ "/${apiVersion}/${clientId}/users/${id}/bankaccounts/iban", "POST" ],
  "users_createbankaccounts_gb" : [ "/${apiVersion}/${clientId}/users/${id}/bankaccounts/gb", "POST" ],
  "users_createbankaccounts_us" : [ "/${apiVersion}/${clientId}/users/${id}/bankaccounts/us", "POST" ],
  "users_createbankaccounts_ca" : [ "/${apiVersion}/${clientId}/users/${id}/bankaccounts/ca", "POST" ],
  "users_createbankaccounts_other" : [ "/${apiVersion}/${clientId}/users/${id}/bankaccounts/other", "POST" ],

  "users_all" : [ "/${apiVersion}/${clientId}/users", "GET" ],
  "users_allwallets" : [ "/${apiVersion}/${clientId}/users/${id}/wallets", "GET" ],
  "users_allbankaccount" : [ "/${apiVersion}/${clientId}/users/${id}/bankaccounts", "GET" ],
  "users_allcards" : [ "/${apiVersion}/${clientId}/users/${id}/cards", "GET" ],
  "users_alltransactions" : [ "/${apiVersion}/${clientId}/users/${id}/transactions", "GET" ],
  "users_allkycdocuments" : [ "/${apiVersion}/${clientId}/users/${id}/KYC/documents", "GET" ],
  "users_get" : [ "/${apiVersion}/${clientId}/users/${id}", "GET" ],
  "users_getnaturals" : [ "/${apiVersion}/${clientId}/users/natural/${id}", "GET" ],
  "users_getlegals" : [ "/${apiVersion}/${clientId}/users/legal/${id}", "GET" ],
  "users_getbankaccount" : [ "/${apiVersion}/${clientId}/users/${id}/bankaccounts/${bankAccountId}", "GET" ],
  "users_deactivate_bankaccount" : [ "/${apiVersion}/${clientId}/users/${id}/bankaccounts/${bankAccountId}", "PUT" ],
  "users_savenaturals" : [ "/${apiVersion}/${clientId}/users/natural/${id}", "PUT" ],
  "users_savelegals" : [ "/${apiVersion}/${clientId}/users/legal/${id}", "PUT" ],

  "users_getemoney_year": ["/${apiVersion}/${clientId}/users/${id}/emoney/${year}/", "GET"],
  "users_getemoney_month": ["/${apiVersion}/${clientId}/users/${id}/emoney/${year}/${month}/", "GET"],

  "wallets_create" : [ "/${apiVersion}/${clientId}/wallets", "POST" ],
  "wallets_alltransactions" : [ "/${apiVersion}/${clientId}/wallets/${id}/transactions", "GET" ],
  "wallets_get" : [ "/${apiVersion}/${clientId}/wallets/${id}", "GET" ],
  "wallets_save" : [ "/${apiVersion}/${clientId}/wallets/${id}", "PUT" ],

  "kyc_documents_create" : [ "/${apiVersion}/${clientId}/users/${id}/KYC/documents/", "POST" ],
  "kyc_documents_get" : [ "/${apiVersion}/${clientId}/users/${id}/KYC/documents/${documentId}", "GET" ],
  "kyc_documents_save" : [ "/${apiVersion}/${clientId}/users/${id}/KYC/documents/${documentId}", "PUT" ],
  "kyc_page_create" : [ "/${apiVersion}/${clientId}/users/${id}/KYC/documents/${documentId}/pages", "POST" ],
  "kyc_documents_all" : [ "/${apiVersion}/${clientId}/KYC/documents", "GET" ],
  "kyc_documents_get_alt" : [ "/${apiVersion}/${clientId}/KYC/documents/${id}", "GET" ],
  "kyc_documents_create_consult" : [ "/${apiVersion}/${clientId}/KYC/documents/${id}/consult", "POST" ],

  "disputes_get" : [ "/${apiVersion}/${clientId}/disputes/${id}", "GET"],
  "disputes_save_tag" : [ "/${apiVersion}/${clientId}/disputes/${id}", "PUT"],
  "disputes_save_contest_funds" : [ "/${apiVersion}/${clientId}/disputes/${id}/submit", "PUT"],
  "dispute_save_close" : [ "/${apiVersion}/${clientId}/disputes/${id}/close", "PUT"],

  "disputes_get_transactions" : [ "/${apiVersion}/${clientId}/disputes/${id}/transactions", "GET"],

  "disputes_all" : [ "/${apiVersion}/${clientId}/disputes", "GET"],
  "disputes_get_for_wallet" : [ "/${apiVersion}/${clientId}/wallets/${id}/disputes", "GET"],
  "disputes_get_for_user" : [ "/${apiVersion}/${clientId}/users/${id}/disputes", "GET"],

  "disputes_document_create" : [ "/${apiVersion}/${clientId}/disputes/${id}/documents", "POST"],
  "disputes_document_page_create" : [ "/${apiVersion}/${clientId}/disputes/${id}/documents/${documentId}/pages", "POST"],
  "disputes_document_save" : [ "/${apiVersion}/${clientId}/disputes/${id}/documents/${documentId}", "PUT"],
  "disputes_document_get" : [ "/${apiVersion}/${clientId}/dispute-documents/${id}", "GET"],
  "disputes_document_get_for_dispute" : [ "/${apiVersion}/${clientId}/disputes/${id}/documents", "GET"],
  "disputes_document_all" : [ "/${apiVersion}/${clientId}/dispute-documents", "GET"],
  "disputes_document_create_consult" : [ "/${apiVersion}/${clientId}/dispute-documents/${id}/consult", "POST" ],

  "disputes_repudiation_get" : [ "/${apiVersion}/${clientId}/repudiations/${id}", "GET"],

  "disputes_repudiation_create_settlement" : [ "/${apiVersion}/${clientId}/repudiations/${id}/settlementtransfer", "POST"],
  "disputes_repudiation_get_settlement" : [ "/${apiVersion}/${clientId}/settlements/${id}", "GET"],
  "disputes_pending_settlement" : [ "/${apiVersion}/${clientId}/disputes/pendingsettlement", "GET"],

  "reports_transaction_create" : ["/${apiVersion}/${clientId}/reports/transactions/", "POST"],
  "reports_wallet_create" : ["/${apiVersion}/${clientId}/reports/wallets/", "POST"],
  "reports_get" : ["/${apiVersion}/${clientId}/reports/${id}", "GET"],
  "reports_all" : ["/${apiVersion}/${clientId}/reports", "GET"],

  "mandates_directdebit-web_create" : ["/${apiVersion}/${clientId}/mandates/directdebit/web/", "POST"],
  "mandates_get" : ["/${apiVersion}/${clientId}/mandates/${id}", "GET"],
  "mandates_cancel" : ["/${apiVersion}/${clientId}/mandates/${id}/cancel", "PUT"],
  "mandates_all" : ["/${apiVersion}/${clientId}/mandates", "GET"],
  "mandates_get_for_user" : ["/${apiVersion}/${clientId}/users/${id}/mandates", "GET"],
  "mandates_get_for_bank_account" : ["/${apiVersion}/${clientId}/users/${id}/bankaccounts/${bankAccountId}/mandates", "GET"],

  "clients_get" : ["/${apiVersion}/${clientId}/clients", "GET"],
  "clients_update" : ["/${apiVersion}/${clientId}/clients", "PUT"],
  "clients_upload_logo" : ["/${apiVersion}/${clientId}/clients/logo", "PUT"],
  "client_wallets_all" : ["/${apiVersion}/${clientId}/clients/wallets/", "GET"],
  "client_wallets_get" : ["/${apiVersion}/${clientId}/clients/wallets/${fundsType}/${currency}", "GET"],
  "client_wallets_by_fundsType" : ["/${apiVersion}/${clientId}/clients/wallets/${fundsType}", "GET"],
  "client_wallets_transactions" : ["/${apiVersion}/${clientId}/clients/wallets/${fundsType}/${currency}/transactions/", "GET"],
  "client_create_bankaccount_iban" : ["/${apiVersion}/${clientId}/clients/bankaccounts/iban", "POST"],
  "client_create_payout" : ["/${apiVersion}/${clientId}/clients/payouts", "POST"],

  "banking_aliases_iban_create" : ["/${apiVersion}/${clientId}/wallets/${walletId}/bankingaliases/iban", "POST"],
  "banking_aliases_get" : ["/${apiVersion}/${clientId}/bankingaliases/${id}", "GET"],
  "banking_aliases_update" : ["/${apiVersion}/${clientId}/bankingaliases/${id}", "PUT"],
  "banking_aliases_all" : ["/${apiVersion}/${clientId}/wallets/${walletId}/bankingaliases", "GET"],

  "ubo_declaration_create": ["/${apiVersion}/${clientId}/users/${userId}/kyc/ubodeclarations", "POST"],
  "ubo_declaration_update": ["/${apiVersion}/${clientId}/users/${userId}/kyc/ubodeclarations/${declarationId}", "PUT"],
  "ubo_declaration_get": ["/${apiVersion}/${clientId}/users/${userId}/kyc/ubodeclarations/${declarationId}", "GET"],
  "ubo_declaration_get_by_id": ["/${apiVersion}/${clientId}/kyc/ubodeclarations/${declarationId}", "GET"],
  "ubo_declarations_get": ["/${apiVersion}/${clientId}/users/${userId}/kyc/ubodeclarations", "GET"],

  "ubo_create": ["/${apiVersion}/${clientId}/users/${userId}/kyc/ubodeclarations/${declarationId}/ubos", "POST"],
  "ubo_update": ["/${apiVersion}/${clientId}/users/${userId}/kyc/ubodeclarations/${declarationId}/ubos/${uboId}", "PUT"],
  "ubo_get": ["/${apiVersion}/${clientId}/users/${userId}/kyc/ubodeclarations/${declarationId}/ubos/${uboId}", "GET"],

  "transactions_get_for_mandate" : ["/${apiVersion}/${clientId}/mandates/${id}/transactions", "GET"],
  "transactions_get_for_card" : ["/${apiVersion}/${clientId}/cards/${cardId}/transactions", "GET"],
  "transactions_get_for_bank_account" : ["/${apiVersion}/${clientId}/bankaccounts/${bankAccountId}/transactions", "GET"],

  "idempotency_response_get" : ["/${apiVersion}/${clientId}/responses/${idempotencyKey}", "GET"]
};
