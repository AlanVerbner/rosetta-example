// implementation of the operations in the openapi specification

class Service {
  constructor() {}

  // Operation: networkList
  // URL: /network/list
  // summary:  Get List of Available Networks
  // req.body
  //   description: >-
  //     A MetadataRequest is utilized in any request where the only argument is
  //     optional metadata.
  //   type: object
  //   properties:
  //     metadata:
  //       type: object
  //
  // valid responses
  //   '200':
  //     description: Expected response to a valid request
  //     content:
  //       application/json:
  //         schema:
  //           description: >-
  //             A NetworkListResponse contains all NetworkIdentifiers that the node
  //             can serve information for.
  //           type: object
  //           required:
  //             - network_identifiers
  //           properties:
  //             network_identifiers:
  //               type: array
  //               items:
  //                 description: >-
  //                   The network_identifier specifies which network a particular
  //                   object is associated with.
  //                 type: object
  //                 required:
  //                   - blockchain
  //                   - network
  //                 properties:
  //                   blockchain:
  //                     type: string
  //                     example: bitcoin
  //                   network:
  //                     description: >-
  //                       If a blockchain has a specific chain-id or network
  //                       identifier, it should go in this field. It is up to the
  //                       client to determine which network-specific identifier is
  //                       mainnet or testnet.
  //                     type: string
  //                     example: mainnet
  //                   sub_network_identifier:
  //                     description: >-
  //                       In blockchains with sharded state, the SubNetworkIdentifier
  //                       is required to query some object on a specific shard. This
  //                       identifier is optional for all non-sharded blockchains.
  //                     type: object
  //                     required:
  //                       - network
  //                     properties:
  //                       network:
  //                         type: string
  //                         example: shard 1
  //                       metadata:
  //                         type: object
  //                         example:
  //                           producer: '0x52bc44d5378309ee2abf1539bf71de1b7d7be3b5'
  //   default:
  //     description: unexpected error
  //     content:
  //       application/json:
  //         schema:
  //           description: >-
  //             Instead of utilizing HTTP status codes to describe node errors (which
  //             often do not have a good analog), rich errors are returned using this
  //             object.
  //           type: object
  //           required:
  //             - code
  //             - message
  //             - retriable
  //           properties:
  //             code:
  //               description: >-
  //                 Code is a network-specific error code. If desired, this code can
  //                 be equivalent to an HTTP status code.
  //               type: integer
  //               format: int32
  //               minimum: 0
  //             message:
  //               description: Message is a network-specific error message.
  //               type: string
  //             retriable:
  //               description: >-
  //                 An error is retriable if the same request may succeed if submitted
  //                 again.
  //               type: boolean
  //

  async networkList(req, reply) {
    console.log("networkList", req.params);
    return {
      network_identifiers: [
        {
          blockchain: "bitcoin",
          network: "mainnet",
          sub_network_identifier: {
            network: "shard 1",
            metadata: {
              producer: "0x52bc44d5378309ee2abf1539bf71de1b7d7be3b5",
            },
          },
        },
      ],
    };
  }

  // Operation: networkStatus
  // URL: /network/status
  // summary:  Get Network Status
  // req.body
  //   description: >-
  //     A NetworkRequest is utilized to retrieve some data specific exclusively to a
  //     NetworkIdentifier.
  //   type: object
  //   required:
  //     - network_identifier
  //   properties:
  //     network_identifier:
  //       description: >-
  //         The network_identifier specifies which network a particular object is
  //         associated with.
  //       type: object
  //       required:
  //         - blockchain
  //         - network
  //       properties:
  //         blockchain:
  //           type: string
  //           example: bitcoin
  //         network:
  //           description: >-
  //             If a blockchain has a specific chain-id or network identifier, it
  //             should go in this field. It is up to the client to determine which
  //             network-specific identifier is mainnet or testnet.
  //           type: string
  //           example: mainnet
  //         sub_network_identifier:
  //           description: >-
  //             In blockchains with sharded state, the SubNetworkIdentifier is
  //             required to query some object on a specific shard. This identifier is
  //             optional for all non-sharded blockchains.
  //           type: object
  //           required:
  //             - network
  //           properties:
  //             network:
  //               type: string
  //               example: shard 1
  //             metadata:
  //               type: object
  //               example:
  //                 producer: '0x52bc44d5378309ee2abf1539bf71de1b7d7be3b5'
  //     metadata:
  //       type: object
  //
  // valid responses
  //   '200':
  //     description: Expected response to a valid request
  //     content:
  //       application/json:
  //         schema:
  //           description: >-
  //             NetworkStatusResponse contains basic information about the node's view
  //             of a blockchain network.
  //           type: object
  //           required:
  //             - current_block_identifier
  //             - current_block_timestamp
  //             - genesis_block_identifier
  //             - peers
  //           properties:
  //             current_block_identifier: &ref_0
  //               description: >-
  //                 The block_identifier uniquely identifies a block in a particular
  //                 network.
  //               type: object
  //               required:
  //                 - index
  //                 - hash
  //               properties:
  //                 index:
  //                   description: This is also known as the block height.
  //                   type: integer
  //                   format: int64
  //                   example: 1123941
  //                 hash:
  //                   type: string
  //                   example: >-
  //                     0x1f2cc6c5027d2f201a5453ad1119574d2aed23a392654742ac3c78783c071f85
  //             current_block_timestamp:
  //               description: >-
  //                 The timestamp of the block in milliseconds since the Unix Epoch.
  //                 The timestamp is stored in milliseconds because some blockchains
  //                 produce blocks more often than once a second.
  //               type: integer
  //               format: int64
  //               minimum: 0
  //               example: 1582833600000
  //             genesis_block_identifier: *ref_0
  //             peers:
  //               type: array
  //               items:
  //                 description: A Peer is a representation of a node's peer.
  //                 type: object
  //                 required:
  //                   - peer_id
  //                 properties:
  //                   peer_id:
  //                     type: string
  //                     example: '0x52bc44d5378309ee2abf1539bf71de1b7d7be3b5'
  //                   metadata:
  //                     type: object
  //   default:
  //     description: unexpected error
  //     content:
  //       application/json:
  //         schema:
  //           description: >-
  //             Instead of utilizing HTTP status codes to describe node errors (which
  //             often do not have a good analog), rich errors are returned using this
  //             object.
  //           type: object
  //           required:
  //             - code
  //             - message
  //             - retriable
  //           properties:
  //             code:
  //               description: >-
  //                 Code is a network-specific error code. If desired, this code can
  //                 be equivalent to an HTTP status code.
  //               type: integer
  //               format: int32
  //               minimum: 0
  //             message:
  //               description: Message is a network-specific error message.
  //               type: string
  //             retriable:
  //               description: >-
  //                 An error is retriable if the same request may succeed if submitted
  //                 again.
  //               type: boolean
  //

  async networkStatus(req, reply) {
    console.log("networkStatus", req.params);
    return { key: "value" };
  }

