# Mandates

[MangoPay Mandates API Reference](https://docs.mangopay.com/endpoints/v2.01/mandates)



* * *

### Mandates.create(mandate, callback, options) 

Create a new Mandate

**Parameters**

**mandate**: `Object`, Mandate object

**callback**: `function`, Callback function

**options**: `Object`, Request options

**Returns**: `Object`, Promise of the request


### Mandates.getAll(callback, options) 

Get all mandates

**Parameters**

**callback**: `function`, Callback function

**options**: `Object`, Request options

**Returns**: `Object`, Request promise


### Mandates.get(mandateId, callback, options) 

Get mandate by ID

**Parameters**

**mandateId**: `number`, Mandate identifier

**callback**: `function`, Callback function

**options**: `Object`, Request options

**Returns**: `Object`, Request promise


### Mandates.cancel(mandateId, callback, options) 

Cancel a mandate

**Parameters**

**mandateId**: `number`, Mandate identifier

**callback**: `function`, Callback function

**options**: `Object`, Request options

**Returns**: `Object`, Request promise


### Mandates.getMandatesForUser(userId, callback, options) 

Gets user's mandates

**Parameters**

**userId**: `number`, User identifier

**callback**: `function`, Callback function

**options**: `Object`, Request options

**Returns**: `Object`, Request promise


### Mandates.getMandatesForBankAccount(userId, bankAccountId, callback, options) 

Gets bank account mandates

**Parameters**

**userId**: `number`, User identifier

**bankAccountId**: `number`, Bank Account identifier

**callback**: `function`, Callback function

**options**: `Object`, Request options

**Returns**: `Object`, Request promise


### Mandates.getTransactions(mandateId, callback, options) 

Gets Transactions for a Mandate

**Parameters**

**mandateId**: `number`, Mandate identifier

**callback**: `function`, Callback function

**options**: `Object`, Request options

**Returns**: `Object`, Request promise



* * *










