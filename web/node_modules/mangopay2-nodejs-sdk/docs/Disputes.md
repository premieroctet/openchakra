# Disputes

[MangoPay Disputes API Reference](https://docs.mangopay.com/api-references/disputes/)



* * *

### Disputes.get(disputeId, callback, options) 

Get dispute

**Parameters**

**disputeId**: `number`, Dispute identifier

**callback**: `function`, Callback function

**options**: `Object`, Request options

**Returns**: `Object`, Request promise


### Disputes.getAll(callback, options) 

Get all disputes

**Parameters**

**callback**: `function`, Callback function

**options**: `Object`, Request options

**Returns**: `Object`, Request promise


### Disputes.update(dispute, callback, options) 

Update dispute's tag

**Parameters**

**dispute**: `Object`, Dispute object of properties hash

**callback**: `function`, Callback function

**options**: `Object`, Request options

**Returns**: `Object`, Request promise


### Disputes.contestDispute(disputeId, contestedFunds, callback, options) 

Contest dispute

**Parameters**

**disputeId**: `number`, Dispute id

**contestedFunds**: `Money`, Contested funds

**callback**: `function`, Callback function

**options**: `Object`, Request options

**Returns**: `Object`, Promise of the request


### Disputes.resubmitDispute(disputeId, callback, options) 

This method is used to resubmit a Dispute if it is reopened requiring more docs

**Parameters**

**disputeId**: `number`, Dispute id

**callback**: `function`, Callback function

**options**: `Object`, Request options

**Returns**: `Object`, Promise of the request


### Disputes.closeDispute(disputeId, callback, options) 

Close dispute

**Parameters**

**disputeId**: `number`, Dispute id

**callback**: `function`, Callback function

**options**: `Object`, Request options

**Returns**: `Object`, Promise of the request


### Disputes.getTransactions(disputeId, callback, options) 

Gets dispute's transactions

**Parameters**

**disputeId**: `number`, Dispute identifier

**callback**: `function`, Callback function

**options**: `Object`, Request options

**Returns**: `Object`, Request promise


### Disputes.getDisputesForWallet(walletId, callback, options) 

Gets dispute's documents for wallet

**Parameters**

**walletId**: `number`, Wallet identifier

**callback**: `function`, Callback function

**options**: `Object`, Request options

**Returns**: `Object`, Request promise


### Disputes.getDisputesForUser(userId, callback, options) 

Gets user's disputes

**Parameters**

**userId**: `number`, User identifier

**callback**: `function`, Callback function

**options**: `Object`, Request options

**Returns**: `Object`, Request promise


### Disputes.getRepudiation(repudiationId, callback, options) 

Gets repudiation

**Parameters**

**repudiationId**: `number`, Repudiation identifier

**callback**: `function`, Callback function

**options**: `Object`, Request options

**Returns**: `Object`, Request promise


### Disputes.createSettlementTransfer(settlementTransfer, repudiationId, callback, options) 

Creates settlement transfer

**Parameters**

**settlementTransfer**: `Object`, Settlement transfer

**repudiationId**: `number`, Repudiation identifier

**callback**: `function`, Callback function

**options**: `Object`, Request options

**Returns**: `Object`, Promise of the request


### Disputes.getSettlementTransfer(settlementTransferId, callback, options) 

Gets settlement transfer

**Parameters**

**settlementTransferId**: `number`, Settlement Transfer identifier

**callback**: `function`, Callback function

**options**: `Object`, Request options

**Returns**: `Object`, Request promise


### Disputes.getDocumentsForDispute(disputeId, callback, options) 

Gets documents for dispute

**Parameters**

**disputeId**: `number`, Dispute identifier

**callback**: `function`, Callback function

**options**: `Object`, Request options

**Returns**: `Object`, Request promise


### Disputes.updateDisputeDocument(disputeId, disputeDocument, callback, options) 

Update dispute document

**Parameters**

**disputeId**: `number`, Dispute identifier

**disputeDocument**: `Object`, Dispute document

**callback**: `function`, Callback function

**options**: `Object`, Request options

**Returns**: `Object`, Promise of the request


### Disputes.createDisputeDocument(disputeId, disputeDocument, callback, options) 

Creates document for dispute

**Parameters**

**disputeId**: `number`, Dispute Id

**disputeDocument**: `Object`, Dispute document

**callback**: `function`, Callback function

**options**: `Object`, Request options

**Returns**: `Object`, Promise of the request


### Disputes.createDisputeDocumentPage(disputeId, disputeDocumentId, disputeDocumentPage, callback, options) 

Creates document's page for dispute

**Parameters**

**disputeId**: `number`, Dispute identifier

**disputeDocumentId**: `number`, Dispute document identifier

**disputeDocumentPage**: `Object`, Dispute document page

**callback**: `function`, Callback function

**options**: `Object`, Request options

**Returns**: `Object`, Promise of the request


### Disputes.createDisputeDocumentPageFromFile(disputeId, disputeDocumentId, file, callback, options) 

Creates document's page for dispute from file

**Parameters**

**disputeId**: `number`, Dispute identifier

**disputeDocumentId**: `number`, Dispute document identifier

**file**: `string`, File path

**callback**: `function`, Callback function

**options**: `Object`, Request options

**Returns**: `Object`, Promise of the request


### Disputes.getPendingSettlement(callback, options) 

Retrieve a list of Disputes pending settlement

**Parameters**

**callback**: `function`, Callback function

**options**: `object`, Request options

**Returns**: `object`, Request promise



* * *