  // Operation: networkOptions
  // URL: /network/options
  // summary:  Get Network Options
  // req.body
  //   description: >-
  //     A NetworkRequest is utilized to retrieve some data specific exclusively to a
  //     NetworkIdentifier.
  //   type: object
  //   required:
  //     - network_identifier
  //   properties:
  //     network_identifier:
  //       description: >-
  //         The network_identifier specifies which network a particular object is
  //         associated with.
  //       type: object
  //       required:
  //         - blockchain
  //         - network
  //       properties:
  //         blockchain:
  //           type: string
  //           example: bitcoin
  //         network:
  //           description: >-
  //             If a blockchain has a specific chain-id or network identifier, it
  //             should go in this field. It is up to the client to determine which
  //             network-specific identifier is mainnet or testnet.
  //           type: string
  //           example: mainnet
  //         sub_network_identifier:
  //           description: >-
  //             In blockchains with sharded state, the SubNetworkIdentifier is
  //             required to query some object on a specific shard. This identifier is
  //             optional for all non-sharded blockchains.
  //           type: object
  //           required:
  //             - network
  //           properties:
  //             network:
  //               type: string
  //               example: shard 1
  //             metadata:
  //               type: object
  //               example:
  //                 producer: '0x52bc44d5378309ee2abf1539bf71de1b7d7be3b5'
  //     metadata:
  //       type: object
  //
  // valid responses
  //   '200':
  //     description: Expected response to a valid request
  //     content:
  //       application/json:
  //         schema:
  //           description: >-
  //             NetworkOptionsResponse contains information about the versioning of
  //             the node and the allowed operation statuses, operation types, and
  //             errors.
  //           type: object
  //           required:
  //             - version
  //             - allow
  //           properties:
  //             version:
  //               description: >-
  //                 The Version object is utilized to inform the client of the
  //                 versions of different components of the Rosetta implementation.
  //               type: object
  //               required:
  //                 - rosetta_version
  //                 - node_version
  //               properties:
  //                 rosetta_version:
  //                   description: >-
  //                     The rosetta_version is the version of the Rosetta interface
  //                     the implementation adheres to. This can be useful for clients
  //                     looking to reliably parse responses.
  //                   type: string
  //                   example: 1.2.5
  //                 node_version:
  //                   description: >-
  //                     The node_version is the canonical version of the node runtime.
  //                     This can help clients manage deployments.
  //                   type: string
  //                   example: 1.0.2
  //                 middleware_version:
  //                   description: >-
  //                     When a middleware server is used to adhere to the Rosetta
  //                     interface, it should return its version here. This can help
  //                     clients manage deployments.
  //                   type: string
  //                   example: 0.2.7
  //                 metadata:
  //                   description: >-
  //                     Any other information that may be useful about versioning of
  //                     dependent services should be returned here.
  //                   type: object
  //             allow:
  //               description: >-
  //                 Allow specifies supported Operation status, Operation types, and
  //                 all possible error statuses. This Allow object is used by clients
  //                 to validate the correctness of a Rosetta Server implementation. It
  //                 is expected that these clients will error if they receive some
  //                 response that contains any of the above information that is not
  //                 specified here.
  //               type: object
  //               required:
  //                 - operation_statuses
  //                 - operation_types
  //                 - errors
  //               properties:
  //                 operation_statuses:
  //                   description: >-
  //                     All Operation.Status this implementation supports. Any status
  //                     that is returned during parsing that is not listed here will
  //                     cause client validation to error.
  //                   type: array
  //                   items:
  //                     description: >-
  //                       OperationStatus is utilized to indicate which Operation
  //                       status are considered successful.
  //                     type: object
  //                     required:
  //                       - status
  //                       - successful
  //                     properties:
  //                       status:
  //                         description: >-
  //                           The status is the network-specific status of the
  //                           operation.
  //                         type: string
  //                       successful:
  //                         description: >-
  //                           An Operation is considered successful if the
  //                           Operation.Amount should affect the Operation.Account.
  //                           Some blockchains (like Bitcoin) only include successful
  //                           operations in blocks but other blockchains (like
  //                           Ethereum) include unsuccessful operations that incur a
  //                           fee.  To reconcile the computed balance from the stream
  //                           of Operations, it is critical to understand which
  //                           Operation.Status indicate an Operation is successful and
  //                           should affect an Account.
  //                         type: boolean
  //                     example:
  //                       status: SUCCESS
  //                       successful: true
  //                 operation_types:
  //                   description: >-
  //                     All Operation.Type this implementation supports. Any type that
  //                     is returned during parsing that is not listed here will cause
  //                     client validation to error.
  //                   type: array
  //                   items:
  //                     type: string
  //                     example: TRANSFER
  //                 errors:
  //                   description: >-
  //                     All Errors that this implementation could return. Any error
  //                     that is returned during parsing that is not listed here will
  //                     cause client validation to error.
  //                   type: array
  //                   items: &ref_0
  //                     description: >-
  //                       Instead of utilizing HTTP status codes to describe node
  //                       errors (which often do not have a good analog), rich errors
  //                       are returned using this object.
  //                     type: object
  //                     required:
  //                       - code
  //                       - message
  //                       - retriable
  //                     properties:
  //                       code:
  //                         description: >-
  //                           Code is a network-specific error code. If desired, this
  //                           code can be equivalent to an HTTP status code.
  //                         type: integer
  //                         format: int32
  //                         minimum: 0
  //                       message:
  //                         description: Message is a network-specific error message.
  //                         type: string
  //                       retriable:
  //                         description: >-
  //                           An error is retriable if the same request may succeed if
  //                           submitted again.
  //                         type: boolean
  //   default:
  //     description: unexpected error
  //     content:
  //       application/json:
  //         schema: *ref_0
  //

  async networkOptions(req, reply) {
    console.log("networkOptions", req.params);
    return { key: "value" };
  }

  // Operation: block
  // URL: /block
  // summary:  Get a Block
  // req.body
  //   description: A BlockRequest is utilized to make a block request on the /block endpoint.
  //   type: object
  //   required:
  //     - network_identifier
  //     - block_identifier
  //   properties:
  //     network_identifier:
  //       description: >-
  //         The network_identifier specifies which network a particular object is
  //         associated with.
  //       type: object
  //       required:
  //         - blockchain
  //         - network
  //       properties:
  //         blockchain:
  //           type: string
  //           example: bitcoin
  //         network:
  //           description: >-
  //             If a blockchain has a specific chain-id or network identifier, it
  //             should go in this field. It is up to the client to determine which
  //             network-specific identifier is mainnet or testnet.
  //           type: string
  //           example: mainnet
  //         sub_network_identifier:
  //           description: >-
  //             In blockchains with sharded state, the SubNetworkIdentifier is
  //             required to query some object on a specific shard. This identifier is
  //             optional for all non-sharded blockchains.
  //           type: object
  //           required:
  //             - network
  //           properties:
  //             network:
  //               type: string
  //               example: shard 1
  //             metadata:
  //               type: object
  //               example:
  //                 producer: '0x52bc44d5378309ee2abf1539bf71de1b7d7be3b5'
  //     block_identifier:
  //       type: object
  //       description: >-
  //         When fetching data by BlockIdentifier, it may be possible to only specify
  //         the index or hash. If neither property is specified, it is assumed that
  //         the client is making a request at the current block.
  //       properties:
  //         index:
  //           type: integer
  //           format: int64
  //           example: 1123941
  //         hash:
  //           type: string
  //           example: '0x1f2cc6c5027d2f201a5453ad1119574d2aed23a392654742ac3c78783c071f85'
  //
  // valid responses
  //   '200':
  //     description: Expected response to a valid request
  //     content:
  //       application/json:
  //         schema:
  //           description: >-
  //             A BlockResponse includes a fully-populated block or a
  //             partially-populated block with a list of other transactions to fetch
  //             (other_transactions).
  //           type: object
  //           required:
  //             - block
  //           properties:
  //             block:
  //               description: >-
  //                 Blocks contain an array of Transactions that occurred at a
  //                 particular BlockIdentifier.
  //               type: object
  //               required:
  //                 - block_identifier
  //                 - parent_block_identifier
  //                 - timestamp
  //                 - transactions
  //               properties:
  //                 block_identifier: &ref_0
  //                   description: >-
  //                     The block_identifier uniquely identifies a block in a
  //                     particular network.
  //                   type: object
  //                   required:
  //                     - index
  //                     - hash
  //                   properties:
  //                     index:
  //                       description: This is also known as the block height.
  //                       type: integer
  //                       format: int64
  //                       example: 1123941
  //                     hash:
  //                       type: string
  //                       example: >-
  //                         0x1f2cc6c5027d2f201a5453ad1119574d2aed23a392654742ac3c78783c071f85
  //                 parent_block_identifier: *ref_0
  //                 timestamp:
  //                   description: >-
  //                     The timestamp of the block in milliseconds since the Unix
  //                     Epoch. The timestamp is stored in milliseconds because some
  //                     blockchains produce blocks more often than once a second.
  //                   type: integer
  //                   format: int64
  //                   minimum: 0
  //                   example: 1582833600000
  //                 transactions:
  //                   type: array
  //                   items:
  //                     description: >-
  //                       Transactions contain an array of Operations that are
  //                       attributable to the same TransactionIdentifier.
  //                     type: object
  //                     required:
  //                       - transaction_identifier
  //                       - operations
  //                     properties:
  //                       transaction_identifier: &ref_2
  //                         description: >-
  //                           The transaction_identifier uniquely identifies a
  //                           transaction in a particular network and block or in the
  //                           mempool.
  //                         type: object
  //                         required:
  //                           - hash
  //                         properties:
  //                           hash:
  //                             description: >-
  //                               Any transactions that are attributable only to a
  //                               block (ex: a block event) should use the hash of the
  //                               block as the identifier.
  //                             type: string
  //                             example: >-
  //                               0x2f23fd8cca835af21f3ac375bac601f97ead75f2e79143bdf71fe2c4be043e8f
  //                       operations:
  //                         type: array
  //                         items:
  //                           description: >-
  //                             Operations contain all balance-changing information
  //                             within a transaction. They are always one-sided (only
  //                             affect 1 AccountIdentifier) and can succeed or fail
  //                             independently from a Transaction.
  //                           type: object
  //                           required:
  //                             - operation_identifier
  //                             - type
  //                             - status
  //                           properties:
  //                             operation_identifier: &ref_1
  //                               description: >-
  //                                 The operation_identifier uniquely identifies an
  //                                 operation within a transaction.
  //                               type: object
  //                               required:
  //                                 - index
  //                               properties:
  //                                 index:
  //                                   description: >-
  //                                     The operation index is used to ensure each
  //                                     operation has a unique identifier within a
  //                                     transaction.  To clarify, there may not be any
  //                                     notion of an operation index in the blockchain
  //                                     being described.
  //                                   type: integer
  //                                   format: int64
  //                                   minimum: 0
  //                                   example: 1
  //                                 network_index:
  //                                   description: >-
  //                                     Some blockchains specify an operation index
  //                                     that is essential for client use. For example,
  //                                     Bitcoin uses a network_index to identify which
  //                                     UTXO was used in a transaction.  network_index
  //                                     should not be populated if there is no notion
  //                                     of an operation index in a blockchain
  //                                     (typically most account-based blockchains).
  //                                   type: integer
  //                                   format: int64
  //                                   minimum: 0
  //                                   example: 0
  //                             related_operations:
  //                               description: >-
  //                                 Restrict referenced related_operations to
  //                                 identifier indexes < the current
  //                                 operation_identifier.index. This ensures there
  //                                 exists a clear DAG-structure of relations.  Since
  //                                 operations are one-sided, one could imagine
  //                                 relating operations in a single transfer or
  //                                 linking operations in a call tree.
  //                               type: array
  //                               items: *ref_1
  //                               example:
  //                                 - index: 0
  //                                   operation_identifier:
  //                                     index: 0
  //                             type:
  //                               description: >-
  //                                 The network-specific type of the operation. Ensure
  //                                 that any type that can be returned here is also
  //                                 specified in the NetowrkStatus. This can be very
  //                                 useful to downstream consumers that parse all
  //                                 block data.
  //                               type: string
  //                               example: Transfer
  //                             status:
  //                               description: >-
  //                                 The network-specific status of the operation.
  //                                 Status is not defined on the transaction object
  //                                 because blockchains with smart contracts may have
  //                                 transactions that partially apply.  Blockchains
  //                                 with atomic transactions (all operations succeed
  //                                 or all operations fail) will have the same status
  //                                 for each operation.
  //                               type: string
  //                               example: Reverted
  //                             account:
  //                               description: >-
  //                                 The account_identifier uniquely identifies an
  //                                 account within a network. All fields in the
  //                                 account_identifier are utilized to determine this
  //                                 uniqueness (including the metadata field, if
  //                                 populated).
  //                               type: object
  //                               required:
  //                                 - address
  //                               properties:
  //                                 address:
  //                                   description: >-
  //                                     The address may be a cryptographic public key
  //                                     (or some encoding of it) or a provided
  //                                     username.
  //                                   type: string
  //                                   example: '0x3a065000ab4183c6bf581dc1e55a605455fc6d61'
  //                                 sub_account:
  //                                   description: >-
  //                                     An account may have state specific to a
  //                                     contract address (ERC-20 token) and/or a stake
  //                                     (delegated balance). The
  //                                     sub_account_identifier should specify which
  //                                     state (if applicable) an account instantiation
  //                                     refers to.
  //                                   type: object
  //                                   required:
  //                                     - address
  //                                   properties:
  //                                     address:
  //                                       description: >-
  //                                         The SubAccount address may be a
  //                                         cryptographic value or some other
  //                                         identifier (ex: bonded) that uniquely
  //                                         specifies a SubAccount.
  //                                       type: string
  //                                       example: '0x6b175474e89094c44da98b954eedeac495271d0f'
  //                                     metadata:
  //                                       description: >-
  //                                         If the SubAccount address is not
  //                                         sufficient to uniquely specify a
  //                                         SubAccount, any other identifying
  //                                         information can be stored here.  It is
  //                                         important to note that two SubAccounts
  //                                         with identical addresses but differing
  //                                         metadata will not be considered equal by
  //                                         clients.
  //                                       type: object
  //                                 metadata:
  //                                   description: >-
  //                                     Blockchains that utilize a username model
  //                                     (where the address is not a derivative of a
  //                                     cryptographic public key) should specify the
  //                                     public key(s) owned by the address in
  //                                     metadata.
  //                                   type: object
  //                             amount:
  //                               description: >-
  //                                 Amount is some Value of a Currency. It is
  //                                 considered invalid to specify a Value without a
  //                                 Currency.
  //                               type: object
  //                               required:
  //                                 - value
  //                                 - currency
  //                               properties:
  //                                 value:
  //                                   description: >-
  //                                     Value of the transaction in atomic units
  //                                     represented as an arbitrary-sized signed
  //                                     integer.  For example, 1 BTC would be
  //                                     represented by a value of 100000000.
  //                                   type: string
  //                                   example: '1238089899992'
  //                                 currency:
  //                                   description: >-
  //                                     Currency is composed of a canonical Symbol and
  //                                     Decimals. This Decimals value is used to
  //                                     convert an Amount.Value from atomic units
  //                                     (Satoshis) to standard units (Bitcoins).
  //                                   type: object
  //                                   required:
  //                                     - symbol
  //                                     - decimals
  //                                   properties:
  //                                     symbol:
  //                                       description: >-
  //                                         Canonical symbol associated with a
  //                                         currency.
  //                                       type: string
  //                                       example: BTC
  //                                     decimals:
  //                                       description: >-
  //                                         Number of decimal places in the standard
  //                                         unit representation of the amount.  For
  //                                         example, BTC has 8 decimals. Note that it
  //                                         is not possible to represent the value of
  //                                         some currency in atomic units that is not
  //                                         base 10.
  //                                       type: integer
  //                                       format: int32
  //                                       minimum: 0
  //                                       example: 8
  //                                     metadata:
  //                                       description: >-
  //                                         Any additional information related to the
  //                                         currency itself.  For example, it would be
  //                                         useful to populate this object with the
  //                                         contract address of an ERC-20 token.
  //                                       type: object
  //                                       example:
  //                                         Issuer: Satoshi
  //                                 metadata:
  //                                   type: object
  //                             metadata:
  //                               type: object
  //                               example:
  //                                 asm: >-
  //                                   304502201fd8abb11443f8b1b9a04e0495e0543d05611473a790c8939f089d073f90509a022100f4677825136605d732e2126d09a2d38c20c75946cd9fc239c0497e84c634e3dd01
  //                                   03301a8259a12e35694cc22ebc45fee635f4993064190f6ce96e7fb19a03bb6be2
  //                                 hex: >-
  //                                   48304502201fd8abb11443f8b1b9a04e0495e0543d05611473a790c8939f089d073f90509a022100f4677825136605d732e2126d09a2d38c20c75946cd9fc239c0497e84c634e3dd012103301a8259a12e35694cc22ebc45fee635f4993064190f6ce96e7fb19a03bb6be2
  //                       metadata:
  //                         description: >-
  //                           Transactions that are related to other transactions
  //                           (like a cross-shard transactioin) should include the
  //                           tranaction_identifier of these transactions in the
  //                           metadata.
  //                         type: object
  //                         example:
  //                           size: 12378
  //                           lockTime: 1582272577
  //                 metadata:
  //                   type: object
  //                   example:
  //                     transactions_root: >-
  //                       0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347
  //                     difficulty: '123891724987128947'
  //             other_transactions:
  //               description: >-
  //                 Some blockchains may require additional transactions to be fetched
  //                 that weren't returned in the block response (ex: block only
  //                 returns transaction hashes). For blockchains with a lot of
  //                 transactions in each block, this can be very useful as consumers
  //                 can concurrently fetch all transactions returned.
  //               type: array
  //               items: *ref_2
  //   default:
  //     description: unexpected error
  //     content:
  //       application/json:
  //         schema:
  //           description: >-
  //             Instead of utilizing HTTP status codes to describe node errors (which
  //             often do not have a good analog), rich errors are returned using this
  //             object.
  //           type: object
  //           required:
  //             - code
  //             - message
  //             - retriable
  //           properties:
  //             code:
  //               description: >-
  //                 Code is a network-specific error code. If desired, this code can
  //                 be equivalent to an HTTP status code.
  //               type: integer
  //               format: int32
  //               minimum: 0
  //             message:
  //               description: Message is a network-specific error message.
  //               type: string
  //             retriable:
  //               description: >-
  //                 An error is retriable if the same request may succeed if submitted
  //                 again.
  //               type: boolean
  //

  async block(req, reply) {
    console.log("block", req.params);
    return { key: "value" };
  }

  // Operation: blockTransaction
  // URL: /block/transaction
  // summary:  Get a Block Transaction
  // req.body
  //   description: >-
  //     A BlockTransactionRequest is used to fetch a Transaction included in a block
  //     that is not returned in a BlockResponse.
  //   type: object
  //   required:
  //     - network_identifier
  //     - block_identifier
  //     - transaction_identifier
  //   properties:
  //     network_identifier:
  //       description: >-
  //         The network_identifier specifies which network a particular object is
  //         associated with.
  //       type: object
  //       required:
  //         - blockchain
  //         - network
  //       properties:
  //         blockchain:
  //           type: string
  //           example: bitcoin
  //         network:
  //           description: >-
  //             If a blockchain has a specific chain-id or network identifier, it
  //             should go in this field. It is up to the client to determine which
  //             network-specific identifier is mainnet or testnet.
  //           type: string
  //           example: mainnet
  //         sub_network_identifier:
  //           description: >-
  //             In blockchains with sharded state, the SubNetworkIdentifier is
  //             required to query some object on a specific shard. This identifier is
  //             optional for all non-sharded blockchains.
  //           type: object
  //           required:
  //             - network
  //           properties:
  //             network:
  //               type: string
  //               example: shard 1
  //             metadata:
  //               type: object
  //               example:
  //                 producer: '0x52bc44d5378309ee2abf1539bf71de1b7d7be3b5'
  //     block_identifier:
  //       description: The block_identifier uniquely identifies a block in a particular network.
  //       type: object
  //       required:
  //         - index
  //         - hash
  //       properties:
  //         index:
  //           description: This is also known as the block height.
  //           type: integer
  //           format: int64
  //           example: 1123941
  //         hash:
  //           type: string
  //           example: '0x1f2cc6c5027d2f201a5453ad1119574d2aed23a392654742ac3c78783c071f85'
  //     transaction_identifier:
  //       description: >-
  //         The transaction_identifier uniquely identifies a transaction in a
  //         particular network and block or in the mempool.
  //       type: object
  //       required:
  //         - hash
  //       properties:
  //         hash:
  //           description: >-
  //             Any transactions that are attributable only to a block (ex: a block
  //             event) should use the hash of the block as the identifier.
  //           type: string
  //           example: '0x2f23fd8cca835af21f3ac375bac601f97ead75f2e79143bdf71fe2c4be043e8f'
  //
  // valid responses
  //   '200':
  //     description: Expected response to a valid request
  //     content:
  //       application/json:
  //         schema:
  //           description: >-
  //             A BlockTransactionResponse contains information about a block
  //             transaction.
  //           type: object
  //           required:
  //             - transaction
  //           properties:
  //             transaction:
  //               description: >-
  //                 Transactions contain an array of Operations that are attributable
  //                 to the same TransactionIdentifier.
  //               type: object
  //               required:
  //                 - transaction_identifier
  //                 - operations
  //               properties:
  //                 transaction_identifier:
  //                   description: >-
  //                     The transaction_identifier uniquely identifies a transaction
  //                     in a particular network and block or in the mempool.
  //                   type: object
  //                   required:
  //                     - hash
  //                   properties:
  //                     hash:
  //                       description: >-
  //                         Any transactions that are attributable only to a block
  //                         (ex: a block event) should use the hash of the block as
  //                         the identifier.
  //                       type: string
  //                       example: >-
  //                         0x2f23fd8cca835af21f3ac375bac601f97ead75f2e79143bdf71fe2c4be043e8f
  //                 operations:
  //                   type: array
  //                   items:
  //                     description: >-
  //                       Operations contain all balance-changing information within a
  //                       transaction. They are always one-sided (only affect 1
  //                       AccountIdentifier) and can succeed or fail independently
  //                       from a Transaction.
  //                     type: object
  //                     required:
  //                       - operation_identifier
  //                       - type
  //                       - status
  //                     properties:
  //                       operation_identifier: &ref_0
  //                         description: >-
  //                           The operation_identifier uniquely identifies an
  //                           operation within a transaction.
  //                         type: object
  //                         required:
  //                           - index
  //                         properties:
  //                           index:
  //                             description: >-
  //                               The operation index is used to ensure each operation
  //                               has a unique identifier within a transaction.  To
  //                               clarify, there may not be any notion of an operation
  //                               index in the blockchain being described.
  //                             type: integer
  //                             format: int64
  //                             minimum: 0
  //                             example: 1
  //                           network_index:
  //                             description: >-
  //                               Some blockchains specify an operation index that is
  //                               essential for client use. For example, Bitcoin uses
  //                               a network_index to identify which UTXO was used in a
  //                               transaction.  network_index should not be populated
  //                               if there is no notion of an operation index in a
  //                               blockchain (typically most account-based
  //                               blockchains).
  //                             type: integer
  //                             format: int64
  //                             minimum: 0
  //                             example: 0
  //                       related_operations:
  //                         description: >-
  //                           Restrict referenced related_operations to identifier
  //                           indexes < the current operation_identifier.index. This
  //                           ensures there exists a clear DAG-structure of
  //                           relations.  Since operations are one-sided, one could
  //                           imagine relating operations in a single transfer or
  //                           linking operations in a call tree.
  //                         type: array
  //                         items: *ref_0
  //                         example:
  //                           - index: 0
  //                             operation_identifier:
  //                               index: 0
  //                       type:
  //                         description: >-
  //                           The network-specific type of the operation. Ensure that
  //                           any type that can be returned here is also specified in
  //                           the NetowrkStatus. This can be very useful to downstream
  //                           consumers that parse all block data.
  //                         type: string
  //                         example: Transfer
  //                       status:
  //                         description: >-
  //                           The network-specific status of the operation. Status is
  //                           not defined on the transaction object because
  //                           blockchains with smart contracts may have transactions
  //                           that partially apply.  Blockchains with atomic
  //                           transactions (all operations succeed or all operations
  //                           fail) will have the same status for each operation.
  //                         type: string
  //                         example: Reverted
  //                       account:
  //                         description: >-
  //                           The account_identifier uniquely identifies an account
  //                           within a network. All fields in the account_identifier
  //                           are utilized to determine this uniqueness (including the
  //                           metadata field, if populated).
  //                         type: object
  //                         required:
  //                           - address
  //                         properties:
  //                           address:
  //                             description: >-
  //                               The address may be a cryptographic public key (or
  //                               some encoding of it) or a provided username.
  //                             type: string
  //                             example: '0x3a065000ab4183c6bf581dc1e55a605455fc6d61'
  //                           sub_account:
  //                             description: >-
  //                               An account may have state specific to a contract
  //                               address (ERC-20 token) and/or a stake (delegated
  //                               balance). The sub_account_identifier should specify
  //                               which state (if applicable) an account instantiation
  //                               refers to.
  //                             type: object
  //                             required:
  //                               - address
  //                             properties:
  //                               address:
  //                                 description: >-
  //                                   The SubAccount address may be a cryptographic
  //                                   value or some other identifier (ex: bonded) that
  //                                   uniquely specifies a SubAccount.
  //                                 type: string
  //                                 example: '0x6b175474e89094c44da98b954eedeac495271d0f'
  //                               metadata:
  //                                 description: >-
  //                                   If the SubAccount address is not sufficient to
  //                                   uniquely specify a SubAccount, any other
  //                                   identifying information can be stored here.  It
  //                                   is important to note that two SubAccounts with
  //                                   identical addresses but differing metadata will
  //                                   not be considered equal by clients.
  //                                 type: object
  //                           metadata:
  //                             description: >-
  //                               Blockchains that utilize a username model (where the
  //                               address is not a derivative of a cryptographic
  //                               public key) should specify the public key(s) owned
  //                               by the address in metadata.
  //                             type: object
  //                       amount:
  //                         description: >-
  //                           Amount is some Value of a Currency. It is considered
  //                           invalid to specify a Value without a Currency.
  //                         type: object
  //                         required:
  //                           - value
  //                           - currency
  //                         properties:
  //                           value:
  //                             description: >-
  //                               Value of the transaction in atomic units represented
  //                               as an arbitrary-sized signed integer.  For example,
  //                               1 BTC would be represented by a value of 100000000.
  //                             type: string
  //                             example: '1238089899992'
  //                           currency:
  //                             description: >-
  //                               Currency is composed of a canonical Symbol and
  //                               Decimals. This Decimals value is used to convert an
  //                               Amount.Value from atomic units (Satoshis) to
  //                               standard units (Bitcoins).
  //                             type: object
  //                             required:
  //                               - symbol
  //                               - decimals
  //                             properties:
  //                               symbol:
  //                                 description: Canonical symbol associated with a currency.
  //                                 type: string
  //                                 example: BTC
  //                               decimals:
  //                                 description: >-
  //                                   Number of decimal places in the standard unit
  //                                   representation of the amount.  For example, BTC
  //                                   has 8 decimals. Note that it is not possible to
  //                                   represent the value of some currency in atomic
  //                                   units that is not base 10.
  //                                 type: integer
  //                                 format: int32
  //                                 minimum: 0
  //                                 example: 8
  //                               metadata:
  //                                 description: >-
  //                                   Any additional information related to the
  //                                   currency itself.  For example, it would be
  //                                   useful to populate this object with the contract
  //                                   address of an ERC-20 token.
  //                                 type: object
  //                                 example:
  //                                   Issuer: Satoshi
  //                           metadata:
  //                             type: object
  //                       metadata:
  //                         type: object
  //                         example:
  //                           asm: >-
  //                             304502201fd8abb11443f8b1b9a04e0495e0543d05611473a790c8939f089d073f90509a022100f4677825136605d732e2126d09a2d38c20c75946cd9fc239c0497e84c634e3dd01
  //                             03301a8259a12e35694cc22ebc45fee635f4993064190f6ce96e7fb19a03bb6be2
  //                           hex: >-
  //                             48304502201fd8abb11443f8b1b9a04e0495e0543d05611473a790c8939f089d073f90509a022100f4677825136605d732e2126d09a2d38c20c75946cd9fc239c0497e84c634e3dd012103301a8259a12e35694cc22ebc45fee635f4993064190f6ce96e7fb19a03bb6be2
  //                 metadata:
  //                   description: >-
  //                     Transactions that are related to other transactions (like a
  //                     cross-shard transactioin) should include the
  //                     tranaction_identifier of these transactions in the metadata.
  //                   type: object
  //                   example:
  //                     size: 12378
  //                     lockTime: 1582272577
  //   default:
  //     description: unexpected error
  //     content:
  //       application/json:
  //         schema:
  //           description: >-
  //             Instead of utilizing HTTP status codes to describe node errors (which
  //             often do not have a good analog), rich errors are returned using this
  //             object.
  //           type: object
  //           required:
  //             - code
  //             - message
  //             - retriable
  //           properties:
  //             code:
  //               description: >-
  //                 Code is a network-specific error code. If desired, this code can
  //                 be equivalent to an HTTP status code.
  //               type: integer
  //               format: int32
  //               minimum: 0
  //             message:
  //               description: Message is a network-specific error message.
  //               type: string
  //             retriable:
  //               description: >-
  //                 An error is retriable if the same request may succeed if submitted
  //                 again.
  //               type: boolean
  //

  async blockTransaction(req, reply) {
    console.log("blockTransaction", req.params);
    return { key: "value" };
  }

  // Operation: mempool
  // URL: /mempool
  // summary:  Get All Mempool Transactions
  // req.body
  //   description: >-
  //     A MempoolRequest is utilized to retrieve all transaction identifiers in the
  //     mempool for a particular network_identifier.
  //   type: object
  //   required:
  //     - network_identifier
  //   properties:
  //     network_identifier:
  //       description: >-
  //         The network_identifier specifies which network a particular object is
  //         associated with.
  //       type: object
  //       required:
  //         - blockchain
  //         - network
  //       properties:
  //         blockchain:
  //           type: string
  //           example: bitcoin
  //         network:
  //           description: >-
  //             If a blockchain has a specific chain-id or network identifier, it
  //             should go in this field. It is up to the client to determine which
  //             network-specific identifier is mainnet or testnet.
  //           type: string
  //           example: mainnet
  //         sub_network_identifier:
  //           description: >-
  //             In blockchains with sharded state, the SubNetworkIdentifier is
  //             required to query some object on a specific shard. This identifier is
  //             optional for all non-sharded blockchains.
  //           type: object
  //           required:
  //             - network
  //           properties:
  //             network:
  //               type: string
  //               example: shard 1
  //             metadata:
  //               type: object
  //               example:
  //                 producer: '0x52bc44d5378309ee2abf1539bf71de1b7d7be3b5'
  //
  // valid responses
  //   '200':
  //     description: Expected response to a valid request
  //     content:
  //       application/json:
  //         schema:
  //           description: >-
  //             A MempoolResponse contains all transaction identifiers in the mempool
  //             for a particular network_identifier.
  //           type: object
  //           required:
  //             - transaction_identifiers
  //           properties:
  //             transaction_identifiers:
  //               type: array
  //               items:
  //                 description: >-
  //                   The transaction_identifier uniquely identifies a transaction in
  //                   a particular network and block or in the mempool.
  //                 type: object
  //                 required:
  //                   - hash
  //                 properties:
  //                   hash:
  //                     description: >-
  //                       Any transactions that are attributable only to a block (ex:
  //                       a block event) should use the hash of the block as the
  //                       identifier.
  //                     type: string
  //                     example: >-
  //                       0x2f23fd8cca835af21f3ac375bac601f97ead75f2e79143bdf71fe2c4be043e8f
  //   default:
  //     description: unexpected error
  //     content:
  //       application/json:
  //         schema:
  //           description: >-
  //             Instead of utilizing HTTP status codes to describe node errors (which
  //             often do not have a good analog), rich errors are returned using this
  //             object.
  //           type: object
  //           required:
  //             - code
  //             - message
  //             - retriable
  //           properties:
  //             code:
  //               description: >-
  //                 Code is a network-specific error code. If desired, this code can
  //                 be equivalent to an HTTP status code.
  //               type: integer
  //               format: int32
  //               minimum: 0
  //             message:
  //               description: Message is a network-specific error message.
  //               type: string
  //             retriable:
  //               description: >-
  //                 An error is retriable if the same request may succeed if submitted
  //                 again.
  //               type: boolean
  //

  async mempool(req, reply) {
    console.log("mempool", req.params);
    return { key: "value" };
  }

  // Operation: mempoolTransaction
  // URL: /mempool/transaction
  // summary:  Get a Mempool Transaction
  // req.body
  //   description: >-
  //     A MempoolTransactionRequest is utilized to retrieve a transaction from the
  //     mempool.
  //   type: object
  //   required:
  //     - network_identifier
  //     - transaction_identifier
  //   properties:
  //     network_identifier:
  //       description: >-
  //         The network_identifier specifies which network a particular object is
  //         associated with.
  //       type: object
  //       required:
  //         - blockchain
  //         - network
  //       properties:
  //         blockchain:
  //           type: string
  //           example: bitcoin
  //         network:
  //           description: >-
  //             If a blockchain has a specific chain-id or network identifier, it
  //             should go in this field. It is up to the client to determine which
  //             network-specific identifier is mainnet or testnet.
  //           type: string
  //           example: mainnet
  //         sub_network_identifier:
  //           description: >-
  //             In blockchains with sharded state, the SubNetworkIdentifier is
  //             required to query some object on a specific shard. This identifier is
  //             optional for all non-sharded blockchains.
  //           type: object
  //           required:
  //             - network
  //           properties:
  //             network:
  //               type: string
  //               example: shard 1
  //             metadata:
  //               type: object
  //               example:
  //                 producer: '0x52bc44d5378309ee2abf1539bf71de1b7d7be3b5'
  //     transaction_identifier:
  //       description: >-
  //         The transaction_identifier uniquely identifies a transaction in a
  //         particular network and block or in the mempool.
  //       type: object
  //       required:
  //         - hash
  //       properties:
  //         hash:
  //           description: >-
  //             Any transactions that are attributable only to a block (ex: a block
  //             event) should use the hash of the block as the identifier.
  //           type: string
  //           example: '0x2f23fd8cca835af21f3ac375bac601f97ead75f2e79143bdf71fe2c4be043e8f'
  //
  // valid responses
  //   '200':
  //     description: Expected response to a valid request
  //     content:
  //       application/json:
  //         schema:
  //           description: >-
  //             A MempoolTransactionResponse contains an estimate of a mempool
  //             transaction. It may not be possible to know the full impact of a
  //             transaction in the mempool (ex: fee paid).
  //           type: object
  //           required:
  //             - transaction
  //           properties:
  //             transaction:
  //               description: >-
  //                 Transactions contain an array of Operations that are attributable
  //                 to the same TransactionIdentifier.
  //               type: object
  //               required:
  //                 - transaction_identifier
  //                 - operations
  //               properties:
  //                 transaction_identifier:
  //                   description: >-
  //                     The transaction_identifier uniquely identifies a transaction
  //                     in a particular network and block or in the mempool.
  //                   type: object
  //                   required:
  //                     - hash
  //                   properties:
  //                     hash:
  //                       description: >-
  //                         Any transactions that are attributable only to a block
  //                         (ex: a block event) should use the hash of the block as
  //                         the identifier.
  //                       type: string
  //                       example: >-
  //                         0x2f23fd8cca835af21f3ac375bac601f97ead75f2e79143bdf71fe2c4be043e8f
  //                 operations:
  //                   type: array
  //                   items:
  //                     description: >-
  //                       Operations contain all balance-changing information within a
  //                       transaction. They are always one-sided (only affect 1
  //                       AccountIdentifier) and can succeed or fail independently
  //                       from a Transaction.
  //                     type: object
  //                     required:
  //                       - operation_identifier
  //                       - type
  //                       - status
  //                     properties:
  //                       operation_identifier: &ref_0
  //                         description: >-
  //                           The operation_identifier uniquely identifies an
  //                           operation within a transaction.
  //                         type: object
  //                         required:
  //                           - index
  //                         properties:
  //                           index:
  //                             description: >-
  //                               The operation index is used to ensure each operation
  //                               has a unique identifier within a transaction.  To
  //                               clarify, there may not be any notion of an operation
  //                               index in the blockchain being described.
  //                             type: integer
  //                             format: int64
  //                             minimum: 0
  //                             example: 1
  //                           network_index:
  //                             description: >-
  //                               Some blockchains specify an operation index that is
  //                               essential for client use. For example, Bitcoin uses
  //                               a network_index to identify which UTXO was used in a
  //                               transaction.  network_index should not be populated
  //                               if there is no notion of an operation index in a
  //                               blockchain (typically most account-based
  //                               blockchains).
  //                             type: integer
  //                             format: int64
  //                             minimum: 0
  //                             example: 0
  //                       related_operations:
  //                         description: >-
  //                           Restrict referenced related_operations to identifier
  //                           indexes < the current operation_identifier.index. This
  //                           ensures there exists a clear DAG-structure of
  //                           relations.  Since operations are one-sided, one could
  //                           imagine relating operations in a single transfer or
  //                           linking operations in a call tree.
  //                         type: array
  //                         items: *ref_0
  //                         example:
  //                           - index: 0
  //                             operation_identifier:
  //                               index: 0
  //                       type:
  //                         description: >-
  //                           The network-specific type of the operation. Ensure that
  //                           any type that can be returned here is also specified in
  //                           the NetowrkStatus. This can be very useful to downstream
  //                           consumers that parse all block data.
  //                         type: string
  //                         example: Transfer
  //                       status:
  //                         description: >-
  //                           The network-specific status of the operation. Status is
  //                           not defined on the transaction object because
  //                           blockchains with smart contracts may have transactions
  //                           that partially apply.  Blockchains with atomic
  //                           transactions (all operations succeed or all operations
  //                           fail) will have the same status for each operation.
  //                         type: string
  //                         example: Reverted
  //                       account:
  //                         description: >-
  //                           The account_identifier uniquely identifies an account
  //                           within a network. All fields in the account_identifier
  //                           are utilized to determine this uniqueness (including the
  //                           metadata field, if populated).
  //                         type: object
  //                         required:
  //                           - address
  //                         properties:
  //                           address:
  //                             description: >-
  //                               The address may be a cryptographic public key (or
  //                               some encoding of it) or a provided username.
  //                             type: string
  //                             example: '0x3a065000ab4183c6bf581dc1e55a605455fc6d61'
  //                           sub_account:
  //                             description: >-
  //                               An account may have state specific to a contract
  //                               address (ERC-20 token) and/or a stake (delegated
  //                               balance). The sub_account_identifier should specify
  //                               which state (if applicable) an account instantiation
  //                               refers to.
  //                             type: object
  //                             required:
  //                               - address
  //                             properties:
  //                               address:
  //                                 description: >-
  //                                   The SubAccount address may be a cryptographic
  //                                   value or some other identifier (ex: bonded) that
  //                                   uniquely specifies a SubAccount.
  //                                 type: string
  //                                 example: '0x6b175474e89094c44da98b954eedeac495271d0f'
  //                               metadata:
  //                                 description: >-
  //                                   If the SubAccount address is not sufficient to
  //                                   uniquely specify a SubAccount, any other
  //                                   identifying information can be stored here.  It
  //                                   is important to note that two SubAccounts with
  //                                   identical addresses but differing metadata will
  //                                   not be considered equal by clients.
  //                                 type: object
  //                           metadata:
  //                             description: >-
  //                               Blockchains that utilize a username model (where the
  //                               address is not a derivative of a cryptographic
  //                               public key) should specify the public key(s) owned
  //                               by the address in metadata.
  //                             type: object
  //                       amount:
  //                         description: >-
  //                           Amount is some Value of a Currency. It is considered
  //                           invalid to specify a Value without a Currency.
  //                         type: object
  //                         required:
  //                           - value
  //                           - currency
  //                         properties:
  //                           value:
  //                             description: >-
  //                               Value of the transaction in atomic units represented
  //                               as an arbitrary-sized signed integer.  For example,
  //                               1 BTC would be represented by a value of 100000000.
  //                             type: string
  //                             example: '1238089899992'
  //                           currency:
  //                             description: >-
  //                               Currency is composed of a canonical Symbol and
  //                               Decimals. This Decimals value is used to convert an
  //                               Amount.Value from atomic units (Satoshis) to
  //                               standard units (Bitcoins).
  //                             type: object
  //                             required:
  //                               - symbol
  //                               - decimals
  //                             properties:
  //                               symbol:
  //                                 description: Canonical symbol associated with a currency.
  //                                 type: string
  //                                 example: BTC
  //                               decimals:
  //                                 description: >-
  //                                   Number of decimal places in the standard unit
  //                                   representation of the amount.  For example, BTC
  //                                   has 8 decimals. Note that it is not possible to
  //                                   represent the value of some currency in atomic
  //                                   units that is not base 10.
  //                                 type: integer
  //                                 format: int32
  //                                 minimum: 0
  //                                 example: 8
  //                               metadata:
  //                                 description: >-
  //                                   Any additional information related to the
  //                                   currency itself.  For example, it would be
  //                                   useful to populate this object with the contract
  //                                   address of an ERC-20 token.
  //                                 type: object
  //                                 example:
  //                                   Issuer: Satoshi
  //                           metadata:
  //                             type: object
  //                       metadata:
  //                         type: object
  //                         example:
  //                           asm: >-
  //                             304502201fd8abb11443f8b1b9a04e0495e0543d05611473a790c8939f089d073f90509a022100f4677825136605d732e2126d09a2d38c20c75946cd9fc239c0497e84c634e3dd01
  //                             03301a8259a12e35694cc22ebc45fee635f4993064190f6ce96e7fb19a03bb6be2
  //                           hex: >-
  //                             48304502201fd8abb11443f8b1b9a04e0495e0543d05611473a790c8939f089d073f90509a022100f4677825136605d732e2126d09a2d38c20c75946cd9fc239c0497e84c634e3dd012103301a8259a12e35694cc22ebc45fee635f4993064190f6ce96e7fb19a03bb6be2
  //                 metadata:
  //                   description: >-
  //                     Transactions that are related to other transactions (like a
  //                     cross-shard transactioin) should include the
  //                     tranaction_identifier of these transactions in the metadata.
  //                   type: object
  //                   example:
  //                     size: 12378
  //                     lockTime: 1582272577
  //             metadata:
  //               type: object
  //               example:
  //                 descendant_fees: 123923
  //                 ancestor_count: 2
  //   default:
  //     description: unexpected error
  //     content:
  //       application/json:
  //         schema:
  //           description: >-
  //             Instead of utilizing HTTP status codes to describe node errors (which
  //             often do not have a good analog), rich errors are returned using this
  //             object.
  //           type: object
  //           required:
  //             - code
  //             - message
  //             - retriable
  //           properties:
  //             code:
  //               description: >-
  //                 Code is a network-specific error code. If desired, this code can
  //                 be equivalent to an HTTP status code.
  //               type: integer
  //               format: int32
  //               minimum: 0
  //             message:
  //               description: Message is a network-specific error message.
  //               type: string
  //             retriable:
  //               description: >-
  //                 An error is retriable if the same request may succeed if submitted
  //                 again.
  //               type: boolean
  //

  async mempoolTransaction(req, reply) {
    console.log("mempoolTransaction", req.params);
    return { key: "value" };
  }

  // Operation: accountBalance
  // URL: /account/balance
  // summary:  Get an Account Balance
  // req.body
  //   description: >-
  //     An AccountBalanceRequest is utilized to make a balance request on the
  //     /account/balance endpoint. If the block_identifier is populated, a historical
  //     balance query should be performed.
  //   type: object
  //   required:
  //     - network_identifier
  //     - account_identifier
  //   properties:
  //     network_identifier:
  //       description: >-
  //         The network_identifier specifies which network a particular object is
  //         associated with.
  //       type: object
  //       required:
  //         - blockchain
  //         - network
  //       properties:
  //         blockchain:
  //           type: string
  //           example: bitcoin
  //         network:
  //           description: >-
  //             If a blockchain has a specific chain-id or network identifier, it
  //             should go in this field. It is up to the client to determine which
  //             network-specific identifier is mainnet or testnet.
  //           type: string
  //           example: mainnet
  //         sub_network_identifier:
  //           description: >-
  //             In blockchains with sharded state, the SubNetworkIdentifier is
  //             required to query some object on a specific shard. This identifier is
  //             optional for all non-sharded blockchains.
  //           type: object
  //           required:
  //             - network
  //           properties:
  //             network:
  //               type: string
  //               example: shard 1
  //             metadata:
  //               type: object
  //               example:
  //                 producer: '0x52bc44d5378309ee2abf1539bf71de1b7d7be3b5'
  //     account_identifier:
  //       description: >-
  //         The account_identifier uniquely identifies an account within a network.
  //         All fields in the account_identifier are utilized to determine this
  //         uniqueness (including the metadata field, if populated).
  //       type: object
  //       required:
  //         - address
  //       properties:
  //         address:
  //           description: >-
  //             The address may be a cryptographic public key (or some encoding of it)
  //             or a provided username.
  //           type: string
  //           example: '0x3a065000ab4183c6bf581dc1e55a605455fc6d61'
  //         sub_account:
  //           description: >-
  //             An account may have state specific to a contract address (ERC-20
  //             token) and/or a stake (delegated balance). The sub_account_identifier
  //             should specify which state (if applicable) an account instantiation
  //             refers to.
  //           type: object
  //           required:
  //             - address
  //           properties:
  //             address:
  //               description: >-
  //                 The SubAccount address may be a cryptographic value or some other
  //                 identifier (ex: bonded) that uniquely specifies a SubAccount.
  //               type: string
  //               example: '0x6b175474e89094c44da98b954eedeac495271d0f'
  //             metadata:
  //               description: >-
  //                 If the SubAccount address is not sufficient to uniquely specify a
  //                 SubAccount, any other identifying information can be stored here.
  //                 It is important to note that two SubAccounts with identical
  //                 addresses but differing metadata will not be considered equal by
  //                 clients.
  //               type: object
  //         metadata:
  //           description: >-
  //             Blockchains that utilize a username model (where the address is not a
  //             derivative of a cryptographic public key) should specify the public
  //             key(s) owned by the address in metadata.
  //           type: object
  //     block_identifier:
  //       type: object
  //       description: >-
  //         When fetching data by BlockIdentifier, it may be possible to only specify
  //         the index or hash. If neither property is specified, it is assumed that
  //         the client is making a request at the current block.
  //       properties:
  //         index:
  //           type: integer
  //           format: int64
  //           example: 1123941
  //         hash:
  //           type: string
  //           example: '0x1f2cc6c5027d2f201a5453ad1119574d2aed23a392654742ac3c78783c071f85'
  //
  // valid responses
  //   '200':
  //     description: Expected response to a valid request
  //     content:
  //       application/json:
  //         schema:
  //           description: >-
  //             An AccountBalanceResponse is returned on the /account/balance
  //             endpoint. If an account has a balance for each AccountIdentifier
  //             describing it (ex: an ERC-20 token balance on a few smart contracts),
  //             an account balance request must be made with each AccountIdentifier.
  //           type: object
  //           required:
  //             - block_identifier
  //             - balances
  //           properties:
  //             block_identifier:
  //               description: >-
  //                 The block_identifier uniquely identifies a block in a particular
  //                 network.
  //               type: object
  //               required:
  //                 - index
  //                 - hash
  //               properties:
  //                 index:
  //                   description: This is also known as the block height.
  //                   type: integer
  //                   format: int64
  //                   example: 1123941
  //                 hash:
  //                   type: string
  //                   example: >-
  //                     0x1f2cc6c5027d2f201a5453ad1119574d2aed23a392654742ac3c78783c071f85
  //             balances:
  //               type: array
  //               description: A single account may have a balance in multiple currencies.
  //               items:
  //                 description: >-
  //                   Amount is some Value of a Currency. It is considered invalid to
  //                   specify a Value without a Currency.
  //                 type: object
  //                 required:
  //                   - value
  //                   - currency
  //                 properties:
  //                   value:
  //                     description: >-
  //                       Value of the transaction in atomic units represented as an
  //                       arbitrary-sized signed integer.  For example, 1 BTC would be
  //                       represented by a value of 100000000.
  //                     type: string
  //                     example: '1238089899992'
  //                   currency:
  //                     description: >-
  //                       Currency is composed of a canonical Symbol and Decimals.
  //                       This Decimals value is used to convert an Amount.Value from
  //                       atomic units (Satoshis) to standard units (Bitcoins).
  //                     type: object
  //                     required:
  //                       - symbol
  //                       - decimals
  //                     properties:
  //                       symbol:
  //                         description: Canonical symbol associated with a currency.
  //                         type: string
  //                         example: BTC
  //                       decimals:
  //                         description: >-
  //                           Number of decimal places in the standard unit
  //                           representation of the amount.  For example, BTC has 8
  //                           decimals. Note that it is not possible to represent the
  //                           value of some currency in atomic units that is not base
  //                           10.
  //                         type: integer
  //                         format: int32
  //                         minimum: 0
  //                         example: 8
  //                       metadata:
  //                         description: >-
  //                           Any additional information related to the currency
  //                           itself.  For example, it would be useful to populate
  //                           this object with the contract address of an ERC-20
  //                           token.
  //                         type: object
  //                         example:
  //                           Issuer: Satoshi
  //                   metadata:
  //                     type: object
  //             metadata:
  //               description: >-
  //                 Account-based blockchains that utilize a nonce or sequence number
  //                 should include that number in the metadata. This number could be
  //                 unique to the identifier or global across the account address.
  //               type: object
  //               example:
  //                 sequence_number: 23
  //   default:
  //     description: unexpected error
  //     content:
  //       application/json:
  //         schema:
  //           description: >-
  //             Instead of utilizing HTTP status codes to describe node errors (which
  //             often do not have a good analog), rich errors are returned using this
  //             object.
  //           type: object
  //           required:
  //             - code
  //             - message
  //             - retriable
  //           properties:
  //             code:
  //               description: >-
  //                 Code is a network-specific error code. If desired, this code can
  //                 be equivalent to an HTTP status code.
  //               type: integer
  //               format: int32
  //               minimum: 0
  //             message:
  //               description: Message is a network-specific error message.
  //               type: string
  //             retriable:
  //               description: >-
  //                 An error is retriable if the same request may succeed if submitted
  //                 again.
  //               type: boolean
  //

  async accountBalance(req, reply) {
    console.log("accountBalance", req.params);
    return { key: "value" };
  }

  // Operation: constructionMetadata
  // URL: /construction/metadata
  // summary:  Get Transaction Construction Metadata
  // req.body
  //   description: >-
  //     A ConstructionMetadataRequest is utilized to get information required to
  //     construct a transaction. The Options object used to specify which metadata to
  //     return is left purposely unstructured to allow flexibility for implementers.
  //   type: object
  //   required:
  //     - network_identifier
  //     - options
  //   properties:
  //     network_identifier:
  //       description: >-
  //         The network_identifier specifies which network a particular object is
  //         associated with.
  //       type: object
  //       required:
  //         - blockchain
  //         - network
  //       properties:
  //         blockchain:
  //           type: string
  //           example: bitcoin
  //         network:
  //           description: >-
  //             If a blockchain has a specific chain-id or network identifier, it
  //             should go in this field. It is up to the client to determine which
  //             network-specific identifier is mainnet or testnet.
  //           type: string
  //           example: mainnet
  //         sub_network_identifier:
  //           description: >-
  //             In blockchains with sharded state, the SubNetworkIdentifier is
  //             required to query some object on a specific shard. This identifier is
  //             optional for all non-sharded blockchains.
  //           type: object
  //           required:
  //             - network
  //           properties:
  //             network:
  //               type: string
  //               example: shard 1
  //             metadata:
  //               type: object
  //               example:
  //                 producer: '0x52bc44d5378309ee2abf1539bf71de1b7d7be3b5'
  //     options:
  //       description: >-
  //         Some blockchains require different metadata for different types of
  //         transaction construction (ex: delegation versus a transfer). Instead of
  //         requiring a blockchain node to return all possible types of metadata for
  //         construction (which may require multiple node fetches), the client can
  //         populate an options object to limit the metadata returned to only the
  //         subset required.
  //       type: object
  //
  // valid responses
  //   '200':
  //     description: Expected response to a valid request
  //     content:
  //       application/json:
  //         schema:
  //           description: >-
  //             The ConstructionMetadataResponse returns network-specific metadata
  //             used for transaction construction. It is likely that the client will
  //             not inspect this metadata before passing it to a client SDK that uses
  //             it for construction.
  //           type: object
  //           required:
  //             - metadata
  //           properties:
  //             metadata:
  //               type: object
  //               example:
  //                 account_sequence: 23
  //                 recent_block_hash: '0x52bc44d5378309ee2abf1539bf71de1b7d7be3b5'
  //   default:
  //     description: unexpected error
  //     content:
  //       application/json:
  //         schema:
  //           description: >-
  //             Instead of utilizing HTTP status codes to describe node errors (which
  //             often do not have a good analog), rich errors are returned using this
  //             object.
  //           type: object
  //           required:
  //             - code
  //             - message
  //             - retriable
  //           properties:
  //             code:
  //               description: >-
  //                 Code is a network-specific error code. If desired, this code can
  //                 be equivalent to an HTTP status code.
  //               type: integer
  //               format: int32
  //               minimum: 0
  //             message:
  //               description: Message is a network-specific error message.
  //               type: string
  //             retriable:
  //               description: >-
  //                 An error is retriable if the same request may succeed if submitted
  //                 again.
  //               type: boolean
  //

  async constructionMetadata(req, reply) {
    console.log("constructionMetadata", req.params);
    return { key: "value" };
  }

  // Operation: constructionSubmit
  // URL: /construction/submit
  // summary:  Submit a Signed Transaction
  // req.body
  //   description: The transaction submission request includes a signed transaction.
  //   type: object
  //   required:
  //     - network_identifier
  //     - signed_transaction
  //   properties:
  //     network_identifier:
  //       description: >-
  //         The network_identifier specifies which network a particular object is
  //         associated with.
  //       type: object
  //       required:
  //         - blockchain
  //         - network
  //       properties:
  //         blockchain:
  //           type: string
  //           example: bitcoin
  //         network:
  //           description: >-
  //             If a blockchain has a specific chain-id or network identifier, it
  //             should go in this field. It is up to the client to determine which
  //             network-specific identifier is mainnet or testnet.
  //           type: string
  //           example: mainnet
  //         sub_network_identifier:
  //           description: >-
  //             In blockchains with sharded state, the SubNetworkIdentifier is
  //             required to query some object on a specific shard. This identifier is
  //             optional for all non-sharded blockchains.
  //           type: object
  //           required:
  //             - network
  //           properties:
  //             network:
  //               type: string
  //               example: shard 1
  //             metadata:
  //               type: object
  //               example:
  //                 producer: '0x52bc44d5378309ee2abf1539bf71de1b7d7be3b5'
  //     signed_transaction:
  //       type: string
  //
  // valid responses
  //   '200':
  //     description: Expected response to a valid request
  //     content:
  //       application/json:
  //         schema:
  //           description: >-
  //             A TransactionSubmitResponse contains the transaction_identifier of a
  //             submitted transaction that was accepted into the mempool.
  //           type: object
  //           required:
  //             - transaction_identifier
  //           properties:
  //             transaction_identifier:
  //               description: >-
  //                 The transaction_identifier uniquely identifies a transaction in a
  //                 particular network and block or in the mempool.
  //               type: object
  //               required:
  //                 - hash
  //               properties:
  //                 hash:
  //                   description: >-
  //                     Any transactions that are attributable only to a block (ex: a
  //                     block event) should use the hash of the block as the
  //                     identifier.
  //                   type: string
  //                   example: >-
  //                     0x2f23fd8cca835af21f3ac375bac601f97ead75f2e79143bdf71fe2c4be043e8f
  //             metadata:
  //               type: object
  //   default:
  //     description: unexpected error
  //     content:
  //       application/json:
  //         schema:
  //           description: >-
  //             Instead of utilizing HTTP status codes to describe node errors (which
  //             often do not have a good analog), rich errors are returned using this
  //             object.
  //           type: object
  //           required:
  //             - code
  //             - message
  //             - retriable
  //           properties:
  //             code:
  //               description: >-
  //                 Code is a network-specific error code. If desired, this code can
  //                 be equivalent to an HTTP status code.
  //               type: integer
  //               format: int32
  //               minimum: 0
  //             message:
  //               description: Message is a network-specific error message.
  //               type: string
  //             retriable:
  //               description: >-
  //                 An error is retriable if the same request may succeed if submitted
  //                 again.
  //               type: boolean
  //

  async constructionSubmit(req, reply) {
    console.log("constructionSubmit", req.params);
    return { key: "value" };
  }
}

module.exports = (opts) => new Service(opts);
